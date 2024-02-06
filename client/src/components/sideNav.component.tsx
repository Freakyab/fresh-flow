import React, { ReactNode } from "react";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

type Option = {
  title: string;
  Icon: ReactNode;
  link: string;
};

type SideNavProps = {
  options: Option[];
};

const SideNav = ({ options }: SideNavProps) => {
  // Sample user attributes

  return (
    <div className="sideNav flex h-full w-full flex-col justify-evenly bg-gray-200 items-center">
      {/* Circular Profile Image */}
      <div className="p-2">
        <Image
          className=" w-[150px] h-[160px] rounded-full
           object-center5"
          src="/login.jpg"
          alt="Profile"
          width={150}
          height={150}
        />
      </div>

      {/* Array of Attributes */}
      <div className="w-full h-72 text-black py-4">
        {options.map(({ title, Icon, link }: Option, index: number) => {
          return (
            <div
              key={index}
              className="w-full flex justify-center hover:bg-white gap-6 pl-4">
              <Link href={link} key={index}>
                <span className="flex p-2 py-4 w-[150px] gap-4 rounded-md hover:bg-white">
                  {Icon}
                  <p className="text-xl">{title}</p>
                </span>
              </Link>
            </div>
          );
        })}
      </div>

      <button className="bg-red-500 flex items-center gap-2 text-white p-2 rounded-md">
      <IoIosLogOut size={25} />
        Logout
      </button>
    </div>
  );
};

export default SideNav;
