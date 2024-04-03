"use client";
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// import Map from "@/components/location";

import cropsType from "@/components/dataSample/cropsType";
import warehouseDetailData from "@/components/dataSample/warehouseData";

import {
  Card,
  CardBody,
  CardFooter,
  Link,
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

interface CenterProp {
  location: number[];
}

const Map = dynamic(() => import("@/components/location"), { ssr: false });

const FarmerMarketplacePage = () => {
  const [open, setOpen] = React.useState(false);
  const [flyOn, setFlyOn] = React.useState([0, 0]);
  const [location, setLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  React.useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      // console.log(position.coords.latitude, position.coords.longitude);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [location]);

  const handleCenter = (e: CenterProp) => {
    setFlyOn([e.location[0], e.location[1]]);
  };

  const cardRefs = warehouseDetailData.map(() =>
    React.useRef<HTMLDivElement>(null)
  );

  return (
    <div className="w-[99%] m-2 border-black border-2 d-hight">
      <div className="w-full h-full flex">
        <div className="bg-white p-3 w-1/2 h-full flex flex-col gap-3">
          <div className="flex gap-3">
            <Select
              label="Select Crop Type"
              placeholder={cropsType[0].label}
              className="max-w-xs">
              {cropsType.map((e) => (
                <SelectItem key={e.id} value={e.label}>
                  {e.label}
                </SelectItem>
              ))}
            </Select>
            <Input
              placeholder="Search for crops"
              className="max-w-xs"
              size={"lg"}
            />
          </div>
          <div className="overflow-auto p-2 gap-3">
            {warehouseDetailData.map((warehouse, index) => (
              <div
                ref={cardRefs[index]}
                onClick={() => handleCenter({ location: warehouse.location })}
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
                        description={warehouse.ownerName}
                        avatarProps={{
                          src: warehouse.image,
                        }}
                      />
                      <div className="flex flex-col gap-3">
                        <span className="flex gap-2 items-center">
                          Temperature:{" "}
                          <Chip variant="bordered">
                            Low : {warehouse.facility.temperature.low}°C
                          </Chip>
                          <Chip variant="bordered">
                            High : {warehouse.facility.temperature.high}°C
                          </Chip>
                        </span>
                        <span>
                          Capacity :{" "}
                          <Chip color="warning" variant="bordered">
                            {warehouse.facility.capacity} tons
                          </Chip>
                        </span>
                        <span>
                          Security :{" "}
                          <Chip color="success" variant="bordered">
                            {warehouse.security}
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
                            <DropdownItem key="services">
                              <span>Services:</span>
                              <Chip color="primary" variant="bordered">
                                {warehouse.servicesOffered}
                              </Chip>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>
                  </CardBody>
                  <Divider />
                  <CardFooter className="flex justify-between items-center p-3">
                      <Link href={`/warehouse/${warehouse._id}`}>
                        View Details
                      </Link>
                      <span className="text-xl ml-auto">{warehouse.price}/kg</span>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <Map
          cardRefs={cardRefs}
          className="w-1/2 h-full"
          FlyOn={{ lat: flyOn[0], lng: flyOn[1] }}
        />
      </div>
    </div>
  );
};

export default FarmerMarketplacePage;