import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYXJyusDj8rX3mWAeRX2m7Yqx8a2ZKOmU",
  authDomain: "ecell-team-members.firebaseapp.com",
  projectId: "ecell-team-members",
  storageBucket: "ecell-team-members.firebasestorage.app",
  messagingSenderId: "854897800490",
  appId: "1:854897800490:web:c071d7637e81abd5aa5a53",
  measurementId: "G-CQE9591DNQ"
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
