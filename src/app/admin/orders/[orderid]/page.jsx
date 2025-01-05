"use client";
import Loading from "@/app/loading";
import { useOrder } from "@/utils/firebase/orders/read";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import OrderStatus from "../../components/OrderStatus";

const Order = () => {
  const { orderid } = useParams();
  const { data: order, error, isLoading } = useOrder({ id: orderid });
  // console.log('OrderID',orderid);
//   console.log("order Product", order);
  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  return (
    <>
      <div className="w-full px-4 my-4 bg-white p-2 rounded-md">
        <h3 className="text-center  text-2xl font-semibold">
          Order Details
        </h3>
        <h3 className="text-center">{order.orderId}</h3>
        <div className="w-full flex items-center justify-end gap-2">
            <OrderStatus order={order}/>
        </div>
        <div className="w-full border-y my-3 py-2">
          <div className="text-xs py-1 text-slate-500">
            {order?.createdAt.toDate().toLocaleString()}
          </div>
          <div className="flex items-center justify-start">
            <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">
              {order.metaData?.paymentMode}
            </span>
            {order.metaData.isPaid ? (
              <span className="bg-green-200 text-green-700 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">
                Paid
              </span>
            ) : (
              <span className="bg-yellow-200 text-yellow-700 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">
                Not Paid
              </span>
            )}
            <span className="bg-green-200 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
              {order?.metaData?.ProductStatus}
            </span>
          </div>
          <div className="mx-5 my-2 font-semibold text-xl">
            &#8377;{order.metaData?.ProductsPrice} /-
          </div>

          <div>
            {order.productList.map((pro) => (
              <div key={pro.id} className="my-4 flex orders-center">
                <div className="w-3/12 md:w-2/12 flex items-center justify-center">
                  <img
                    src={`${pro.color[0].url}`}
                    alt="product-img"
                    className="w-28"
                  />
                </div>
                <div className="w-9/12 md:w-10/12">
                  <div className="text-lg hover:underline">
                    {pro.product.productname}
                  </div>
                  <div className="text-sm">
                    color :
                    <span className="bg-black text-white px-2 rounded-full">
                      {pro.color[0].color}
                    </span>
                  </div>
                  <div className="text-sm">
                    size :
                    <span className="bg-accent-color text-white px-2 rounded-full">
                      {pro.size}
                    </span>
                  </div>
                  <div className="text-sm">
                    &#8377;{pro.product.price} x{pro.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-2 rounded-md">
        <h2>Address</h2>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left ">
            <tbody>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  Full Name
                </th>
                <td className="px-1 py-2">{order.address?.fullName}</td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  Email
                </th>
                <td className="px-1 py-2">{order.address?.email}</td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  Phone no.
                </th>
                <td className="px-1 py-2">{order.address?.phone}</td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  Line Address
                </th>
                <td className="px-1 py-2">{order.address?.address}</td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  City
                </th>
                <td className="px-1 py-2">{order.address?.city}</td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  State
                </th>
                <td className="px-1 py-2">{order.address?.state}</td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  Zip
                </th>
                <td className="px-1 py-2">{order.address?.zip}</td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  Order Note
                </th>
                <td className="px-1 py-2">{order.address?.orderNote}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Order;
