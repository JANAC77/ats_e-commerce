// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9XW56t6ca89GlQT7F2YMZHANtdyxQe-8",
  authDomain: "atsecommerce-84084.firebaseapp.com",
  projectId: "atsecommerce-84084",
  storageBucket: "atsecommerce-84084.firebasestorage.app",
  messagingSenderId: "876171359780",
  appId: "1:876171359780:web:b4119d162174257879cab1",
  measurementId: "G-VQ75542VJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);