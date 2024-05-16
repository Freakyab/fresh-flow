"use client";
import React, { useEffect, useState } from "react";

import { Skeleton } from "@nextui-org/react";

import useUserDetails from "@/redux/dispatch/useUserDetails";

import Title from "@/components/dashboard/profile/title";
import CustomerDetails from "@/components/dashboard/profile/customerDetails";
import { CustomerExpenseChart } from "@/components/dashboard/orders/customerChart";
import OrderCardDetail from "@/components/marketPlace/farmer/orderCardDetail";

import { LuWarehouse, LuGanttChartSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { GoListUnordered } from "react-icons/go";

import handleToast from "@/components/toastifyNotification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
  const [customerDetailData, setCustomerDetailData] =
    useState<customerDetailDataProps>({} as customerDetailDataProps);
  const [OrderData, setOrderData] = useState<transactionProps[]>([]);
  const { userDetails } = useUserDetails();
  const [isLoaded, setIsLoaded] = React.useState(false);
  useEffect(() => {
    fetch(
      // `http://localhost:5000/customer/getdatabyid/${userDetails.userDetails._id}`,
      `https://fresh-flow-backend.vercel.app/customer/getdatabyid/${userDetails.userDetails._id} `,

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
        console.log(data);
        if (data.isAvailable) {
          setCustomerDetailData(data.user);
        } else {
          handleToast("No data found", "error");
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
          typeOfId: "customerId",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setOrderData(data.allTransaction);
          toggleLoad();
        }
      });
  }, []);

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  return (
    <div className="gap-3 flex flex-col w-full h-full p-3 ">
      <div className="grid grid-cols-2 gap-3 h-[500px]">
        <div className="bg-white rounded-xl p-3 ">
          <Title title="Customer Detail" Icon={<LuWarehouse />} link="" />
          <Skeleton className="w-full h-full" isLoaded={isLoaded}>
            <div className="overflow-y-auto h-[440px]">
              <CustomerDetails
                customerDetailData={customerDetailData}
                className={"flex gap-3 p-3"}
              />
            </div>
          </Skeleton>
        </div>
        <div className="bg-white h-[500px] overflow-auto rounded-xl p-3">
          <Title
            title="Recent's Order"
            Icon={<GoListUnordered />}
            link={"/dashboard/customer/orders"}
          />
          <Skeleton className="w-full h-full" isLoaded={isLoaded}>
            <div className="flex gap-3 w-full p-3 flex-col overflow-y-auto">
              {OrderData.length !== 0 ? (
                OrderData.map((order, index) => (
                  <div key={index}>
                    <OrderCardDetail {...order} />
                  </div>
                ))
              ) : (
                <div>No order Found</div>
              )}
            </div>
          </Skeleton>
        </div>
      </div>
      <div className="flex gap-3 h-full">
        <div className="bg-white rounded-xl p-3 w-1/2 h-full">
          <Title
            title="Charts"
            Icon={<LuGanttChartSquare />}
            link={"/dashboard/customer/charts"}
          />
          <Skeleton className="w-full h-full" isLoaded={isLoaded}>

          <CustomerExpenseChart className="" />
          {/* <WarehouseExpenseChart className="" /> */}
          </Skeleton>
        </div>
        <div className="bg-white rounded-xl p-3 w-1/2 h-full">
          <Title title="Settings" Icon={<CiSettings />} link={""} />
          <Skeleton className="w-full h-full" isLoaded={isLoaded}>

          Click on See More to access the settings
          </Skeleton>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default page;
