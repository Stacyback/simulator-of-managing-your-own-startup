// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQpxkw5BoTFRrB5PQhtoHYPvlPfo3vtec",
  authDomain: "launch-os-lab4.firebaseapp.com",
  projectId: "launch-os-lab4",
  storageBucket: "launch-os-lab4.firebasestorage.app",
  messagingSenderId: "596140991320",
  appId: "1:596140991320:web:c4d8b0886301c97529fb2d",
  measurementId: "G-G1H031ZHD1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Функція для збереження даних стартапу
export const saveStartupData = async (userId, startupData) => {
  try {
    const startupRef = doc(db, "startups", userId);
    await setDoc(startupRef, {
      ...startupData,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error("Помилка збереження стартапу:", error);
    return { success: false, error: error.message };
  }
};

// Функція для завантаження даних стартапу
export const loadStartupData = async (userId) => {
  try {
    const startupRef = doc(db, "startups", userId);
    const docSnap = await getDoc(startupRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: true, data: null };
    }
  } catch (error) {
    console.error("Помилка завантаження стартапу:", error);
    return { success: false, error: error.message };
  }
};

// Функція для збереження історії симуляцій
export const saveSimulationHistory = async (userId, history) => {
  try {
    const historyRef = doc(db, "simulationHistory", userId);
    await setDoc(historyRef, {
      history: history,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error("Помилка збереження історії:", error);
    return { success: false, error: error.message };
  }
};

// Функція для завантаження історії симуляцій
export const loadSimulationHistory = async (userId) => {
  try {
    const historyRef = doc(db, "simulationHistory", userId);
    const docSnap = await getDoc(historyRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data().history };
    } else {
      return { success: true, data: null };
    }
  } catch (error) {
    console.error("Помилка завантаження історії:", error);
    return { success: false, error: error.message };
  }
};