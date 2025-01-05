import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateOrderStatus = async ({ id, status, metaData }) => {
  await updateDoc(doc(db, `orders/${id}`), {
    metaData: {
      ...metaData,
      ProductStatus:status,
    },
  });
};
