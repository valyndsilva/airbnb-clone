import { signIn, signOut, useSession } from "next-auth/react";
import { GlobeAltIcon, MenuIcon, UserCircleIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { DateRange, DateRangePicker } from "react-date-range";
import NumberInput from "./NumberInput";
import { useRouter } from "next/router";
import { useMediaQuery } from "@react-hook/media-query";

function HeaderNav() {
  const isSmallScreen = useMediaQuery("(max-width: 36rem)");

  const { data: session } = useSession();
  console.log(session);

  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
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

  const handleSelectDate = (ranges) => {
    // console.log(ranges.selection);
    setCheckInDate(ranges.selection.startDate);
    // console.log(checkInDate);
    setCheckOutDate(ranges.selection.endDate);
    // console.log(checkOutDate);
  };

  // Opens the date range picker
  const openDatePicker = () => {
    setInputFocus(true);
    setLocation(" ");
    document.body.style.overflow = "hidden";
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
    // router.push("/search");
    setLocation("");
    setNumberOfAdults(0);
    setNumberOfChildren(0);
    setCheckInDate(new Date());
    setCheckOutDate(new Date());

    router.push({
      pathname: "/search",
      query: {
        location: location,
        checkInDate: checkInDate.toString().slice(0, 15),
        checkOutDate: checkOutDate.toString().slice(0, 15),
        guests: numberOfChildren + numberOfAdults,
      },
    });
    setTimeout(() => closeDatePicker(), 100);
  };

  const options = {
    rangeColors: ["#e0565b"],
    ranges: [selectionRange],
    minDate: new Date(),
    onChange: handleSelectDate,
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
            className="hidden lg:inline-flex col-start-1 col-span-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Logo
              color={
                scrolled || router.pathname !== "/" || inputFocus
                  ? "text-[#FF385C]"
                  : "text-white"
              }
            />
          </div>
          <div className="col-start-1 col-end-9  lg:col-start-3 lg:col-end-7">
            <div
              className={`${
                scrolled || router.pathname !== "/"
                  ? "hidden"
                  : inputFocus
                  ? " hidden justify-center items-center lg:flex space-x-5 mb-2 text-gray-500 "
                  : "hidden justify-center items-center lg:flex space-x-5 text-gray-200 mb-2"
              }`}
            >
              <h2 className="header__link">Places to stay</h2>
              <h2 className="header__link">Experiences</h2>
              <h2 className="header__link">Online Experiences</h2>
            </div>

            <SearchBar
              openDatePicker={openDatePicker}
              closeDatePicker={closeDatePicker}
              location={location}
              search={search}
              handleInputChange={handleInputChange}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              guests={numberOfChildren + numberOfAdults}
            />
          </div>
          <div className="hidden lg:inline-flex lg:col-start-7 lg:col-span-2 justify-end">
            <div className="flex justify-center items-center space-x-4">
              <p
                className={`hidden lg:inline-flex cursor-pointer
            ${
              scrolled || router.pathname !== "/"
                ? "text-gray-500"
                : inputFocus
                ? "text-gray-500"
                : "header__link text-gray-200"
            }`}
              >
                Become a host
              </p>
              <GlobeAltIcon
                className={`${
                  scrolled || router.pathname !== "/"
                    ? "text-gray-500"
                    : "text-white"
                } cursor-pointer hidden lg:inline-flex h-7`}
              />
              <div
                className={`flex items-center space-x-2 border p-2 rounded-full bg-gray-100 cursor-pointer
            ${scrolled ? "border-gray-300" : "border-transparent"}`}
              >
                <MenuIcon className="h-5 text-gray-500 cursor-pointer" />
                {session ? (
                  <img
                    className="h-6 w-6 rounded-full cursor-pointer"
                    src={session.user?.image}
                    alt="avatar"
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  />
                ) : (
                  <UserCircleIcon
                    className="h-6 text-gray-500 cursor-pointer"
                    onClick={signIn}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {inputFocus && (
        <div
          className={`${
            scrolled
              ? "datepicker flex flex-col  max-w-2xl mx-auto sticky h-fit shadow-md overflow-y-scroll scrollbar-hide top-[6.5rem] z-50 bg-white p-5 md:px-10 "
              : "datepicker flex flex-col  max-w-2xl mx-auto sticky h-screen overflow-y-scroll scrollbar-hide top-[10rem] z-50 bg-white p-5 md:px-10"
          }`}
        >
          {isSmallScreen ? (
            <DateRange {...options} />
          ) : (
            <DateRangePicker className="" {...options} />
          )}
          {/* <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#F5385D"]}
            onChange={handleSelectDate}
          /> */}
          <div className="flex justify-between border-b mb-5">
            <NumberInput
              name="Adults"
              value={numberOfAdults}
              setValue={setNumberOfAdults}
            />
            <NumberInput
              name="Children"
              value={numberOfChildren}
              setValue={setNumberOfChildren}
            />
          </div>
          <div className="flex space-x-5">
            <button
              onClick={closeDatePicker}
              className="datepicker__subButton flex-grow text-gray-500 bg-gray-50 active:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={search}
              className="datepicker__subButton flex-grow text-white bg-[#F77171] active:bg-[#f1868d]"
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
