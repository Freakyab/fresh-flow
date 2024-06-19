"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { User, Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import useUserDetails from "@/redux/dispatch/useUserDetails";

type Option = {
  title: string;
  Icon: ReactNode;
  link: string;
};

type SideNavProps = {
  options: Option[];
  name: string;
  ownerName: string;
};

const SideNav = ({ options, name, ownerName }: SideNavProps) => {
  const pathname = usePathname();
  const { logout } = useUserDetails();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const activeComponent = pathname
      .split("/")
      .filter((item) => item !== "")[2];

    setActiveIndex(
      options.findIndex(
        ({ title }) => title.toLowerCase() == activeComponent.toLowerCase()
      )
    );
    setSelectedIndex(activeIndex !== -1 ? options.findIndex(
      ({ title }) => title.toLowerCase() == activeComponent.toLowerCase()
    ) : 0);
  }, [pathname]);
  // Find the index of the active component

  const [selectedIndex, setSelectedIndex] = useState(
    activeIndex !== -1 ? activeIndex : 0
  );

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="bg-white p-3 w-full flex flex-col justify-between">
      <h1 className="text-xl capitalize tracking-tighter">
        start your day,<br/> be productive
      </h1>
      <div className="py-3">
        <User
          name={name}
          description={ownerName}
          avatarProps={{
            src: "/profile_img.png",
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
        <Button color="danger" variant="bordered" onClick={handleLogout}>
          <IoIosLogOut className="text-2xl" /> Logout
        </Button>
      </div>
    </div>
  );
};

export default SideNav;