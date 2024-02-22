"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Check, ChevronsUpDown } from "lucide-react";
import  Map  from "./../../../components/location" ;

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
  const [location, setLocation] = React.useState({
    latitude: 0,
    longitude: 0
  });

  React.useEffect(()=>{
    navigator.geolocation.watchPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  },[location])

  // Update the location state when the user's location changes


  return (
    <div className="grid w-full h-full">
      <div className="grid p-4 relative">
        <Image
          src="/appInfo2.jpg"
          alt="image"
          width={600}
          height={600}
          className="col-span-2 row-start-1 col-start-1 w-full h-40 object-cover rounded-xl bg-opacity-115"
        />

        {/* Dark gradient overlay */}

        <div className="grid h-full w-full bg-gradient-to-r from-black to-transparent rounded-xl row-start-1 col-start-1 row-span-2 gap-4 p-4 text-white relative">
          <h1 className="text-4xl font-bold row-span-2 px-2">
            Farmer Marketplace
          </h1>
          <span className="flex text-black items-center h-12 w-full">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  //   variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[150px] justify-evenly">
                  <ChevronsUpDown className="h-10 w-4 shrink-0 opacity-50" />
                  {value
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : "Select location..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}>
                        <Check
                          className={cn(
                            " w-4",
                            value === framework.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <input
              id="searchInput"
              type="text"
              placeholder="Search for products..."
              className="px-2 bg-gray-200 h-full w-1/2 rounded-l-md outline-none"
            />
            <FaSearch className="text-black w-8 rounded-r-lg h-full p-2 bg-white" />
          </span>
          {/* Additional UI elements can be added here */}

        </div>
      </div>
          <Map location={location} />
    </div>
  );
};

export default FarmerMarketplacePage;
