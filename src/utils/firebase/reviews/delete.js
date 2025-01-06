import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const deleteReview = async({uid,productId})=>{
    const ref=doc(db,`products/${productId}/reviews/${uid}`);
    await deleteDoc(ref);
}