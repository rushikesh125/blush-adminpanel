import Link from "next/link";
import React from "react";
import ShowProducts from "../components/ShowProducts";

const ProductsPage = () => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between bg-white p-2 rounded-md">
          <div>Products</div>
          <Link
            href={"/admin/products/form"}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Create +
          </Link>
        </div>
        <div className="relative max-w-full mt-4 bg-white rounded-md overflow-x-hidden">
          <ShowProducts/>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
