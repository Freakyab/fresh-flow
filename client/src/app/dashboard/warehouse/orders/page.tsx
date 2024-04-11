"use client";
import React, { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import OrderCardDetail from "@/components/marketPlace/farmer/orderCardDetail";
function Orders() {
  const [orders, setOrders] = useState<transactionProps[]>([]);
  const [status, setStatus] = useState<string>("Pending");
  useEffect(() => {
    fetch(
      "http://localhost:5000/transaction/order-request/6617cc79d31014dfd0a41db5",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ typeOfId : "warehouseId"}),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.allTransaction) {
          setOrders(data.allTransaction);
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full">
      <h1>Orders</h1>
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
      {orders
        .filter((order) => order.status === status.toLocaleLowerCase())
        .map((order, index) => (
          <div key={index}>
            <OrderCardDetail {...order} />
          </div>
        ))}
    </div>
  );
}

export default Orders;
