import { useState } from "react";
import Header from "./header";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/layout.module.css";

const name = "Your Name";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home, headTitle }) {
  const [query, setQuery] = useState("");

  var title = headTitle ? headTitle + " | たまロック" : "たまロック";
  console.log(headTitle);
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta
          name="description"
          content="すべてのアーティスト情報を簡単に検索できる音楽メディアです。"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
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
