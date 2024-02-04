import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type Option =  {
  title: string;
  Icon: ReactNode;
  link: string;
}

type SideNavProps = {
  options: Option[];
}

const SideNav = ({ options }: SideNavProps) => {
  // Sample user attributes

  return (
    <div className="sideNav flex h-screen w-full flex-col bg-gray-200 items-center bg-muted p-3">
      {/* Circular Profile Image */}
      <div className="object-cover">
        <Image
          className="profileImage rounded-full
          object-cover object-center"
          src="/login.jpg"
          alt="Profile"
          width={150}
          height={150}
        />
      </div>

      {/* Array of Attributes */}
      <div className="attributes my-10 py-10   text-black"
      >
        {options.map(({ title, Icon,link }: Option, index: number) => {
          return (
            <div key={index} className="flex items-center gap-4">
              <Link href = {link} key={index}>
              <p className="text-xl">{title}</p>
              {Icon}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
