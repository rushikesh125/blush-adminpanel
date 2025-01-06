"use client";
import React, { useEffect, useState } from "react";
import EditIcon from "@/components/SvgIcons/EditIcon";
import TrashIcon from "@/components/SvgIcons/TrashIcon";
import CustomBtn2 from "@/components/CustomBtn2";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProducts } from "@/utils/firebase/products/read"; // Adjust the import path as necessary
import { deleteProduct } from "@/utils/firebase/products/delete";
import CustomBtn3 from "@/components/CustomBtn3";
import { useUsers } from "@/utils/firebase/user/read";

const ShowCustomers = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [lastSnapDocList, setLastSnapDocList] = useState([]);

  useEffect(()=>{
    setLastSnapDocList([]);
  },[itemsPerPage])

  const {
    data: users,
    error,
    isLoading,
    lastSnapDoc,
  } = useUsers({
    pageLimit: itemsPerPage,
    lastSnapDoc:
      lastSnapDocList?.length == 0
        ? null
        : lastSnapDocList[lastSnapDocList?.length - 1],
  });
//   console.log('Customers:',users);

  const handleNextPage = () => {
    let newStack = [...lastSnapDocList];
    newStack.push(lastSnapDoc);
    setLastSnapDocList(newStack);
  };
  const handlePrePage = () => {
    let newStack = [...lastSnapDocList];
    newStack.pop();
    setLastSnapDocList(newStack);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-400">Error Occurred</div>;
  }

  return (
    <div className="w-full bg-white p-2 rounded-md">
      {/* <div>users</div> */}
      <div className="mt-5 overflow-x-auto">
        <table className="table-auto border-collapse w-full text-sm">
          <thead>
            <tr>
              <th className="p-1 text-center border-b">Sr. No.</th>
              <th className="p-1 border-b">Name</th>
              <th className="p-1 border-b">Email</th>
              <th className="p-1 border-b">id</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item, index) => (
              <CustomerRow
                item={item}
                index={index + lastSnapDocList?.length * itemsPerPage}
                key={index}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* paginnation seaction */}
      <div className="flex justify-between my-4">
        <CustomBtn3
          className={`bg-slate-100 hover:bg-slate-200 py-1 px-4 rounded-md`}
          onClick={handlePrePage}
          isLoading={lastSnapDocList?.length == 0}
        >
          Prev
        </CustomBtn3>
        <select
          className="bg-slate-100 rounded-md outline-none p-2"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
          id="itemsPerPage"
          name="itemsPerPage"
        >
          <option value={5}>5 users</option>
          <option value={10}>10 users</option>
          <option value={15}>15 users</option>
          <option value={20}>20 users</option>
          <option value={30}>30 users</option>
        </select>
        <CustomBtn3
          className={`bg-slate-100 hover:bg-slate-200 py-1 px-4 rounded-md`}
          onClick={handleNextPage}
          isLoading={!users}
        >
          Next
        </CustomBtn3>
      </div>
    </div>
  );
};

export default ShowCustomers;

const CustomerRow = ({ item, index }) => {


  return (
    <tr className="border-b">
      <td className="p-1 text-center">{index + 1}</td>

      <td className="p-1">{item?.displayName}</td>
      <td className="p-1">{item?.email}</td>
      <td className="p-1 text-xs">{item?.uid}</td>
    </tr>
  );
};
