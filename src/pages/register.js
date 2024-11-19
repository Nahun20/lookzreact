import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
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
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const db = getFirestore();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        if (!email || !password || !confirmPassword) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (!validatePassword(password)) {
            setError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: role,
            });

            navigate(role === 'admin' ? '/AdminDashboard' : '/');
        } catch (error) {
            setError('Error de registro: ' + error.message);
        }
    };

    return (
        <div id="register-section">
            <div id="register-container">
                <div id="circle-one" className="circle"></div>
                <div id="circle-two" className="circle"></div>
                <div id="form-container">
                    {error && <p className="error-message-above">{error}</p>}

                    <form id="register-form" onSubmit={handleSubmit}>
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
                    <LoginStyle />
                </div>
            </div>
        </div>
    );
};

export default Register;
