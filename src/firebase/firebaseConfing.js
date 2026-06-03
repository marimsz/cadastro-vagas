// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsbfZfDlWv3DOzeylIKr-a-79Td4Yxols",
  authDomain: "cadastro-vagas-senai.firebaseapp.com",
  projectId: "cadastro-vagas-senai",
  storageBucket: "cadastro-vagas-senai.firebasestorage.app",
  messagingSenderId: "709249443800",
  appId: "1:709249443800:web:b86ae65742ec436267f4ad",
  measurementId: "G-JJE0494J6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

