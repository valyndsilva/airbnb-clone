import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Footer,
  HeaderNav,
  HeaderSecondary,
  InfoCard,
  MapComponent,
} from "../components";
import { format } from "date-fns";
import { SearchIcon } from "@heroicons/react/solid";

function Search({ searchResults }) {
  console.log(searchResults);
  const router = useRouter();
  console.log(router.query);
  const { location, checkInDate, checkOutDate, guests } = router.query; // ES6 Destructuring
  const fomrmattedStartDate = format(new Date(checkInDate), "dd MMMM yyyy");
  const fomrmattedEndDate = format(new Date(checkOutDate), "dd MMMM yyyy");
  const range = `${fomrmattedStartDate} - ${fomrmattedEndDate}`;
  const [filterResults, setFilterResults] = useState("");
  return (
    <div className="">
      <HeaderNav
        locationS={location}
        checkInDateS={checkInDate}
        checkOutDateS={checkOutDate}
        guestsS={guests}
      />
      <main className=" py-14 flex bg-gray-50 relative top-20">
        <section className="flex-grow  px-6 md:px-16">
          <div className="w-full flex items-center justify-between">
            <p className="text-xs mb-7">
              300+ Stays in {location} - {range} for {guests}
              {guests == 1 ? " guest" : " guests"}
            </p>
          </div>
          <h1 className="text-3xl font-semibold mt-2 mb-6 capitalize">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex lg:flex-wrap lg:space-x-4 lg:space-y-4 mb-5 text-gray-800 whitespace-nowrap">
            <p className="pillButton mt-4 ml-4">Type Of Place</p>
            <p className="pillButton">Price</p>
            <p className="pillButton">Rooms and Beds</p>
            <p className="pillButton">More Filters</p>
          </div>
          <div className=" flex w-auto bg-white rounded-full shadow-md mb-4">
            <div className="flex items-center h-20 w-full px-2 rounded-md py-2  ">
              <input
                className=" flex-grow outline-none ml-4 text-gray-500"
                type="text"
                value={filterResults}
                placeholder="Search By Title, Description or Price"
                onChange={(e) => setFilterResults(e.target.value)}
              />
              <SearchIcon className="h-8 mr-5 cursor-pointer" />
            </div>
          </div>
          <div>
            {searchResults
              .filter((item) => {
                if (filterResults === "") {
                  return item;
                } else if (
                  item.price
                    .toLowerCase()
                    .includes(filterResults.toString().toLowerCase()) ||
                  item.description
                    .toLowerCase()
                    .includes(filterResults.toString().toLowerCase()) ||
                  item.title
                    .toLowerCase()
                    .includes(filterResults.toString().toLowerCase())
                ) {
                  return item;
                }
              })
              .map(
                (
                  { img, location, title, description, star, price, total },
                  index
                ) => (
                  <InfoCard
                    key={index}
                    img={img}
                    location={location}
                    title={title}
                    description={description}
                    star={star}
                    price={price}
                    total={total}
                  />
                )
              )}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px] h-screen sticky top-20">
          <MapComponent
            searchResults={searchResults}
            filterResults={filterResults}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://jsonkeeper.com/b/5NPS").then(
    (data) => data.json()
  );
  return {
    props: {
      searchResults: searchResults,
    },
  };
}
