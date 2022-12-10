import { initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { signInAnonymously, getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5N8-mNK6_AXa-cyxl1sJZEDpdhzxcclI",
  authDomain: "missopad-mahlik.firebaseapp.com",
  projectId: "missopad-mahlik",
  storageBucket: "missopad-mahlik.appspot.com",
  messagingSenderId: "1050920301843",
  appId: "1:1050920301843:web:0e4c77390a6d0a125556e6",
  databaseURL: "http://127.0.0.1:9000/?ns=missopad-mahlik",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

const auth = getAuth();

if (window.location.hostname === "localhost") {
  connectDatabaseEmulator(db, "localhost", 9000);
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { app, db, signInAnonymously, auth };
