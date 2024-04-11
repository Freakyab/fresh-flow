"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useUserDetails from "@/redux/dispatch/useUserDetails";

function Header() {
  const router = useRouter();
  const { logout, getUserDetails } = useUserDetails();
  return (
    <div className="flex top-0 z-50 bg-black h-24 w-full items-center justify-between bg-primary ">
      <div className="mx-3">
        <button>
          <h1
            className="text-3xl font-bold text-white"
            onClick={() => {
              router.push("/login");
              logout();
            }}>
            Fresh Flow
          </h1>
        </button>
      </div>
      <div className="mx-5 flex justify-evenly">
        <span className="mx-3">
          <button
            className="text-white text-primary hover:bg-secondary"
            onClick={() => router.push("/login")}>
            Register
          </button>
        </span>
        <span className="mx-3">
          {!getUserDetails().userDetails.username ? (
            <button
              className="text-white text-primary hover:bg-secondary"
              onClick={() => router.push("/login")}>
              Login
            </button>
          ) : (
            <button className="text-white text-primary hover:bg-secondary">
              {getUserDetails().userDetails.username}
            </button>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;
