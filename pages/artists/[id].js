import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import styles from "../../styles/artists/artist.module.css";

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
        <li className={styles.video}>
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
          options={{ height: 450 }}
        />
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{spotify_artist_info.name}</title>
      </Head>
      <div className={styles.artistWrap}>
        <img src={spotify_artist_info.images[0].url} width="320px" />
        <article>
          <h1 className={utilStyles.headingXl}>{spotify_artist_info.name}</h1>
          <p>{hp_link}</p>
          <div className={styles.artistParts}>
            <ul className={styles.videoList}>{videoList}</ul>
            <iframe
              src={`https://open.spotify.com/embed/artist/${spotify_artist_info.id}`}
              width="300"
              height="380"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
            {twitter_id}
          </div>
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
