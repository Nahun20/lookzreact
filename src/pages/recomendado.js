import React from 'react';
import './recomendado.css'; // Asegúrate de que este archivo existe y contiene los estilos necesarios
import ropa from '../images/ropa.jpg'; // Importa la imagen desde la carpeta src/images
const Recomendado = () => {
    return (
        <div>

            {/* Sección Recomendado */}
            <section className="recomendado-section">
                <div className="container">
                    <h2 className="recomendado-title">Recomendado por Lookz</h2>
                    <div className="row">
                        {/* Tarjeta 1 */}
                        <div className="col-md-4">
                            <div className="card-recomendado">
                                <img src={ropa} alt="Producto recomendado 1" />
                                <h5>Jaime Foldón</h5>
                                <p>Su diseño ligero y femenino combina colores vibrantes con un ajuste favorecedor, ideal para días soleados o salidas casuales.</p>
                                <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>

                        {/* Tarjeta 2 */}
                        <div className="col-md-4">
                            <div className="card-recomendado">
                                <img src={ropa} alt="Producto recomendado 2" />
                                <h5>Ricardo Amigo</h5>
                                <p>Su diseño estructurado y moderno te permite proyectar confianza y elegancia en cualquier entorno, ya sea en la oficina o en una ocasión especial.</p>
                                <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>

                        {/* Tarjeta 3 */}
                        <div className="col-md-4">
                            <div className="card-recomendado">
                                <img src={ropa} alt="Producto recomendado 3" />
                                <h5>Antonio Garrete</h5>
                                <p>Compuesto por un vestido fluido y una chaqueta a juego, este set te ofrece múltiples opciones para destacar.</p>
                                <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Recomendado;
