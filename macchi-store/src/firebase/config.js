import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Poné tus claves a mano acá para descartar el problema del .env
const firebaseConfig = {
  apiKey: "AIzaSyBm-rk0PSwh0BrbMiafJKXfIR7WiqAXe10",
  authDomain: "gen-rockero.firebaseapp.com",
  projectId: "gen-rockero",
  storageBucket: "gen-rockero.appspot.com",
  messagingSenderId: "935248961974",
  appId: "1:935248961974:web:6113016e95e22bce742117"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);