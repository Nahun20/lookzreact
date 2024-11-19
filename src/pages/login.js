import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Importa Firestore
import LoginStyle from './loginstyle';
import './login.css';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Crea la instancia de navigate
  const db = getFirestore(); // Inicializa Firestore

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (emailOrUsername === '') {
      setError('El campo de correo electrónico o nombre de usuario es obligatorio.');
      return;
    }

    if (password === '') {
      setError('El campo de contraseña es obligatorio.');
      return;
    }

    try {
      let email = emailOrUsername;

      // Verifica si el usuario ingresó un nombre de usuario
      if (!/\S+@\S+\.\S+/.test(email)) {
        // Asume que es un nombre de usuario, así que busquemos su correo
        const q = query(
          collection(db, 'users'), // Asegúrate de que 'users' sea el nombre correcto de tu colección
          where('username', '==', emailOrUsername)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // Si se encontró el usuario, obtiene su correo
          const userDoc = querySnapshot.docs[0].data();
          email = userDoc.email; // Suponiendo que tienes el campo 'email' en tu documento
        } else {
          setError('Nombre de usuario o correo electrónico no válidos.');
          return;
        }
      }

      // Autenticación con Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      // Verificar el rol del usuario después de hacer login
      const userDoc = await getDocs(query(collection(db, 'users'), where('email', '==', email)));
      if (!userDoc.empty) {
        const userData = userDoc.docs[0].data();
        if (userData.role === 'admin') {
          // Si es admin, redirige al dashboard del admin
          navigate('/');
        } else {
          // Si no es admin, redirige al home o la página principal
          navigate('/');
        }
      } else {
        setError('No se encontró el rol del usuario.');
      }

    } catch (error) {
      // Manejamos solo los errores personalizados y los errores comunes
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        setError('El correo electrónico o la contraseña son incorrectos.');
      } else {
        setError('Error de inicio de sesión. Por favor, intenta de nuevo.');
      }
    }
  };

  return (
    <section className="container" id="login-section">
      <div className="login-container" id="login-container">
        <div className="circle circle-one" id="circle-one"></div>
        <div className="form-container" id="form-container">
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className="illustration"
            id="illustration"
          />
          <h1 className="opacity" id="login-title">INICIAR SESIÓN</h1>
          {error && <p className="error-message">{error}</p>}
          <form id="login-form" onSubmit={handleSubmit}>
            <input
              type="text" // Cambia el tipo a text para permitir nombre de usuario o email
              placeholder="CORREO ELECTRÓNICO o NOMBRE DE USUARIO"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="CONTRASEÑA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="opacity" id="submit-button">ENVIAR</button>
          </form>
          <div className="register-forget opacity" id="register-forget">
            <a href="./register" id="register-link">REGISTRARSE</a>
            <a href="./forgot-password" id="forgot-password-link">OLVIDÓ SU CONTRASEÑA</a>
          </div>
        </div>
        <div className="circle circle-two" id="circle-two"></div>
      </div>
      <LoginStyle />
    </section>
  );
};

export default Login;
