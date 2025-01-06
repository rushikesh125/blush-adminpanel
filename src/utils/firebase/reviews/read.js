import { collectionGroup, query, limit, startAfter, onSnapshot } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";// Your Firebase config file
import { db } from "../firebase";

export const useAllReviews = ({ pageLimit, lastSnapDoc }) => {
  // Subscribe to Firestore collection using SWRSubscription
  const { data, error } = useSWRSubscription(
    ["reviews", pageLimit, lastSnapDoc], // Key to identify this subscription
    ([_, pageLimit, lastSnapDoc], { next }) => {
      // Define Firestore collectionGroup reference
      const ref = collectionGroup(db, "reviews");
      let q = query(ref, limit(pageLimit ?? 10)); // Set the query with pagination limit

      if (lastSnapDoc) {
        q = query(q, startAfter(lastSnapDoc)); // Paginate using lastSnapDoc
      }

      // Setup Firestore listener
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          next(null, {
            list:
              snapshot.docs.length === 0
                ? null
                : snapshot.docs.map((snap) => ({
                    id: snap.id,
                    ...snap.data(),
                  })),
            lastSnapDoc:
              snapshot.docs.length === 0
                ? null
                : snapshot.docs[snapshot.docs.length - 1],
          });
        },
        (err) => next(err, null)
      );

      return () => unsub(); // Clean up listener on unmount
    }
  );

  return {
    data: data?.list || [],
    lastSnapDoc: data?.lastSnapDoc || null,
    error: error?.message || null,
    isLoading: data === undefined,
  };
};
