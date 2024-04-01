import { ReactNode } from "react";
import { CgProfile } from "react-icons/cg";
import { GrAnalytics } from "react-icons/gr";
import { IoMdReorder } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import SideNav from "../../../components/sideNav.component";

interface FarmerDashboardProps {
  children: ReactNode;
}

const FarmerDashboard = ({ children }: FarmerDashboardProps) => {
  const options = [
    {
      title: "Profile",
      Icon: <CgProfile size={25} />,
      link: "/dashboard/farmer/profile",
    },
    {
      title: "Charts",
      Icon: <GrAnalytics size={25} />,
      link: "/dashboard/farmer/charts",
    },
    {
      title: "Orders",
      Icon: <IoMdReorder size={25} />,
      link: "/dashboard/farmer/orders",
    },
    {
      title: "Settings",
      Icon: <IoSettingsOutline size={25} />,
      link: "/dashboard/farmer/settings",
    },
  ];

  return (
    <div className="flex  flex-row overflow-hidden">
      <section className="flex sideNav w-1/6 flex-col items-center">
        <SideNav options={options} />
      </section>

      <section className="flex sidenavChildren min-h-screen h-full w-5/6 overflow-hidden flex-col">
        {children}
      </section>
    </div>
  );
};

export default FarmerDashboard;
