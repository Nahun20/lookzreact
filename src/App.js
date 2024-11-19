import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth, db } from './firebaseConfig'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import './App.css';
import logo from './images/2.ico';
import 'font-awesome/css/font-awesome.min.css';

// Importa los componentes de cada página
import Inicio from './pages/inicio';
import Catalogo from './pages/catalogo';
import ProductoDetalle from './pages/ProductoDetalle'; // Importa el componente de detalle
import Personaliza from './pages/personaliza';
import Recomendado from './pages/recomendado';
import Contacto from './pages/contacto';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import RegistrarProducto from './pages/RegistrarProducto'; 

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Para almacenar el rol del usuario
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // Obtener el rol del usuario desde Firestore solo cuando esté logueado
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setRole(userDoc.data().role); // Guardar el rol del usuario
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Usuario desconectado");
      navigate("/"); // Redirige al inicio después del logout
    } catch (error) {
      console.error("Error al desconectar: ", error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-md">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="50" alt="Logo de Lookz" />
            Lookz
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto list">
              <li className="nav-item">
                <Link className="nav-link" to="/"><i className="fas fa-home"></i> Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/catalogo"><i className="fas fa-th"></i> Catálogo</Link>
              </li>
              {user && role && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/personaliza"><i className="fas fa-paint-brush"></i> Personaliza</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/recomendado"><i className="fas fa-star"></i> Recomendado</Link>
                  </li>
                  {role === 'admin' && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/AdminDashboard"><i className="fas fa-cogs"></i> Admin Dashboard</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/registrar-producto"><i className="fas fa-plus"></i> Registrar Producto</Link>
                      </li>
                    </>
                  )}
                  <li className="nav-item">
                    <Link 
                        className="nav-link" 
                        to="#" 
                        onClick={handleLogout} 
                    >
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </Link>
                  </li>
                </>
              )}
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/contacto"><i className="fas fa-envelope"></i> Contacto</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Define las rutas de cada apartado */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/personaliza" element={<Personaliza />} />
        <Route path="/recomendado" element={<Recomendado />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Rutas para los dashboards */}
        {role === 'admin' ? (
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
        ) : (
          <Route path="/UserDashboard" element={<UserDashboard />} />
        )}

        {/* Ruta para el detalle de producto */}
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/catalogo" element={<Catalogo />} />


        {/* Ruta para registrar producto (solo admin) */}
        {role === 'admin' && (
          <Route path="/registrar-producto" element={<RegistrarProducto />} />
        )}
      </Routes>
    </>
  );
}

export default App;
