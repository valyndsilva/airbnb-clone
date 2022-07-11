import { ChevronRightIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Image from "next/image";
import {
  Header,
  Banner,
  SmallCard,
  MediumCard,
  LargeCard,
  Footer,
  HeaderSecondary,
  LargeCardSplit,
  Block,
  Testimonials,
} from "../components";

import hostingImg from "../public/hosting.webp";
const Home = ({ exploreData, cardsData }) => {
  return (
    <div className="">
      <Head>
        <title>AirBnb Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <HeaderSecondary />
      <Banner />
      <main className="flex flex-col px-20 py-10 max-w-7xl mx-auto">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5  px-20">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item, index) => (
              <SmallCard
                key={index}
                img={item.img}
                distance={item.distance}
                location={item.location}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8 px-20">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3">
            {cardsData?.map((item, index) => (
              <MediumCard key={index} img={item.img} title={item.title} />
            ))}
          </div>
        </section>
        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by AirBnb"
          buttonText="Get Inspired"
        />
        <Testimonials />
        <Block title="Travel with peace of mind when you book on Airbnb" />
        <LargeCardSplit
          img={hostingImg}
          title="Try hosting"
          description="Earn up to £2,457/month by sharing your space"
          buttonText="Learn more"
        />

        <section className="py-8">
          <h3 className="text-2xl py-1">When are you travelling?</h3>
          <p className="text-gray-500 pb-6 font-light">
            Add dates for updated pricing and availability
          </p>
          <button className="bg-gray-900 text-white w-full md:w-40 rounded-lg py-4">
            Add dates
          </button>
          <div className="flex pt-10 items-center space-x-">
            <p className="underline text-black font-semibold">Airbnb </p>
            <ChevronRightIcon className="w-4 h-4" />
            <p className="underline text-black font-semibold">Stays</p>
            <ChevronRightIcon className="w-4 h-4" />
            <p>United Kingdom</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

//Implementing Server Static Generation
export async function getStaticProps() {
  const exploreData = await fetch("https://jsonkeeper.com/b/4G1G").then(
    (data) => data.json()
  );
  const cardsData = await fetch("https://jsonkeeper.com/b/VHHT").then((data) =>
    data.json()
  );
  return {
    props: {
      exploreData: exploreData,
      cardsData: cardsData,
    },
  };
}