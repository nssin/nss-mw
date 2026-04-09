import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Replace with your Firebase config in production
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "naidu-solutions.firebaseapp.com",
  projectId: "naidu-solutions",
  storageBucket: "naidu-solutions.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);