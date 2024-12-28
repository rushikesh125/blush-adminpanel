import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getCategory = async ({ id }) => {
  const docs = await getDoc(doc(db, "categories", id));
  if (docs.exists()) {
    return docs.data();
  } else {
    return null;
  }
  // console.log("DOC:",docs.data());
};
