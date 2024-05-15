import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import handleToast from "./toastifyNotification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Input,
  Chip,
  Button,
} from "@nextui-org/react";
import { CgProfile } from "react-icons/cg";
import cropsTypeList from "./dataSample/cropsType";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const WarehouseOwnerRegisterform = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    registrationDate: "",
    phoneNo: 0,
    status: "",
    type: [] as string[],
    image: "",
    location: [] as number[],
    price: 0,
    email: "",
    occupied: "",
    typeOfCrop: [] as string[],
  });

  const [isGetCurrentLocation, setIsGetCurrentLocation] =
    useState<boolean>(true);
  const [isVisible, SetIsVisible] = useState(false);
  const getCurrentLocation = () => {
    if (isGetCurrentLocation) {
      handleToast("Fetching current location", "info");
      if (navigator.geolocation) {
        setTimeout(() => {
          navigator.geolocation.getCurrentPosition((position) => {
            handleToast(
              `Location fetched: \n Lat : ${position.coords.latitude} , Lng : ${position.coords.longitude}`,
              "success"
            );
            setFormData({
              ...formData,
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
  return (
    <Card className="m-3 h-[555px] bg-secondary" shadow="lg">
      <CardHeader>
        <div className="w-full flex gap-1 items-center">
          <CgProfile size={25} className="text-primary" />
          Profile Info
        </div>
      </CardHeader>
      <CardBody>
        <Swiper
          pagination={{ type: "progressbar", dynamicBullets: true }}
          navigation={true}
          modules={[Pagination, Navigation]}>
          <SwiperSlide>
            <div className="flex p-1 my-10 ml-[100px] gap-4 flex-col h-full w-[60%]">
              <div className="flex flex-col gap-8">
                <Input
                  label="Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Input
                  label="Owner Name"
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerName: e.target.value })
                  }
                />
                <Input
                  label="Username"
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                <Input
                  value={formData.password}
                  label="Password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  endContent={
                    <Chip
                      className="focus:outline-none"
                      onClick={() => SetIsVisible(!isVisible)}>
                      {isVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </Chip>
                  }
                  type={isVisible ? "text" : "password"}
                />
                <Input
                  value={formData.confirmPassword}
                  label="Conform Password"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  endContent={
                    <Chip
                      className="focus:outline-none"
                      onClick={() => SetIsVisible(!isVisible)}>
                      {isVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </Chip>
                  }
                  type={isVisible ? "text" : "password"}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex p-1 my-10 ml-[100px] gap-4 flex-col h-full w-[60%]">
              <div className="flex flex-col gap-8">
                <Input
                  label="Registration Date"
                  type="text"
                  value={formData.registrationDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationDate: e.target.value,
                    })
                  }
                />

                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Input
                  label="Phone No"
                  type="number"
                  value={formData.phoneNo.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phoneNo: parseInt(e.target.value),
                    })
                  }
                />
                <Input
                  label="Address"
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <Input
                  label="City"
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex p-1 my-10 ml-[100px] gap-4 flex-col h-full w-[60%]">
              <div className="flex flex-col gap-8">
                <Select
                  label="type"
                  variant="bordered"
                  color="primary"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: [e.target.value] })
                  }>
                  <SelectItem key="hot" value="hot">
                    Hot
                  </SelectItem>
                  <SelectItem key="cold" value="cold">
                    Cold
                  </SelectItem>
                </Select>
                <Input
                  label="Occupied"
                  type="text"
                  value={formData.occupied}
                  onChange={(e) =>
                    setFormData({ ...formData, occupied: e.target.value })
                  }
                />

                <Input
                  label="State"
                  type="text"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
                <Input
                  label="Warehouse Image"
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
                <Input
                  label="Warehouse Rent"
                  type="number"
                  value={formData.price.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="grid grid-cols-3 gap-4 p-12 px-6">
              {cropsTypeList.map((crop) => (
                <Chip
                  key={crop.id}
                  className="cursor-pointer"
                  onClick={() => {
                    if (
                      formData.typeOfCrop.some((item) => item === crop.label)
                    ) {
                      setFormData({
                        ...formData,
                        typeOfCrop: formData.typeOfCrop.filter(
                          (item) => item !== crop.label
                        ),
                      });
                    } else {
                      setFormData({
                        ...formData,
                        typeOfCrop: [...formData.typeOfCrop, crop.label],
                      });
                    }
                  }}
                  color={
                    formData.typeOfCrop.some((item) => item === crop.label)
                      ? "success"
                      : "default"
                  }>
                  {crop.label}
                </Chip>
              ))}
              {/* For every selected crops render the input fields */}
            </div>
            <Button
              // onClick={handleSubmit}
              onClick={() => console.log(formData)}
              color="danger"
              variant="shadow"
              className="w-[50%] ml-[30px]">
              Submit
            </Button>
          </SwiperSlide>
        </Swiper> 
      </CardBody>
      <ToastContainer />
    </Card>
  );
};

export default WarehouseOwnerRegisterform;
