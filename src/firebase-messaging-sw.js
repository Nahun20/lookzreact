// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBVCQkDoVA1PPnJ7hIqRdXqm-S-fe-zSso",
    authDomain: "lookz-93f3a.firebaseapp.com",
    projectId: "lookz-93f3a",
    storageBucket: "lookz-93f3a.firebasestorage.app", // Puede que necesites corregir esto a "lookz-93f3a.appspot.com"
    messagingSenderId: "793810220528",
    appId: "1:793810220528:web:8d615de757ea69e0081935"
});

const messaging = firebase.messaging();

// Mostrar la notificación cuando la app está en segundo plano o cerrada
messaging.onBackgroundMessage(function (payload) {
  console.log('Mensaje en segundo plano recibido', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
