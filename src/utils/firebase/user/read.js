"use client";
import { db } from "../firebase"; // Adjust this path based on your project structure
import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  startAfter,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useUser({ uid }) {
  // Subscribe to Firestore collection using SWRSubscription
  const { data, error } = useSWRSubscription(
    ["users", uid], // Key to identify this subscription
    ([path, uid], { next }) => {
      // Define Firestore collection reference
      const ref = doc(db, `users/${uid}`);
      // Setup Firestore listener
      const unsub = onSnapshot(
        ref,
        (snapshot) => next(null, snapshot.exists() ? snapshot.data() : null),
        (err) => next(err, null)
      );

      return () => unsub();
    }
  );

  return {
    data: data,
    error: error?.message,
    isLoading: data === undefined,
  };
}



export function useUsers({ pageLimit, lastSnapDoc }) {
  // Subscribe to Firestore collection using SWRSubscription
  const { data, error } = useSWRSubscription(
    ["users", pageLimit, lastSnapDoc], // Key to identify this subscription
    ([path, pageLimit, lastSnapDoc], { next }) => {
      // Define Firestore collection reference
      const ref = collection(db, path);
      let q = query(ref, limit(pageLimit ?? 10));
      if (lastSnapDoc) {
        q = query(q, startAfter(lastSnapDoc));
      }
      // Setup Firestore listener
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          next(null, {
            list:
              snapshot.docs.length === 0
                ? null
                : snapshot.docs.map((snap) => snap.data()),
            lastSnapDoc:
              snapshot.docs.length === 0
                ? null
                : snapshot.docs[snapshot.docs.length - 1],
          });
        },
        (err) => next(err, null)
      );

      return () => unsub();
    }
  );

  return {
    data: data?.list,
    lastSnapDoc: data?.lastSnapDoc,
    error: error?.message,
    isLoading: data === undefined,
  };
}