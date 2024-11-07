import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth'; // Añadí la importación de fetchSignInMethodsForEmail
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Para interactuar con Firestore
import './adminDashboard.css'; // Estilos del dashboard

const AdminDashboard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es admin
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const db = getFirestore();

    // Verificar si el usuario logueado es admin
    useEffect(() => {
        const checkAdmin = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.role !== 'admin') {
                        navigate('/'); // Redirigir si no es admin
                    } else {
                        setIsAdmin(true); // Es admin, habilitar el formulario
                    }
                }
            } else {
                navigate('/login'); // Redirigir si no está logueado
            }
        };
        checkAdmin();
    }, [navigate, db]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            // Verificar si el correo ya está registrado
            const methods = await fetchSignInMethodsForEmail(auth, email);
            if (methods.length > 0) {
                setError('Este correo electrónico ya está en uso.');
                return;
            }

            // Registrar un nuevo administrador
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Guardar el nuevo admin en Firestore con el rol 'admin'
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: 'admin',
            });

            alert('Administrador registrado exitosamente');
            navigate('/'); // Redirige al dashboard
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div id="admin-dashboard">
            <h1>Dashboard de Administrador</h1>
            {isAdmin && (
                <form onSubmit={handleSubmit}>
                    <h2>Registrar nuevo Administrador</h2>
                    {error && <p className="error-message">{error}</p>} {/* Mostrar error si ocurre */}
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
                    <button type="submit">Registrar Administrador</button>
                </form>
            )}
        </div>
    );
};

export default AdminDashboard;
