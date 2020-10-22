import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
          <li className={(styles.li, "sForm")}>
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="アーティスト名"
              className="sBox"
            />
            <Link
              href={{
                pathname: query ? "/search" : "",
                query: query ? { name: encodeURI(query) } : "",
              }}
              passHref
            >
              <a>
                <button className="sBtn">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </a>
            </Link>
          </li>
          <li className={styles.li}>
            <a href="#">ABOUT</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
