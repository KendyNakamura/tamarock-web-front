import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import styles from "../../styles/artists/artist.module.css";
import Error from "../_error";

export default function Post({ spotifyData, artistData }) {
  if (
    !spotifyData ||
    spotifyData === null ||
    !artistData ||
    artistData === null
  ) {
    return <Error status={404} />;
  }
  // if (spotifyData.length === 0 || artistData.length === 0) {
  //   return <span>Loading...</span>;
  // }

  const spotify_artist_info = spotifyData["spotify_artist_info"];

  // youtube
  var videoList = [];
  const youtube_ids = spotifyData["youtube_ids"];
  if (youtube_ids && youtube_ids.length !== 0) {
    for (var i in youtube_ids) {
      videoList.push(
        <li className={styles.video} key={i}>
          <iframe
            title={`youtube${spotify_artist_info.name}_${i}`}
            id="ytplayer"
            src={`https://www.youtube.com/embed/${youtube_ids[i]}`}
            frameBorder="0"
            key={i}
          ></iframe>
        </li>
      );
    }
  }

  // homepage link
  var url = artistData.url;
  var hp_link = "";
  if (url !== "") {
    hp_link = (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {artistData.name}のHP
      </a>
    );
  }

  // twitter
  var twitter_id = artistData.twitter_id;
  if (twitter_id !== "") {
    twitter_id = (
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={twitter_id}
        theme="dark"
        options={{ height: 450 }}
      />
    );
  }

  // spotify music list
  var spority_music = "";
  if (spotify_artist_info.id !== "") {
    spority_music = (
      <iframe
        src={`https://open.spotify.com/embed/artist/${spotify_artist_info.id}`}
        width="300"
        height="400"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    );
  }
  return (
    <Layout headTitle={spotify_artist_info.name}>
      <div className={`box ${styles.artistWrap}`}>
        <img src={spotify_artist_info.images[0].url} width="320px" />
        <article>
          <h1 className={utilStyles.headingXl}>
            {artistData.name ? artistData.name : spotify_artist_info.name}
          </h1>
          <p>{hp_link}</p>
          <div className={styles.artistParts}>
            <div className={styles.artistContent}>
              <ul className={styles.videoList}>{videoList}</ul>
            </div>
            <div className={styles.artistContent}>{spority_music}</div>
            <div className={styles.artistContent}>{twitter_id}</div>
          </div>
        </article>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  if (!params) {
    return {
      props: {},
    };
  }
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
