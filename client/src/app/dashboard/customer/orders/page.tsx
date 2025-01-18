"use client";
import React, { useState, useEffect } from "react";

import { Skeleton } from "@nextui-org/react";

import useUserDetails from "@/redux/dispatch/useUserDetails";
import OrderCardDetail from "@/components/marketPlace/farmer/orderCardDetail";

import { ToastContainer } from "react-toastify";
import handleToast from "@/components/toastifyNotification";
import "react-toastify/dist/ReactToastify.css";

function Orders() {
  const [orders, setOrders] = useState<transactionProps[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { userDetails } = useUserDetails();

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `https://fresh-flow-backend.vercel.app/transaction/order-request/${userDetails.userDetails._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "/",
          },
          body: JSON.stringify({ typeOfId: "customerId" }),
        }
      );
      const responseJson = await response.json();
      if (
        responseJson.isRequestFound &&
        responseJson.allTransaction.length > 0
      ) {
        setOrders(responseJson.allTransaction.reverse());
        toggleLoad();
      } else {
        handleToast({
          message: "No data found",
          type: "info",
        });
      }
    } catch (err: any) {
      handleToast({
        message: err.message,
        type: "error",
      });
    }
  };

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  return (
    <Skeleton className="w-full h-full" isLoaded={isLoaded}>
      <div className="m-3 bg-primary p-3 w-full text-white flex justify-center flex-col items-center rounded-3xl">
        <h1 className="text-2xl font-bold text-center">Orders</h1>
        {orders.length === 0 ? (
          <h1 className="text-center text-2xl">No orders available</h1>
        ) : (
          orders.reverse().map((order, index) => (
            <div key={index} className="w-[90%] rounded-3xl">
              {/* Check if order is empty */}
              <OrderCardDetail {...order} />
            </div>
          ))
        )}
        <ToastContainer />
      </div>
    </Skeleton>
  );
}
export default Orders;
