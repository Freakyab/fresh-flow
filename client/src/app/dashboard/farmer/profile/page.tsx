"use client";

import React from "react";
import ProfileField from "./../../../../components/profileField.component";
import { OrderField } from "./../../../../components/profileField.component";
import Image from "next/image";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CgProfile } from "react-icons/cg";
import { Pie } from "react-chartjs-2";

const Profile = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const profileData = {
    name: "John Doe",
    email: "farmer787@example.com",
    phone: "1234567890",
    address: "123, 4th Street, 5th Avenue, New York",
    username: "johndoe", // username
  };

  const orderData = [
    {
      name: "Warehouse2",
      type: "Wheat",
      quantity: 10,
      status: "Requested",
      duration: 10,
    },
    {
      name: "Warehouse2",
      type: "Wheat",
      quantity: 10,
      status: "Rejected",
      duration: 10,
    },
    {
      name: "Warehouse2",
      type: "Wheat",
      quantity: 10,
      status: "Approved",
      duration: 10,
    },
  ];

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row gap-1">
      <div className="lg:w-1/2 p-2 ml-4 mt-4 flex gap-5 h-full flex-col">
        <div className="w-full h-72 p-2 bg-white border shadow-xl rounded-lg">
          <h1 className="text-2xl font-mono font-semibold p-4 w-full">Profile</h1>
          <Image
            src="/hero.jpg"
            alt="profile"
            width={600}
            height={600}
            className="rounded-[1rem] bg-black h-32 brightness-90 z-0 object-cover grayscale-0 bg-center top-0"
          />
          <div className="shadow-lg flex relative w-3/4 mt-[-40px] ml-[15%] z-10 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100">
            <span className="p-2">
              <img
                src="https://lh3.googleusercontent.com/-935HM2R1INU/AAAAAAAAAAI/AAAAAAAAAAA/AFNEGgIfLim9kZl0b-32K9B0EORXkAmFEQ/photo.jpg?sz=46"
                alt="profile"
                width={50}
                height={50}
                className="rounded-md"
              />
            </span>
            <span className="px-4  py-2">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p>/farmer</p>
            </span>
          </div>
        </div>
        <div className="p-2 bg-white border shadow-xl rounded-lg flex-col">
          <p className="text-2xl font-mono font-semibold border-b p-4">
            Available Quantity
          </p>
          <span className="w-full h-[400px] my-2 flex justify-center items-center">
              <Pie data={data} />
          </span>
        </div>
      </div>
      <div className="lg:w-1/2 flex flex-col gap-5">
        <div className=" px-2 mt-4 bg-white border shadow-xl rounded-lg">
          <h1 className="text-2xl font-mono font-semibold border-b p-4 w-full">
            Order History
          </h1>
          <div className="flex flex-col gap-4">
            {orderData.map((order, index) => (
              <OrderField key={index} {...order} />
            ))}
          </div>
        </div>
        <div className="px-2 rounded-lg h-[400px] overflow-y-auto bg-white border shadow-xl">
          <h2 className="font-mono text-xl p-4 font-semibold border-b w-full">
            Personal Information
          </h2>
          <div className="flex p-2 flex-col">
            {Object.entries(profileData).map(([key, value]) => (
              <ProfileField
                key={key}
                icon={<CgProfile size={25} />}
                label={key}
                value={value}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
