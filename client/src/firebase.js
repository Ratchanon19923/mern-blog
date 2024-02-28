// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d36db.firebaseapp.com",
  projectId: "mern-blog-d36db",
  storageBucket: "mern-blog-d36db.appspot.com",
  messagingSenderId: "961547488620",
  appId: "1:961547488620:web:7f19d25ec9abc5ad42f749",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
