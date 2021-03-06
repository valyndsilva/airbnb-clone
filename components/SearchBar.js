import { SearchIcon } from "@heroicons/react/solid";
import React from "react";

function SearchBar({
  openDatePicker,
  location,
  handleInputChange,
  checkInDate,
  checkOutDate,
  guests,
}) {
  const checkIn = checkInDate.toString().slice(0, 15);
  // console.log(checkIn);
  const checkOut = checkOutDate.toString().slice(0, 15);
  // console.log(checkIn);
  return (
    <form className="bg-white grid grid-cols-9 shadow-lg border items-center rounded-full divide-x-2">
      <div className="col-start-1 col-span-2 overflow-hidden justify-center rounded-full cursor-pointer group">
        <div className="pl-6 py-2 group-hover:bg-gray-100 ">
          <label className="outline-none text-sm font-bold text-gray-600  ">
            Location
          </label>
          <input
            type="text"
            className="outline-none text-sm text-gray-600 group-hover:bg-gray-100  focus:text-gray-800 placeholder-gray-400 "
            placeholder="Add location"
            onFocus={openDatePicker}
            onChange={handleInputChange}
            value={location ? location : "Add location"}
          />
        </div>
      </div>
      <div className="col-start-3 col-span-2 overflow-hidden justify-center rounded-full cursor-pointer group">
        <div className="pl-6 py-2 group-hover:bg-gray-100 ">
          <label className="outline-none text-sm font-bold text-gray-600 ">
            Check-in
          </label>
          <input
            type="text"
            className="outline-none text-sm text-gray-600 group-hover:bg-gray-100  focus:text-gray-800 placeholder-gray-400 "
            placeholder="Add dates"
            defaultValue={checkInDate > new Date() ? checkIn : "Add dates"}
          />
        </div>
      </div>
      <div className="col-start-5 col-span-2 overflow-hidden justify-center rounded-full cursor-pointer group">
        <div className="pl-6 py-2 group-hover:bg-gray-100 ">
          <label className="outline-none text-sm font-bold text-gray-600">
            Check-out
          </label>
          <input
            type="text"
            className="outline-none text-sm text-gray-600 group-hover:bg-gray-100  focus:text-gray-800 placeholder-gray-400 "
            placeholder="Add dates"
            defaultValue={checkOutDate > new Date() ? checkOut : "Add dates"}
          />
        </div>
      </div>
      <div className=" col-start-7 col-span-2 overflow-hidden justify-center rounded-full cursor-pointer group">
        <div className="pl-6 py-2 group-hover:bg-gray-100 ">
          <label className="outline-none text-sm font-bold text-gray-600">
            Guests
          </label>
          <input
            type="text"
            className="outline-none text-sm text-gray-600 group-hover:bg-gray-100  focus:text-gray-800 placeholder-gray-400 "
            placeholder="Add guests"
            defaultValue={
              guests > 1
                ? `${guests} guests`
                : guests === 1
                ? `${guests} guest`
                : "Add guests"
            }
          />
        </div>
      </div>
      <SearchIcon className="h-12 bg-red-400 text-white rounded-full p-2 col-span-1 mx-auto cursor-pointer" />
    </form>
  );
}

export default SearchBar;
