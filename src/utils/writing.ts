import { ref, runTransaction, serverTimestamp } from "firebase/database";
import { db } from "../services/firebase";

interface Writing {
  content: string;
  author: string;
}

export async function handleWriting(pathname: string, writing: Writing) {
  const dbRef = ref(db, pathname);

  await runTransaction(dbRef, (snapshot) => {
    snapshot = { ...writing, updatedAt: serverTimestamp() };

    return snapshot;
  });
}
