import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return null;
  }
};

export const getProduct = async (productId) => {
  try {
    // Create a reference to the product document
    const productRef = doc(db, "products", productId);
    
    // Fetch the document
    const productSnap = await getDoc(productRef);
    
    // Check if the document exists
    if (productSnap.exists()) {
      return productSnap.data(); // Return the product data along with its ID
    } else {
      console.log("No such document!");
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error("Error fetching product: ", error);
    throw new Error("Failed to fetch product");
  }
};
