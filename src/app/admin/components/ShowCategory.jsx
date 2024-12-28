"use client";
import React, { useState } from "react";
import { useCategories } from "@/utils/firebase/categories/read";
import EditIcon from "@/components/SvgIcons/EditIcon";
import TrashIcon from "@/components/SvgIcons/TrashIcon";
import CustomBtn from "@/components/CustomBtn";
import CustomBtn2 from "@/components/CustomBtn2";
import toast from "react-hot-toast";
import { deleteCategory } from "@/utils/firebase/categories/delete";
import { useRouter } from "next/navigation";
const ShowCategory = () => {
  const { data: categories, error, isLoading } = useCategories();
  // console.log(categories);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-400">Error Occured</div>;
  }
  return (
    <div className="w-full md:w-7/12 bg-white p-2 rounded">
      <div>Categories</div>
      <div className="mt-5">
        <table className="table-auto border-collapse w-full overflow-x-scroll">
          <tbody>
            <tr>
              <td className="p-1text-center border-b">Sr. No.</td>
              <td className="p-1 border-b">Name</td>
              <td className="p-1 border-b">slug</td>
              <td className="p-1 border-b text-center">Actions</td>
            </tr>
            {categories?.map((item, index) => (
              <CategoryRow item={item} index={index} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowCategory;

const CategoryRow = ({ item, index }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    try {
      // console.log('item',item.id);
      if (confirm("are you sure")) {
        const res = await deleteCategory({ id: `${item?.id}` });
        // console.log(res);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const handleUpdate = () => {
    router.push(`/admin/categories?id=${item?.id}`);
  };
  return (
    <>
      {
        <tr key={index}>
          <td className="p-1 text-center border-b">{index + 1}</td>
          <td className="p-1  border-b">{item?.categoryName}</td>
          <td className="p-1  border-b">{item?.categorySlug}</td>
          <td className="p-1  border-b ">
            <div className="w-full flex justify-evenly">
              <CustomBtn2 onClick={handleUpdate} className={`bg-slate-100 hover:bg-slate-200 p-2 rounded-md mx-1`}>
                
                <EditIcon className="text-green-500 cursor-pointer" />
              </CustomBtn2>
              <CustomBtn2 onClick={handleDelete} isLoading={isLoading} className={`bg-slate-100 hover:bg-slate-200 p-2 rounded-md mx-1`}>
                <TrashIcon className="text-red-500  cursor-pointer" />
              </CustomBtn2>
            </div>
          </td>
        </tr>
      }
    </>
  );
};
