"use client";
import React, { useState, ChangeEvent } from "react";
import InputRadioWithImageComponent from "./inputRadioWithImage.component";

import { GiFarmer } from "react-icons/gi";
import { FaWarehouse } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";

import FarmerRegisterform from "./farmerRegisterform.component";
import WarehouseOwnerRegisterform from "./warehouseOwnerRegisterform.component";
import CustomerRegisterform from "./customerRegisterform.component";

const RegisterComponent = () => {
  const [selectedUserType, setSelectedUserType] = useState("");

  const handleUserTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userType = e.target.value;
    setSelectedUserType(userType);
  };

  return (
    <div className="flex flex-col  w-[500px] min-h-[500px]  p-4 bg-white text-black rounded-b-md shadow-lg">
      {selectedUserType === "" && (
        <div className="flex flex-col justify-center h-full items-center">
          <h2 className="text-2xl mb-4 font-bold">Who are you?</h2>
          <div className="flex flex-col gap-4 max-w-[500px] ">
            <InputRadioWithImageComponent
              Image={<GiFarmer size={25} className={"input-icon-color"}/>}
              handleUserTypeChange={handleUserTypeChange}
              name="userType"
              value="Farmer"
            />
            <InputRadioWithImageComponent
              Image={<FaWarehouse size={25} className={"input-icon-color"}/>}
              handleUserTypeChange={handleUserTypeChange}
              name="userType"
              value="Warehouse Owner"
            />
            <InputRadioWithImageComponent
              Image={<IoPeopleSharp size={25} className={"input-icon-color"}/>}
              handleUserTypeChange={handleUserTypeChange}
              name="userType"
              value="Customer"
            />
          </div>
        </div>
      )}

      {selectedUserType === "Farmer" && (
        <FarmerRegisterform setSelectedUserType={setSelectedUserType} />
      )}
      {selectedUserType === "Warehouse Owner" && (
        <WarehouseOwnerRegisterform setSelectedUserType={setSelectedUserType} />
      )}
      {selectedUserType === "Customer" && (
        <CustomerRegisterform setSelectedUserType={setSelectedUserType} />
      )}

    </div>
  );
};

export default RegisterComponent;
