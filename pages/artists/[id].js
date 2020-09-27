import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  img: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Post({ spotifyData, artistData }) {
  if (spotifyData.length === 0 || artistData.length === 0) {
    return <span>Loading...</span>;
  }

  const spotify_artist_info = spotifyData["spotify_artist_info"];
  var videoList = [];
  const youtube_ids = spotifyData["youtube_ids"];
  if (youtube_ids.length !== 0) {
    for (var i in youtube_ids) {
      videoList.push(
        <Grid item xs={12} sm={12} md={6}>
          <li>
            <iframe
              title={`youtube${spotify_artist_info.name}_${i}`}
              id="ytplayer"
              // width="300"
              // height="200"
              src={`https://www.youtube.com/embed/${youtube_ids[i]}`}
              frameBorder="0"
              key={i}
            ></iframe>
          </li>
        </Grid>
      );
    }
  }

  var url = artistData.url;
  var hp_link = "";
  if (url !== "") {
    hp_link = (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {artistData.name}のHP
      </a>
    );
  }

  var twitter_id = artistData.twitter_id;
  if (twitter_id !== "") {
    twitter_id = (
      <div>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={twitter_id}
          theme="dark"
          options={{ width: "80%", height: 450 }}
        />
      </div>
    );
  }

  const classes = useStyles();
  return (
    <Layout>
      <Head>
        <title>{spotify_artist_info.name}</title>
      </Head>
      <div className={classes.root}>
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} sm={6}>
            <img
              className={classes.img}
              src={spotify_artist_info.images[0].url}
              width="100%"
            />
          </Grid>
        </Grid>
        <article>
          <h1 className={utilStyles.headingXl}>{spotify_artist_info.name}</h1>
          <p>{hp_link}</p>
          <ul className={utilStyles.list}>
            <Grid container spacing={3} justify="center">
              {videoList}
            </Grid>
          </ul>
          {twitter_id}
        </article>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const spotify_res = await fetch(
    `http://tamarock-api:5000/api/artist/${params.id}`
  );
  const spotifyData = await spotify_res.json();

  const artist_res = await fetch(
    `http://tamarock-api:5000/api/artist/info/${params.id}`
  );
  const artistData = await artist_res.json();
  return {
    props: {
      spotifyData,
      artistData,
    },
  };
}
