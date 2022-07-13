import { useRouter } from "next/router";
import React, { useState } from "react";
import { Footer, HeaderSecondary, InfoCard, MapComponent } from "../components";
import { format } from "date-fns";
import { SearchIcon } from "@heroicons/react/solid";

function Search({ searchResults }) {
  console.log(searchResults);
  const router = useRouter();
  console.log(router.query);
  const { location, startDate, endDate, numberOfGuests } = router.query; // ES6 Destructuring
  const fomrmattedStartDate = format(new Date(startDate), "dd MMMM yyyy");
  const fomrmattedEndDate = format(new Date(endDate), "dd MMMM yyyy");
  const range = `${fomrmattedStartDate} - ${fomrmattedEndDate}`;
  const [filterResults, setFilterResults] = useState("");
  return (
    <div className="">
      <HeaderSecondary
        placeholder={`${location} | ${range} | ${numberOfGuests} ${
          numberOfGuests == 1 ? " guest" : " guests"
        }`}
      />
      <main className=" py-14 flex bg-gray-50 relative">
        <section className="flex-grow  px-6 md:px-16">
          <div className="w-full flex items-center justify-between">
            <p className="text-xs mb-7">
              300+ Stays - {range} for {numberOfGuests}
              {numberOfGuests == 1 ? " guest" : " guests"}
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
          <div className=" flex w-auto bg-white p-5 rounded-md shadow-sm">
            <div className="flex items-center h-20 w-full px-2 rounded-md py-2 shadow-md ">
              <input
                className=" flex-grow outline-none ml-2 text-gray-500"
                type="text"
                value={filterResults}
                placeholder="Filter By Price"
                onChange={(e) => setFilterResults(e.target.value)}
              />
              <SearchIcon className="h-8 mr-5 cursor-pointer" />
            </div>
          </div>
          {/* </div> */}
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
