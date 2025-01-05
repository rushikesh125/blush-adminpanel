"use client";
import CustomBtn3 from "@/components/CustomBtn3";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { auth } from "@/utils/firebase/firebase";
import { createUser } from "@/utils/firebase/user/write";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    setErrorMessage("");

    try {
      // Add registration logic here
      // console.log("Registration data:", formData);
      const credential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(credential.user, {
        displayName: formData.username,
      });
      const user = {
        displayName: formData.username,
        email: credential.user.email,
        photoURL: credential.user.photoURL,
        uid: credential.user.uid,
      };
      console.log("credential:", user);
      await createUser({ uid: user?.uid, user: user });
      toast.success("Registration successful!");
      router.push(`/admin`);
    } catch (error) {
      console.log("error>", error);
      toast.error(error?.message || "An error occurred during registration.");
    }
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="username"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your name"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Confirm your password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4 font-semibold">
              {errorMessage}
            </p>
          )}
          <CustomBtn3
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            isLoading={isLoading}
          >
            Register
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

export default Register;
