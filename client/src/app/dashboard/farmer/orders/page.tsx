"use client";
import React, { useState, useEffect } from "react";

import { Select, SelectItem } from "@nextui-org/react";

import useUserDetails from "@/redux/dispatch/useUserDetails";

import OrderCardDetail from "@/components/marketPlace/farmer/orderCardDetail";

function Orders() {
  const [OrderData, setOrderData] = useState<transactionProps[]>([]);
  const [typeOf, setTypeOf] = useState<string>("Customer");
  const [status, setStatus] = useState("Pending");
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
          setOrderData(data.allTransaction.reverse());
        }
      });
  }, []);

  return (
    <div className="p-3 w-full">
      <div className="w-full flex rounded-xl p-3 gap-3 justify-evenly bg-white items-center">
        <p
          className="bg-light-bg p-3 text-center rounded-xl w-1/2 cursor-pointer"
          onClick={() => setTypeOf("Customer")}>
          Customer Order
        </p>
        <p
          className="bg-light-bg p-3 text-center rounded-xl w-1/2 cursor-pointer"
          onClick={() => setTypeOf("Warehouse")}>
          Warehouse Inventory
        </p>
      </div>
      <div className="bg-white my-3 rounded-xl p-3">
        {OrderData.length !== 0 && typeOf === "Customer" ? (
          OrderData.filter((order) => order.customerId != undefined).length !=
          0 ? (
            OrderData.filter((order) => order.customerId != undefined).map(
              (order, index) => (
                <div key={index}>
                  <OrderCardDetail {...order} />
                </div>
              )
            )
          ) : (
            <div>No order Found</div>
          )
        ) : (
          <div>
            <div className="py-2 w-full flex justify-center items-center">
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
            {OrderData.filter((order) => order.customerName == undefined)
              .length !== 0 ? (
              OrderData.filter((order) => order.customerName == undefined)
                .filter((order) => order.status === status.toLocaleLowerCase())
                .map((order, index) => (
                  <div key={index}>
                    <OrderCardDetail {...order} />
                  </div>
                ))
            ) : (
              <div>No order Found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
