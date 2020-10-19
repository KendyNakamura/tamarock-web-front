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
    content = (
      <ul className={styles.artistList}>
        {list.map((artist) => {
          return (
            <li className={styles.artist}>
              <Link
                href="/artists/[id]"
                as={`/artists/${artist.id}`}
                key={artist.id}
              >
                <a>
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className={styles.artistImg}
                  />
                  {artist.name}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    );
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
