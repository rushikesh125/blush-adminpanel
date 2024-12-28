"use client";

import React, { useEffect, useState } from "react";
import CustomBtn from "@/components/CustomBtn";
import { createNewCategory } from "@/utils/firebase/categories/write";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategory } from "@/utils/firebase/categories/read_server";
import { updateCategory } from "@/utils/firebase/categories/update";

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
    categorySlug: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null); // Separate state for `id`
  const searchParams = useSearchParams();
  const router = useRouter();

  // Sync `id` from searchParams using useEffect
  useEffect(() => {
    const idFromParams = searchParams.get("id");
    if (idFromParams) {
      setId(idFromParams);
    }
  }, [searchParams]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fetch category data if `id` exists
  const fetchCategories = async () => {
    try {
      const res = await getCategory({ id });
      if (!res) {
        toast.error("Failed to Fetch Categories Data");
      } else {
        setFormData(res);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCategories();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await updateCategory(formData);
        toast.success("Category updated successfully!");
      } else {
        await createNewCategory(formData);
        toast.success("Category created successfully!");
      }
      setFormData({ categoryName: "", categorySlug: "" });
      setId()
      router.push("/admin/categories");
    } catch (error) {
      toast.error(error.message || "Failed to process the request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded w-full md:w-5/12">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {id ? "Update Category" : "Create Category"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="categoryName" className="text-gray-700 text-sm mb-2">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            placeholder="Enter category name"
            value={formData.categoryName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="categorySlug" className="text-gray-700 text-sm mb-2">
            Category Slug
          </label>
          <input
            type="text"
            id="categorySlug"
            name="categorySlug"
            placeholder="Enter category slug"
            value={formData.categorySlug}
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

export default CreateCategory;
