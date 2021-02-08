import Layout from "../components/layout";
import ArticleList from "../components/article/articleList";
import ArtistList from "../components/artist/artistList";
import Link from "next/link";
import React from "react";
import fetch from "isomorphic-unfetch";

export default function SingleLineGridList({ artistList, newsList, blogList }) {
  return (
    <Layout home>
      <div className="box">
        <h2>News</h2>
        <ArticleList list={newsList} count={5} />
        <Link href="/articles">
          <a>記事一覧へ</a>
        </Link>
      </div>
      <div className="box">
        <h2>Artists</h2>
        <ArtistList list={artistList} count={10} />
        <Link href="/artists">
          <a>artist一覧へ</a>
        </Link>
      </div>
      <div className="box">
        <h2>Blog</h2>
        <ArticleList list={blogList} count={5} />
        <Link href="/articles">
          <a>記事一覧へ</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const artistRes = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/artist/infos?_end=10&_order=DESC&_sort=id&_start=0`
  );
  const artistList = await artistRes.json();
  const news = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles?_end=5&_order=DESC&_sort=id&_start=0&column=category&q=1`
  );
  const newsList = await news.json();
  const blog = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles?_end=5&_order=DESC&_sort=id&_start=0&column=category&q=2`
  );
  const blogList = await blog.json();
  return {
    props: {
      artistList,
      newsList,
      blogList,
    },
  };
}
