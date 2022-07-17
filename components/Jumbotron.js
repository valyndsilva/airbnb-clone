import Image from "next/image";
import React from "react";
import { SearchBox } from ".";

function Banner() {
  return (
    <div className=" h-[550px] sm:h-[650px] md:h-[680px] bg-[url('/images/hero.jpg')] bg-cover bg-center mb-10">
      <span className="flex flex-col max-w-7xl w-96  pl-20 pt-60">
        <h2 className="text-3xl text-white md:text-6xl  font-bold">
          Holiday Homes & Online Experiences
        </h2>
        <button className="py-4 px-3 w-40 bg-white mt-5 rounded-lg shadow-sm text-sm font-semibold hover:bg-gray-300">
          Explore Now
        </button>
      </span>
    </div>
  );
}

export default Banner;
// absolute h-80 right-0 z-10
