import Image from "next/image";
import React from "react";
import AirbnbLg from "../public/airbnb-lg-logo.jpeg";


function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md p-5 md:px-10">
      <div className="grid grid-cols-2 max-w-6xl mx-auto">
        <div className="relative flex items-center h-10 cursor-pointer my-auto">
          <Image
            className="hidden"
            src={AirbnbLg}
            alt="Airbnb Logo"
            layout="fill"
            objectFit="contain"
            objectPosition="left"
          />
        </div>
        <div className=" flex space-x-4 justify-end items-center text-sm">
          <p className="hidden md:inline-flex">Become a host</p>
          <p>Help</p>
          <p>Sign up</p>
          <p>Log in</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
