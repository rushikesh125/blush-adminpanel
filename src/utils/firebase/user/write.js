import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export const createUser = async ({ uid, user }) => {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      ...user,
      createdAt: Timestamp.now(),
    },
    { merge: true }
  );
};
