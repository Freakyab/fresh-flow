"use client";
import React from "react";

import { GiFarmer } from "react-icons/gi";
import { FaWarehouse } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";

import FarmerRegisterform from "./farmerRegisterform.component";
import WarehouseOwnerRegisterform from "./warehouseOwnerRegisterform.component";
import CustomerRegisterform from "./customerRegisterform.component";

import { Tabs, Tab } from "@nextui-org/react";

const RegisterComponent = () => {

  return (
    
    <div className="flex flex-col items-center w-[500px] h-full justify-center bg-white text-black rounded-md shadow-lg">
      <div className="w-full h-full p-3 text-center">
        <Tabs aria-label="Options">
          <Tab
            key="Customer"
            title={
              <div className="flex gap-1 justify-center items-center">
                <GiFarmer size={20} />
                <span>Customer</span>
              </div>
            }>
            <div className="max-w-[500px]">
              <CustomerRegisterform />
            </div>
          </Tab>
          <Tab
            key="Famer"
            title={
              <div className="flex gap-1 justify-center items-center">
                <FaWarehouse size={20} />
                <span>Famer</span>
              </div>
            }>
            <div className="max-w-[500px]">
              <FarmerRegisterform />
            </div>
          </Tab>
          <Tab
            key="Warehouse Owner"
            title={
              <div className="flex gap-1 justify-center items-center">
                <IoPeopleSharp size={20} />
                <span>Warehouse Owner</span>
              </div>
            }>
            <div className="max-w-[500px]">
              <WarehouseOwnerRegisterform />
            </div>
            </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default RegisterComponent;
