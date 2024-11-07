import React, { useEffect } from 'react';
import './catalogo.css';
import ropa from '../images/ropa.jpg';
import CatalogoStyle from './catalogostyle'; // Importa tu nuevo archivo de estilos

function Catalogo() {
    useEffect(() => {
        const theme = {
            background: "white", // Cambia según el tema seleccionado
            color: "#333"
        };
        CatalogoStyle.setTheme(theme);
    }, []);
    

    return (
        <div>
            {/* Título de la sección */}
            <div className="container my-5">
                <h1 className="catalog-title">Lo mejor de Lookz</h1>

                {/* Catálogo de Productos */}
                <div className="products-container">
                    <div className="product-card">
                        <img src={ropa} alt="Wardiere Black Dress" />
                        <div className="product-info">
                            <h5>WARDIERE BLACK DRESS</h5>
                            <p>Lo mejor de la temporada</p>
                            <button className="btn">Ver más</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <img src={ropa} alt="Borcelle Pink Sunglasses" />
                        <div className="product-info">
                            <h5>BORCELLE PINK SUNGLASSES</h5>
                            <p>Colores claros y elegantes</p>
                            <button className="btn">Ver más</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <img src={ropa} alt="Borcelle Green Dress" />
                        <div className="product-info">
                            <h5>BORCELLE GREEN DRESS</h5>
                            <p>Lookz</p>
                            <button className="btn">Ver más</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Catalogo;
