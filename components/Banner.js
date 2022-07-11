import Image from "next/image";
import React from "react";
import BannerImg from "../public/banner-img.webp";
import { SearchBox } from "../components";

function Banner() {
  return (
    <div className="flex flex-col px-20 py-10 max-w-7xl mx-auto">
      <section className="flex space-x-4 ">
        <SearchBox className="" />
        <div className="relative hidden lg:inline-flex w-4/6 ">
          <Image
            src={BannerImg}
            alt="AirBnb Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority
          />
        </div>
      </section>
    </div>
  );
}

export default Banner;
// absolute h-80 right-0 z-10
