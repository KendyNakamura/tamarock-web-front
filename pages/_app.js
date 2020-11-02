import "../styles/global.scss";
import "../styles/global-sp.scss";
import * as gtag from "../lib/gtag";
import Router from "next/router";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
