"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import useMapLoading from "@/redux/dispatch/useMaploading";
import { latLngThreshold } from "@/components/marketPlace/location/filter";
import cropsTypeList from "@/components/dataSample/cropsType";

import { CiSearch } from "react-icons/ci";

import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Select,
  SelectItem,
  Input,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  DropdownItem,
} from "@nextui-org/react";
import handleToast from "@/components/toastifyNotification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface CenterProp {
  location: number[];
}

const Map = dynamic(() => import("@/components/location"), { ssr: false });

const FarmerMarketplacePage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [warehouseDetailData, setWarehouseDetailData] = useState<
    warehouseDetailDataProps[]
  >([]);

  const [newCropTypeList, setNewCropTypeList] = React.useState<cropsType[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const lastIndex = {
    id: cropsTypeList.length + 1,
    label: "All",
    image: "",
  };

  useEffect(() => {
    let newCropType = [...cropsTypeList, lastIndex];
    setNewCropTypeList(newCropType);
  }, []);

  useEffect(() => {
    // fetch("http://localhost:5000/warehouse/allwarehouse",{
    fetch("https://fresh-flow-backend.vercel.app/warehouse/allwarehouse", {
      // Access-Control-Allow-Origin : "*",
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
          setWarehouseDetailData(data);
          toggleLoad();
        } else {
          handleToast("No data found", "error");
        }
      });
  }, []);

  const {
    setFlyOn,
    getLoc,
    setSearch,
    getSearch,
    changeIsClicked,
    setFilterCrop,
    getFilterCrop,
  } = useMapLoading();

  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [location]);

  const handleCenter = (e: CenterProp) => {
    setFlyOn(e.location[0], e.location[1]);

    if (getLoc()) changeIsClicked(true);
  };

  const cardRefs =
    warehouseDetailData.length > 0
      ? warehouseDetailData.map(() => React.createRef<HTMLDivElement>())
      : [React.createRef<HTMLDivElement>()];

  const handleSubmit = (e: FormData) => {
    const searchValue = e.get("search");
    setSearch(searchValue !== null ? searchValue.toString() : "");
  };

  const handleRoute = (id: string) => {
    router.push(`/warehouse/${id}`);
  };

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  return (
    <div className="w-[99%] m-2 border-black border-2 d-hight">
      <div className="w-full h-full flex">
        <div className="bg-white p-3 w-1/2 h-full flex flex-col gap-3">
          <div className="flex gap-3">
            <Select
              label="Select Crop Type"
              placeholder="use the dropdown to select crop type"
              className="max-w-xs"
              onChange={(e) => setFilterCrop(e.target.value)}>
              {newCropTypeList
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((e) => (
                  <SelectItem key={e.label} value={e.label}>
                    {e.label.toLocaleUpperCase()}
                  </SelectItem>
                ))}
            </Select>
            <form action={handleSubmit} className="flex gap-3">
              <Input
                placeholder="Search By Loaction"
                className="max-w-xs"
                size={"lg"}
                name="search"
              />
              <Button
                type="submit"
                color="primary"
                className="max-w-xs"
                size={"lg"}>
                <CiSearch />
              </Button>
            </form>
          </div>
          <div className="overflow-auto p-2 gap-3">
            {warehouseDetailData &&
              warehouseDetailData.length > 0 &&
              warehouseDetailData
                .filter((item) => {
                  const selectedCrop = getFilterCrop().toLowerCase();
                  if (selectedCrop === "all" || selectedCrop === "")
                    return true;
                  else {
                    const itemCropTypes = item.typeOfCrop.map((crop) =>
                      crop.toLowerCase()
                    );
                    return itemCropTypes.includes(selectedCrop);
                  }
                })
                .filter((_, index) => index < 30)
                .filter((warehouse) => {
                  const searchLength = getSearch()?.length;
                  const userLocation = getLoc();

                  if (searchLength === 0 || !userLocation) return true; // No filtering required

                  const earthRadius = 6371; // Earth's radius in kilometers
                  const lat1 = userLocation.lat * (Math.PI / 180); // Convert latitude to radians
                  const lat2 = warehouse.location[0] * (Math.PI / 180);
                  const lon1 = userLocation.lng * (Math.PI / 180); // Convert longitude to radians
                  const lon2 = warehouse.location[1] * (Math.PI / 180);

                  const latDiff = Math.abs(lat2 - lat1); // Calculate absolute latitude difference
                  const lonDiff = Math.abs(lon2 - lon1); // Calculate absolute longitude difference

                  // Haversine formula to calculate distance between two points on a sphere
                  const a =
                    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
                    Math.cos(lat1) *
                      Math.cos(lat2) *
                      Math.sin(lonDiff / 2) *
                      Math.sin(lonDiff / 2);
                  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                  const distance = earthRadius * c; // Distance in kilometers

                  return distance <= latLngThreshold; // Compare distance with threshold in kilometers
                })
                .map((warehouse, index) => (
                  <div
                    ref={cardRefs[index]}
                    onClick={() =>
                      handleCenter({ location: warehouse.location })
                    }
                    key={index}
                    className="cursor-pointer">
                    <Card
                      // key={warehouse._id}
                      className="border-none mb-3 bg-primary-50">
                      <CardBody className="px-3 py-0 text-small text-default-400 flex flex-row">
                        <div className="p-3 w-fit">
                          <Image
                            alt="Warehouse"
                            className="object-cover h-full"
                            height={200}
                            src={warehouse.image}
                            width={200}
                          />
                        </div>
                        <div className="p-3">
                          <User
                            name={warehouse.name}
                            description={warehouse.name}
                            avatarProps={{
                              src: warehouse.image,
                            }}
                          />
                          <div className="flex flex-col gap-3">
                            <span className="flex gap-2 items-center">
                              Type:{" "}
                              <Chip variant="bordered">{warehouse.type}</Chip>
                            </span>

                            <span className="flex gap-2 items-center">
                              Max Capacity (in Mt):{" "}
                              <Chip variant="bordered">
                                {warehouse.capacity}
                              </Chip>
                            </span>
                            <span className="flex gap-2 items-center">
                              Registration Date :{" "}
                              <Chip variant="bordered">
                                {warehouse.registrationDate}
                              </Chip>
                            </span>
                            <span className="flex gap-2 items-center">
                              City | District :{" "}
                              <Chip variant="bordered">{warehouse.city}</Chip>
                            </span>
                            <span className="flex gap-2 items-center">
                              Address:{" "}
                              <Chip variant="bordered">
                                {warehouse.address}
                              </Chip>
                            </span>

                            <Dropdown>
                              <DropdownTrigger>
                                <Button variant="bordered">Get Contacts</Button>
                              </DropdownTrigger>
                              <DropdownMenu
                                aria-label="Static Actions"
                                className="flex justify-center items-center gap-3"
                                onClick={() => setOpen(!open)}>
                                <DropdownItem key="phone">
                                  <span>Phone no.:</span>
                                  <Chip color="primary" variant="solid">
                                    {warehouse.phoneNo}
                                  </Chip>
                                </DropdownItem>
                                <DropdownItem key="email">
                                  <span>Email:</span>
                                  <Chip color="success" variant="flat">
                                    {warehouse.email}
                                  </Chip>
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </div>
                      </CardBody>
                      <Divider />
                      <CardFooter className="flex justify-between items-center p-3">
                        <Button
                          color="primary"
                          variant="bordered"
                          onClick={() => handleRoute(warehouse._id)}>
                          View Details
                        </Button>
                        <Button
                          color="success"
                          variant="bordered"
                          onClick={() => handleRoute(warehouse._id)}>
                          {warehouse.price}/sqft
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
          </div>
        </div>
        <Map
          cardRefs={cardRefs}
          className="w-1/2 h-full"
          warehouseDetailData={warehouseDetailData}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default FarmerMarketplacePage;
