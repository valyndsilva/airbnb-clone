import "../styles/globals.css";
import Router from "next/router";
import "mapbox-gl/dist/mapbox-gl.css";
import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100, // delay from start to finish
});

Router.events.on("routeChangeStart", progress.start); // runs when user is pushed to a new page
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.error);
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
