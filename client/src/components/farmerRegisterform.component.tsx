import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import { CgProfile } from "react-icons/cg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import {
  Input,
  Card,
  CardHeader,
  CardBody,
  Button,
  Chip,
} from "@nextui-org/react";

import handleToast from "./toastifyNotification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import cropsTypeList from "@/components/dataSample/cropsType";
const FarmerRegisterform = () => {
  const [formData, setFormData] = useState({
    adharNo: "",
    farmerName: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    farmerContact: "",
    image: "",
    email: "",
    location: [] as number[],
    availableCrops: [] as availableCropsProps[],
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
              <div className="flex flex-col gap-10">
                <Input
                  label="Farmer Name"
                  type="text"
                  variant="flat"
                  value={formData.farmerName}
                  onChange={(e) =>
                    setFormData({ ...formData, farmerName: e.target.value })
                  }
                />

                <Input
                  label="Username"
                  type="text"
                  variant="flat"
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
              <div className="flex flex-col gap-10">
                <Input
                  variant="flat"
                  label="Aadhar Number"
                  type="number"
                  value={formData.adharNo}
                  onChange={(e) =>
                    setFormData({ ...formData, adharNo: e.target.value })
                  }
                />
                <Input
                  label="Phone Number"
                  type="number"
                  variant="flat"
                  value={formData.farmerContact}
                  onChange={(e) =>
                    setFormData({ ...formData, farmerContact: e.target.value })
                  }
                />
                <Input
                  variant="flat"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Input
                  variant="flat"
                  label="Address"
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="grid grid-cols-3 gap-4 p-12">
              {cropsTypeList.map((crop) => (
                <Chip
                  key={crop.id}
                  className="cursor-pointer"
                  onClick={() => {
                    if (
                      formData.availableCrops.some(
                        (item) => item.typeOfCrop === crop.label
                      )
                    ) {
                      setFormData({
                        ...formData,
                        availableCrops: formData.availableCrops.filter(
                          (item) => item.typeOfCrop !== crop.label
                        ),
                      });
                    } else {
                      setFormData({
                        ...formData,
                        availableCrops: [
                          ...formData.availableCrops,
                          { typeOfCrop: crop.label, quantity: 0, price: 0 },
                        ],
                      });
                    }
                  }}
                  color={
                    formData.availableCrops.some(
                      (item) => item.typeOfCrop === crop.label
                    )
                      ? "success"
                      : "default"
                  }>
                  {crop.label}
                </Chip>
              ))}
              {/* For every selected crops render the input fields */}
            </div>
          </SwiperSlide>
          {formData.availableCrops.length > 0 && (
            <SwiperSlide>
              <div className="flex p-4 ml-[100px] gap-4 flex-col max-h-[350px] w-[60%]">
                <div className="flex flex-col gap-4 overflow-y-auto">
                  {formData.availableCrops.map((crop, index) => (
                    <div key={index} className="flex flex-col gap-3">
                      <Input
                        label="Crop"
                        type="text"
                        variant="flat"
                        value={crop.typeOfCrop}
                        disabled
                      />
                      <Input
                        label="Quantity"
                        type="number"
                        variant="flat"
                        value={crop.quantity.toString()}
                        onChange={(e) => {
                          const crops = [...formData.availableCrops];
                          crops[index].quantity = Number(e.target.value);
                          setFormData({ ...formData, availableCrops: crops });
                        }}
                      />
                      <Input
                        label="Price"
                        type="number"
                        variant="flat"
                        value={crop.price.toString()}
                        onChange={(e) => {
                          const crops = [...formData.availableCrops];
                          crops[index].price = Number(e.target.value);
                          setFormData({ ...formData, availableCrops: crops });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          )}
          <SwiperSlide>
            <div className="flex p-1 my-10  ml-[100px] gap-4 flex-col h-full w-[60%]">
              <div className="flex flex-col gap-10">
                <Input
                  variant="flat"
                  label="City"
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
                <Input
                  variant="flat"
                  label="State"
                  type="text"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
                <Input
                  label="Location (lat,lng)"
                  type="text"
                  variant="flat"
                  value={
                    formData.location ? formData.location.join(",") : "" // Render empty string if location data is not available
                  }
                  onClick={getCurrentLocation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value.split(",").map(Number),
                    })
                  }
                />
            <Button
              // onClick={handleSubmit}
              onClick={() => console.log(formData)}
              color="danger"
              variant="shadow"
              className="w-[50%] ml-[30px]">
              Submit
            </Button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </CardBody>
      <ToastContainer />
    </Card>
  );
};

export default FarmerRegisterform;
