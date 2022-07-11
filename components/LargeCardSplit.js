import Image from "next/image";
import React from "react";

function LargeCard({ img, title, description, buttonText }) {
  return (
    <section className="relative py-5 cursor-pointer text-white">
      <div className=" sm:hidden bg-[#2F2B28] rounded-xl py-10 px-10 top-32 left-12">
        <h3 className="text-4xl mb-3 w-64">{title}</h3>
        <p className="w-56">{description}</p>
        <button className="text-sm text-gray-900 bg-white px-4 py-2 rounded-lg mt-5">
          {buttonText}
        </button>
      </div>
      <div className="relative h-60 sm:h-80   min-w-[300px]">
        <Image
          src={img}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="hidden sm:block absolute top-24 left-12">
        <h3 className="text-4xl mb-3 w-64">{title}</h3>
        <p className="w-56">{description}</p>
        <button className="text-sm text-gray-900 bg-white px-4 py-2 rounded-lg mt-5">
          {buttonText}
        </button>
      </div>
    </section>
  );
}

export default LargeCard;
