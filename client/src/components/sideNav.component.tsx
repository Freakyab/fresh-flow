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
    <div className="flex flex-col justify-evenly items-center bg-gray-200 min-h-screen h-full w-64">
      {/* Circular Profile Image */}
      <div className="p-2">
        <img
          className="w-[150px] h-[150px] rounded-full object-center"
          src="https://lh3.googleusercontent.com/-935HM2R1INU/AAAAAAAAAAI/AAAAAAAAAAA/AFNEGgIfLim9kZl0b-32K9B0EORXkAmFEQ/photo.jpg"
          alt="Profile"
          width={150}
          height={150}
        />
      </div>

      {/* Array of Attributes */}
      <div className="w-full text-black py-4 overflow-y-auto">
        {options.map(({ title, Icon, link }: Option, index: number) => (
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
        ))}
      </div>

      <button className="bg-red-500 flex items-center gap-2 text-white p-2 rounded-md">
        <IoIosLogOut size={25} />
        Logout
      </button>
    </div>
  );
};

export default SideNav;
