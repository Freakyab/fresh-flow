"use client";
import React, { useState, useEffect } from "react";
import { usePathname,useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import handleToast from "@/components/toastifyNotification";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import useUserDetails from "@/redux/dispatch/useUserDetails";
import WarehouseDetails from "@/components/dashboard/profile/warehouseDetails";

const Map = dynamic(
  () => import("@/components/marketPlace/location/individualLocationFinder"),
  { ssr: false }
);

function Page() {
  const router = useRouter();
  const [warehouseDetailData, setWarehouseDetailData] =
    useState<warehouseDetailDataProps | null>(
      {} as warehouseDetailDataProps | null
    );
  const pathname = usePathname().split("/warehouse/")[1];
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [display, setDisplay] = React.useState(false);
  const [selectedCrop, setSelectedCrop] = React.useState<string>("");
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const { getUserDetails } = useUserDetails();

  useEffect(() => {
    if (pathname) {
      // fetch(`http://localhost:5000/warehouse/getdatabyid/${pathname}`, {
      fetch(
        `https://fresh-flow-backend.vercel.app/warehouse/getdatabyid/${pathname}`,
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
            setWarehouseDetailData(data);
          }
        });
    }
  }, [pathname]);

  useEffect(() => {
    if (getUserDetails().userDetails.type === "farmer") {
      setIsValid(true);
    } else {
      handleToast("Login from farmer's Account", "error");
    }
  }, []);
  const handleSubmit = async (e: FormData) => {
    const duration = e.get("duration");
    const quantity = e.get("quantity");

    const newDuration = parseInt(duration as string);
    const newQuantity = parseInt(quantity as string);

    if (newDuration > 24) {
      handleToast("Duration should be less than 24 months", "error");
      return;
    }

    const capacity = warehouseDetailData
      ? parseFloat(warehouseDetailData.capacity)
      : 0;

    if (duration === "" || quantity === "" || selectedCrop === "") {
      handleToast("Please enter all the values", "error");
      return;
    } else {
      if (
        newDuration <= 0 ||
        newQuantity <= 0 ||
        isNaN(newDuration) ||
        isNaN(newQuantity)
      ) {
        handleToast("Please enter valid values", "error");
        return;
      } else if (newQuantity > capacity) {
        handleToast("Quantity is more than the capacity", "error");
        return;
      }
    }
    await fetch(
      // `http://localhost:5000/transaction/farmer-purchase/${
      `https://fresh-flow-backend.vercel.app/transaction/farmer-purchase/${
        getUserDetails().userDetails._id
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "/",
        },
        body: JSON.stringify({
          duration: duration,
          quantity: quantity,
          warehouseId: warehouseDetailData?._id,
          price: warehouseDetailData?.price,
          typeOfCrop: selectedCrop,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          handleToast(data.error, "error");
        } else {
          handleToast("Transcation successful, Check order history", "success");
          router.push('/dashboard/farmer/orders');
        }
      });
    handleClose();
  };

  const handleModel = () => {
    setDisplay(!display);
    onOpen();
  };

  const handleClose = () => {
    setDisplay(!display);
    onClose();
  };
  return (
    <>
      {warehouseDetailData?.location != null ? (
        <div className="flex flex-col md:flex-row items-stretch d-hight w-[99%] m-2 overflow-hidden border-2 border-black rounded-lg shadow-lg">
          <div className="w-full md:w-1/2 bg-gray-100 p-6 flex flex-col overflow-x-auto">
            <h1 className="text-2xl font-bold mb-2">
              {warehouseDetailData.name}
              <Divider />
            </h1>
            <p className="text-lg font-semibold py-2">
              {"₹"}
              {warehouseDetailData.price}/sqft
            </p>

            <WarehouseDetails
              warehouseDetailData={warehouseDetailData}
              className=""
            />
            {isValid && (
              <div >
                <Button
                  color="success"
                  variant="bordered"
                  onClick={handleModel}
                  className="m-3">
                  Buy
                </Button>
              </div>
            )}
            <div className="absolute z-10">
              <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Payment Details
                      </ModalHeader>
                      <form action={handleSubmit}>
                        <ModalBody>
                          <div className="flex flex-col gap-3">
                            <p>Enter the duration of the storage</p>
                            <Input
                              type="number"
                              name="duration"
                              label="Duration (in months)"
                              placeholder="Enter your duration in months"
                            />
                            <p>Enter the quantity of the product</p>
                            <Input
                              type="number"
                              name="quantity"
                              label="Quantity (in Mt)"
                              placeholder="Enter your quantity in Mt"
                            />
                            <p>
                              Select the type of crop you want to store in the
                              warehouse
                            </p>
                            <Select
                              name="typeOfCrop"
                              label="Type of Crop"
                              placeholder="Select the type of crop"
                              onChange={(e) => setSelectedCrop(e.target.value)}>
                              {warehouseDetailData.typeOfCrop.map((crop) => (
                                <SelectItem key={crop} value={crop}>
                                  {crop}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}>
                            Close
                          </Button>
                          <Button color="primary" type="submit">
                            Proceed
                          </Button>
                        </ModalFooter>
                      </form>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-gray-300 p-6">
            {!display && warehouseDetailData != undefined ? (
              <Map
                className="w-full h-64 md:h-full"
                name={warehouseDetailData.name}
                location={warehouseDetailData.location}
              />
            ) : (
              <div className="text-red-500 text-lg font-bold">
                Loading map...
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-red-500 text-lg font-bold">
          Warehouse not found
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default Page;
