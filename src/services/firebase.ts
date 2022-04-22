import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { signInAnonymously, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDblWst7F3bynCSVn9IX_t_TmLhdjJ7xWU",
  authDomain: "missopad-e13a9.firebaseapp.com",
  databaseURL: "https://missopad-e13a9-default-rtdb.firebaseio.com",
  projectId: "missopad-e13a9",
  storageBucket: "missopad-e13a9.appspot.com",
  messagingSenderId: "502498677789",
  appId: "1:502498677789:web:0f4a46c9290bc4c8d222f4",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

const auth = getAuth();

export { app, db, signInAnonymously, auth };
