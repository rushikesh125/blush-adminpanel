// import React from 'react'

// const CreateProduct = () => {
//   return (
//     <div>CreateProduct</div>
//   )
// }

// export default CreateProduct
"use client";
import React, { useState, useRef, useEffect } from "react";
import { db } from "@/utils/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import TrashIcon from "@/components/SvgIcons/TrashIcon";
import CustomBtn2 from "@/components/CustomBtn2";
import { createProducts } from "@/utils/firebase/products/write";
import { useCategories } from "@/utils/firebase/categories/read";

const ProductForm = () => {
  const [isLoading,setIsLoading] = useState(false)
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([{ color: "", url: "" }]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);

  const categoryDropdownRef = useRef(null);
  const sizeDropdownRef = useRef(null);
  const { data: categoriesFromDB, error } = useCategories();
  console.log(categoriesFromDB);
  // Define categories and sizes arrays
  const categories = categoriesFromDB?.map((item)=>item.categoryName)
  const availableSizes = ["S", "M", "L", "XL"];
 const resetFormInputs = () => {
    setProductName("");
    setDescription("");
    setCategory([]);
    setStock(0);
    setPrice(0);
    setSizes([]);
    setColors([{ color: "", url: "" }]);
  };
  const handleAddColor = () => {
    setColors([...colors, { color: "", url: "" }]);
  };

  const handleRemoveColor = (index) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  const handleColorChange = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
     const res =  await createProducts(productName,description,category,stock,price,sizes,colors)
     if(!res?.success){
        console.log("Error while createing Product")
     }
    //  resetFormInputs();
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Error adding product");
    }finally{
      setIsLoading(false)
    }
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleSizeDropdown = () => {
    setIsSizeDropdownOpen(!isSizeDropdownOpen);
  };

  const handleCategorySelect = (value) => {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };
 
  
  const handleSizeSelect = (value) => {
    setSizes((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
      if (sizeDropdownRef.current && !sizeDropdownRef.current.contains(event.target)) {
        setIsSizeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product Name"
              className="w-full p-3 border outline-none border-gray-300 rounded-lg "
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-sm font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              required
            />
          </div>
          <div className="mb-4 relative" ref={sizeDropdownRef}>
            <label className=" text-sm font-semibold w-full flex justify-between">
                <div>Sizes</div>
                <div className="text-sm font-extralight">select one or more</div>
            </label>
            <div
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              onClick={toggleSizeDropdown}
            >
              {sizes.length > 0 ? sizes.join(", ") : "Select Sizes"}
            </div>
            {isSizeDropdownOpen && (
              <div className="absolute overflow-hidden z-10 w-full bg-white border border-gray-300 rounded-lg mt-1">
                {availableSizes.map((item) => (
                  <div
                    key={item}
                    className={`p-2 hover:bg-gray-400 cursor-pointer ${
                      sizes.includes(item) ? "bg-black text-white" : ""
                    }`}
                    onClick={() => handleSizeSelect(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4 relative" ref={categoryDropdownRef}>
            <label className="flex justify-between text-sm font-semibold">
            <div>Category</div>
            <div className="text-sm font-extralight">select one or more</div>
            </label>
            <div
              className="w-full p-3 border border-gray-300 rounded-lg "
              onClick={toggleCategoryDropdown}
            >
              {category.length > 0 ? category.join(", ") : "Select Categories"}
            </div>
            {isCategoryDropdownOpen && (
              <div className="absolute z-10 overflow-hidden w-full bg-white border border-gray-300 rounded-lg mt-1">
                {categories.map((item) => (
                  <div
                    key={item}
                    className={`p-2 hover:bg-gray-400 cursor-pointer ${
                      category.includes(item) ? "bg-black text-white" : ""
                    }`}
                    onClick={() => handleCategorySelect(item)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Math.max(0, Number(e.target.value)))}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              min="0"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              min="0"
              required
            />
          </div>
        </div>
        <div>
          <div className="mb-4">
            <div className="flex ">
              {colors[0].url && colors.map((item,index)=>(item.url ? <img key={index} src={`${item?.url || null}`} className="w-16" alt="img" />:""))}
            </div>
            <label className="block  font-semibold">Colors and Images</label>
            {colors.map((color, index) => (
              <div key={index} className="flex space-x-2 mb-2 items-center">
                <input
                  type="text"
                  placeholder="Color of Product"
                  value={color.color}
                  onChange={(e) => handleColorChange(index, "color", e.target.value)}
                  className="w-1/2 p-3 border border-gray-300 rounded-lg outline-none"
                  required
                />
                <input
                  type="url"
                  placeholder="Image URL for Product"
                  value={color.url}
                  onChange={(e) => handleColorChange(index, "url", e.target.value)}
                  className="w-1/2 p-3 border border-gray-300 rounded-lg outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveColor(index)}
                  className="p-3  bg-red-100 text-red-500 rounded-full hover:bg-red-200"
                >
                  <TrashIcon/>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddColor}
              className="mt-2 p-2 bg-transparent text-black border-black border  rounded-lg hover:bg-black hover:text-white"
            >
              Add More Colors
            </button>
          </div>
        </div>
      </div>
      <CustomBtn2 type="submit" isLoading={isLoading} className="w-full p-3 bg-black text-white rounded-lg ">
        Submit
      </CustomBtn2>
    </form>
  );
};

export default ProductForm;
