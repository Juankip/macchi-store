import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBm-rk0PSwh0BrbMiafJKXFiR7WiqAXe10",
  authDomain: "gen-rockero.firebaseapp.com",
  projectId: "gen-rockero",
  storageBucket: "gen-rockero.firebasestorage.app",
  messagingSenderId: "935248961974",
  appId: "1:935248961974:web:6113016e95e22bce742117"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos la base de datos y la exportamos
export const db = getFirestore(app);