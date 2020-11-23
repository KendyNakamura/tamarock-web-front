import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function PrimarySearchAppBar(headTitle) {
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
    <>
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
            onChange={(e) => {}}
            checked={check}
          />
          <label
            className="hamburger sp-menu"
            htmlFor="hamburger"
            onClick={handleCheck}
          >
            <i></i>
          </label>
          <section className="drawer-list">
            <ul className={styles.ul}>
              <li className={styles.li} onClick={falseCheck}>
                <Link href="/articles">
                  <a>記事一覧</a>
                </Link>
              </li>
              <li className={styles.li} onClick={falseCheck}>
                <Link href="/artists">
                  <a>アーティスト一覧</a>
                </Link>
              </li>
              <li className={styles.li} onClick={falseCheck}>
                <Link href="/about">
                  <a>about</a>
                </Link>
              </li>
            </ul>
          </section>
        </nav>
      </header>
      <div className="sFormWrapper">
        <form className="sForm">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="アーティスト名を入力"
            className="sBox"
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <Link
            href={{
              pathname: query ? "/search" : "",
              query: query ? { name: encodeURI(query) } : "",
            }}
          >
            <a onClick={falseCheck} className="sLink">
              <button className="sBtn">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </a>
          </Link>
        </form>
      </div>
    </>
  );
}
