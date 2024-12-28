import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";
import { generateRandomId } from "@/utils/utils";

export const createProducts = async (
  productname,
  description,
  category,
  stock,
  price,
  sizes,
  colors
) => {
  const randID = generateRandomId();
  try {
    await setDoc(doc(db, "products", randID), {
      id: randID,
      productname,
      description,
      category,
      stock,
      price,
      sizes,
      colors,
    });
    toast.success("Product added Successfully");
    return { success: true };
  } catch (error) {
    toast.error(error?.message);
    return null;
  }
};
