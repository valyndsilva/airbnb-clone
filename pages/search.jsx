import { useRouter } from "next/router";
import React from "react";
import { Footer, HeaderSecondary, InfoCard } from "../components";
import { format } from "date-fns";
import { data } from "autoprefixer";

function Search({ searchResults }) {
  console.log(searchResults);
  const router = useRouter();
  console.log(router.query);
  const { location, startDate, endDate, numberOfGuests } = router.query; // ES6 Destructuring
  const fomrmattedStartDate = format(new Date(startDate), "dd MMMM yyyy");
  const fomrmattedEndDate = format(new Date(endDate), "dd MMMM yyyy");
  const range = `${fomrmattedStartDate} - ${fomrmattedEndDate}`;
  return (
    <div className="h-screen">
      <HeaderSecondary
        placeholder={`${location} | ${range} | ${numberOfGuests} guests`}
      />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} for {numberOfGuests} number of guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6 capitalize">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex space-x-3 mb-5 text-gray-800 whitespace-nowrap">
            <p className="pillButton">Cancellation Flexibility</p>
            <p className="pillButton">Type Of Place</p>
            <p className="pillButton">Price</p>
            <p className="pillButton">Rooms and Beds</p>
            <p className="pillButton">More Filters</p>
          </div>
          <div>
            {searchResults.map(
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
