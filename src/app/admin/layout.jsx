"use client";

import React, { Suspense, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import AdminNav from "./components/AdminNav";
import { auth, db } from "@/utils/firebase/firebase";
import { useSelector } from "react-redux";
import { useAdmin } from "@/utils/firebase/admins/read";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

const Layout = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  // const adminDetails = useSelector((state) => state.user);
  // console.log('adminDetail:',adminDetails);
  // const {
  //   data: admin,
  //   error,
  //   isLoading,
  // } = useAdmin({ email: adminDetails?.email });
  // console.log("admin:", admin);
  const toggleAdminNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  // if(!isAdmin){
  //   return <div className="h-screen w-screen flex items-center justify-center">You Are not Admin</div>
  // }

  // if (isLoading) {
  //   return (
  //     <div className=" w-screen h-screen flex items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }
  // if (error) {
  //   return (
  //     <div className="text-red-500 w-screen h-screen flex items-center justify-center">
  //       {error}
  //     </div>
  //   );
  // }
  // if (!admin) {
  //   return (
  //     <div className="absolute text-red-500 w-screen h-screen flex flex-col gap-3 items-center justify-center">
  //       You are not admin
  //       <div>
  //         <Link
  //           href={`/`}
  //           className="text-black bg-slate-100 hover:bg-slate-200 p-2 rounded-md"
  //         >
  //           go to Home
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminNav toggleAdminNav={toggleAdminNav} />
      </Suspense>
      <main className="flex min-h-screen">
        <Sidebar isNavOpen={isNavOpen} toggleAdminNav={toggleAdminNav} />
        <section className="flex-1 bg-gray-200 p-4 overflow-x-hidden">
          {children}
        </section>
      </main>
    </>
  );
};

export default Layout;
