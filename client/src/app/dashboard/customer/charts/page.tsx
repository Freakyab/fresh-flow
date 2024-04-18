import { CustomerExpenseChart } from "@/components/dashboard/orders/customerChart";
import React from "react";
import { Card, Divider } from "@nextui-org/react";

function Charts() {
  return (
    <Card shadow="sm" className="w-full m-3">
      <div className="w-full flex-col gap-3 flex justify-center items-center">
        <CustomerExpenseChart className="w-fit h-fit p-3" />
        <Divider />
      </div>
    </Card>
  );
}

export default Charts;
