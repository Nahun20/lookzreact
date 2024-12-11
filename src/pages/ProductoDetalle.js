import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './ProductoDetalle.css'; // Asegúrate de tener este archivo con los estilos personalizados

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      const db = getFirestore();
      const docRef = doc(db, "productos", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProducto(docSnap.data());
      } else {
        console.log("No se encontró el producto");
      }
    };

    fetchProducto();
  }, [id]);

  if (!producto) return <div className="loading">Cargando...</div>;

  return (
    <div className="producto-detalle">
      <div className="producto-content">
        <div className="producto-image">
          <img
            src={producto.image || 'default-image.jpg'}
            alt={producto.name}
            className="img-fluid"
          />
        </div>
        <div className="producto-info">
          <h1 className="producto-title">{producto.name}</h1>
          <p className="producto-description">{producto.description}</p>
          <div className="producto-price">
            <span className="price-label">Precio:</span>
            <strong>${producto.price}</strong>
          </div>
          <div className="add-to-cart-btn">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
