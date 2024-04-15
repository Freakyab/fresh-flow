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
import { FaUserEdit } from "react-icons/fa";
import handleToast from "@/components/toastifyNotification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Settings = () => {
  const [warehouseDetailData, setWarehouseDetailData] =
    useState<warehouseDetailDataProps>({} as warehouseDetailDataProps);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isGetCurrentLocation, setIsGetCurrentLocation] =
    useState<boolean>(true);

  const { userDetails } = useUserDetails();
  useEffect(() => {
    fetch(
      // Change id
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
  }, []);

  const handleEditMode = () => {
    setIsEdit(!isEdit);
    if (!isEdit) {
      handleToast("Edit mode enabled", "info");
    }
  };

  const getCurrentLocation = () => {
   if(isGetCurrentLocation)
    { 
    handleToast("Fetching current location", "info");
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
      handleToast("Geolocation is not supported by this browser", "error");
    }}
    setIsGetCurrentLocation(false);
  };
  
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
              {/* <p className="text-lg font-semibold">Owner name : </p> */}
              {/* <p>{warehouseDetailData.ownerName}</p> */}
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
              {/* <p className="text-lg font-semibold">Total Capacity (in MT) : </p> */}
              {/* <p>{warehouseDetailData.capacity}</p> */}
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
              {/* <p className="text-lg font-semibold">Type of Storage : </p> */}
              {/* <p>{warehouseDetailData.type}</p> */}
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
              {/* <p className="text-lg font-semibold">Status: </p> */}
              {/* <p>{warehouseDetailData.status}</p> */}
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
              {/* <p className="text-lg font-semibold">Email: </p>
              <p>{warehouseDetailData.email}</p> */}
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
              {/* <p className="text-lg font-semibold">Phone no: </p>
              <p>{warehouseDetailData.phoneNo}</p> */}
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
              {/* <p className="text-lg font-semibold">Registration Date: </p>
              <p>{warehouseDetailData.registrationDate}</p> */}
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
              {/* <p className="text-lg font-semibold">Location : </p>
              <p>
                Lat :{" "}
                {warehouseDetailData.location &&
                  warehouseDetailData.location[0]}
                {","} Lng:{" "}
                {warehouseDetailData.location &&
                  warehouseDetailData.location[1]}
              </p> */}
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
              {/* <p className="text-lg font-semibold">Warehouse address : </p> */}
              {/* <p>{warehouseDetailData.address}</p> */}
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
              {/* <p className="text-lg font-semibold">City : </p> */}
              {/* <p>{warehouseDetailData.city}</p> */}
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
              {/* <p className="text-lg font-semibold">State : </p> */}
              {/* <p>{warehouseDetailData.state}</p> */}
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
              onClick={() => {
                fetch(
                  // Change id
                  // `http://localhost:5000/warehouse/update/${userDetails.userDetails._id}`,
                  `https://fresh-flow-backend.vercel.app/warehouse/update/${userDetails.userDetails._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      "accept": "/",
                    },
                    body: JSON.stringify(warehouseDetailData),
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    if (data) {
                      handleToast("Warehouse details updated", "success");
                      setIsEdit(false);
                    }
                  });
              }}>
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
