import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
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
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
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

  if (artistList.length === 0 || articleList.length === 0) {
    return <span>Loading...</span>;
  }

  var article_list = [];
  for (var i in articleList) {
    article_list.push(
      // <Link href="/articles/[id]" as={`/articles/${articleList[i].id}`} key={i}>
      <a key={i}>
        <p>{articleList[i].title}</p>
      </a>
      // </Link>
    );
  }

  return (
    <Layout home>
      <div className={classes.root}>
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
      </div>
      <div>{article_list}</div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/artist/infos");
  const articles = await fetch("http://localhost:3000/api/articles");
  const artistList = await res.json();
  const articleList = await articles.json();
  return {
    props: {
      artistList,
      articleList,
    },
  };
}
