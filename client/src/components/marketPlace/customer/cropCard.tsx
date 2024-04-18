"use client";
import React from "react";
import useCropsMap from "@/redux/dispatch/useCropsMap";
import useCustomerOrderCardItem from "@/redux/dispatch/useCustomerOrderCardItem";
import { IoLocation } from "react-icons/io5";
import { useRouter } from "next/navigation";

// import Model from "@/components/marketPlace/model";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Divider,
  CardHeader,
} from "@nextui-org/react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import handleToast from "@/components/toastifyNotification";

function CropCard({ className }: { className: string }) {
  const router = useRouter();
  const { getCropsList } = useCropsMap();
  const { addOrderItem } = useCustomerOrderCardItem();

  const handleCartItems = (item: CropsMarketPlaceProps) => {

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
    <div className={className}>
      {getCropsList().map((item,index) => (
        <div key={index} className="max-w-80 w-fit h-fit">
          <Card className="m-4 shadow-lg">
            <CardHeader>
              <div className="flex justify-between text-lg capitalize w-full">
                <span className="">{item.crop}</span>
                <span className="">{item.farmerName} </span>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex flex-col justify-between items-center">
                <div className="w-full h-fit">
                  <Image
                    src={item.image}
                    alt="crop"
                    className="rounded-xl object-contain h-full shadow-lg"
                    width={800}
                    height={800}
                  />
                </div>
                <div className="pt-3 flex items-center justify-between w-full">
                  <span className="text-xl capitalize line-clamp-2 tracking-wider">
                    {item.price}
                    <span className="text-base font-light">/50Kg</span>
                  </span>
                  <div className="flex justify-center items-center">
                    <span>
                      <IoLocation className="text-xl" />
                    </span>
                    <span>{item.city}</span>
                  </div>
                </div>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex items-center gap-3 p-3">
              <Button
                color="primary"
                size="sm"
                variant="bordered"
                onClick={() => router.push(`/farmer/${item._id}`)}>
                View details
              </Button>
              <Button
                color="danger"
                size="sm"
                variant="bordered"
                onClick={() => handleCartItems(item)}>
                Add to Cart
              </Button>
              {/* <Button
                color="success"
                size="sm"
                variant="bordered"
                onClick={() => toast.info("please add to cart..")}
              >
                Buy
                {item?.availableCrops[0].price}/Kg
              </Button> */}
            </CardFooter>
          </Card>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default CropCard;
