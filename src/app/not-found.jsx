

import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center text-center border border-black p-4 font-bold bg-white shadow-md rounded-md">
        <span className="text-xl">404 |</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mx-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <span className="text-xl">This Page Could Not Be Found</span>
      </div>
      <Link href="/">
        <div className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
          Go to Home
        </div>
      </Link>
    </div>
  );
};

export default NotFoundPage;
