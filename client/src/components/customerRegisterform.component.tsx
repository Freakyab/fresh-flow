import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  Chip,
  Button,
} from "@nextui-org/react";

import handleToast from "./toastifyNotification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerRegisterform = () => {
  const [isGetCurrentLocation, setIsGetCurrentLocation] =
    useState<boolean>(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    phoneNo: "",
    image: "",
    location: [] as number[],
  });
  const [isVisible, SetIsVisible] = useState(false);

  //   make img in buffer and send it to backend
  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0]; // Get the file from the input element

    // Check if a file is selected
    if (file) {
      const reader = new FileReader();

      // Listen to the load event, which is triggered when reading is completed
      reader.onload = () => {
        const base64 = reader.result; // Get the base64 encoded string
        setFormData({ ...formData, image: base64 ? base64.toString() : "" }); // Update the formData state with the image
      };

      // Read the file as a data URL (base64)
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      handleToast("Password and Confirm Password does not match", "error");
      return;
    }
    // await fetch("http://localhost:5000/customer/register", {
    await fetch("https://fresh-flow-backend.vercel.app/customer/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "/",
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        phoneNo: formData.phoneNo,
        image: formData.image,
        location: formData.location,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.id) {
          handleToast(data.message, "error");
        } else {
          console.log(data);
        }
      });
  };

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
            <div className="flex p-1 my-10  ml-[100px] gap-4 flex-col h-full w-[60%]">
              <div className="flex flex-col gap-10">
                <Input
                  label="Full Name"
                  type="text"
                  variant="flat"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
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
                  label="Email"
                  type="email"
                  variant="flat"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Input
                  label="Phone No"
                  type="text"
                  variant="flat"
                  value={formData.phoneNo}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNo: e.target.value })
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
                <Input
                  label="Address"
                  type="text"
                  variant="flat"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex p-1 my-10  ml-[100px] gap-4 flex-col h-full w-[60%]">
              <div className="flex flex-col gap-10">
                <Input
                  label="City"
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
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
                  label="Image"
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              <Button onClick={handleSubmit}
                color="danger"
                variant="shadow"
                className="w-[50%] ml-[30px]"
              >Submit</Button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </CardBody>
      <ToastContainer />
    </Card>
  );
};

export default CustomerRegisterform;
