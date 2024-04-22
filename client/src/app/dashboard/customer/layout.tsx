"use client";
import { ReactNode,useEffect } from "react";
import { useRouter } from "next/navigation";

import useUserDetails from "@/redux/dispatch/useUserDetails";

import SideNav from "@/components/sideNav.component";

import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { IoMdReorder } from "react-icons/io";
import { GrAnalytics } from "react-icons/gr";

interface FarmerDashboardProps {
  children: ReactNode;
}

const FarmerDashboard = ({ children }: FarmerDashboardProps) => {
  const options = [
    {
      title: "Profile",
      Icon: <CgProfile size={25} />,
      link: "/dashboard/customer/profile",
    },
    {
      title: "Charts",
      Icon: <GrAnalytics size={25} />,
      link: "/dashboard/customer/charts",
    },
    {
      title: "Orders",
      Icon: <IoMdReorder size={25} />,
      link: "/dashboard/customer/orders",
    },
    {
      title: "Settings",
      Icon: <IoSettingsOutline size={25} />,
      link: "/dashboard/customer/settings",
    }, 
    {
      title : "CartItems",
      Icon : <CiShoppingCart size={25} />,
      link : "/dashboard/customer/cartitems"
    }
  ];

  const { typeOfUser ,getUserDetails } = useUserDetails();
  const router = useRouter();
  useEffect(() => {
    if (typeOfUser() !== "customer") {
      alert("You are not authorized to view this page");
      router.push("/login");
    }
  }, []);

  return (
    <div className=" bg-white flex flex-row overflow-hidden h-full">
        <section className="flex sideNav w-1/4 flex-col items-center  p-2">
        <SideNav options={options} name={getUserDetails().userDetails.username} ownerName={"Username"} />
        </section>

      <div className="rounded-xl bg-light-bg m-3 w-full ">
        <section className="overflow-hidden flex h-full ">
          {children}
        </section>
      </div>
    </div>
  );
};

export default FarmerDashboard;
