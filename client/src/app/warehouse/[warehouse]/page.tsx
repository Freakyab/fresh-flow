"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import useUserDetails from "@/redux/dispatch/useUserDetails";

const Map = dynamic(
  () => import("@/components/marketPlace/farmer/warehouseLocation"),
  { ssr: false }
);

function Page() {
  const [warehouseDetailData, setWarehouseDetailData] =
    useState<warehouseDetailDataProps | null>(
      {} as warehouseDetailDataProps | null
    );
  const pathname = usePathname().split("/warehouse/")[1];
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [display, setDisplay] = React.useState(false);
  const { getUserDetails } = useUserDetails();

  useEffect(() => {
    if (pathname) {
      fetch(`http://localhost:5000/warehouse/getdatabyid/${pathname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log(data);
            setWarehouseDetailData(data);
          }
        });
    }
  }, [pathname]);

  const handleSubmit = async (e: FormData) => {
    const duration = e.get("duration");
    const quantity = e.get("quantity");

    if (duration === "" || quantity === "") {
      alert("Please fill all the fields");
      return;
    }
    await fetch(
    `http://localhost:5000/transaction/farmer-purchase/${
        getUserDetails().userDetails._id
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration: duration,
          quantity: quantity,
          warehouseId: warehouseDetailData?._id,
          price : warehouseDetailData?.price
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          alert("Transaction successful");
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
      {warehouseDetailData != null ? (
        <div className="flex flex-col md:flex-row items-stretch h-screen w-[99%] m-2 overflow-hidden border-2 border-black rounded-lg shadow-lg">
          <div className="w-full md:w-1/2 bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-2">
              {warehouseDetailData.name}
            </h1>

            <Button color="success" variant="bordered" onClick={handleModel}>
              {warehouseDetailData.price}
            </Button>
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
                            <p>Select the duration of the storage</p>
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
            {!display && (
              <Map
                className="w-full h-64 md:h-full"
                warehouseDetailData={warehouseDetailData}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="text-red-500 text-lg font-bold">
          Warehouse not found
        </div>
      )}
    </>
  );
}

export default Page;
