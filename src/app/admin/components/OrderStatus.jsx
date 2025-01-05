"use client";
import { updateOrderStatus } from "@/utils/firebase/orders/write";
import React from "react";
import toast from "react-hot-toast";

const OrderStatus = ({ order }) => {
  const handleChangeOrderStatus = async (status) => {
    try {
      if (!status) {
        toast.error("Please Select Order status");
        return;
      }
      await toast.promise(
        updateOrderStatus({
          id: order?.orderId,
          status: status,
          metaData: order?.metaData,
        }),
        {
          error: (e) => e?.message,
          loading: "Updating...",
          success: "Order Status Updated",
        }
      );
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <>
      <div>
        <select
          value={order?.metaData?.ProductStatus}
          name="change-order-status"
          onChange={(e) => handleChangeOrderStatus(e.target.value)}
          id="chnage-order-status"
          className="px-4 py-2 rounded-md bg-slate-50 shadow-md outline-none"
        >
          <option value="">Change Order Status</option>
          <option value="order placed">Order Placed</option>
          <option value="packed">Packed</option>
          <option value="out for delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </>
  );
};

export default OrderStatus;
