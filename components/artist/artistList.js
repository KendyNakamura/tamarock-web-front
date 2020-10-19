import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import Pagenation from "../../components/pagenation";

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
      <ul>
        {list.map((artist) => {
          return (
            <Link
              href="/artists/[id]"
              as={`/artists/${artist.id}`}
              key={artist.id}
            >
              <a>
                <img src={artist.images[0].url} alt={artist.name} />
                {artist.name}
              </a>
            </Link>
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
    <div className="posts">
      {content}
      {pagenation}
    </div>
  );
}
