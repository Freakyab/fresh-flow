"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FarmerDetails from "@/components/dashboard/profile/farmerDetails";

const Map = dynamic(
  () => import("@/components/marketPlace/location/individualLocationFinder"),
  { ssr: false }
);

function Page() {
  const [farmerDetailData, setFarmerDetailData] =
    useState<farmerDetailDataProps | null>({} as farmerDetailDataProps | null);
  const pathname = usePathname().split("/farmer/")[1];

  useEffect(() => {
    if (pathname) {
      // fetch(`http://localhost:5000/farmer/getdatabyid/${pathname}`, {
      fetch(
        `https://fresh-flow-backend.vercel.app/farmer/getdatabyid/${pathname}`,
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
            console.log(data);
            setFarmerDetailData(data);
          }
        });
    }
  }, [pathname]);
  
  return (
    <>
      {farmerDetailData?.location != null ? (
        <div className="flex flex-col md:flex-row items-stretch d-hight w-[99%] m-2 overflow-hidden border-2 border-black rounded-lg shadow-lg">
          <div className="w-full md:w-1/2 bg-gray-100 p-6 flex flex-col overflow-x-auto">
            <FarmerDetails farmerDetailData={farmerDetailData} className="" />
          </div>
          <div className="w-full md:w-1/2 bg-gray-300 p-6">
            {farmerDetailData != undefined ? (
              <Map
                className="w-full h-64 md:h-full"
                name={farmerDetailData.farmerName}
                location={farmerDetailData.location}
              />
            ) : (
              <div className=" text-lg font-bold">Loading map...</div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-red-500 text-lg font-bold">Farmer not found</div>
      )}
      <ToastContainer />
    </>
  );
}

export default Page;
