"use client";
import React, { useEffect, useState } from "react";

import { Skeleton } from "@nextui-org/react";
import useUserDetails from "@/redux/dispatch/useUserDetails";

import Title from "@/components/dashboard/profile/title";
import FarmerDetails from "@/components/dashboard/profile/farmerDetails";
import OrderCardDetail from "@/components/marketPlace/farmer/orderCardDetail";

import { LuWarehouse, LuGanttChartSquare } from "react-icons/lu";
import { GoListUnordered } from "react-icons/go";
import { CiSettings } from "react-icons/ci";


function page() {
  const [farmerDetailData, setFarmerDetailData] =
    useState<farmerDetailDataProps>({} as farmerDetailDataProps);
  const [OrderData, setOrderData] = useState<transactionProps[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { userDetails } = useUserDetails();

  useEffect(() => {
    fetch(
      // `http://localhost:5000/farmer/getdatabyid/${userDetails.userDetails._id}`,
      `https://fresh-flow-backend.vercel.app/farmer/getdatabyid/${userDetails.userDetails._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "/",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFarmerDetailData(data);
          toggleLoad();
        }
      });
    fetch(
      // `http://localhost:5000/transaction/order-top-request/${userDetails.userDetails._id}`,
      `https://fresh-flow-backend.vercel.app/transaction/order-top-request/${userDetails.userDetails._id}`,
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

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  return (
    <div className="gap-3 flex flex-col w-full h-full p-3 ">
      <Skeleton isLoaded={isLoaded}>
      <div className="grid grid-cols-2 gap-3 h-[500px]">
        <div className="bg-white grid rounded-xl p-3 ">
          <Title title="Farmer's Detail" Icon={<LuWarehouse />} link={""} />
          <div className="overflow-y-auto h-[440px]">
            <FarmerDetails
              farmerDetailData={farmerDetailData}
              className={"flex gap-3 p-3"}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 ">
          <Title title="Settings" Icon={<GoListUnordered />} link={""} />
          <div className="flex gap-3 p-3 flex-col lg:flex-row"></div>
        </div>
      </div>
      <div className="flex gap-3 h-full">
        <div className="bg-white rounded-xl p-3 w-1/2 h-[500px] overflow-auto">
          <Title
            title="Recent Order's (Customer)"
            Icon={<LuGanttChartSquare />}
            link={""}
          />
          <div className="p-3">
            {OrderData?.length !== 0 ? (
              OrderData.filter((order) => order.customerId != undefined).map(
                (order, index) => (
                  <div key={index}>
                    <OrderCardDetail {...order} />
                  </div>
                )
              )
            ) : (
              <div>No order Found</div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 w-1/2 h-[500px] overflow-auto">
          <Title
            title="Recent Order's (Warehouse)"
            Icon={<CiSettings />}
            link={""}
          />
          <div className="p-3">
            {OrderData?.length !== 0 ? (
              OrderData.filter((order) => order.customerName == undefined).map(
                (order, index) => (
                  <div key={index}>
                    <OrderCardDetail {...order} />
                  </div>
                )
              )
            ) : (
              <div>No order Found</div>
            )}
          </div>
        </div>
      </div>
    </Skeleton>
    </div>
  );
}

export default page;
