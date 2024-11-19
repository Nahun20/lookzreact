import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import './RegistrarProducto.css';

// Función para convertir la imagen a Base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// Componente para registrar producto
const RegistrarProducto = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  // Manejar cambios en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Manejar carga de imagen
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setBase64Image(base64);
        setImage(file);
      } catch (error) {
        console.error("Error al convertir la imagen a base64:", error);
      }
    }
  };

  // Función para guardar producto
  const saveProduct = async () => {
    if (!productData.name || !productData.description || !productData.price || !base64Image) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const db = getFirestore();
    const user = getAuth().currentUser;

    try {
      // Log para depurar los datos enviados
      console.log("Datos enviados a Firestore:", {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: base64Image,
        userId: user ? user.uid : null,
        createdAt: new Date(),
      });

      // Agregar el documento a Firestore
      const docRef = await addDoc(collection(db, "productos"), {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: base64Image, // Imagen en Base64
        userId: user ? user.uid : null,
        createdAt: new Date(),
      });

      console.log("Producto registrado con ID:", docRef.id);
      alert("Producto registrado correctamente.");

      // Limpiar formulario
      setProductData({
        name: "",
        description: "",
        price: "",
      });
      setImage(null);
      setBase64Image(null);
    } catch (e) {
      console.error("Error al guardar el producto:", e);
      alert(`Hubo un error al registrar el producto: ${e.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Producto</h2>
      <form onSubmit={(e) => e.preventDefault()} className="product-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Imagen:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="input-field" />
        </div>
        <div className="form-group">
          {image && <img src={base64Image} alt="Vista previa" className="image-preview" />}
        </div>
        <button type="button" onClick={saveProduct} className="submit-btn">
          Registrar Producto
        </button>
      </form>
    </div>
  );
};

export default RegistrarProducto;
