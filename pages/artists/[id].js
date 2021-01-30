import Layout from "../../components/layout";
import ArticleList from "../../components/article/articleList";
import utilStyles from "../../styles/utils.module.css";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import styles from "../../styles/artists/artist.module.css";
import Error from "../_error";
import Image from "next/image";

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

  // homepage link
  var url = artistData.url;
  var hp_link = "";
  if (url !== "") {
    hp_link = (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {artistData.name}のホームページ
      </a>
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

  // news list
  var articleList = "";
  if (artistData.articles != null && artistData.articles.length !== 0) {
    articleList = (
      <article className={styles.artistArticles}>
        <h2>関連ニュース</h2>
        <ArticleList list={artistData.articles} count={6} />
      </article>
    );
  }

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

  // twitter
  var twitter_id = artistData.twitter_id;
  if (twitter_id !== "") {
    twitter_id = (
      <div>
        <h2>Twitter</h2>
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
    <Layout headTitle={spotify_artist_info.name}>
      <div className={styles.artistWrap}>
        <div className={`box ${styles.mainContent}`}>
          <div className={styles.artistTopContent}>
            <div className={styles.thumbnail}>
              <h1 className={utilStyles.headingXl}>
                {artistData.name ? artistData.name : spotify_artist_info.name}
              </h1>
              <p>{hp_link}</p>
              <Image
                src={spotify_artist_info.images[0].url}
                alt={spotify_artist_info.name}
                width={320}
                height={320}
              />
            </div>
            <div className={styles.artistContent}>
              <h2>Spotify</h2>
              {spority_music}
            </div>
          </div>
          {articleList}
        </div>
        <div className={`box ${styles.artistParts}`}>
          <div className={styles.artistContent}>
            <h2>Youtube</h2>
            <ul className={styles.videoList}>{videoList}</ul>
          </div>
          <div className={styles.artistContent}>{twitter_id}</div>
        </div>
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
  const spotifyRes = await fetch(
    `http://tamarock-api:5000/api/artist/${params.id}`
  );
  const spotifyData = await spotifyRes.json();
  const artistRes = await fetch(
    `http://tamarock-api:5000/api/artist/info/${params.id}?_end=5&_order=DESC&_sort=articles.id&_start=0`
  );
  const artistData = await artistRes.json();
  console.log(artistData.articles);
  return {
    props: {
      spotifyData,
      artistData,
    },
  };
}
