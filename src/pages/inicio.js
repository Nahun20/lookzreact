// src/pages/Inicio.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Asegúrate de tener los estilos en App.css o en otro archivo importado

function Inicio() {
  return (
    <div>
      {/* Navbar */}

      {/* Sección Hero */}
      <section className="hero">
        <div className="container text-center">
          <h1 className="display-3">Vístete de innovación, vive el cambio</h1>
          <p className="lead">Crea y personaliza tu ropa en tiempo real con Lookz.</p>
          <Link to="/catalogo" className="btn btn-primary btn-lg">Ver Catálogo</Link>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}

export default Inicio;
