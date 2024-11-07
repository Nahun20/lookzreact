import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import LoginStyle from './loginstyle';
import './register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user'); 
    const navigate = useNavigate();
    const db = getFirestore();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    role: role,
                });

                navigate('/AdminDashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Error: ${errorMessage}`);
            });
    };

    return (
        <div id="register-section">
            <div id="register-container">
                {/* Círculos para el fondo */}
                <div id="circle-one" className="circle"></div>
                <div id="circle-two" className="circle"></div>
                <div id="form-container">
                    <form id="register-form" onSubmit={handleSubmit}>
                        <img
                            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
                            alt="illustration"
                            className="illustration"
                        />
                        <h1 className="opacity" id="register-title">Registro</h1>

                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>

                        <button type="submit">Registrarse</button>
                    </form>
                </div>

                <div className="theme-btn-container">
                    <LoginStyle /> {/* Agregamos el componente LoginStyle para los botones de tema */}
                </div>
            </div>
        </div>
    );
};

export default Register;
