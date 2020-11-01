import React from "react";
import Layout from "../../components/layout";
import fetch from "isomorphic-unfetch";
import ArtistList from "../../components/artist/artistList";

export default function NewsList({ artistList, artistCountJSON }) {
  return (
    <Layout headTitle="アーティスト一覧">
      <div className="box">
        <h2>Artists</h2>
        <ArtistList list={artistList} count={artistCountJSON} />
      </div>
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
