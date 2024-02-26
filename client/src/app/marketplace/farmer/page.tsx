"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Check, ChevronsUpDown } from "lucide-react";
import Map from "./../../../components/location";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
const FarmerMarketplacePage = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  // const [location, setLocation] = React.useState({
  //   latitude: 0,
  //   longitude: 0
  // });

  // React.useEffect(()=>{
  //   navigator.geolocation.watchPosition((position) => {
  //     setLocation({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude
  //     });
  //   });
  // },[location])

  // Update the location state when the user's location changes

  return (
    <div className="grid w-full h-full">
      <div className="grid p-4 relative">
        <Image
          src="/appInfo3.jpg"
          alt="image"
          width={800}
          height={800}
          className="col-span-2 row-start-1  blur-sm row-span-4 col-start-1 w-full h-[500px] object-cover rounded-xl bg-opacity-115"
        />

        {/* Dark gradient overlay */}

        <div className="flex justify-center items-center h-full w-full backdrop-brightness-50 rounded-xl row-start-1 col-start-1 col-span-2 row-span-4 gap-4 p-4 text-white relative">
          <div className="gap-2 flex flex-col">
            <h1 className="text-4xl font-bold row-span-2 px-2">
              Farmer Marketplace
            </h1>
            <span className="flex  bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg  py-2 px-4 text-black items-center h-20 w-full gap-2">
              <span className="flex">
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Search for products..."
                  className="px-2 bg-gray-200 h-12 w-[200px] rounded-l-md outline-none"
                />
                <FaSearch className="text-black w-8 rounded-r-lg h-12 p-2 bg-gray-300" />
              </span>
              <span className="flex">
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Search for location..."
                  className="px-2 bg-gray-200 h-12 w-[200px] rounded-l-md outline-none"
                />
                <FaSearch className="text-black w-8 rounded-r-lg h-12 p-2 bg-gray-300" />
              </span>
              <span className="flex">
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Search for category..."
                  className="px-2 bg-gray-200 h-12 w-[200px] rounded-l-md outline-none"
                />
                <FaSearch className="text-black w-8 rounded-r-lg h-12 p-2 bg-gray-300" />
              </span>
            </span>
          </div>
          {/* Additional UI elements can be added here */}
        </div>
      </div>
      {/* <Map location={location} /> */}
    </div>
  );
};

export default FarmerMarketplacePage;
