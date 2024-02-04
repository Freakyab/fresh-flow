"use client";

import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import InputWithImageComponent from "./inputWithimage.component";

const LoginComponent = () => {
  const [userType, setUserType] = useState("Farmer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleUserTypeChange = (type: string) => {
    setUserType(type);
  };

  return (
    <div className="flex flex-col items-center w-[500px] justify-center p-8 bg-white text-black rounded-b-md shadow-lg">
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
      <h2 className="text-2xl font-bold mt-4 ease-in duration-300">
        Hello {userType},
      </h2>
      <div className="flex flex-col w-full gap-4 mt-4">
        <InputWithImageComponent
          Image={<MdEmail size={25} />}
          placeholder="Email"
          type="text"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        />
        <InputWithImageComponent
          Image={<RiLockPasswordFill size={25} />}
          placeholder="Password"
          type="password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          value={formData.password}
        />
        <p className="text-blue-500 font-medium text-center cursor-pointer">Forgot Password?</p>
        
        <button className="w-full h-12 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none">
          Login
        </button>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <span className="text-blue-500 font-medium cursor-pointer">Register</span>
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
    </div>
  );
};

export default LoginComponent;
