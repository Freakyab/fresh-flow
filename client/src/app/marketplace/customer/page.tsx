"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "nextjs-toploader/app";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slider, Button } from "@nextui-org/react";
import CropCard from "@/components/marketPlace/customer/cropCard";
import useCropsMap from "@/redux/dispatch/useCropsMap";
import cropsTypeList from "@/components/dataSample/cropsType";
import handleToast from "@/components/toastifyNotification";

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

  const { setCrops, setFilter } = useCropsMap();

  useEffect(() => {
    fetchCrops();
  }, [filterBuffer]);

  const fetchCrops = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/farmer/markertPlace`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "/",
          },
        }
      );
      const responseJson = await response.json();
      if (responseJson.isFound) {
        setCrops(responseJson.data);
      } else {
        handleToast({
          type: "error",
          message: responseJson.message,
        });
      }
    } catch (error) {
      handleToast({
        type: "error",
        message: "Error fetching crops",
      });
    }
  };

  const handleFilter = () => {
    setFilter(filterBuffer);
  };

  const handleReset = () => {
    setFilterBuffer({
      cropName: "",
      priceRange: { min: 50, max: 10000 }, // Match the Slider's default values
      location: "All",
    });

    // Reset the filter in the global state
    setFilter({
      cropName: "",
      priceRange: { min: 50, max: 10000 },
      location: "All",
    });
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
      <div className="flex w-full min-h-screen bg-gray-50">
        <div className="w-1/4 min-h-screen border-r border-gray-200 bg-white">
          <div className="p-6 sticky top-0 flex flex-col gap-8">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-semibold text-primary">Filters</h2>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Crop Type
              </label>
              <Select
                label="Select Crop"
                className="w-full"
                value={filterBuffer.cropName}
                variant="bordered"
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
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Price Range
              </label>
              <Slider
                label="Price Range"
                step={50}
                minValue={50}
                maxValue={10000}
                defaultValue={[50, 10000]}
                className="w-full max-w-md"
                formatOptions={{
                  style: "currency",
                  currency: "RUP",
                }}
                value={[
                  filterBuffer.priceRange.min,
                  filterBuffer.priceRange.max,
                ]}
                onChange={(value: any) =>
                  setFilterBuffer({
                    ...filterBuffer,
                    priceRange: { min: value[0], max: value[1] },
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <Button
                  color="primary"
                  className="flex-1 px-8 py-2"
                  onClick={handleFilter}>
                  Apply Filters
                </Button>
                <Button
                  color="warning"
                  variant="bordered"
                  className="flex-1"
                  onClick={handleReset}>
                  Reset
                </Button>
              </div>

              <Button
                color="primary"
                variant="bordered"
                className="w-full"
                onClick={() => {
                  toast.info("Loading cart items...");
                  router.push("/dashboard/customer/cartitems");
                }}>
                View Cart
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <CropCard className="p-6" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
