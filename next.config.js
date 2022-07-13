/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "links.papareact.com",
      "http://localhost:3000/%22https://links.papareact.com/2io%22",
    ],
  },
  env: {
    mapbox_key:
      "pk.eyJ1IjoidmFseW5kc2lsdmEiLCJhIjoiY2w1aTF4Z2RmMDN4aDNpdDhhMTk0ZGozYSJ9.yjuMXjPHcQ_plMIa0dXVUA",
  },
};
