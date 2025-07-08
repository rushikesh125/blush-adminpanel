"use client";
import React, { useEffect, useState } from "react";
import TrashIcon from "@/components/SvgIcons/TrashIcon";
import CustomBtn3 from "@/components/CustomBtn3";
import toast from "react-hot-toast";
import { useAllReviews } from "@/utils/firebase/reviews/read";
import Avatar from "@/components/Avatar";
import { Rating } from "@mui/material";
import { deleteReview } from "@/utils/firebase/reviews/delete";
import { useProduct } from "@/utils/firebase/products/read";
import Link from "next/link";
import { Domain } from "@/utils/utils";

const ShowReviews = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [lastSnapDocList, setLastSnapDocList] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setLastSnapDocList([]); // Reset pagination stack when itemsPerPage changes
  }, [itemsPerPage]);

  const {
    data: reviews,
    error,
    isLoading,
    lastSnapDoc,
  } = useAllReviews({
    pageLimit: itemsPerPage,
    lastSnapDoc:
      lastSnapDocList.length === 0
        ? null
        : lastSnapDocList[lastSnapDocList.length - 1],
  });

  const handleNextPage = () => {
    if (lastSnapDoc) {
      setLastSnapDocList((prev) => [...prev, lastSnapDoc]);
    }
  };

  const handlePrePage = () => {
    setLastSnapDocList((prev) => prev.slice(0, -1));
  };

  const handleDeleteReview = async ({ uid, productId }) => {
    setIsLoad(true);
    try {
      if (confirm("Delete Review?")) {
        await deleteReview({ uid, productId });
        toast.success("Review Deleted");
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoad(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-400">Error Occurred</div>;
  }

  return (
    <div className="w-full bg-white p-5 rounded-md">
      <div className="mt-5 overflow-x-auto">
        {reviews &&
          reviews.map((item, index) => (
            <div
              key={index}
              className="relative flex my-6 gap-2 md:gap-4 border-b py-4 mx-1 md:mx-10"
            >
              <CustomBtn3
                className="absolute top-0 right-0 bg-red-100 text-red-500 p-1 rounded-full"
                onClick={() =>
                  handleDeleteReview({
                    uid: item?.uid,
                    productId: item?.productId,
                  })
                }
                isLoading={isLoad}
              >
                <TrashIcon />
              </CustomBtn3>
              <div className="px-1 md:px-2 flex items-center justify-center">
                {index + 1 + lastSnapDocList.length * itemsPerPage}
              </div>
              
              <Avatar url={item?.photoURL || "../images/user-profile.jpg"} />
              <div className="flex-1">
              <ReviewedProduct productId={item?.productId} />
                <div className="">
                  <h4>{item?.displayName}</h4>
                  <Rating value={item?.rating} readOnly size="small" />
                </div>
                <div className=" text-slate-700">
                  
                  <p className="font-semibold">{item?.review}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between my-4">
        <CustomBtn3
          className="bg-slate-100 hover:bg-slate-200 py-1 px-4 rounded-md"
          onClick={handlePrePage}
          isLoading={lastSnapDocList.length === 0}
          disabled={lastSnapDocList.length === 0}
        >
          Prev
        </CustomBtn3>
        <select
          className="bg-slate-100 rounded-md outline-none p-2"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
        >
          <option value={5}>5 items</option>
          <option value={10}>10 items</option>
          <option value={15}>15 items</option>
          <option value={20}>20 items</option>
          <option value={30}>30 items</option>
        </select>
        <CustomBtn3
          className="bg-slate-100 hover:bg-slate-200 py-1 px-4 rounded-md"
          onClick={handleNextPage}
          isLoading={!reviews || reviews.length < itemsPerPage}
          disabled={!reviews || reviews.length < itemsPerPage}
        >
          Next
        </CustomBtn3>
      </div>
    </div>
  );
};

export default ShowReviews;

const ReviewedProduct = ({ productId }) => {
  const { data: product } = useProduct({ productId: productId });

  return (
    <>
      <div className="text-xs bg-slate-100 inline-block px-1 rounded-md">
        <Link href={`${Domain}/product/${productId}`}>
        {product?.productname}</Link>
      </div>
    </>
  );
};
