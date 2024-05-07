"use client";
import Image from "next/image";
import React from "react";
import LoginComponent from "../../components/login.component";
import RegisterComponent from "../../components/register.component";
import { Tabs, Tab } from "@nextui-org/react";

export default function login() {
  return (
    <>
      <div className="w-full min-h-screen p-3 flex flex-col justify-center items-center bg-black">
        <Tabs aria-label="Options">
          <Tab key="login" title="Login">
            <RegisterComponent />
          </Tab>
          <Tab key="register" title="Register">
            <LoginComponent />
          </Tab>
        </Tabs>
      </div>

      {/* <Image
        src={"/login.jpg"}
        alt="Next.js"
        width={900}
        height={600}
        className="h-screen top-0 inset-0 z-[-10] w-screen absolute blur-sm"
      /> */}
    </>
  );
}
