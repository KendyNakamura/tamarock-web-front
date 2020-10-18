import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Layout from "../../components/layout";
import fetch from "isomorphic-unfetch";

export default function NewsList({ artistList, artistCountJSON }) {
  // pagenation
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const router = useRouter();
  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  const pagginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    if (!isNaN(page.selected)) {
      console.log(page.selected);
      currentQuery.page = page.selected + 1;
    }

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  else {
    content = (
      <ul>
        {artistList.map((artist) => {
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

  if (artistCountJSON > 10) {
    var pagenation = (
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        activeClassName={"active"}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        initialPage={artistList.currentPage - 1}
        pageCount={artistCountJSON / 10} //page count
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={pagginationHandler}
      />
    );
  }
  // until here
  return (
    <Layout home>
      <h2>Artists</h2>
      <div className="posts">{content}</div>
      {pagenation}
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  var end_num = 10;
  var start_num = 0;
  if (page > 1) {
    start_num = end_num * (page - 1);
    end_num = end_num * page;
  }
  const artists = await fetch(
    `http://tamarock-api:5000/api/artist/infos?_end=${end_num}&_order=DESC&_sort=id&_start=${start_num}`
  );
  const artistList = await artists.json();

  const artistCount = await fetch(
    "http://tamarock-api:5000/api/artist/infos/count"
  );
  const artistCountJSON = await artistCount.json();
  return {
    props: {
      artistList,
      artistCountJSON,
    },
  };
}

function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
}
