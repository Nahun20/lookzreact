// Importa el SDK de Firebase Admin
const admin = require('firebase-admin');

// Inicializa Firebase Admin con tu archivo de clave privada
const serviceAccount = require('./ruta-al-archivo-clave-privada.json'); // Descarga desde Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tu-database.firebaseio.com' // URL de tu base de datos
});

// Función para enviar la notificación
const sendNotification = (token) => {
  const message = {
    notification: {
      title: 'Nueva Notificación',
      body: '¡Tienes un nuevo mensaje!'
    },
    token: token // Token del dispositivo al que deseas enviar
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Mensaje enviado con éxito:', response);
    })
    .catch((error) => {
      console.log('Error al enviar el mensaje:', error);
    });
};

// Llama a la función con el token del dispositivo
sendNotification('TOKEN_DEL_DISPOSITIVO');
