import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { db, auth } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './contacto.css';

const Contacto = () => {
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate(); // Crea una instancia de useNavigate

    // Verificar autenticación del usuario y establecer email
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsuario(user);
                setEmail(user.email || ''); // Usa el email del usuario autenticado
            } else {
                setUsuario(null);
                setEmail('');
            }
        });
        return unsubscribe;
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!usuario) {
            alert('Debes estar logueado para enviar un mensaje');
            return;
        }

        if (!mensaje.trim()) {
            alert('El mensaje no puede estar vacío');
            return;
        }

        try {
            await addDoc(collection(db, 'mensajes'), {
                email,
                mensaje,
                usuarioId: usuario.uid,
                fecha: new Date(),
            });
            setMensaje(''); // Limpiar el campo del mensaje después de enviarlo
            navigate('/'); // Redirige a la página de inicio
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
    };

    return (
        <div>
            <div className="container my-5">
                <h2 className="text-center mb-4">Contáctanos</h2>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    readOnly // Campo no editable
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                                <textarea
                                    className="form-control"
                                    id="mensaje"
                                    value={mensaje}
                                    onChange={(e) => setMensaje(e.target.value)}
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-custom w-100" disabled={!mensaje.trim()}>
                                Enviar Mensaje
                            </button>
                        </form>
                        {!usuario && <p className="text-danger mt-3">Debes iniciar sesión para enviar un mensaje.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
