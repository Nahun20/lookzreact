// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from "firebase/storage"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVCQkDoVA1PPnJ7hIqRdXqm-S-fe-zSso",
  authDomain: "lookz-93f3a.firebaseapp.com",
  projectId: "lookz-93f3a",
  storageBucket: "lookz-93f3a.firebasestorage.app", // Puede que necesites corregir esto a "lookz-93f3a.appspot.com"
  messagingSenderId: "793810220528",
  appId: "1:793810220528:web:8d615de757ea69e0081935"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const storage = getStorage(app); // Inicializa Firebase Storage

// Export the services
export { auth, db, functions, storage }; // Asegúrate de exportar storage también
