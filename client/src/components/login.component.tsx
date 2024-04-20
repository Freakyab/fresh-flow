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

type controlsProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

type loginComponentProps = {
  controls: controlsProps;
};

const LoginComponent = ({ controls }: loginComponentProps) => {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    username: "bhupendra",
    password: "Bangalore",
  });

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
    <div className="flex flex-col items-center w-[500px]  h-[500px] justify-center p-8 bg-white text-black rounded-b-md shadow-lg">
      <div className="flex space-x-4 ">
        <button
          className={`${
            userType === "Farmer" ? "bg-gray-300" : "bg-gray-100"
          } px-4 py-2 rounded-md focus:outline-none`}
          onClick={() => handleUserTypeChange("Farmer")}>
          Farmer
        </button>
        <button
          className={`${
            userType === "Customer" ? "bg-gray-300" : "bg-gray-100"
          } px-4 py-2 rounded-md focus:outline-none`}
          onClick={() => handleUserTypeChange("Customer")}>
          Customer
        </button>
        <button
          className={`${
            userType === "Warehouse Owner" ? "bg-gray-300" : "bg-gray-100"
          } px-4 py-2 rounded-md focus:outline-none`}
          onClick={() => handleUserTypeChange("Warehouse Owner")}>
          Warehouse
        </button>
      </div>
      <div className="flex flex-col w-full gap-4 mt-4">
        <InputWithImageComponent
          Image={<MdEmail size={25} className={"input-icon-color"} />}
          placeholder="Enter the username"
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          value={formData.username}
        />
        <InputWithImageComponent
          Image={
            <RiLockPasswordFill size={25} className={"input-icon-color"} />
          }
          placeholder="Password"
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
        />
        <p className="text-blue-500 font-medium text-center cursor-pointer">
          Forgot Password?
        </p>

        <button
          className="w-full h-12 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none"
          onClick={handleLogin}>
          Login
        </button>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-500 font-medium cursor-pointer"
            onClick={() => controls.setIsLogin(!controls.isLogin)}>
            Register
          </span>
        </p>
        <p className="text-center">Sign in with</p>
        <div className="flex justify-center space-x-4">
          <button className="w-1/2 h-12 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none">
            Facebook
          </button>
          <button className="w-1/2 h-12 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none">
            Google
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginComponent;
