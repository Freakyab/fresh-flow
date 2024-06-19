"use client";
import React, { useState, useEffect } from "react";

import { Select, SelectItem } from "@nextui-org/react";

import useUserDetails from "@/redux/dispatch/useUserDetails";

import OrderCardDetail from "@/components/marketPlace/farmer/orderCardDetail";
import handleToast from "@/components/toastifyNotification";

function Orders() {
  const [orders, setOrders] = useState<transactionProps[]>([]);
  const [status, setStatus] = useState("Pending");
  const { userDetails } = useUserDetails();

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const fetchOrders = () => {
    fetch(
      // `http://localhost:5000/transaction/order-request/${userDetails.userDetails._id}`,
      `https://fresh-flow-backend.vercel.app/transaction/order-request/${userDetails.userDetails._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "/",
        },
        body: JSON.stringify({ typeOfId: "warehouseId" }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.allTransaction) {
          console.log(data.allTransaction);
          setOrders(data.allTransaction.reverse());
        } else {
          handleToast("No data found", "info");
        }
      })
      .catch((err) => {
        handleToast(err.message, "error");
      });
  };

  return (
    <div className="m-3 p-3 w-full bg-primary  flex-col items-center rounded-xl">
      <h1 className="text-2xl font-bold text-center text-white">Orders</h1>
      <div className="py-2 pb-8 w-full flex-row justify-evenly items-center">
        <Select
          label="Select status"
          placeholder={status}
          className="max-w-xs"
          onChange={(e) => setStatus(e.target.value)}>
          <SelectItem key="Pending" value="Pending">
            Pending
          </SelectItem>
          <SelectItem key="Accepted" value="Accepted">
            Accepted
          </SelectItem>
          <SelectItem key="Rejected" value="Rejected">
            Rejected
          </SelectItem>
        </Select>
      </div>
      {orders.filter((order) => order.status === status.toLocaleLowerCase()).length === 0 ? (
        <h1 className="text-center text-2xl text-white">
          No orders available
        </h1>
      ) : (
        orders
        .filter((order) => order.status === status.toLocaleLowerCase())
        .map((order, index) => (
          <div key={index} >
            {/* Check if order is empty */}
            <OrderCardDetail {...order} />
          </div>
        ))
    )}
  </div>
);
}
export default Orders;
