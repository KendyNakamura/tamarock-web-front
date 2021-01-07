import { useState } from "react";
import Header from "./header";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/layout.module.css";

export default function Layout({ children, home, headTitle, description, imageUrl }) {
  const [query, setQuery] = useState("");

  const siteTitle = headTitle
    ? headTitle.slice(0, 25) + " | たまロック"
    : "たまロック | すべてのアーティスト情報を検索できる音楽メディア";
  const siteDescription = description
    ? description
    : "すべてのアーティスト情報を簡単に検索できる音楽メディアです。";

  const imageURL = imageUrl ? imageUrl : "https://tamarock.jp/images/profile.jpg";

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta
          property="og:image"
          content={imageURL}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <div className={styles.container}>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
