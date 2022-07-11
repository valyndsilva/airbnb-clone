import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import React, { useState } from "react";
import AirbnbLg from "../public/airbnb-lg-logo.jpeg";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";

function HeaderSecondary({ placeholder }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  // console.log(searchInput);
  const [startDate, setStartDate] = useState(new Date());
  // console.log(startDate);
  const [endDate, setEndDate] = useState(new Date());
  // console.log(endDate);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  // console.log(numberOfGuests);

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    // router.push("/search");
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(), //convert object to string
        endDate: endDate.toISOString(),
        numberOfGuests: numberOfGuests,
      },
    });
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    console.log(ranges);
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md p-5 md:px-10">
      <div className="grid grid-cols-3 max-w-6xl mx-auto">
        <div
          onClick={() => router.push("/")}
          className="relative flex items-center h-10 cursor-pointer my-auto"
        >
          <Image
            className="hidden"
            src={AirbnbLg}
            alt="Airbnb Logo"
            layout="fill"
            objectFit="contain"
            objectPosition="left"
          />
        </div>
        <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
          <input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
            type="text"
            placeholder={placeholder || "Start your search"}
          />
          <SearchIcon className="hidden md:inline-flex w-8 h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
        </div>
        <div className=" flex space-x-4 justify-end items-center text-sm text-gray-500">
          <p className="hidden md:inline-flex cursor-pointer">Become a host</p>
          <GlobeAltIcon className="h-6 w-6 cursor-pointer" />

          <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
            <MenuIcon className="h-6 w-6 cursor-pointer" />
            <UserCircleIcon className="h-6 cursor-pointer" />
          </div>
        </div>
        {searchInput && (
          <div className="flex flex-col col-span-3 mx-auto">
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={handleSelect}
            />
            <div className="flex items-center border-b mb-4">
              <h2 className="text-2xl flex-grow font-semibold">
                Number of Guests
              </h2>
              <UsersIcon className="h-5" />
              <input
                value={numberOfGuests}
                onChange={(e) => {
                  setNumberOfGuests(e.target.value);
                }}
                min={1} //Set min value of input field to 1
                type="number"
                className="w-12 pl-2 text-lg outline-none text-red-400"
              />
            </div>
            <div className="flex">
              <button onClick={resetInput} className="flex-grow text-gray-500">
                Cancel
              </button>
              <button onClick={search} className="flex-grow text-red-500">
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderSecondary;
