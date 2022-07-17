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
import DatePicker from "./DatePicker";

function Header({ placeholder, collapsed }) {
  // Import router for navigation
  const router = useRouter();

  // Reference header element for scroll visibility
  const headerRef = useRef();
  const [scrolled, setScrolled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const primaryLocationRef = useRef(null);
  const secondaryLocationRef = useRef(null);

  // State for storing data for date range picker.
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numOfGuests, setNumOfGuests] = useState(0);

  const selectionRange = {
    startDate: checkInDate,
    endDate: checkOutDate,
    key: "selection",
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Updates checkInDate and checkOutDate based on user selection
  const handleSelectDate = (ranges) => {
    setCheckInDate(ranges.selection.checkInDate);
    setCheckOutDate(ranges.selection.checkOutDate);
  };

  // Handles controlled search input
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  // Opens the date range picker
  const openDatePicker = () => {
    setInputFocus(true);
    setLocation(" ");
    document.body.style.overflow = "hidden";
    // setTimeout(() => {
    //   if (!isSmallScreen && secondaryLocationRef.current) {
    //     secondaryLocationRef.current.focus();
    //   }
    // }, 10);
  };

  const closeDatePicker = () => {
    setInputFocus(false);
    setLocation("");
    setNumOfGuests(1);
    // setNumberOfChildren(0);
    // setNumberOfAdults(0);
    setCheckInDate(new Date());
    setCheckOutDate(new Date());
    document.body.style.overflow = "initial";
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
    <>
      <header
        ref={headerRef}
        className={`${
          scrolled || inputFocus || router.pathname !== "/"
            ? "scrolled bg-white transition"
            : null
        } fixed w-full top-0 z-50 grid grid-cols-8 bg-transparent p-5 md:px-10 items-center`}
      >
        {/* Logo */}
        <div
          className="relative hidden md:flex items-center h-10 cursor-pointer text-gray-800 col-start-1 col-end-2"
          onClick={() => router.push("/")}
        >
          <Logo
            color={scrolled || inputFocus ? "text-[#FF385C]" : "text-white"}
          />
        </div>

        {/* Search Bar */}
        <div className="col-start-3 col-end-7">
          <div
            className={`${
              scrolled
                ? "hidden"
                : "flex items-center justify-center gap-x-8 text-gray-200 mb-8"
            }`}
          >
            <h2 className="header__link active">Places to stay</h2>
            <h2 className="header__link">Experiences</h2>
            <h2 className="header__link">Online Experiences</h2>
          </div>
          <form
            className={`${
              inputFocus
                ? "hidden"
                : "flex z-50 items-center border-2 rounded-full py-2 bg-gray-100  col-start-3 col-end-7  md:shadow-sm focus-within:shadow-sm"
            }`}
          >
            <input
              id="mainInput"
              value={location}
              onChange={handleInputChange}
              className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
              type="text"
              placeholder={placeholder || "Where are you going?"}
              onClick={openDatePicker}
              ref={primaryLocationRef}
            />
            <SearchIcon className=" h-9 bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2" />
          </form>
        </div>

        {/* <div
        className={`${
          scrolled
            ? "pointer-events-none opacity-0 w-0 transform -translate-y-10 transition duration-200 ease-in-out"
            : "transition duration-300"
        } hidden md:block absolute top-24 lg:top-8 left-[50%] transform -translate-x-1/2 w-[90%] md:w-[85%] lg:w-2/3 max-w-4xl`}
      >
        <div className="flex items-center justify-center gap-x-8 text-gray-200 mb-8">
          <h2 className="header__link active">Places to stay</h2>
          <h2 className="header__link">Experiences</h2>
          <h2 className="header__link">Online Experiences</h2>
        </div>

        {/* <div
          onClick={openDatePicker}
          className="grid grid-cols-4 divide-x-2 items-center bg-white rounded-full"
        >
          <div className="pl-6 py-3 hover:bg-gray-100 rounded-full cursor-pointer">
            <h3 className="text-xs font-bold">Location</h3>
            <input
              className="outline-none text-sm text-gray-100 focus:text-gray-800 placeholder-gray-400 bg-transparent w-3/4 trunc"
              type="text"
              placeholder="Where are you going?"
              ref={secondaryLocationRef}
            />
          </div>

          <div className="flex flex-col pl-6 justify-center hover:bg-gray-100 rounded-full cursor-pointer h-full">
            <h3 className="text-xs font-bold">Check in</h3>
            <p className="text-sm text-gray-600">Add dates</p>
          </div>

          <div className="flex flex-col pl-6 justify-center hover:bg-gray-100 rounded-full cursor-pointer h-full">
            <h3 className="text-xs font-bold">Check out</h3>
            <p className="text-sm text-gray-600">Add dates</p>
          </div>

          <div className="flex items-center pl-6 hover:bg-gray-100 rounded-full cursor-pointer h-full">
            <div className="flex flex-col flex-grow">
              <h3 className="text-xs font-bold">Guests</h3>
              <p className="text-sm text-gray-600">Add guests</p>
            </div>
            <SearchIcon className="hidden md:inline-flex h-12 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
          </div>
        </div> 
      </div> */}

        {/* Right Menu */}
        <div className="hidden md:flex space-x-4 items-center  col-start-7 col-end-9 justify-end ">
          <p
            className={`hidden md:inline whitespace-nowrap ${
              scrolled ? "text-gray-500" : "text-gray-300"
            }`}
          >
            Become a host
          </p>

          <GlobeAltIcon
            className={`${scrolled ? "text-gray-500" : "text-gray-300"} h-7`}
          />

          <div
            className={`flex items-center space-x-2 border p-2 rounded-full bg-gray-100 ${
              scrolled ? "border-gray-300" : "border-transparent"
            }`}
          >
            <MenuIcon className="h-5 text-gray-500" />
            <UserCircleIcon className="h-6 text-gray-500" />
          </div>
        </div>
      </header>
      {inputFocus && (
        <div className="flex flex-col max-w-2xl mx-auto mt-20 py-8">
          <div
            onClick={openDatePicker}
            className="grid grid-cols-4 divide-x-2 shadow-lg  items-center bg-white rounded-full"
          >
            <div className="pl-6 py-3 hover:bg-gray-100 rounded-full cursor-pointer">
              <h3 className="text-xs font-bold">Location</h3>
              <input
                className="outline-none text-sm text-gray-600 focus:text-gray-800 placeholder-gray-400 bg-transparent w-3/4 trunc"
                type="text"
                placeholder="Where are you going?"
                ref={secondaryLocationRef}
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

            <div className="flex items-center pl-6 hover:bg-gray-100 rounded-full cursor-pointer h-full">
              <div>
                <label className="text-xs font-bold">Guests</label>
                <input
                  className="truncate outline-none bg-transparent text-sm text-gray-600 placeholder-gray-400"
                  disabled
                  placeholder="Add guests"
                  value={numOfGuests}
                />
              </div>
              {/* <SearchIcon className="hidden md:inline-flex h-10 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" /> */}
            </div>
          </div>
          <div className="flex flex-col col-span-6 mx-auto mt-5 p-5 rounded-xl shadow">
            <DatePicker
              search={search}
              close={closeDatePicker}
              checkIn={{ value: checkInDate, setValue: setCheckInDate }}
              checkOut={{ value: checkOutDate, setValue: setCheckOutDate }}
              numOfGuests={{
                value: numOfGuests,
                setValue: setNumOfGuests,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
