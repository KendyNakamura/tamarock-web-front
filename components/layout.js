import { useState } from "react";
import Header from "./header";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/layout.module.css";

export default function Layout({ children, home, headTitle, description, imageUrl }) {
  const [query, setQuery] = useState("");

  const siteTitle = headTitle
    ? headTitle.slice(0, 25) + " | たまロック"
    : "たまロック";
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
          // content={`https://og-image.now.sh/${encodeURI(
          //   siteTitle
          // )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
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
