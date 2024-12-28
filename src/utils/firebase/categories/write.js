import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { generateRandomId } from "@/utils/utils";

export const createNewCategory = async (data) => {
  if (!data.categoryName) {
    throw new Error("Category Name is required");
  }
  if (!data.categorySlug) {
    throw new Error("Category Slug is required");
  }
 const randID = generateRandomId()
  try {
    await setDoc(doc(db, "categories", randID), {
      id:randID,
      categoryName: data.categoryName,
      categorySlug: data.categorySlug,
    });
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};
