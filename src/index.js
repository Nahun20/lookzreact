import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importa tus estilos globales
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa Router aquí

import 'font-awesome/css/font-awesome.min.css';

// Punto de entrada
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>  {/* Este es el único Router en la aplicación */}
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
