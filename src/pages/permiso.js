import React, { useEffect } from 'react';
import { messaging } from './firebaseConfig';

const RequestNotificationPermission = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        await Notification.requestPermission();
        console.log('Notification permission granted.');

        // Obtener el token de registro de FCM
        const token = await messaging.getToken();
        console.log('FCM Token:', token);

        // Aquí podrías enviar este token al backend para almacenarlo y enviar notificaciones
      } catch (error) {
        console.error('Error al obtener permisos o token FCM:', error);
      }
    };

    requestPermission();
  }, []);

  return <div>Permiso para recibir notificaciones solicitado.</div>;
};

export default RequestNotificationPermission;
