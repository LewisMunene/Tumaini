// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJJ_VNW_OsIbBmEEzAxtWNJ0D2xc1TDAE",
  authDomain: "tumaini-stress-management.firebaseapp.com",
  projectId: "tumaini-stress-management",
  storageBucket: "tumaini-stress-management.firebasestorage.app",
  messagingSenderId: "280822499758",
  appId: "1:280822499758:web:3aa581af6016f55304a03f",
  measurementId: "G-JT8QEBNYF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);