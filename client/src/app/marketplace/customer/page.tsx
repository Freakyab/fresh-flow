"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slider, Button } from "@nextui-org/react";
import CropCard from "@/components/marketPlace/customer/cropCard";
import useCropsMap from "@/redux/dispatch/useCropsMap";
import cropsTypeList from "@/components/dataSample/cropsType";

const Page = () => {
  const [filterBuffer, setFilterBuffer] = React.useState({
    cropName: "",
    priceRange: { min: 0, max: 0 },
    location: "All",
  });
  const [newCropTypeList, setNewCropTypeList] = React.useState<cropsType[]>([]);

  const router = useRouter();

  const lastIndex = {
    id: cropsTypeList.length + 1,
    label: "All",
    image: "",
  };

  useEffect(() => {
    let newCropType = [...cropsTypeList, lastIndex];
    setNewCropTypeList(newCropType);
  }, []);

  const { getCropsList, setCrops, setFilter } = useCropsMap();

  useEffect(() => {
    // fetch("http://localhost:5000/farmer/markertPlace", {
    fetch(`https://fresh-flow-backend.vercel.app/farmer/markertPlace`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "/",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setCrops(data);
        } else {
          console.log(data);
        }
      });
  }, [filterBuffer]);

  const handleFilter = () => {
    setFilter(filterBuffer);
    // getCropsList();
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="w-full p-3">
        <Image
          src={"/appInfo0.jpg"}
          alt="crop"
          className="w-full h-96 object-cover shadow-md rounded-md"
          width={800}
          height={800}
        />
      </div>
      <div className="flex">
        <div className="w-1/5 flex flex-col items-center gap-10 bg-white p-3 rounded-large shadow-lg m-3">
          <p className="text-2xl font-semibold flex justify-start w-full py-3 text-primary">
            Filters
          </p>
          <Select
            label="Select Crop"
            className="max-w-xs"
            onChange={(e) =>
              setFilterBuffer({ ...filterBuffer, cropName: e.target.value })
            }>
            {newCropTypeList
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((item) => (
                <SelectItem key={item.label} value={item.label}>
                  {item.label.toUpperCase()}
                </SelectItem>
              ))}
          </Select>
          <Slider
            label="Price Range"
            step={50}
            minValue={50}
            maxValue={10000}
            defaultValue={[50, 10000]}
            formatOptions={{
              style: "currency",
              currency: "RUP",
            }}
            onChange={(value: any) =>
              setFilterBuffer({
                ...filterBuffer,
                priceRange: { min: value[0], max: value[1] },
              })
            }
            className="max-w-md"
          />
          <div className="flex gap-3">
            <Button color="primary" onClick={handleFilter}>
              Apply
            </Button>
            <Button color="warning" variant="bordered">
              Reset
            </Button>
          </div>
          <div className="w-full justify-self items-center">
            <Button
              color="primary"
              variant="bordered"
              className="w-full"
              onClick={() => {
                toast.info("loading..");
                router.push("/dashboard/customer/cartitems");
              }}>
              Cart Items
            </Button>
          </div>
        </div>
        <CropCard className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
