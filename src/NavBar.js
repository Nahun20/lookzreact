import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="images/1.png" width="50" alt="Logo de Lookz" />
          Lookz
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto list">
            <li className="nav-item"><a className="nav-link active" href="#">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Catálogo</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Personaliza</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Recomendado</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Contacto</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
