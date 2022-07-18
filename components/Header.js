import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { DateRangePicker } from "react-date-range";
import AirbnbLg from "../public/airbnb-lg-logo.jpeg";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import Logo from "./Logo";

function Header({ placeholder, collapsed }) {
  // Import router for navigation
  const router = useRouter();

  // Reference hearder element for scroll visibility
  const headerRef = useRef();
  const navRef = useRef(null);

  // State to determine whether header is filled or not
  const [fillHeader, setFillHeader] = useState(false);

  // State for controlled search input
  const [searchInput, setSearchInput] = useState("");

  // State for storing data for date range picker.
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numOfGuests, setNumOfGuests] = useState(null);
  const selectionRange = {
    startDate: checkInDate,
    endDate: checkOutDate,
    key: "selection",
  };

  // Updates startDate and endDate based on user selection
  const handleSelectDate = (ranges) => {
    setCheckInDate(ranges.selection.checkInDate);
    setCheckOutDate(ranges.selection.checkOutDate);
    console.log(ranges);
    console.log(checkInDate);
    console.log(checkOutDate);
  };

  // Fills header component when page is scrolled past half of the header height
  const handleScroll = () => {
    if (!headerRef.current) return;
    const { clientHeight } = headerRef.current;

    if (window.pageYOffset > clientHeight / 2) {
      setFillHeader(true);
    } else {
      setFillHeader(false);
    }
  };

  // Check if header component is set to collapsed. If true fill header component
  useEffect(() => {
    if (collapsed) {
      setFillHeader(true);
    } else {
      document.onload = handleScroll();
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Resets data
  const resetInput = () => {
    setSearchInput("");
    setNumOfGuests(1);

    if (collapsed) return;
    setFillHeader(false);
  };

  // Handles controlled search input
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setFillHeader(true);
  };

  // Opens the date range picker
  const triggerDatePicker = () => {
    setSearchInput(" ");
    setFillHeader(true);
    document.getElementById("mainInput").focus();
  };

  // Submits data from range picker to the search page.
  const search = () => {
    setLocation("");
    setNumOfGuests(1);
    router.push({
      pathname: "/search",
      query: {
        location: location,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        numOfGuests,
      },
    });
  };
  return (
    <header
      ref={headerRef}
      className={`${collapsed ? "sticky" : "fixed"}  ${
        fillHeader
          ? "bg-white transition ease-in-out duration-500 shadow-md"
          : "transition duration-500"
      } w-full top-0 z-50 grid grid-cols-6 bg-trasparent p-5 md:px-10`}
    >
      <div
        className="relative hidden md:flex items-center h-10 cursor-pointer text-gray-800 col-start-1 col-end-2"
        onClick={() => router.push("/")}
      >
        <Logo color={fillHeader ? "text-[#FF385C]" : "text-white"} />
      </div>

      {/* Mid Section */}
      {/* Small input */}
      <form
        className={`flex flex-grow z-50 items-center border-2 rounded-full bg-gray-100 md:hidden col-start-1 col-end-7 focus-within:shadow-sm `}
      >
        <input
          value={searchInput}
          onChange={handleInputChange}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-700 focus:placeholder-transparent w-full text-center"
          type="text"
          placeholder={"Where are you going?"}
        />
        <SearchIcon className="h-10 bg-red-400 text-white rounded-full p-2 cursor-pointer" />
      </form>

      {/* Normal input */}
      <form
        className={`${
          fillHeader ? "flex md:flex" : "hidden"
        } hidden z-40 items-center border-2 rounded-full py-2 bg-gray-100 md:shadow-sm col-start-3 col-end-5 focus-within:shadow-sm `}
      >
        <input
          id="mainInput"
          value={searchInput}
          onChange={handleInputChange}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeholder || "Where are you going?"}
          onClick={triggerDatePicker}
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </form>

      <div
        className={`${
          fillHeader
            ? "pointer-events-none opacity-0 w-0 transform -translate-y-10 transition duration-200 ease-in-out"
            : "transition duration-300"
        } hidden md:block absolute top-24 lg:top-8 left-[50%] transform -translate-x-1/2 w-[90%] md:w-[85%] lg:w-2/3 max-w-4xl`}
      >
        <div className="flex items-center justify-center gap-x-8 text-gray-200 mb-8">
          <h2 className="header__link active">Places to stay</h2>
          <h2 className="header__link">Experiences</h2>
          <h2 className="header__link">Online Experiences</h2>
        </div>

        <div
          onClick={triggerDatePicker}
          className="grid grid-cols-4 divide-x-2 items-center bg-white rounded-full"
        >
          <div className="pl-6 py-3 hover:bg-gray-100 rounded-full cursor-pointer">
            <h3 className="text-xs font-bold">Location</h3>
            <input
              className="outline-none text-sm text-gray-100 focus:text-gray-800 placeholder-gray-400 bg-transparent w-3/4 trunc"
              type="text"
              placeholder="Where are you going?"
            />
          </div>

          <div className="flex flex-col pl-6 justify-center hover:bg-gray-100 rounded-full cursor-pointer h-full">
            <label className="text-xs font-bold">Check in</label>
            {/* <p className="text-sm text-gray-600">Add dates</p> */}
            <input
              className="truncate outline-none bg-transparent text-sm text-gray-600 placeholder-gray-400"
              disabled
              placeholder="Add dates"
              value={checkInDate}
            />
          </div>

          <div className="flex flex-col pl-6 justify-center hover:bg-gray-100 rounded-full cursor-pointer h-full">
            <label className="text-xs font-bold">Check out</label>
            {/* <p className="text-sm text-gray-600">Add dates</p> */}
            <input
              className="truncate outline-none bg-transparent text-sm text-gray-600 placeholder-gray-400"
              disabled
              placeholder="Add dates"
              value={checkOutDate}
            />
          </div>

          <div className="flex items-center flex-grow pl-6 hover:bg-gray-100 rounded-full cursor-pointer h-full">
            <div className="flex flex-col  w-2/3">
              <label className="text-xs font-bold">Guests</label>
              <input
                className="truncate outline-none bg-transparent text-sm text-gray-600 placeholder-gray-400"
                disabled
                placeholder="Add guests"
                value={numOfGuests}
              />
            </div>
            <SearchIcon className="hidden md:inline-flex h-12 bg-red-400 text-white rounded-full cursor-pointer p-2 mx-2" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex space-x-4 items-center justify-end col-start-5 col-end-7">
        <p
          className={`hidden md:inline whitespace-nowrap ${
            fillHeader ? "text-gray-500" : "text-gray-300"
          }`}
        >
          Become a host
        </p>

        <GlobeAltIcon
          className={`${fillHeader ? "text-gray-500" : "text-gray-300"} h-7`}
        />

        <div
          className={`flex items-center space-x-2 border p-2 rounded-full bg-gray-100 ${
            fillHeader ? "border-gray-300" : "border-transparent"
          }`}
        >
          <MenuIcon className="h-5 text-gray-500" />
          <UserCircleIcon className="h-6 text-gray-500" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-6 mx-auto mt-5 p-5 rounded-xl shadow">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelectDate}
            className="calpicker"
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex items-center flex-grow font-semibold">
              Number of Guests
              <UsersIcon className="hidden sm:block h-5 ml-3" />
            </h2>

            <div className="flex items-center bg-gray-100 shadow-sm rounded-md">
              <button
                onClick={() => setNumOfGuests(numOfGuests - 1)}
                className="guestAmtBtn"
              >
                -
              </button>

              <input
                value={numOfGuests}
                onChange={(e) => setNumOfGuests(e.target.value)}
                min={1}
                type="number"
                className="w-5 text-lg outline-none text-gray-500 bg-gray-100 numInput ml-3 mr-2"
              />

              <button
                onClick={() => setNumOfGuests(numOfGuests + 1)}
                className="guestAmtBtn"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={resetInput}
              className="flex-grow text-white bg-gray-500 py-2 px-4 rounded-lg opacity-90 hover:opacity-100 shadow-sm hover:shadow-md"
            >
              Cancel
            </button>

            <button
              onClick={search}
              className="flex-grow text-white py-2 px-4 bg-red-400 rounded-lg opacity-90 hover:opacity-100 shadow-sm hover:shadow-md"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
