import Image from "next/image";
import React from "react";
import { StarIcon } from "@heroicons/react/solid";

function Testimonials() {
  return (
    <section>
      <h3 className="text-2xl py-1">
        What guests are saying about homes in United Kingdom
      </h3>
      <p className="text-gray-500">
        Over <span className="font-semibold">17,000,000 guest reviews</span>{" "}
        with an average of{" "}
        <span className="font-semibold">4.8 out of 5 stars</span>
      </p>
      <div className="py-4 md:flex md:space-x-4">
        <div>
          <div className="relative w-full h-72">
            <Image
              src="/testimonials-1.webp"
              layout="fill"
              className="rounded-lg"
            />
          </div>
          <div className="flex">
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
          </div>

          <p className="text-sm">
            “A lovely seaside escape and Sian made as feel very welcome. Great
            location and a lovely flat.”
          </p>
          <div className="flex space-x-4 items-center py-3">
            <div className="relative w-10 h-10">
              <Image
                src="/user-1.webp"
                layout="fill"
                className="rounded-full"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-md">Prymslew</h3>
              <p className="font-light">United Kngdom</p>
            </div>
          </div>
        </div>
        <div>
          <div className="relative w-full h-72">
            <Image
              src="/testimonials-2.webp"
              layout="fill"
              className="rounded-lg"
            />
          </div>
          <div className="flex">
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
          </div>

          <p className="text-sm">
            “A lovely seaside escape and Sian made as feel very welcome. Great
            location and a lovely flat.”
          </p>
          <div className="flex space-x-4 items-center py-3">
            <div className="relative w-10 h-10">
              <Image
                src="/user-2.webp"
                layout="fill"
                className="rounded-full"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-md">Prymslew</h3>
              <p className="font-light">United Kngdom</p>
            </div>
          </div>
        </div>{" "}
        <div>
          <div className="relative w-full h-72">
            <Image
              src="/testimonials-3.webp"
              layout="fill"
              className="rounded-lg"
            />
          </div>
          <div className="flex">
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
            <StarIcon className="w-5 h-5 text-red-400 my-4" />
          </div>

          <p className="text-sm">
            “A lovely seaside escape and Sian made as feel very welcome. Great
            location and a lovely flat.”
          </p>
          <div className="flex space-x-4 items-center py-3">
            <div className="relative w-10 h-10">
              <Image
                src="/user-3.webp"
                layout="fill"
                className="rounded-full"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-md">Prymslew</h3>
              <p className="font-light">United Kngdom</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
