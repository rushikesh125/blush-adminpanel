"use client";
import { db } from "../firebase"; // Adjust this path based on your project structure
import {
  collection,
  limit,
  onSnapshot,
  query,
  startAfter,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useProducts({ pageLimit, lastSnapDoc }) {
  // Subscribe to Firestore collection using SWRSubscription
  const { data, error } = useSWRSubscription(
    ["products", pageLimit, lastSnapDoc], // Key to identify this subscription
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
