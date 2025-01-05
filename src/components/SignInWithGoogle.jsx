"use client"
import React, { useState } from "react";
import SignInWithGoogleBtn from "./SignInWithGoogleBtn";
import toast from "react-hot-toast";
import { auth } from "@/utils/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUser } from "@/utils/firebase/user/write";
import { useRouter } from "next/navigation";
const SignInWithGoogle = () => {
  const router = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const handleSignIn = async()=>{
        setIsLoading(true)
        try {
            const response = await signInWithPopup(auth,new GoogleAuthProvider());
            // const user = await response.user;
            const user = {
              displayName: response.user.displayName,
              email: response.user.email,
              photoURL: response.user.photoURL,
              uid: response.user.uid,
            };
            await createUser({ uid: user?.uid, user: user });
            toast.success("Login Success")
            router.push(`/admin`)
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
