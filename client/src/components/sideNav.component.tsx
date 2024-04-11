"use client";
import React, { ReactNode, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { User, Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";

type Option = {
  title: string;
  Icon: ReactNode;
  link: string;
};

type SideNavProps = {
  options: Option[];
};

const SideNav = ({ options }: SideNavProps) => {
  const pathname = usePathname();
  const activeComponent = pathname.split("/").filter((item) => item !== "")[2];

  // Find the index of the active component
  const activeIndex = options.findIndex(
    (option) => option.title.toLowerCase() === activeComponent
  );

  const [selectedIndex, setSelectedIndex] = useState(
    activeIndex !== -1 ? activeIndex : 0
  );

  return (
    <div className="bg-white p-3 w-full flex flex-col justify-between">
      <h1 className="text-3xl capitalize tracking-tighter">
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
        <div className="flex flex-col gap-4 py-3">
          {options.map(({ title, Icon, link }: Option, index) => (
            <Link
              key={index}
              href={link}
              passHref
              className={`flex items-center py-2 px-2 gap-1 w-full rounded-3xl transition ease-in ${
                selectedIndex === index
                  ? "bg-black text-white"
                  : "bg-white hover:bg-light-bg"
              }`}
              onClick={() => setSelectedIndex(index)}>
              {Icon}
              <p className="text-xl font-light">{title}</p>
            </Link>
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
