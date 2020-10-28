import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function PrimarySearchAppBar() {
  const [query, setQuery] = useState("");
  const [check, setCheck] = useState("");
  const router = useRouter();

  function falseCheck() {
    setCheck("");
  }

  function handleCheck() {
    if (check == "checked") {
      setCheck("");
    } else {
      setCheck("checked");
    }
  }

  function handleKeyPress(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      router.push({
        pathname: query ? "/search" : "",
        query: query ? { name: encodeURI(query) } : "",
      });
    }
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <h1>たまロック</h1>
        </a>
      </Link>

      <nav className={styles.nav}>
        <input
          id="hamburger"
          className="hamburger sp-menu"
          type="checkbox"
          checked={check}
        />
        <label
          className="hamburger sp-menu"
          for="hamburger"
          onClick={handleCheck}
        >
          <i></i>
        </label>
        <section class="drawer-list">
          <ul className={styles.ul}>
            <li className={styles.li}>
              <div className="sForm">
                <input
                  type="text"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  placeholder="アーティスト名"
                  className="sBox"
                  onKeyPress={(e) => handleKeyPress(e)}
                />
                <Link
                  href={{
                    pathname: query ? "/search" : "",
                    query: query ? { name: encodeURI(query) } : "",
                  }}
                  passHref
                >
                  <a className={styles.btnLink} onClick={falseCheck}>
                    <button className="sBtn">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </a>
                </Link>
              </div>
            </li>
            <li className={styles.li} onClick={falseCheck}>
              <a href="#">about</a>
            </li>
          </ul>
        </section>
      </nav>
    </header>
  );
}
