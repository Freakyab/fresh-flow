"use client";
import React, { useState, useEffect } from "react";
import useUserDetails from "@/redux/dispatch/useUserDetails";

function Orders() {
  const [orderData, setOrderData] = useState<transactionProps[]>([]);
  const [typeOf, setTypeOf] = useState<string>("Customer");
  const { userDetails } = useUserDetails();
  useEffect(() => {
    fetch(
      // `http://localhost:5000/transaction/order-request/${userDetails.userDetails._id}`,
      `https://fresh-flow-backend.vercel.app/transaction/order-request/${userDetails.userDetails._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "/",
        },
        body: JSON.stringify({
          typeOfId: "farmerId",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setOrderData(data.allTransaction);
        }
      });
  }, []);

  return (
    <div>
     order
    </div>
  );
}

export default Orders;
