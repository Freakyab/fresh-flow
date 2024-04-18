"use client";
import React, { useEffect, useState } from "react";
import { GoListUnordered } from "react-icons/go";
import { LuWarehouse, LuGanttChartSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";

import Title from "@/components/dashboard/profile/title";
import OrderCardDetail from "@/components/marketPlace/farmer/orderCardDetail";
import WarehouseDetails from "@/components/dashboard/profile/warehouseDetails";
import { WarehouseExpenseChart } from "@/components/dashboard/orders/warehouseChart";

import useUserDetails from "@/redux/dispatch/useUserDetails";
function page() {
  const [warehouseDetailData, setWarehouseDetailData] =
    useState<warehouseDetailDataProps>({} as warehouseDetailDataProps);
  const [OrderData, setOrderData] = useState<transactionProps[]>([]);
  const { userDetails } = useUserDetails();
  useEffect(() => {
    fetch(
      // `http://localhost:5000/warehouse/getdatabyid/${userDetails.userDetails._id}`,
      `https://fresh-flow-backend.vercel.app/warehouse/getdatabyid/${userDetails.userDetails._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "/",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setWarehouseDetailData(data);
        }
      });
    fetch(
      // `http://localhost:5000/transaction/order-top-request/${userDetails.userDetails._id}`,
      `https://fresh-flow-backend.vercel.app/transaction/order-top-request/${userDetails.userDetails._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "/",
        },
        body: JSON.stringify({
          typeOfId: "warehouseId",
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
    <div className="gap-3 flex flex-col w-full h-full p-3 ">
      <div className="grid grid-cols-2 gap-3 h-[500px]">
        <div className="bg-white rounded-xl p-3 ">
          <Title title="Warehouse Detail" Icon={<LuWarehouse />} link="" />
          <div className="overflow-y-auto h-[440px]">
            <WarehouseDetails
              warehouseDetailData={warehouseDetailData}
              className={"flex gap-3 p-3"}
            />
          </div>
        </div>
        <div className="bg-white h-[500px] overflow-auto rounded-xl p-3">
          <Title
            title="Recent's Order"
            Icon={<GoListUnordered />}
            link={"/dashboard/warehouse/orders"}
          />
          <div className="flex gap-3 w-full p-3 flex-col overflow-y-auto">
            {OrderData.length !== 0 ?
            OrderData.map((order, index) => (
              <div key={index}>
                <OrderCardDetail {...order} />
              </div>
            )) : <div>No order Found</div>}
          </div>
        </div>
      </div>
      <div className="flex gap-3 h-full">
        <div className="bg-white rounded-xl p-3 w-1/2 h-full">
          <Title
            title="Charts"
            Icon={<LuGanttChartSquare />}
            link={"/dashboard/warehouse/charts"}
          />
          <WarehouseExpenseChart className="" />
        </div>
        <div className="bg-white rounded-xl p-3 w-1/2 h-full">
          <Title title="Settings" Icon={<CiSettings />} link={"/dashboard/warehouse/settings"} />
          Click on See More to access the settings
        </div>
      </div>
    </div>
  );
}

export default page;
