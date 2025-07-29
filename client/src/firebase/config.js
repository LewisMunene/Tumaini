// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config (replace with your actual values from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyBJJ_VNW_OsIbBmEEzAxtWNJ0D2xc1TDAE",
  authDomain: "tumaini-stress-management.firebaseapp.com",
  projectId: "tumaini-stress-management",
  storageBucket: "tumaini-stress-management.appspot.com",
  messagingSenderId: "280822499758",
  appId: "1:280822499758:web:3aa581af6016f55304a03f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure auth providers
export const googleProvider = new GoogleAuthProvider();
export const emailProvider = new EmailAuthProvider();

// Configure Google provider for Strathmore domain
googleProvider.setCustomParameters({
  hd: 'strathmore.edu' // This restricts to Strathmore domain
});

export default app;