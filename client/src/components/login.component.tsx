"use client";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import InputWithImageComponent from "./inputWithimage.component";
import useUserDetails from "@/redux/dispatch/useUserDetails";
import handleToast from "./toastifyNotification";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { Button, Chip, Input } from "@nextui-org/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const LoginComponent = () => {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    username: "bhupendra",
    password: "Bangalore",
  });
  const [isVisible, SetIsVisible] = useState(false);

  const router = useRouter();

  const { signup, getUserDetails } = useUserDetails();

  useEffect(() => {
    if (getUserDetails().userDetails.username !== "") {
      router.push(`/dashboard/${getUserDetails().userDetails.type}/profile`);
    }
  }, []);

  const handleUserTypeChange = (type: string) => {
    setUserType(type);
  };

  const handleLogin = async () => {
    if (
      formData.username === "" ||
      formData.password === "" ||
      userType === ""
    ) {
      handleToast("Please fill all the fields", "error");
    } else {
      const user =
        userType === "Warehouse Owner" ? "warehouse" : userType.toLowerCase();
      // await fetch(`http://localhost:5000/${user}/login`,
      await fetch(`https://fresh-flow-backend.vercel.app/${user}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "/",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            handleToast(data.error, "error");
          } else {
            if (!data.id) {
              handleToast("User not found", "error");
              return;
            }
            signup(formData.username, data.id, data.token, user);
            if (user === "farmer") {
              router.push("/dashboard/farmer/profile");
            } else if (user === "customer") {
              router.push("/dashboard/customer/profile");
            } else {
              router.push("/dashboard/warehouse/profile");
            }
          }
        });
    }
  };

  return (
    <div className="flex flex-col items-center w-[500px] h-full justify-center p-8 bg-white text-black rounded-md shadow-lg">
      <div className="flex gap-3">
        <Button
          color={userType === "Farmer" ? "success" : "primary"}
          variant="bordered"
          onClick={() => handleUserTypeChange("Farmer")}>
          Farmer
        </Button>
        <Button
          color={userType === "Customer" ? "success" : "primary"}
          variant="bordered"
          onClick={() => handleUserTypeChange("Customer")}>
          Customer
        </Button>
        <Button
          color={userType === "Warehouse Owner" ? "success" : "primary"}
          variant="bordered"
          onClick={() => handleUserTypeChange("Warehouse Owner")}>
          Warehouse
        </Button>
      </div>
      <div className="flex flex-col w-full gap-4 mt-4">
        <Input
          placeholder="Enter the username"
          value={formData.username}
          type="text"
          label="Username"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <Input
          placeholder="Enter the Password"
          value={formData.password}
          label="password"
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
        <Button
          className="w-full h-12 bg-primary text-white rounded-md hover:bg-gray-800 focus:outline-none"
          onClick={handleLogin}>
          Login
        </Button>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <span className="text-blue-500 font-medium cursor-pointer">
            Register
          </span>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginComponent;
