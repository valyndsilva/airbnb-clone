import React, { useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import airbnbImg from "../../public/airbnb-lg-logo.jpeg";

function Login({ providers }) {
  // console.log(providers);
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white min-h-screen w-full py-2 text-center ">
        <div className="w-96 h-36 mb-5 cursor-pointer relative">
          <Image
            src={airbnbImg}
            alt="logo"
            layout="fill" // required
            objectFit="contain" // change to suit your needs
            priority
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="">
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className=" mt-7 mx-2 bg-red-400 w-60 text-sm font-semibold text-white uppercase text-center rounded-lg py-2 cursor-pointer hover:bg-red-500 transition duration-200"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

//Server Side Rendering
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default Login;
