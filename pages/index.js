import Layout from "../components/layout";
import ArticleList from "../components/article/articleList";
import ArtistList from "../components/artist/artistList";
import Link from "next/link";
import React from "react";
import fetch from "isomorphic-unfetch";

export default function SingleLineGridList({ artistList, articleList }) {
  return (
    <Layout home>
      <div className="box">
        <h2>News</h2>
        <ArticleList list={articleList} count={5} />
        <Link href="/articles">
          <a>news一覧へ</a>
        </Link>
      </div>
      <div className="box">
        <h2>Artists</h2>
        <ArtistList list={artistList} count={10} />
        <Link href="/artists">
          <a>artist一覧へ</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "http://tamarock-api:5000/api/artist/infos?_end=10&_order=DESC&_sort=id&_start=0"
  );
  const articles = await fetch(
    "http://tamarock-api:5000/api/articles?_end=5&_order=DESC&_sort=id&_start=0"
  );
  const artistList = await res.json();
  const articleList = await articles.json();
  return {
    props: {
      artistList,
      articleList,
    },
  };
}
