import Layout from "../components/layout";
import Link from "next/link";

import React from "react";
import fetch from "isomorphic-unfetch";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    width: "100%",
  },
  th: {
    width: "20%",
  },
}));

export default function SingleLineGridList({ artistList, articleList }) {
  const classes = useStyles();

  if (artistList != null) {
    if (artistList.length === 0) {
      return <span>Loading...</span>;
    }

    var artist_list = (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {artistList.map((artist) => (
            <Grid item md={3} sm={6} xs={12}>
              <Link href="/artists/[id]" as={`/artists/${artist.id}`}>
                <a>
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className={classes.img}
                  />
                  {artist.name}
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
  if (articleList != null) {
    if (articleList.length === 0) {
      return <span>Loading...</span>;
    }

    var article_list = (
      <table border="1" className={classes.table}>
        <tr>
          <th className={classes.th}>日付</th>
          <td>ニュース内容</td>
        </tr>
        {articleList.map((article) => (
          <tr>
            <th className={classes.th}>
              {formatDate(new Date(article.createdat))}
            </th>
            <Link href="/articles/[id]" as={`/articles/${article.id}`}>
              <td>
                <a>{article.title}</a>
              </td>
            </Link>
          </tr>
        ))}
      </table>
    );
  }

  return (
    <Layout home>
      <div className={classes.root}>
        <h2>News</h2>
        {article_list}
      </div>
      <div className={classes.root}>
        <h2>Artists</h2>
        {artist_list}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://tamarock-api:5000/api/artist/infos");
  const articles = await fetch("http://tamarock-api:5000/api/articles");
  const artistList = await res.json();
  const articleList = await articles.json();
  return {
    props: {
      artistList,
      articleList,
    },
  };
}

function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
}
