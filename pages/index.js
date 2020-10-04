import Layout from "../components/layout";
import Link from "next/link";

import React from "react";
import fetch from "isomorphic-unfetch";
import { makeStyles } from "@material-ui/core/styles";
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
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function SingleLineGridList({ artistList, articleList }) {
  const classes = useStyles();

  if (artistList != null) {
    if (artistList.length === 0) {
      return <span>Loading...</span>;
    }

    var artist_list = (
      <GridList className={classes.gridList} cols={2.5}>
        {artistList.map((artist) => (
          <GridListTile key={artist.id}>
            <Link href="/artists/[id]" as={`/artists/${artist.id}`}>
              <a>
                <img src={artist.images[0].url} alt={artist.name} />
                <GridListTileBar
                  title={artist.name}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  actionIcon={
                    <IconButton aria-label={`star ${artist.name}`}>
                      <StarBorderIcon className={classes.title} />
                    </IconButton>
                  }
                />
              </a>
            </Link>
          </GridListTile>
        ))}
      </GridList>
    );
  }
  if (articleList != null) {
    if (articleList.length === 0) {
      return <span>Loading...</span>;
    }

    var article_list = (
      <table border="1">
        {articleList.map((article) => (
          <tr>
            <th>{formatDate(new Date(article.createdat))}</th>
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
      <div className={classes.root}>{artist_list}</div>
      <div>{article_list}</div>
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
