"use client";
import CustomBtn3 from "@/components/CustomBtn3";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { auth } from "@/utils/firebase/firebase";
import { createUser } from "@/utils/firebase/user/write";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  //   const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSendEmail = async (e) => {
    setIsLoading(true);
    e.preventDefault();


    try {
      await sendPasswordResetEmail(auth, formData.email);
      toast.success("Reset Link Sent");
    } catch (error) {
      console.log("error>", error);
      toast.error(error?.message || "An error occurred during registration.");
    }
    setFormData({
      email: "",
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Forget Password</h2>
        <form onSubmit={handleSendEmail}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <CustomBtn3
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            isLoading={isLoading}
          >
            Send Reset LInk
          </CustomBtn3>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <a href="/login" className="font-semibold hover:underline">
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
