import React from "react";
// import { Button } from "../ui/button";
import Link from "next/link";

function Header() {
  return (
    <div className="flex top-0 z-50 bg-black h-24 w-full items-center justify-between bg-primary ">
      <div className="mx-3">
        <button>
          <h1 className="text-3xl font-bold text-white"><Link href="/">Fresh Flow</Link></h1>
        </button>
      </div>
      <div className="mx-5 flex justify-evenly">
        <span className="mx-3">
          <button  className="text-white text-primary hover:bg-secondary">
            <Link href="/login">Register</Link>
          </button>
        </span>
        <span className="mx-3">
          <button  className="text-white text-primary hover:bg-secondary">
            <Link href="/login">Login</Link>
          </button>
        </span>
      </div>
    </div>
  );
}

export default Header;