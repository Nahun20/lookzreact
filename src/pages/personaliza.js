// Importa las dependencias necesarias
import React from 'react';
import './personaliza.css'; // Importa el archivo CSS
import ropa from '../images/ropa.jpg'; // Importa la imagen desde la carpeta src/images

// Componente PersonalizarProducto
function PersonalizarProducto() {
    return (
        <div>
            {/* Barra de Navegación */}
            

            {/* Personalizar Producto */}
            <div className="container my-5" style={{ paddingTop: '80px' }}>
                <h2 className="text-center mb-4">Personaliza tu Camiseta</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="img-preview text-center">
                            <img src={ropa} alt="Camiseta" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3>Elige un color:</h3>
                        <input type="color" className="form-control mb-3 color-picker" title="Elige un color" />
                        <h3>Añade Texto:</h3>
                        <input type="text" className="form-control mb-3" placeholder="Escribe tu frase" />
                        <button className="btn btn-custom w-100">Guardar Diseño</button>

                    </div>
                </div>
            </div>
 
            {/* Footer */}
            

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        </div>
    );
}

export default PersonalizarProducto;
