import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="relative bottom-0 h-auto w-full bg-black p-4 text-white md:p-8">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 flex flex-col items-center text-center md:mb-0 md:items-start md:text-left">
          <ul className="flex flex-col space-y-2 md:list-inside md:list-disc md:flex-row md:space-x-4 md:space-y-0">
            <li>
              <Link href="/">Terms of Use</Link>
            </li>
            <li>
              {" "}
              <Link href="/register/farmer">Register</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
          <p className="mt-2 md:mt-0">
            Copyright @2023 MindStack Inc. All rights reserved.
          </p>
        </div>
        <div className="flex items-center justify-center md:ml-8">
          <h3 className="text-sm md:text-xl">Mindstack</h3>
          <Image
            src={"/Mindstack.png"}
            width={40}
            height={40}
            alt="Mindstack Logo"
            className="ml-2 rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};