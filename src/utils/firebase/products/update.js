import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateProduct = async (data) => {
    if(!data){
        throw new Error("Fill up information")
    }
  // Validate required fields
//   if (!data.id) {
//     throw new Error("Product ID is required");
//   }
//   if (!data.proname) {
//     throw new Error("Product Name is required");
//   }
//   if (!data.description) {
//     throw new Error("Product Description is required");
//   }
//   if (!data.category || data.category.length === 0) {
//     throw new Error("At least one category is required");
//   }
//   if (data.stock < 0) {
//     throw new Error("Stock cannot be negative");
//   }
//   if (data.price < 0) {
//     throw new Error("Price cannot be negative");
//   }
//   if (!data.sizes || data.sizes.length === 0) {
//     throw new Error("At least one size is required");
//   }
//   if (!data.colors || data.colors.length === 0) {
//     throw new Error("At least one color is required");
//   }

  try {
    // Update the product document in Firestore
    await updateDoc(doc(db, "products", data.id), {
      ...data
    });
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};
