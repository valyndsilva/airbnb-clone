import { HeartIcon, HomeIcon } from "@heroicons/react/outline";
import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { DateRangePicker } from "react-date-range";
import NumberInput from "./NumberInput";
import { useRouter } from "next/router";
function HeaderNav() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

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

  // Handles controlled search input
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const selectionRange = {
    startDate: checkInDate,
    endDate: checkOutDate,
    key: "selection",
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
    setNumberOfChildren(0);
    setNumberOfAdults(0);
    setCheckInDate(new Date());
    setCheckOutDate(new Date());
    document.body.style.overflow = "initial";
  };

  // Submits data from range picker to the search page.
  const search = () => {
    setLocation("");
    setNumberOfGuests(1);
    router.push({
      pathname: "/search",
      query: {
        location: location,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        guests: numberOfChildren + numberOfAdults,
      },
    });
  };
  return (
    <>
      <header
        className={`fixed items-center w-full top-0 z-50 p-5 md:px-10 
      ${
        scrolled || router.pathname !== "/"
          ? "bg-white transition ease-in shadow-md pb-10"
          : null
      } `}
      >
        <div className="grid grid-cols-8 gap-4 h-12 items-center">
          <div
            className="hidden md:inline-flex col-start-1 col-span-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Logo color={scrolled ? "text-[#FF385C]" : "text-white"} />
          </div>
          <div className="col-start-1 col-end-9 md:col-start-3 md:col-end-8 lg:col-start-3 lg:col-end-7">
            <div
              className={
                scrolled
                  ? "hidden"
                  : " hidden justify-center items-center lg:flex space-x-5 text-gray-200 mb-2"
              }
            >
              <h2 className="header__link">Places to stay</h2>
              <h2 className="header__link">Experiences</h2>
              <h2 className="header__link">Online Experiences</h2>
            </div>
            <SearchBar
              openDatePicker={openDatePicker}
              closeDatePicker={closeDatePicker}
              search={search}
            />
          </div>
          <div className="hidden md:inline-flex md:col-start-8 md:col-span-1 lg:col-start-7 lg:col-span-2 justify-end">
            <div className="flex justify-center items-center space-x-4">
              <p
                className={`hidden lg:inline-flex 
            ${scrolled ? "text-gray-500" : " header__link text-gray-200"}`}
              >
                Become a host
              </p>
              <GlobeAltIcon
                className={`${
                  scrolled ? "text-gray-500" : "text-white"
                } hidden lg:inline-flex h-7`}
              />
              <div
                className={`flex items-center space-x-2 border p-2 rounded-full bg-gray-100 
            ${scrolled ? "border-gray-300" : "border-transparent"}`}
              >
                <MenuIcon className="h-5 text-gray-500" />
                <UserCircleIcon className="h-6 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </header>
      {inputFocus && (
        <div className="datepicker flex flex-col  max-w-2xl mx-auto sticky h-screen top-[10rem] z-50 bg-white p-5 md:px-10">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#F5385D"]}
            onChange={handleInputChange}
          />
          {/* <div className="flex items-center border-b my-4">
            <h2 className="text-md flex-grow font-semibold">Add Guests</h2>
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
            <button
              onClick={closeDatePicker}
              className="flex-grow text-gray-500"
            >
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-500">
              Search
            </button>
          </div> */}
          <div className="flex justify-between border-b mb-5">
            <NumberInput
              name="Adults"
              value={numberOfAdults.value}
              setValue={numberOfAdults.setValue}
            />
            <NumberInput
              name="Children"
              value={numberOfChildren.value}
              setValue={numberOfChildren.setValue}
            />
          </div>
          <div className="flex space-x-5">
            <button
              onClick={closeDatePicker}
              className="pillButton flex-grow text-gray-500 bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={search}
              className="pillButton flex-grow text-white bg-[#F77171]"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderNav;
