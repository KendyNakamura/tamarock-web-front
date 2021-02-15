import "../styles/global.css";
import * as gtag from "../lib/gtag";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV !== "development") {
    const router = useRouter();
    useEffect(() => {
      const handleRouteChange = (url) => {
        gtag.pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }, [router.events]);
  }
  return <Component {...pageProps} />;
}

export default App;
