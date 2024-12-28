import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { fallbackModeToStaticPathsResult } from "next/dist/lib/fallback";
import toast from "react-hot-toast";

export const deleteProduct = async ({ id }) => {
  if (!id) {
    toast.error("ID is Required");
    return "id required";
  }

  try {
    // Use doc() to get the reference to the document you want to delete
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef); // Delete the document

    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    return false;
  }
};
