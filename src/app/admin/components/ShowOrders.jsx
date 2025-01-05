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
import { useAllOrders } from "@/utils/firebase/orders/read";
import Link from "next/link";

const ShowOrders = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [lastSnapDocList, setLastSnapDocList] = useState([]);

  useEffect(() => {
    setLastSnapDocList([]);
  }, [itemsPerPage]);

  const {
    data: orders,
    error,
    isLoading,
    lastSnapDoc,
  } = useAllOrders({
    pageLimit: itemsPerPage,
    lastSnapDoc:
      lastSnapDocList?.length == 0
        ? null
        : lastSnapDocList[lastSnapDocList?.length - 1],
  });
  // console.log("Orders:", orders);
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
      {/* <div>Products</div> */}
      <div className="mt-5 overflow-x-auto">
        <table className="table-auto border-collapse w-full text-sm">
          <thead>
            <tr>
              <th className="p-1 text-center border-b">Sr. No.</th>
              <th className="p-1 border-b">Customer</th>
              <th className="p-1 border-b">Payment mode</th>
              <th className="p-1 border-b">Total Price</th>
              <th className="p-1 border-b">Total Products</th>
              <th className="p-1 border-b">Status</th>
              <th className="p-1 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => (
              <OrderRow
                item={item}
                index={index + lastSnapDocList?.length * itemsPerPage}
                key={item.orderId}
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
          <option value={5}>5 items</option>
          <option value={10}>10 items</option>
          <option value={15}>15 items</option>
          <option value={20}>20 items</option>
          <option value={30}>30 items</option>
        </select>
        <CustomBtn3
          className={`bg-slate-100 hover:bg-slate-200 py-1 px-4 rounded-md`}
          onClick={handleNextPage}
          isLoading={!orders}
        >
          Next
        </CustomBtn3>
      </div>
    </div>
  );
};

export default ShowOrders;

const OrderRow = ({ item, index }) => {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <tr className="border-b">
      <td className="p-1 text-center">{index + 1}</td>
      <td className="p-1">{item?.uid}</td>
      <td className="p-1 text-center">
        <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
          {item?.metaData?.paymentMode}
        </span>
      </td>
      <td className="p-1 text-center">&#8377;{item?.metaData?.ProductsPrice}</td>
      <td className="p-1 text-center">{item?.productList.length}</td>
      <td className="p-1 text-center flex justify-center items-center">
        <span className="bg-green-200 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
          {item?.metaData?.ProductStatus}
        </span>
      </td>
      <td className="p-1 text-center">
        <Link
          href={`/admin/orders/${item?.orderId}`}
          className="px-2 rounded-md bg-black text-white"
        >
          View
        </Link>
      </td>
    </tr>
  );
};
