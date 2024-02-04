"use client";
import Image from "next/image";
import React, { useState } from "react";
import LoginComponent from "../../components/login.component";
import RegisterComponent from "../../components/register.component";

export default function login() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="justify-start flex w-[500px] ">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className={`w-[100px] h-10 mt-4 rounded-t-md ${
              isLogin ? " text-white bg-black" : "text-black  bg-white"
            }`}>
            Login{" "}
          </button>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className={`w-[100px] h-10 mt-4 rounded-t-md ${
              !isLogin ? " text-white bg-black" : "text-black  bg-white"
            }`}>
            Register{" "}
          </button>
        </div>
        {isLogin ? <LoginComponent /> : <RegisterComponent />}
      </div>
      <Image
        src={"/login.jpg"}
        alt="Next.js"
        width={900}
        height={600}
        className="h-screen top-0 inset-0 z-[-10] w-screen absolute blur-sm"
      />
    </>
  );
}
