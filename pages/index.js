import Layout from "../components/layout";
import ArticleList from "../components/article/articleList";
import ArtistList from "../components/artist/artistList";
import Link from "next/link";
import React from "react";
import fetch from "isomorphic-unfetch";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    width: "90%",
    marginBottom: "10px",
    padding: "10px",
  },
  table: {
    width: "90%",
  },
  newsDate: {
    fontSize: "12px",
    color: "#969999",
  },
}));

export default function SingleLineGridList({ artistList, articleList }) {
  const classes = useStyles();
  return (
    <Layout home>
      <div className={classes.root}>
        <h2>News</h2>
        <Link href="/articles">
          <a>news一覧へ</a>
        </Link>
        <ArticleList list={articleList} count={5} />
      </div>
      <div className={classes.root}>
        <h2>Artists</h2>
        <Link href="/artists">
          <a>artist一覧へ</a>
        </Link>
        <ArtistList list={artistList} count={10} />
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
