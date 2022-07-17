import Image from "next/image";
import React from "react";

function SmallCard({ img, title }) {
  return (
    <div className="cursor-pointer hover:scale-105 transition transform duration-300 ease-out">
      <div className="relative h-96 w-96 sm:h-64 sm:w-64 md:w-60 md:h-60 lg:w-64 lg:h-64 rounded-xl hover:shadow-xl">
        <Image src={img} alt={title} layout="fill" className="rounded-xl" />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  );
}

export default SmallCard;
