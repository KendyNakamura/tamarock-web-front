import { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import Header from "./header";
import Head from "next/head";

export default function Layout({ children, home, headTitle, description, imageUrl }) {
  // const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  const siteTitle = headTitle ? headTitle.slice(0, 25) + " | たまロック" : "たまロック | すべてのアーティスト情報を検索できる音楽メディア";
  const siteDescription = description ? description : "すべてのアーティスト情報を簡単に検索できる音楽メディアです。";

  const imageURL = imageUrl ? imageUrl : `${process.env.NEXT_PUBLIC_RESTAPI_URL}images/profile.jpg`;

  return (
    <div className="bg-blue-300 p-0 m-0 font-sans text-2xl box-border">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta property="og:image" content={imageURL} />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main>
        <div className="max-w-7xl mx-auto py-6 px-0 md:px-8">{children}</div>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </main>
    </div>
  );
}
