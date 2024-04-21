"use client";
import React from "react";
import { useRouter } from "next/navigation";

import useUserDetails from "@/redux/dispatch/useUserDetails";

function Header() {
  const router = useRouter();
  const { getUserDetails ,logout} = useUserDetails();

  const handleSubmit = () => {
    if (getUserDetails().userDetails.username) {
      if (getUserDetails().userDetails.type == "farmer") {
        router.push("/marketplace/farmer");
      } else {
        router.push("/marketplace/customer");
      }
    } else {
      router.push("/register");
    }
  };

  const handleLogin = () => {
    if (getUserDetails().userDetails.username) {
      router.push(`/dashboard/${getUserDetails().userDetails.type}/profile`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex top-0 z-50 bg-black h-24 w-full items-center justify-between bg-primary ">
      <div className="mx-3">
        <button>
          <h1
            className="text-3xl font-bold text-white"
            onClick={() => {
              // logout();
              router.push("/");
            }}>
            Fresh Flow
          </h1>
        </button>
      </div>
      <div className="mx-5 flex justify-evenly capitalize">
        <span className="mx-3">
          {getUserDetails().userDetails.type !== "warehouse" && (
            <button
              className="text-white text-primary "
              onClick={handleSubmit}>
              {getUserDetails().userDetails.username
                ? "MarketPlace"
                : "Register"}
            </button>
          )}
        </span>
        <span className="mx-3">
          <button
            className="text-white text-primary"
            onClick={handleLogin}>
            {getUserDetails().userDetails.username ? "Dashboard" : "Login"}
          </button>
        </span>
      </div>
    </div>
  );
}

export default Header;
