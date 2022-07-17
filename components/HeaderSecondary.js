import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AirbnbLg from "../public/airbnb-lg-logo.jpeg";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";

function HeaderSecondary({ placeholder }) {
  const headerRef = useRef(null);

  const router = useRouter();
  const [inputFocus, setInputFocus] = useState(false);
  const primaryLocationRef = useRef(null);
  const secondaryLocationRef = useRef(null);

  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const resetInput = () => {
    setInputFocus(true);
    setLocation("");
  };

  const search = (e) => {
    // router.push("/search");
    e.preventDefault();
    if (!location) {
      primaryLocationRef.current.focus();
      return;
    }
    router.push({
      pathname: "/search",
      query: {
        location: location,
        startDate: checkInDate.toISOString(), //convert object to string
        endDate: checkOutDate.toISOString(),
        numberOfGuests: numberOfGuests,
      },
    });
    setTimeout(() => closeDateRangePicker(), 100);
  };

  const openDateRangePicker = () => {
    setInputFocus(true);
    document.body.inputbox = "hidden";
    setTimeout(() => {
      if (secondaryLocationRef.current) {
        secondaryLocationRef.current.focus();
      }
    }, 10);
  };
  const closeDateRangePicker = () => {
    setInputFocus(false);
    // setLocation("");
    // setNumberOfChildren(0);
    // setNumberOfAdults(0);
    // setCheckInDate(new Date());
    // setCheckOutDate(new Date());
    // document.body.style.overflow = "initial";
  };

  const selectionRange = {
    startDate: checkInDate,
    endDate: checkOutDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    console.log(ranges);
    setCheckInDate(ranges.selection.checkInDate);
    setCheckOutDate(ranges.selection.checkOutDate);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (!headerRef.current.contains(event.target)) {
        closeDateRangePicker();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-white shadow-md p-5 md:px-10"
      >
        <div className="grid grid-cols-4 max-w-7xl mx-auto">
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
          <form className="flex col-span-2 items-center md:border-2 rounded-full py-2  md:shadow-sm">
            {!inputFocus ? (
              <input
                type="text"
                className="inputbox flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
                placeholder={placeholder || "Where are you going?"}
                ref={primaryLocationRef}
                value={location}
                onFocus={openDateRangePicker}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            ) : (
              <>
                <div className="w-full mr-4 ">
                  <label className="pl-5 ">Location</label>
                  <input
                    className="outline-none pl-5 bg-transparent text-gray-600 placeholder-gray-400"
                    value={location}
                    ref={secondaryLocationRef}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    placeholder="Where are you going?"
                  />
                </div>

                <div className="w-full overflow-hidden mr-4">
                  <label>Check-in</label>
                  <input
                    className="truncate outline-none bg-transparent text-gray-600 placeholder-gray-400"
                    disabled
                    placeholder="Add dates"
                    value={checkInDate}
                  />
                </div>

                <div className="w-full overflow-hidden mr-4">
                  <label>Check-out</label>
                  <input
                    className="truncate outline-none bg-transparent text-gray-600 placeholder-gray-400"
                    disabled
                    placeholder="Add dates"
                    value={checkOutDate}
                  />
                </div>

                <div className="w-full overflow-hidden mr-4">
                  <label>Guests</label>
                  <span className=" bg-transparent text-gray-600 placeholder-gray-400">
                    {numberOfGuests ? (
                      <p>{numberOfGuests} guests</p>
                    ) : (
                      <p className="empty">Add guests</p>
                    )}
                  </span>
                </div>
              </>
            )}

            <SearchIcon className="hidden md:inline-flex w-8 h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
          </form>

          <div className=" flex space-x-4 justify-end items-center text-sm text-gray-500">
            <p className="hidden md:inline-flex cursor-pointer">
              Become a host
            </p>
            <GlobeAltIcon className="h-6 w-6 cursor-pointer" />

            <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
              <MenuIcon className="h-6 w-6 cursor-pointer" />
              <UserCircleIcon className="h-6 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>
      {inputFocus && (
        <div className="flex flex-col  max-w-2xl mx-auto sticky top-[6rem] z-50 bg-white shadow-md p-5 md:px-10">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#F5385D"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">Add Guests</h2>
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
    </>
  );
}

export default HeaderSecondary;
