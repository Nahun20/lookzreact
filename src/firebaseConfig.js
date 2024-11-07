// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVCQkDoVA1PPnJ7hIqRdXqm-S-fe-zSso",
  authDomain: "lookz-93f3a.firebaseapp.com",
  projectId: "lookz-93f3a",
  storageBucket: "lookz-93f3a.firebasestorage.app",
  messagingSenderId: "793810220528",
  appId: "1:793810220528:web:8d615de757ea69e0081935"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };