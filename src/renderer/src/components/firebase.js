// components/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDA3r-geM-ukzZAGfcBt3_wqWs0vPzlpJc",
  authDomain: "code-wallet-e7651.firebaseapp.com",
  projectId: "code-wallet-e7651",
  storageBucket: "code-wallet-e7651.firebasestorage.app",
  messagingSenderId: "719440706887",
  appId: "1:719440706887:web:321a438e30726ea1966062",
  measurementId: "G-BMMDEZ6C7F"
};

// Initialisation Firebase + Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
