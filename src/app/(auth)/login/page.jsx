"use client";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const userDetails = useSelector((state) => state.user);

  useEffect(() => {
    if (userDetails) {
      router.push(`/admin`);
    }
  }, [userDetails, router]); // Redirect if `userDetails` exists

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <Link href="/register" className="font-semibold hover:underline">
            Create Account
          </Link>
          <a href="#" className="font-semibold hover:underline">
            Forgot Password?
          </a>
        </div>

        <div className="mt-6">
          <SignInWithGoogle />
        </div>
      </div>
    </div>
  );
};

export default Login;
