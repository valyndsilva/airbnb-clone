import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";

function InfoCard({
  images,
  location,
  title,
  description,
  star,
  price,
  latitude,
  longitude,
  total,
  setViewLocation,
}) {
  const locationObj = {
    images,
    location,
    title,
    description,
    star,
    price,
    latitude,
    longitude,
    total,
  };
  const sliderOptions = {
    useGPURender: true,
    showNavs: false,
    showBullets: true,
    loop: true,
    autoPlay: true,
    autoPlayDelay: 2,
    startIndex: 3,
    navStyle: 1,
    navSize: 50,
    navMargin: 30,
    duration: 1,
    bgColor: "#000",
  };

  return (
    <div
      onClick={() => setViewLocation(locationObj)}
      className="md:flex py-7 pr-4 px-2 border-b  cursor-pointer  hover:shadow-lg transition duration-200 ease-out first:border-t"
    >
      <div className="simple-slider mb-5 md:mb-0">
        <SimpleImageSlider
          width={400}
          height={225}
          images={images}
          showBullets={sliderOptions.showBullets}
          showNavs={sliderOptions.showNavs}
          loop={sliderOptions.loop}
          autoPlay={sliderOptions.autoPlay}
          autoPlayDelay={sliderOptions.autoPlayDelay}
          startIndex={sliderOptions.startIndex}
          useGPURender={sliderOptions.useGPURender}
          navStyle={sliderOptions.navStyle}
          navSize={sliderOptions.navSize}
          navMargin={sliderOptions.navMargin}
          slideDuration={sliderOptions.duration}
        />
      </div>

      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="text-xl">{title}</h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="w-5 h-5 text-red-400 my-4" /> {star}
          </p>
          <div>
            <p className="text-lg lg:text-2xl font-semibold pb-2">{price}</p>
            <p className="text-right font-extralight">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
