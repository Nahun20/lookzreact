import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.');
      // Puedes redirigir al usuario a otra página si lo deseas
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section id="forgot-password-section" className="container">
  <h1 id="forgot-password-title">Restablecer Contraseña</h1>
  {message && <p id="forgot-password-success-message" className="success-message">{message}</p>}
  {error && <p id="forgot-password-message" className="error-message">{error}</p>}
  <form id="forgot-password-form" onSubmit={handleSubmit}>
    <input
      type="email"
      placeholder="Ingresa tu correo electrónico"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      id="forgot-password-input"
    />
    <button type="submit" id="forgot-password-button">Enviar enlace de restablecimiento</button>
  </form>
</section>


  );
};

export default ForgotPassword;
