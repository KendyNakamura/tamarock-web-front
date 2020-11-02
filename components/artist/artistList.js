import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import Pagenation from "../../components/pagenation";
import styles from "../../styles/artists/artist.module.css";

export default function ArtistList({ list, count }) {
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

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  else {
    var artistList = [];
    for (var i in list) {
      artistList.push(
        <li className={styles.artist} key={list[i].id}>
          <Link href="/artists/[id]" as={`/artists/${list[i].artist_id}`}>
            <a>{list[i].name}</a>
          </Link>
        </li>
      );
    }
    var $listCount = 4 - (list.length % 4),
      j;

    for (j = 0; j < $listCount; j++) {
      artistList.push(<li className={styles.artist}></li>);
    }

    content = <ul className={styles.artistList}>{artistList}</ul>;
  }

  var pagenation = "";
  if (count > 10) {
    pagenation = <Pagenation list={content} count={count} />;
  }

  return (
    <div>
      {content}
      {pagenation}
    </div>
  );
}
