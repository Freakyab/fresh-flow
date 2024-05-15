import React from "react";

import { Card, Divider } from "@nextui-org/react";

import {
  FarmerExpenseChart,
  WarehouseInventoryPie,
} from "@/components/dashboard/orders/farmerChart";

function Charts() {
  return (
    <Card shadow="sm" className="w-full m-3">
      <div className="w-full flex-col gap-3 flex justify-center items-center">
        <FarmerExpenseChart className="w-fit h-fit p-3" />
        <Divider />
        <div className="w-full flex justify-center items-center ">
          <div className="w-[400px] h-full">
            <WarehouseInventoryPie className=" w-full mb-3" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Charts;