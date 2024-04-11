import { ReactNode } from "react";
import { CgProfile } from "react-icons/cg";
import { GrAnalytics } from "react-icons/gr";
import { IoMdReorder } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import SideNav from "../../../components/sideNav.component";



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

  return (
    <div className=" bg-white flex flex-row overflow-hidden h-full">
        <section className="flex sideNav w-1/4 flex-col items-center  p-2">
          <SideNav options={options} />
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
