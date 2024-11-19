import React, { useEffect, useState } from 'react';
import './catalogo.css';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // Importa Link de React Router
import CatalogoStyle from './catalogostyle'; // Importa tu nuevo archivo de estilos

function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const theme = {
            background: "white", // Cambia según el tema seleccionado
            color: "#333"
        };
        CatalogoStyle.setTheme(theme);

        const fetchProductos = async () => {
            try {
                const db = getFirestore();
                const querySnapshot = await getDocs(collection(db, "productos"));
                const productosArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); // Agrega el id del documento

                console.log("Productos obtenidos:", productosArray); // Depuración

                setProductos(productosArray);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
                setLoading(false);
            }
        };

        fetchProductos();
    }, []); // El useEffect no depende del estado del usuario, solo se ejecuta una vez

    return (
        <div>
            {/* Título de la sección */}
            <div className="container my-5">
                <h1 className="catalog-title">Lo mejor de Lookz</h1>

                {/* Catálogo de Productos */}
                <div className="products-container">
                    {loading ? (
                        <p>Cargando productos...</p>
                    ) : (
                        productos.length > 0 ? (
                            productos.map((producto) => (
                                <div key={producto.id} className="product-card">
                                    <img src={producto.image || 'default-image.jpg'} alt={producto.name} />
                                    <div className="product-info">
                                        <h5>{producto.name}</h5>
                                        <p>{producto.description}</p>
                                        <p>Precio: ${producto.price}</p>
                                        <Link to={`/producto/${producto.id}`} className="btn">Ver más</Link> {/* Redirige a la página de detalle */}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay productos disponibles.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Catalogo;
