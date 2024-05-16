"use client";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  CardFooter,
  Button,
  Skeleton
} from "@nextui-org/react";

import useUserDetails from "@/redux/dispatch/useUserDetails";

import { ToastContainer } from "react-toastify";
import handleToast from "@/components/toastifyNotification";
import "react-toastify/dist/ReactToastify.css";

import { FaUserEdit } from "react-icons/fa";

const Settings = () => {
  const [customerDetailData, setCustomerDetailData] =
    useState<customerDetailDataProps>({} as customerDetailDataProps);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isGetCurrentLocation, setIsGetCurrentLocation] =
    useState<boolean>(true);

  const { userDetails } = useUserDetails();
  useEffect(() => {
    fetch(
      // `http://localhost:5000/customer/getdatabyid/${userDetails.userDetails._id}`,
      `https://fresh-flow-backend.vercel.app/customer/getdatabyid/${userDetails.userDetails._id}`,
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
        console.log(data)
        if (data.isAvailable) {
          setCustomerDetailData(data.user);
          toggleLoad();
        } else {
          handleToast("No data found", "error");
        }
      });
  }, []);

  const handleEditMode = () => {
    setIsEdit(!isEdit);
    if (!isEdit) {
      handleToast("Edit mode enabled", "info");
    }
  };

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  const getCurrentLocation = () => {
    if (isGetCurrentLocation) {
      handleToast("Fetching current location", "info");
      if (navigator.geolocation) {
        setTimeout(() => {
          navigator.geolocation.getCurrentPosition((position) => {
            handleToast(
              `Location fetched: \n Lat : ${position.coords.latitude} , Lng : ${position.coords.longitude}`,
              "success"
            );
            setCustomerDetailData({
              ...customerDetailData,
              location: [position.coords.latitude, position.coords.longitude],
            });
          });
        }, 2000);
      } else {
        handleToast("Geolocation is not supported by this browser", "error");
      }
    }
    setIsGetCurrentLocation(false);
  };

  return (
    <div className="w-full m-3">
      <Skeleton isLoaded={isLoaded}>
      <Card className="border-none mb-3 bg-light-bg w-full">
        <CardHeader className="bg-white text-black text-lg font-semibold">
          <div className="flex justify-between w-full">
            <p className="text-xl">Customer Details</p>
            <p
              className="text-blue-500 cursor-pointer"
              onClick={handleEditMode}>
              <FaUserEdit
                size={25}
                className={`${isEdit ? "text-green-500" : "text-blue-500"}`}
              />
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-3 justify-center">
            <div className="flex gap-3 items-center">
              <Input
                label="Full name"
                placeholder="Enter your Full name"
                value={customerDetailData.fullName}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setCustomerDetailData({
                    ...customerDetailData,
                    fullName: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Username"
                placeholder="Customer's username"
                value={customerDetailData.username}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setCustomerDetailData({
                    ...customerDetailData,
                    username: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Email"
                placeholder="Email"
                value={customerDetailData.email}
                type="email"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setCustomerDetailData({
                    ...customerDetailData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Phone no"
                placeholder="Phone no"
                value={customerDetailData.phoneNo}
                type="tel"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setCustomerDetailData({
                    ...customerDetailData,
                    phoneNo: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex gap-3 items-center">
              <Input
                label="Latitude"
                placeholder="Latitude"
                value={
                  customerDetailData.location
                    ? customerDetailData.location.join(",")
                    : "" // Render empty string if location data is not available
                }
                type="text"
                disabled={!isEdit}
                onClick={getCurrentLocation}
                onChange={(e) => {
                  const value = e.target.value.trim(); // Remove leading/trailing spaces
                  if (value === "") {
                    // Handle empty input
                    setCustomerDetailData({
                      ...customerDetailData,
                      location: customerDetailData.location, // or [], depending on how you want to handle it
                    });
                  } else {
                    setCustomerDetailData({
                      ...customerDetailData,
                      location: value
                        .split(",")
                        .map((item) => parseFloat(item)),
                    });
                  }
                }}
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Customer's address"
                placeholder="Customer's address"
                value={customerDetailData.address}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setCustomerDetailData({
                    ...customerDetailData,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="City"
                placeholder="City"
                value={customerDetailData.city}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setCustomerDetailData({
                    ...customerDetailData,
                    city: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="State"
                placeholder="State"
                value={customerDetailData.state}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setCustomerDetailData({
                    ...customerDetailData,
                    state: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </CardBody>
        {isEdit && (
          <CardFooter className="bg-white">
            <Button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={() => {
                fetch(
                  // Change id
                  `http://localhost:5000/customer/update/${userDetails.userDetails._id}`,
                  // `https://fresh-flow-backend.vercel.app/customer/update/${userDetails.userDetails._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      accept: "/",
                    },
                    body: JSON.stringify(customerDetailData),
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.isUpdated) {
                      handleToast("Customer details updated", "success");
                      setIsEdit(false);
                    }else{
                      handleToast("Failed to update customer details", "error");
                    }
                  });
              }}>
              Update
            </Button>
          </CardFooter>
        )}
      </Card>
      <ToastContainer />
      </Skeleton>
    </div>
  );
};

export default Settings;
