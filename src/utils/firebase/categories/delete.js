import { db } from "../firebase"; 
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

export const deleteCategory = async ({ id }) => {
  if (!id) {
    toast.error("ID is Required");
    return "id required";
  }
  
  try {
    // Use doc() to get the reference to the document you want to delete
    const docRef = doc(db, "categories", id);
    await deleteDoc(docRef); // Delete the document
    
    toast.success("Category deleted successfully");
    return "deleted";
  } catch (error) {
    console.error("Error deleting document:", error);
    toast.error("Failed to delete category");
    return "error";
  }
};
