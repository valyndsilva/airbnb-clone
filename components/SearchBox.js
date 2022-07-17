import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Search() {
  const numberofPeople = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // console.log(numberofPeople);
  return (
    <section className="w-full bg-white border shadow-md rounded-lg  lg:w-1/2">
      <div className="p-5">
        <h3 className="text-xl font-semibold">Find places to stay on Airbnb</h3>
        <p className="text-md text-gray-500">
          Discover entire homes and private rooms perfect for any trip.
        </p>

        <div className="flex relative py-3">
          <span className="absolute uppercase items-center text-xs font-semibold text-gray-900 rounded-l-md p-4">
            Location
          </span>
          <input
            type="text"
            id="website-admin"
            className="rounded-lg border border-gray-300 text-gray-900 focus:ring-black focus:border-black block flex-1 min-w-0 w-full text-md px-3  pt-8 pb-2"
            placeholder="Anywhere"
          />
        </div>
        <div className="flex rounded-lg border border-gray-300 ">
          <div className="flex-grow relative">
            <span className="absolute uppercase items-center text-xs font-semibold text-gray-900 rounded-l-md p-4">
              Check in
            </span>
            <input
              type="text"
              id="website-admin"
              className=" border-r-2 text-gray-900 focus:ring-black focus:border-black block flex-1 min-w-0 w-full text-sm px-4  pt-8 pb-2"
              placeholder="Add Date"
            />
          </div>
          <div className="flex-grow relative">
            <span className="absolute uppercase items-center text-xs font-semibold text-gray-900 rounded-l-md p-4">
              Check out
            </span>
            <input
              type="text"
              className=" text-gray-900 focus:ring-black focus:border-black block flex-1 min-w-0 w-full text-sm px-4  pt-8 pb-2"
              placeholder="Add Date"
            />
          </div>
        </div>
        <div className="flex rounded-lg border border-gray-300 mt-2 ">
          <div className="flex-grow relative">
            <span className="absolute uppercase items-center text-xs font-semibold text-gray-900 rounded-l-md p-4">
              Adults
            </span>
            <Menu
              as="div"
              className=" border-r-2 text-gray-900 focus:ring-black focus:border-black block flex-1 min-w-0 w-full text-md px-3  pt-8 pb-2"
            >
              <div>
                <Menu.Button className="inline-flex justify-between w-full rounded-md  px-1 bg-white text-sm  text-gray-500 focus:outline-none ">
                  Add Adults
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {numberofPeople.map((person, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {person}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="flex-grow relative">
            <span className="absolute uppercase items-center text-xs font-semibold text-gray-900 rounded-l-md p-4">
              Children
            </span>
            <Menu
              as="div"
              className=" text-gray-900 focus:ring-black focus:border-black block flex-1 min-w-0 w-full text-md px-3  pt-8 pb-2"
            >
              <div>
                <Menu.Button className="inline-flex justify-between w-full rounded-md  px-1 bg-white text-sm  text-gray-500 focus:outline-none ">
                  Add Children
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {numberofPeople.map((person, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {person}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="flex-col pt-2">
          <span className="uppercase items-center text-xs font-semibold text-gray-900 rounded-l-md p-4">
            Wifi
          </span>
          <div className="space-x-4 p-3">
            <button className="rounded-full border p-2">Hot tub</button>
            <button className="rounded-full border p-2">Wifi</button>
            <button className="rounded-full border p-2">Free Parking</button>
          </div>
        </div>
        <button className="flex  items-center  justify-center rounded-lg bg-[#DA0B64] text-white border p-4 w-full">
          <SearchIcon className="w-4 h-5 mr-1" />
          Search
        </button>
      </div>
    </section>
  );
}

export default Search;
