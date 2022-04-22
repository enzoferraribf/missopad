import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { signInAnonymously, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjEMBrnRqyYTX-4f7tu10Ta92eYAOVl5s",
  authDomain: "missopad-ricc.firebaseapp.com",
  databaseURL: "http://localhost:9000/?ns=missopad-ricc",
  projectId: "missopad-ricc",
  storageBucket: "missopad-ricc.appspot.com",
  messagingSenderId: "86548688569",
  appId: "1:86548688569:web:94721a61ecbee85b1af568",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

const auth = getAuth();

export { app, db, signInAnonymously, auth };
