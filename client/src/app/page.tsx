import React from "react";
import { Footer } from "../components/footer.component";


export default function Home() {
  const Features = [
    {
      title: "Farmer",
      description:
        "Farmers can easily manage their produce, book storage space, and arrange transportation, while warehouses optimize their capacity usage.",
    },
    {
      title: "Warehouse Owner",
      description:
        "Warehouses can create profiles on the platform, showcasing their services, location, and available storage capacity.",
    },
    {
      title: "Customer",
      description:
        "Customers can explore a diverse range of agricultural produce available on the platform and make direct purchases from farmers.",
    },
  ];
  const AppInfo = [
    {
      title: "Farmer",
      image: "/appInfo0.jpg",
      description: `Farmer Registration and Profile: Farmers can sign up on the platform and create profiles, sharing details about their farms.
        Warehouse and Cold Storage Information: Farmers can access
        information about available warehouses and cold storage
        facilities, including their locations and services. Inventory
        Management: Farmers can keep track of the crops they have stored
        in warehouses or cold storage. Booking and Reservations: Farmers
        can book space in warehouses or cold storage based on their needs
        and the available capacity. Logistics Services: The platform helps
        farmers arrange transportation for their produce from farms to
        storage and then to markets. Real-time Monitoring: Farmers and
        warehouse operators receive real-time alerts about storage
        conditions, ensuring the safety of the produce. Optimization
        Algorithms: The platform suggests ways to maximize storage space,
        benefiting both farmers and warehouse operators. Marketplace for
        Selling Produce: Farmers can sell their produce directly to
        buyers, retailers, or distributors through an online marketplace.
        Quality Assessment: The platform assesses the quality of stored
        produce, helping farmers market high-quality products. Weather
        Forecast Integration: Farmers can plan their activities based on
        weather forecasts, improving harvest and storage planning.
        `,
    },
    {
      title: "Warehouse Owner",
      image: "/appInfo2.jpg",
      description: `    Profile and Visibility:
        
        Warehouses can create profiles on the platform, showcasing their services, location, and available storage capacity.
        Capacity Management:
        
        Efficient tools allow warehouses to manage and optimize their storage capacity, ensuring optimal utilization.
        Booking and Reservations:
        
        Warehouses can easily handle bookings and reservations, allowing them to plan for incoming produce and manage space effectively.
        Real-time Monitoring:
        
        Receive real-time alerts and monitoring for storage conditions, ensuring the safety and quality of stored produce.
        Logistics Integration:
        
        Seamlessly integrate with logistics services to streamline transportation from farms to storage and onwards to markets.
        Marketplace Access:
        
        Gain access to the platform's marketplace, connecting warehouses with potential buyers and distributors.`,
    },
    {
      title: "Customer",
      image: "/login.jpg",
      description: `   Explore and Purchase:
        
        Customers can explore a diverse range of agricultural produce available on the platform and make direct purchases from farmers.
        Verified Quality:
        
        The platform ensures quality assurance by implementing a system to assess and verify the quality of the stored produce.
        Transparent Marketplace:
        
        A transparent and user-friendly marketplace allows customers to view detailed information about products, prices, and the farmers supplying them.
        Efficient Logistics:
        
        Integrated logistics services guarantee timely and efficient delivery of purchased produce from warehouses to the customer's location.
        Real-time Availability:
        
        Customers can access real-time information on the availability of products, helping them make informed buying decisions.
        Customized Orders:
        
        The platform supports customized orders, enabling customers to specify their requirements and receive tailored product offerings.
        Market Trends Insights:
        
        Analytics tools provide insights into market trends, helping customers anticipate demand and make strategic purchasing decisions.
        Educational Resources:
        
        Access to educational materials ensures customers stay informed about the quality and benefits of different agricultural products.`,
    },
  ];
  return (
    <main>
      {/* Header */}
      {/* <Navbar /> */}
      {/* Hero Section */}
      <div className="heroSection my-0.5 h-[400px] w-full bg-[url('/hero.jpg')] bg-cover md:h-[600px] lg:h-[800px] xl:h-[900px]">
        <div className="heroSection__content flex h-full flex-col items-start justify-center p-4 text-white md:p-8 lg:p-12">
          <h1 className="mb-4 text-2xl font-bold md:text-4xl lg:text-6xl xl:text-8xl">
            FreshFlow
          </h1>
          <h2 className="mb-4 px-2 text-sm font-medium text-black md:text-base lg:text-lg xl:text-2xl">
            "Fresh Flow" streamlines food storage management by cataloging
            items, sending expiration alerts, suggesting recipes based on
            inventory, and offering storage tips. Its intuitive interface and
            data insights reduce waste, save money, and promote healthier
            eating, making it ideal for households and professional kitchens
            seeking efficient inventory control.
          </h2>
          <a
            className="m-4 rounded-md bg-white px-3 py-1 text-black md:m-8 md:px-4 md:py-2 lg:m-12 lg:px-6 lg:py-3"
            href="/login"
          >
            Explore
          </a>
        </div>
      </div>
      {/* Features Section */}
      <div className="w-full p-4 text-black md:p-8 lg:p-12">
        <h1 className="m-2 scroll-m-20 text-2xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
          Features
        </h1>
        <div className="mx-4 flex flex-wrap justify-between sm:mx-6 md:mx-8 lg:mx-12">
          {Features.map((item, i) => (
            <div
              key={i}
              className="card m-2 flex h-80 flex-col items-center justify-center gap-5 rounded-xl border border-input p-2 md:m-4 md:h-96 md:p-3 xl:w-1/4"
            >
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="scroll-m-20 overflow-clip text-ellipsis p-2 text-center text-sm font-normal tracking-tight md:text-base xl:text-lg">
                {item.description}
              </p>
              <a
                className="mt-2 rounded-md bg-black px-2 py-1 text-white md:mt-4 md:px-4 md:py-2 xl:mt-6 xl:px-6 xl:py-3"
                href="/login"
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* App Info */}
      {AppInfo.map((item, i) => (
        <div
          key={i}
          className={`flex w-full items-center justify-center gap-5 p-4 text-black md:p-8 lg:p-12 ${
            i % 2 != 0
              ? " flex-col md:flex-row-reverse"
              : "flex-col md:flex-row"
          }`}
        >
          <div className=" h-[500px] w-full md:w-1/2">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>

          <div className="mb-4 w-full md:mb-0 md:w-1/2">
            <h3 className="m-2 scroll-m-20 p-2 text-xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
              {item.title}
            </h3>
            <p className="p-2 text-justify text-sm md:text-base lg:text-lg">
              {item.description}
            </p>
          </div>
        </div>
      ))}

      <Footer />
    </main>
  );
}