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
  const [farmerDetailData, setFarmerDetailData] =
    useState<farmerDetailDataProps>({} as farmerDetailDataProps);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isGetCurrentLocation, setIsGetCurrentLocation] =
    useState<boolean>(true);

  const [cropData, setCropData] = useState({
    availableCrops: [{ typeOfCrop: "", quantity: 0, price: 0 }],
  });
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
          setCropData({ availableCrops: data.availableCrops });
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

  const getCurrentLocation = () => {
    if (isGetCurrentLocation) {
      handleToast("Fetching current location", "info");
      if (navigator.geolocation) {
        setTimeout(() => {
          navigator.geolocation.getCurrentPosition((position) => {
            setFarmerDetailData({
              ...farmerDetailData,
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

  const handleCropChange = (
    index: number,
    fieldName: string,
    value: string | number
  ) => {
    const updatedCrops = [...cropData.availableCrops];
    if (fieldName === "quantity" || fieldName === "price") {
      updatedCrops[index] = {
        ...updatedCrops[index],
        [fieldName]: value,
      };
    } else {
      updatedCrops[index] = {
        ...updatedCrops[index],
        [fieldName]: value.toString().toLowerCase(),
      };
    }
    setCropData({ ...cropData, availableCrops: updatedCrops });
    // check id the type of crop is empty or not

    setFarmerDetailData({
      ...farmerDetailData,
      availableCrops: updatedCrops,
    });
  };

  const addCrop = () => {
    setCropData({
      availableCrops: [
        ...cropData.availableCrops,
        { typeOfCrop: "", quantity: 0, price: 0 },
      ],
    });
  };

  const handleSubmit = async () => {
    await fetch(
      // Change id
      // `http://localhost:5000/farmer/update/${userDetails.userDetails._id}`,
      `https://fresh-flow-backend.vercel.app/farmer/update/${userDetails.userDetails._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "/",
        },
        body: JSON.stringify(farmerDetailData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleToast("Farmer details updated", "success");
          setIsEdit(false);
        }
      });
  };

  const removeCrop = (index: number) => {
    const updatedCrops = [...cropData.availableCrops];
    updatedCrops.splice(index, 1);
    setCropData({ ...cropData, availableCrops: updatedCrops });
  };

  return (
    <div className="w-full m-3">
      <Card className="border-none mb-3 bg-light-bg w-full">
        <CardHeader className="bg-white text-black text-lg font-semibold">
          <div className="flex justify-between w-full">
            <p className="text-xl">Farmer Details</p>
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
                value={farmerDetailData.farmerName}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setFarmerDetailData({
                    ...farmerDetailData,
                    farmerName: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Adhar No"
                placeholder="Adhar No"
                type="text"
                value={farmerDetailData.adharNo}
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setFarmerDetailData({
                    ...farmerDetailData,
                    adharNo: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-3 items-center">
              {cropData.availableCrops?.map((crop, index) => (
                <div key={index}>
                  <Input
                    type="text"
                    label="Type of Crop"
                    placeholder="Type of Crop"
                    disabled={!isEdit ? true : false}
                    value={crop.typeOfCrop}
                    onChange={(e) =>
                      handleCropChange(index, "typeOfCrop", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    label="Quantity"
                    placeholder="Quantity"
                    disabled={!isEdit ? true : false}
                    value={crop.quantity.toString()}
                    onChange={(e) =>
                      handleCropChange(
                        index,
                        "quantity",
                        parseInt(e.target.value)
                      )
                    }
                  />
                  <Input
                    type="number"
                    label="Price"
                    placeholder="Price"
                    disabled={!isEdit ? true : false}
                    value={crop.price.toString()}
                    onChange={(e) =>
                      handleCropChange(index, "price", parseInt(e.target.value))
                    }
                  />
                  {isEdit && (
                      <Button
                        color="danger"
                        className="my-2"
                        variant="bordered"
                        onClick={() => removeCrop(index)}>
                        Remove
                      </Button>
                  )}
                  {
                    isEdit && index === cropData.availableCrops.length - 1 && (
                      <Button
                      color="success"
                      className="my-2"
                      variant="bordered"
                      onClick={addCrop}>
                        Add
                      </Button>
                        )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Email"
                placeholder="Email"
                value={farmerDetailData.email}
                type="email"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setFarmerDetailData({
                    ...farmerDetailData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Phone no"
                placeholder="Phone no"
                value={farmerDetailData.farmerContact}
                type="tel"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setFarmerDetailData({
                    ...farmerDetailData,
                    farmerContact: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex gap-3 items-center">
              <Input
                label="Latitude"
                placeholder="Latitude"
                value={
                  farmerDetailData.location &&
                  farmerDetailData.location?.map((item) => item).join(",")
                }
                type="text"
                disabled={!isEdit ? true : false}
                onClick={getCurrentLocation}
                onChange={(e) =>
                  setFarmerDetailData({
                    ...farmerDetailData,
                    location: e.target.value
                      .split(",")
                      .map((item) => parseFloat(item)),
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="Farmer address"
                placeholder="Farmer address"
                value={farmerDetailData.address}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setFarmerDetailData({
                    ...farmerDetailData,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="City"
                placeholder="City"
                value={farmerDetailData.city}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setFarmerDetailData({
                    ...farmerDetailData,
                    city: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-3 items-center">
              <Input
                label="State"
                placeholder="State"
                value={farmerDetailData.state}
                type="text"
                disabled={!isEdit ? true : false}
                onChange={(e) =>
                  setFarmerDetailData({
                    ...farmerDetailData,
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
