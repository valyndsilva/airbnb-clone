import Image from "next/image";
import React from "react";

function ExtraSmallCard({ img, location, distance }) {
  return (
    <div className="flex items-center m-2 mt-5 p-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 scale-100 hover:scale-110 transition transform duration-200 ease-out">
      <div className="relative h-16 w-16 shadow-xl">
        <Image src={img} layout="fill" className="rounded-lg " />
      </div>
      <div>
        <h2>{location}</h2>
        <h3>{distance}</h3>
      </div>
    </div>
  );
}

export default ExtraSmallCard;
