"use client";
import React, { ReactNode, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { User, Button } from "@nextui-org/react";

type Option = {
  title: string;
  Icon: ReactNode;
  link: string;
};

type SideNavProps = {
  options: Option[];
};

const SideNav = ({ options }: SideNavProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="bg-white p-3 w-full flex flex-col justify-between h-[80%]">
      <h1 className="text-3xl capitalize tracking-tighter 🤞">
        start your day be productive
      </h1>
      <div>
        <User
          name="Jane Doe"
          description="Product Designer"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
      </div>
      <div>
        <p className="font-bold tracking-widest uppercase py-3">Menu</p>
        <div className="flex flex-col gap-4">
          {options.map(({ title, Icon, link }: Option, index) => (
            <div key={index}>
              <Link href={link} onClick={() => setSelectedIndex(index)}>
                <span
                  className={`flex items-center py-2 px-2 gap-1 w-full rounded-3xl transition ease-in ${
                    selectedIndex === index
                      ? "bg-black text-white"
                      : "bg-white hover:bg-light-bg"
                  }`}>
                  {Icon}
                  <p className="text-xl font-light">{title}</p>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button color="danger" variant="bordered">
          <IoIosLogOut className="text-2xl" /> Logout
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
