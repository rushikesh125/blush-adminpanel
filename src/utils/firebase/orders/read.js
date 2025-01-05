import { collection, doc, limit, onSnapshot, orderBy, query, startAfter } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { db } from "../firebase";



export function useOrder({ id }) {
    // Subscribe to Firestore collection using SWRSubscription
    const { data, error } = useSWRSubscription(
      ["orders", id], // Key to identify this subscription
      ([path, id], { next }) => {
        // Define Firestore collection reference
        const ref = doc(db,`orders/${id}`)
        // Setup Firestore listener
        const unsub = onSnapshot(
          ref,
          (snapshot) => next(null, snapshot.data()),
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
export function useAllOrders({ pageLimit, lastSnapDoc }) {
    // Subscribe to Firestore collection using SWRSubscription
    const { data, error } = useSWRSubscription(
      ["orders", pageLimit, lastSnapDoc], // Key to identify this subscription
      ([path, pageLimit, lastSnapDoc], { next }) => {
        // Define Firestore collection reference
        const ref = collection(db, path);
        let q = query(ref, limit(pageLimit ?? 10),orderBy("createdAt","desc"));
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