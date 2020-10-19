import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/header.module.css";

export default function PrimarySearchAppBar() {
  const [query, setQuery] = useState("");

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <h1>たまロック</h1>
        </a>
      </Link>

      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <a href="#">ABOUT</a>
          </li>
          <li className={styles.li}>
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="アーティスト名"
            />
            {query ? (
              <Link
                href={{
                  pathname: "/search",
                  query: { name: encodeURI(query) },
                }}
                passHref
              >
                <a>
                  <button>検索</button>
                </a>
              </Link>
            ) : (
              <button disabled>検索</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
