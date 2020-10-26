import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function PrimarySearchAppBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <h1>たまロック</h1>
        </a>
      </Link>

      <nav className={styles.nav}>
        <div className="pc-menu">
          <ul className={styles.ul}>
            <li className={styles.li}>
              <div className="sForm">
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
              </div>
            </li>
            <li className={styles.li}>
              <a href="#">ABOUT</a>
            </li>
          </ul>
        </div>

        <div className="sp-menu">
          <ul className={styles.ul}>
            <button
              className="hamburger-menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <div className="hamburger-menu-line line-top"></div>
              <div className="hamburger-menu-line line-middle"></div>
              <div className="hamburger-menu-line line-bottom"></div>
            </button>
          </ul>
          <ul className="menu-list" aria-expanded={open}>
            <li>とてもとても長いリンク</li>
            <li>list</li>
            <li>list</li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
