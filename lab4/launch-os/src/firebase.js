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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// API URL для сервера
export const API_URL = 'http://localhost:5000/api';

// Функції для JWT
export const saveToken = (token) => {
  localStorage.setItem('jwt_token', token);
};

export const getToken = () => {
  return localStorage.getItem('jwt_token');
};

export const removeToken = () => {
  localStorage.removeItem('jwt_token');
};

export const authFetch = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });
  
  if (response.status === 401) {
    removeToken();
    window.location.href = '/login';
  }
  
  return response;
};