"use client";
import React, { useEffect, useState } from "react";
import { warehouseOrderType } from "../../../../components/dataSample/orderType";
import { Divider } from "@nextui-org/react";
import { WarehouseExpenseChart } from "@/components/dashboard/orders/warehouseChart";
// import warehouseDetailData from "../../../../components/dataSample/warehouseData";
import Title from "@/components/dashboard/profile/title";
import { GoListUnordered } from "react-icons/go";
import { LuWarehouse, LuGanttChartSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import OrderCardDetail from "@/components/marketPlace/farmer/orderCardDetail";
import WarehouseDetails from "@/components/dashboard/profile/warehouseDetails";
function page() {
  const [warehouseDetailData, setWarehouseDetailData] =
    useState<warehouseDetailDataProps>({} as warehouseDetailDataProps);
  useEffect(() => {
    fetch(
      `http://localhost:5000/warehouse/getdatabyid/661922f36238f64733cc5736`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setWarehouseDetailData(data);
        }
      });
  }, []);
  return (
    <div className="gap-3 flex flex-col w-full h-full p-3 ">
      <div className="flex gap-3 h-[500px]">
        <div className="bg-white rounded-xl p-3  ">
          <Title title="Warehouse Detail" Icon={<LuWarehouse />} link="" />
          <div className="overflow-y-auto w-full h-[440px]">
            <WarehouseDetails
              warehouseDetailData={warehouseDetailData}
              className={"flex gap-3 p-3"}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl grid col-span-2 p-3 ">
          <Title
            title="Recent's Order"
            Icon={<GoListUnordered />}
            link={"/dashboard/warehouse/orders"}
          />
          <div className="flex gap-3 p-3 flex-col overflow-y-auto">
            {/* {warehouseOrderType.map((order, index) => (
              <div key={index}>
                <OrderCardDetail {...order} />
                <Divider />
              </div>
            ))} */}
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
          <Title title="Settings" Icon={<CiSettings />} link={""} />
          Click on See More to access the settings
        </div>
      </div>
    </div>
  );
}

export default page;
