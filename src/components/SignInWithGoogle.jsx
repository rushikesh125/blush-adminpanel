"use client"
import React, { useState } from "react";
import SignInWithGoogleBtn from "./SignInWithGoogleBtn";
import toast from "react-hot-toast";
import { auth } from "@/utils/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const SignInWithGoogle = () => {
    const [isLoading,setIsLoading] = useState(false);
    const handleSignIn = async()=>{
        setIsLoading(true)
        try {
            const response = await signInWithPopup(auth,new GoogleAuthProvider());
            const user = await response.user
            toast.success("Login Success")
        } catch (error) {
            toast.error(error.message)
        }
        setIsLoading(false)
    }
  return (
    <>
      <SignInWithGoogleBtn isLoading={isLoading} onClick={handleSignIn}></SignInWithGoogleBtn>
    </>
  );
};

export default SignInWithGoogle;
