"use client";

import React, { useState } from "react";
import Image from "next/image";

import { CgProfile } from "react-icons/cg";

const Profile = () => {
  const profileData = {
    name: "John Doe",
    email: "farmer787@example.com",
    phone: "1234567890",
    address: "123, 4th Street, 5th Avenue, New York",
    username: "johndoe",
  };

  return (
    <div className="bg-gray-100 h-full flex gap-2">
      <div className="gap-1 w-1/2 ">
        <div className="m-4 w-full h-72  p-2 bg-white border shadow-xl rounded-lg">
          <h1 className="text-2xl font-mono font-semibold p-4 w-full">
            Profile
          </h1>
          <Image
            src="/hero.jpg"
            alt="profile"
            width={600}
            height={600}
            className="rounded-[1rem] inset-0 bg-black brightness-90 z-0 h-36 object-cover grayscale-0  bg-center top-0"
          />

          <div className="shadow-lg flex relative w-3/4 mt-[-40px] ml-[15%] z-10 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100">
            <span className="p-2">
              <img
                src={
                  "https://lh3.googleusercontent.com/-935HM2R1INU/AAAAAAAAAAI/AAAAAAAAAAA/AFNEGgIfLim9kZl0b-32K9B0EORXkAmFEQ/photo.jpg?sz=46"
                }
                alt="profile"
                width={50}
                height={50}
                className="rounded-md"
              />
            </span>
            <span className="px-4 py-2">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p>/farmer</p>
            </span>
          </div>
        </div>

        <div className=" w-full p-2 m-4 rounded-lg h-96 bg-white border shadow-xl">
          <h2 className="font-mono text-xl p-4 font-semibold border-b w-full">
            Personal Information
          </h2>
          <div className="flex p-2 flex-col">
            <div className="flex p-2">
              <span className="px-2 justify-start mt-2">
                <CgProfile size={25} />
              </span>

              <span className="flex flex-col">
                <span className="text-xl font-semibold capitalize">Name</span>
                <span className="text-xs text-blue-700">
                  {profileData.name}
                </span>
              </span>
            </div>
            <div className="flex p-2">
              <span className="px-2 justify-start mt-2">
                <CgProfile size={25} />
              </span>

              <span className="flex flex-col">
                <span className="text-xl font-semibold capitalize">email</span>
                <span className="text-xs text-blue-700">
                  {profileData.email}
                </span>
              </span>
            </div>
            <div className="flex p-2">
              <span className="px-2 justify-start mt-2">
                <CgProfile size={25} />
              </span>

              <span className="flex flex-col">
                <span className="text-xl font-semibold capitalize">
                  username
                </span>
                <span className="text-xs text-blue-700">
                  {profileData.username}
                </span>
              </span>
            </div>
            <div className="flex p-2">
              <span className="px-2 justify-start mt-2">
                <CgProfile size={25} />
              </span>

              <span className="flex flex-col">
                <span className="text-xl font-semibold capitalize">phone</span>
                <span className="text-xs text-blue-700">
                  {profileData.phone}
                </span>
              </span>
            </div>
            <div className="flex p-2">
              <span className="px-2 justify-start mt-2">
                <CgProfile size={25} />
              </span>

              <span className="flex flex-col">
                <span className="text-xl font-semibold capitalize">
                  address
                </span>
                <span className="text-xs text-blue-700">
                  {profileData.address}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-1 w-1/2 ">
        <div className="m-4 w-[90%] h-full  p-2 bg-white border shadow-xl rounded-lg">
          <h1 className="text-2xl font-mono font-semibold border-b p-4 w-full">
            Order History
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 justify-center shadow-xl rounded-lg">
              <div className="flex m-2 p-2">
                <span className="p-2">
                  <p className="font-semibold px-2">Warehouse2</p>
                  <p className="font-light px-2">
                    type : <span className="font-medium">Wheat</span>
                  </p>
                </span>
                <span className="p-2">
                  <p className="font-semibold px-2">Quantity</p>
                  <p className="font-medium px-2">10</p>
                </span>
                <span className="p-2">
                  <p className="font-semibold px-2">Status</p>
                  <p className="font-bold text-blue-700 px-2">Requested</p>
                </span>
                <span className="p-2">
                  <p className="font-semibold px-2">Duration</p>
                  <p className="font-medium px-2">
                    10 {"("}in month{")"}
                  </p>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center shadow-xl rounded-lg">
              <div className="flex m-2 p-2">
                <span className="p-2">
                  <p className="font-semibold px-2">Warehouse2</p>
                  <p className="font-light px-2">
                    type : <span className="font-medium">Wheat</span>
                  </p>
                </span>
                <span className="p-2">
                  <p className="font-semibold px-2">Quantity</p>
                  <p className="font-medium px-2">10</p>
                </span>
                <span className="p-2">
                  <p className="font-semibold px-2">Status</p>
                  <p className="font-bold text-red-700 px-2">Rejected</p>
                </span>
                <span className="p-2">
                  <p className="font-semibold px-2">Duration</p>
                  <p className="font-medium px-2">
                    10 {"("}in month{")"}
                  </p>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center shadow-xl rounded-lg">
              <div className="flex m-2 p-2">
                <span className="p-2">
                  <p className="font-semibold px-2">Warehouse2</p>
                  <p className="font-light px-2">
                    type : <span className="font-medium">Wheat</span>
                  </p>
                </span>
                <span className="p-2">
                  <p className="font-semibold px-2">Quantity</p>
                  <p className="font-medium px-2">10</p>
                </span>
                <span className="p-2">
                  <p className="font-semibold px-2">Status</p>
                  <p className="font-bold text-red-400 px-2">Approved</p>
                </span>
                <span className="p-2">
                  <p className="font-semibold px-2">Duration</p>
                  <p className="font-medium px-2">
                    10 {"("}in month{")"}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
