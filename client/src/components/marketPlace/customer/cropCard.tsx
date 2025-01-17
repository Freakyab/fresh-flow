"use client";
import React from "react";
import { useRouter } from 'nextjs-toploader/app';

import Image from "next/image";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Divider,
  CardHeader,
} from "@nextui-org/react";

import useCropsMap from "@/redux/dispatch/useCropsMap";
import useCustomerOrderCardItem from "@/redux/dispatch/useCustomerOrderCardItem";
import useUserDetails from "@/redux/dispatch/useUserDetails";

import { ToastContainer } from "react-toastify";
import handleToast from "@/components/toastifyNotification";
import "react-toastify/dist/ReactToastify.css";

import { IoLocation } from "react-icons/io5";


function CropCard({ className }: { className: string }) {
  const router = useRouter();

  const { getCropsList } = useCropsMap();
  const { addOrderItem } = useCustomerOrderCardItem();
  const { getUserDetails } = useUserDetails();
  const handleCartItems = (item: CropsMarketPlaceProps) => {
    if (getUserDetails().userDetails.type !== "customer") {
      return handleToast(
        "Please login as customer to add items to cart",
        "error"
      );
    }
    addOrderItem({
      _id: item._id,
      crop: item.crop,
      farmerName: item.farmerName,
      price: item.price,
      city: item.city,
      image: item.image,
      availableQuantity: 1,
      address: item.address,
      state: item.state,
      farmerContact: item.farmerContact,
      email: item.email,
      location: item.location,
    });
    handleToast("success", "Item added to cart successfully");
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 p-6 ${className}`}>
      {getCropsList().map((item, index) => (
        <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 bg-white">
          <CardHeader className="p-4">
            <div className="flex flex-col space-y-1">
              <h3 className="text-xl font-semibold text-gray-900 truncate">
                {item.crop}
              </h3>
              <p className="text-sm text-gray-600">
                by {item.farmerName}
              </p>
            </div>
          </CardHeader>
          
          <Divider />
          
          <CardBody className="p-4">
            <div className="space-y-4">
              {/* Image Container */}
                <Image
                  src={item.image}
                  alt={item.crop}
                  width={500}
                  height={500}
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300 rounded-lg"
                />
              
              {/* Price and Location */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{item.price}
                  </span>
                  <span className="text-sm text-gray-600">
                    per 50kg
                  </span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-600">
                  <IoLocation className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.city}</span>
                </div>
              </div>
            </div>
          </CardBody>
          
          <Divider />
          
          <CardFooter className="p-4">
            <div className="flex gap-2 w-full">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
                onClick={() => router.push(`/farmer/${item._id}`)}
              >
                View Details
              </Button>
              <Button
                className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                variant="bordered"
                size="sm"
                onClick={() => handleCartItems(item)}
              >
                Add to Cart
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
      <ToastContainer />
    </div>
  );
}

export default CropCard;
