import {
  CalendarIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import React from "react";

function Block({ title }) {
  return (
    <section className="border-b pb-4 mb-4">
      <h2 className="text-2xl pb-4 border-b">{title}</h2>

      <div className="py-4 md:flex md:space-x-4">
        <div>
          <ShieldExclamationIcon className="w-10 h-10 text-red-300 my-4" />
          <h3 className="font-semibold text-gray-900 text-md">
            Protection with AirCover
          </h3>
          <p className="text-sm">
            The most comprehensive protection in travel. Always included, always
            free.
          </p>
        </div>
        <div>
          <CalendarIcon className="w-10 h-10 text-red-300 my-4" />
          <h3 className="font-semibold text-gray-900 text-md">
            Flexible cancellation options
          </h3>
          <p className="text-sm">
            Cancellation options make it easy to rebook if your plans change.
          </p>
        </div>
        <div>
          <UserGroupIcon className="w-10 h-10 text-red-300 my-4" />
          <h3 className="font-semibold text-gray-900 text-md">
            24/7 customer support
          </h3>
          <p className="text-sm">
            Talk to our support team from anywhere in the world, any hour of the
            day.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Block;
