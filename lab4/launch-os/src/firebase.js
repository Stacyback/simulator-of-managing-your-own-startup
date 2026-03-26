import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQpxkw5BoTFRrB5PQhtoHYPvlPfo3vtec",
  authDomain: "launch-os-lab4.firebaseapp.com",
  projectId: "launch-os-lab4",
  storageBucket: "launch-os-lab4.firebasestorage.app",
  messagingSenderId: "596140991320",
  appId: "1:596140991320:web:c4d8b0886301c97529fb2d",
  measurementId: "G-G1H031ZHD1"
};

// Ініціалізація
const app = initializeApp(firebaseConfig);

// Експортуємо сервіси, щоб юзати їх в компонентах
export const auth = getAuth(app);
export const db = getFirestore(app);