"use client";

import React, { useEffect, useState } from "react";
import CustomBtn from "@/components/CustomBtn";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { getAdmins } from "@/utils/firebase/admins/read_server";
import { updateAdmin } from "@/utils/firebase/admins/update";
import { createAdmin } from "@/utils/firebase/admins/write";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    adminName: "",
    adminEmail: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null); // Store id separately as a state
  const searchParams = useSearchParams();
  const router = useRouter();

  // Sync id from searchParams using a React effect
  useEffect(() => {
    const idFromParams = searchParams.get("id");
    if (idFromParams) {
      setId(idFromParams);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchAdmins = async () => {
    try {
      const res = await getAdmins({ id });
      if (!res) {
        toast.error("Failed to admin details Data");
      } else {
        setFormData(res);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAdmins();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await updateAdmin(formData);
        toast.success("Admin updated successfully!");
      } else {
        await createAdmin(formData);
        toast.success("Admin created successfully!");
      }
      setFormData({ adminName: "", adminEmail: "" });
      setId();
      router.push("/admin/admins");
    } catch (error) {
      toast.error(error.message || "Failed to process the request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded w-full md:w-5/12">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {id ? "Update Admin" : "Create Admin"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="adminName" className="text-gray-700 text-sm mb-2">
            Admin Name
          </label>
          <input
            type="text"
            id="adminName"
            name="adminName"
            placeholder="Enter admin name"
            value={formData.adminName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="adminEmail" className="text-gray-700 text-sm mb-2">
            Admin Email
          </label>
          <input
            type="email"
            id="adminEmail"
            name="adminEmail"
            placeholder="Enter admin email"
            value={formData.adminEmail}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <CustomBtn type="submit" isLoading={isLoading}>
          {id ? "Update" : "Create"}
        </CustomBtn>
      </form>
    </div>
  );
};

export default CreateAdmin;
