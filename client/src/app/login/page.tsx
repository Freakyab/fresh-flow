"use client";
import Image from "next/image";
import React from "react";
import LoginComponent from "../../components/login.component";
import RegisterComponent from "../../components/register.component";
import { Tabs, Tab } from "@nextui-org/react";

export default function Login() {
  return (
    <div className="relative min-d-height h-full w-screen flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center p-3">
        <Tabs aria-label="Options" className="bg-white p-4 rounded-md shadow-lg">
          <Tab key="login" title="Login">
            <LoginComponent />
          </Tab>
          <Tab key="register" title="Register">
            <RegisterComponent />
          </Tab>
        </Tabs>
      </div>
      <Image
        src="/login.jpg"
        alt="Next.js"
        layout="fill"
        objectFit="cover"
        className="z-[-1] blur-sm absolute top-24"
      />
    </div>
  );
}
