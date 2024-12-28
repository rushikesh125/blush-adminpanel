"use client"
import { db } from "../firebase";// Adjust this path based on your project structure
import { collection, onSnapshot } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useCategories() {
  // Subscribe to Firestore collection using SWRSubscription
  const { data, error } = useSWRSubscription(
    ["categories"], // Key to identify this subscription
    ([path], { next }) => {
      // Define Firestore collection reference
      const ref = collection(db, path);

      // Setup Firestore listener
      const unsubscribe = onSnapshot(
        ref,
        (snapshot) => {
          // If the collection is empty, return null; otherwise, map documents
          next(
            null,
            snapshot.docs.length === 0
              ? null
              : snapshot.docs.map((snap) => snap.data())
          );
        },
        (err) => next(err,null) // Pass errors to SWR
      );

      // Return unsubscribe function to clean up the listener
      return () => unsubscribe();
    }
  );

  return { 
    data, 
    error, 
    isLoading: data === undefined // Define a loading state
  };
}
