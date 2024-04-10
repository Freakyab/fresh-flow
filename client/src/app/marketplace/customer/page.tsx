"use client";
import React, { use, useEffect } from "react";
import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import { Select, SelectItem } from "@nextui-org/react";
import {
  Slider,
  Card,
  CardBody,
  CardFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import { CropsMapList } from "@/components/dataSample/cropsMapList";
import Model from "@/components/marketPlace/model";
import useCropsMap from "@/redux/dispatch/useCropsMap";
import cropsTypeList, { cropsType } from "@/components/dataSample/cropsType";

const Page = () => {
  const [filterBuffer, setFilterBuffer] = React.useState({
    cropName: "",
    priceRange: { min: 0, max: 0 },
    location: "All",
  });
  const [newCropTypeList, setNewCropTypeList] = React.useState<cropsType[]>([]);

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

  React.useEffect(() => {
    setCrops(CropsMapList);
  }, [filterBuffer]);

  const handleFilter = () => {
    setFilter(filterBuffer);
    getCropsList();
    console.log(filterBuffer);
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
            value={filterBuffer.cropName}>
            {newCropTypeList.map((item) => (
              <SelectItem
                key={item.id}
                value={item.label}
                onClick={() =>
                  setFilterBuffer({ ...filterBuffer, cropName: item.label })
                }>
                {item.label}
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
        </div>
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {getCropsList().map((item) => (
            <div key={item.id} className="max-w-80 w-fit max-h-96 h-fit">
              <Card key={item.id} className="w-full h-full m-4 shadow-lg">
                <CardBody>
                  <div className="flex flex-col justify-between items-center">
                    <div className="w-full h-fit">
                      <Image
                        src={item.img}
                        alt="crop"
                        className="rounded-xl object-contain h-full shadow-md"
                        width={800}
                        height={800}
                      />
                    </div>
                    <div className="py-3 flex items-center justify-between w-full">
                      <span className="text-xl capitalize line-clamp-2 tracking-wider">
                        {item.cropName}
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
                <CardFooter className="flex justify-between items-center gap-3 p-3">
                  <Model {...item} />
                  <Button color="success" className="text-xl ml-auto">
                    {item.price}/Kg
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
