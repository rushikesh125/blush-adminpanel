import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { generateRandomId } from "@/utils/utils";

export const updateCategory = async (data) => {
  if (!data.categoryName) {
    throw new Error("Category Name is required");
  }
  if (!data.categorySlug) {
    throw new Error("Category Slug is required");
  }
  if(!data.id){
    throw new Error("ID is Required")
  }
 const randID = data.id
  try {
    await updateDoc(doc(db, "categories", randID), {
      id:randID,
      categoryName: data.categoryName,
      categorySlug: data.categorySlug,
    });
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};