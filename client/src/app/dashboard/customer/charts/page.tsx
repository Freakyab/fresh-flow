import React from "react";

import { Card, Divider } from "@nextui-org/react";

import { CustomerExpenseChart } from "@/components/dashboard/orders/customerChart";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Charts() {
  return (
    <Card shadow="sm" className="w-full m-3">
      <div className="w-full flex-col gap-3 flex justify-center items-center">
        <CustomerExpenseChart className="w-fit h-fit p-3" />
        <Divider />
      </div>
      <ToastContainer />
    </Card>
  );
}

export default Charts;
