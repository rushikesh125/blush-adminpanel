"use client";
import CustomBtn3 from "@/components/CustomBtn3";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { auth } from "@/utils/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const userDetails = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add login logic here
    console.log("Login data:", formData);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Login Successfull");
      router.push(`/admin`);
    } catch (error) {
      console.log("error=>", error);
      toast.error(error?.message);
      setErrorMsg("Invalid Email & Password");
    }
    setIsLoading(false);
    // Example: Perform login API request
    // After successful login, redirect to `/admin`
  };

  useEffect(() => {
    if (userDetails) {
      router.push(`/admin`);
    }
  }, [userDetails, router]); // Redirect if `userDetails` exists

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {errorMsg && (
            <div className="text-red-500 font-semibold">{errorMsg}</div>
          )}

          <CustomBtn3
            type="submit"
            isLoading={isLoading}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </CustomBtn3>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <Link href="/register" className="font-semibold hover:underline">
            Create Account
          </Link>
          <Link
            href="/forget-password"
            className="font-semibold hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="mt-6">
          <SignInWithGoogle />
        </div>
      </div>
    </div>
  );
};

export default Login;
