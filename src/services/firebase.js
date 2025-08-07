// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAv9Ln_oRCfTWmWqHbACDacwfq-zgeDb4E",
  authDomain: "harkowe-28583.firebaseapp.com",
  projectId: "harkowe-28583",
  storageBucket: "harkowe-28583.firebasestorage.app",
  messagingSenderId: "772700705375",
  appId: "1:772700705375:web:58f664740a308af62441ea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
