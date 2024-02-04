import { ReactNode } from "react";
import SideNav from "../../../components/sideNav.component";

interface FarmerDashboardProps {
  children: ReactNode;
}

const FarmerDashboard = ({ children }: FarmerDashboardProps) => {
  const options = [
    {
      title: "Profile",
      Icon: "profile",
      link: "/dashboard/farmer/profile",
    },
    {
      title: "Charts",
      Icon: "charts",
      link: "/dashboard/farmer/charts",
    },
    {
      title: "Orders",
      Icon: "orders",
      link: "/dashboard/farmer/orders",
    },
    {
      title: "Settings",
      Icon: "settings",
      link: "/dashboard/farmer/settings",
    },
  ];

  return (
    <div className="flex flex-row overflow-hidden">
      <section className="flex w-1/6 flex-col items-center">
        <SideNav options={options} />
      </section>

        <section className="flex h-screen w-5/6 overflow-hidden flex-col">
        {children}
      </section>
    </div>
  );
};

export default FarmerDashboard;
