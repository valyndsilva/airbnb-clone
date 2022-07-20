import "../styles/globals.css";
import Router from "next/router";
import "mapbox-gl/dist/mapbox-gl.css";
import ProgressBar from "@badrap/bar-of-progress";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100, // delay from start to finish
});

Router.events.on("routeChangeStart", progress.start); // runs when user is pushed to a new page
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.error);

function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session}>
      <Component key={router.asPath} {...pageProps} />
    </SessionProvider>
  );
}

export default App;
