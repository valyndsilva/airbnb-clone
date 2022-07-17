import Image from "next/image";
import React from "react";

function MediumCard({ img, title, description }) {
  return (
    <div className="cursor-pointer  hover:scale-105 transition transform duration-300 ease-out rounded-xl">
      <div className="relative h-80 w-80 hover:shadow-xl ">
        <Image src={img} alt={title} layout="fill" className="rounded-xl" />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
      <p className="text-lg">{description}</p>
    </div>
  );
}

export default MediumCard;
