"use client";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Select,
  SelectItem,
  CardFooter,
  Button,
} from "@nextui-org/react";

import useUserDetails from "@/redux/dispatch/useUserDetails";

import { ToastContainer } from "react-toastify";
import handleToast from "@/components/toastifyNotification";
import "react-toastify/dist/ReactToastify.css";

import { FaUserEdit } from "react-icons/fa";

const Settings = () => {
  const [warehouseDetailData, setWarehouseDetailData] =
    useState<warehouseDetailDataProps>({} as warehouseDetailDataProps);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isGetCurrentLocation, setIsGetCurrentLocation] =
    useState<boolean>(true);

  const { userDetails } = useUserDetails();

  const fetchWarehouseData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/warehouse/getdatabyid/${userDetails.userDetails._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "/",
          },
        }
      );
      const responseJson = await response.json();
      if (responseJson.isFound) {
        setWarehouseDetailData(responseJson.user);
      } else {
        handleToast({
          message: "No data found",
          type: "info",
        });
      }
    } catch (error) {
      handleToast({
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  const handleEditMode = () => {
    setIsEdit(!isEdit);
    if (!isEdit) {
      handleToast({
        message: "Edit mode enabled",
        type: "info",
      });
    }
  };

  const getCurrentLocation = () => {
    if (isGetCurrentLocation) {
      handleToast({
        message: "Fetching current location",
        type: "info",
      });
      if (navigator.geolocation) {
        setTimeout(() => {
          navigator.geolocation.getCurrentPosition((position) => {
            setWarehouseDetailData({
              ...warehouseDetailData,
              location: [position.coords.latitude, position.coords.longitude],
            });
          });
        }, 2000);
      } else {
        handleToast({
          message: "Geolocation is not supported by this browser",
          type: "error",
        });
      }
    }
    setIsGetCurrentLocation(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/warehouse/update/${userDetails.userDetails._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            accept: "/",
          },
          body: JSON.stringify(warehouseDetailData),
        }
      );

      const responseJson = await response.json();
      handleToast({
        message: responseJson.message,
        type: responseJson.isFound ? "success" : "error",
      });
    } catch (error) {
      handleToast({
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchWarehouseData();
  }, []);

  return (
    <div className="w-full m-3">
      <Card className="border-none mb-3 bg-light-bg w-full">
        <CardHeader className="bg-white text-black text-lg font-semibold">
          <div className="flex justify-between w-full">
            <p className="text-xl">Warehouse Details</p>
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
                label="Owner name"
                placeholder="Owner name"
                value={warehouseDetailData.ownerName}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setWarehouseDetailData({
                    ...warehouseDetailData,
                    ownerName: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Total Capacity (in MT)"
                placeholder="Total Capacity (in MT)"
                type="number"
                value={warehouseDetailData.capacity}
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setWarehouseDetailData({
                    ...warehouseDetailData,
                    capacity: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Select
                label="Type of Storage"
                placeholder={warehouseDetailData.type}
                value={warehouseDetailData.type}
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setWarehouseDetailData({
                    ...warehouseDetailData,
                    type: e.target.value,
                  })
                }>
                {isEdit
                  ? [
                      <SelectItem key="Cold" value="Cold">
                        Cold
                      </SelectItem>,
                      <SelectItem key="Hot" value="Hot">
                        Hot
                      </SelectItem>,
                    ]
                  : []}
              </Select>
            </div>
            <div className="flex gap-3 items-center">
              <Select
                label="Status"
                placeholder={warehouseDetailData.status}
                value={warehouseDetailData.status}
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setWarehouseDetailData({
                    ...warehouseDetailData,
                    status: e.target.value,
                  })
                }>
                {isEdit
                  ? [
                      <SelectItem key="Active" value="Active">
                        Active
                      </SelectItem>,
                      <SelectItem key="Inactive" value="Inactive">
                        Inactive
                      </SelectItem>,
                    ]
                  : []}
              </Select>
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Types of crops (comma separated)"
                placeholder="Types of crops "
                value={warehouseDetailData.typeOfCrop
                  ?.map((item) => item)
                  .join(",")}
                disabled={!isEdit ? true : false}
                onChange={(e) => {
                  setWarehouseDetailData({
                    ...warehouseDetailData,
                    typeOfCrop: [...e.target.value.split(",")],
                  });
                }}
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Email"
                placeholder="Email"
                value={warehouseDetailData.email}
                type="email"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setWarehouseDetailData({
                    ...warehouseDetailData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Phone no"
                placeholder="Phone no"
                value={warehouseDetailData.phoneNo}
                type="tel"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setWarehouseDetailData({
                    ...warehouseDetailData,
                    phoneNo: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Registration Date"
                placeholder="Registration Date"
                type="date"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setWarehouseDetailData({
                    ...warehouseDetailData,
                    registrationDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Latitude"
                placeholder="Latitude"
                value={
                  warehouseDetailData.location &&
                  warehouseDetailData.location?.map((item) => item).join(",")
                }
                type="text"
                disabled={!isEdit ? true : false}
                onClick={getCurrentLocation}
                onChange={(e) =>
                  setWarehouseDetailData({
                    ...warehouseDetailData,
                    location: e.target.value
                      .split(",")
                      .map((item) => parseFloat(item)),
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Warehouse address"
                placeholder="Warehouse address"
                value={warehouseDetailData.address}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setWarehouseDetailData({
                    ...warehouseDetailData,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="City"
                placeholder="City"
                value={warehouseDetailData.city}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setWarehouseDetailData({
                    ...warehouseDetailData,
                    city: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="State"
                placeholder="State"
                value={warehouseDetailData.state}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setWarehouseDetailData({
                    ...warehouseDetailData,
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
              onClick={handleSubmit}>
              Update
            </Button>
          </CardFooter>
        )}
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Settings;
