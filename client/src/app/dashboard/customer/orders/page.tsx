"use client";
import React, { useState, useEffect } from "react";

import useUserDetails from "@/redux/dispatch/useUserDetails";
import OrderCardDetail from "@/components/marketPlace/farmer/orderCardDetail";

import { ToastContainer } from "react-toastify";
import handleToast from "@/components/toastifyNotification";
import "react-toastify/dist/ReactToastify.css";


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
        body: JSON.stringify({ typeOfId: "customerId" }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.allTransaction) {
          setOrders(data.allTransaction);
        } else {
          handleToast("No data found", "info");
        }
      })
      .catch((err) => {
        handleToast(err.message, "error");
      });
  };

  return (
    <div className="m-3 p-3 w-full bg-white flex justify-center flex-col items-center rounded-xl">
      <h1 className="text-2xl font-bold text-center text-primary">Orders</h1>
      {orders.length === 0 ? (
        <h1 className="text-center text-2xl text-primary">
          No orders available
        </h1>
      ) : (
        orders
        .map((order, index) => (
          <div key={index}>
            {/* Check if order is empty */}
            <OrderCardDetail {...order} />
          </div>
        ))
    )}
    <ToastContainer />
  </div>
);
}
export default Orders;
