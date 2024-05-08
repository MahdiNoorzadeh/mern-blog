// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-78e3e.firebaseapp.com",
  projectId: "mern-blog-78e3e",
  storageBucket: "mern-blog-78e3e.appspot.com",
  messagingSenderId: "178245297559",
  appId: "1:178245297559:web:5d9e783bb3d2a0dddc90d2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);