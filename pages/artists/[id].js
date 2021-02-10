import Layout from "../../components/layout";
import ArticleList from "../../components/article/articleList";
import utilStyles from "../../styles/utils.module.css";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import styles from "../../styles/artists/artist.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  getAllArtistIds,
  getArtistData,
  getSpotifyArtistData,
} from "../../lib/artists";

export default function Post({ spotifyArtist, artist }) {
  // ページが存在しないとき
  const router = useRouter();

  if (router.isFallback || !artist || !spotifyArtist.spotify_artist_info) {
    return <div>Loading...</div>;
  }

  const spotify_artist = spotifyArtist.spotify_artist_info;

  // homepage link
  var url = artist.url;
  var hp_link = "";
  if (url !== "") {
    hp_link = (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {artist.name}のホームページ
      </a>
    );
  }

  // spotify music list
  var spority_music = "";
  if (spotify_artist.id !== "") {
    spority_music = (
      <iframe
        src={`https://open.spotify.com/embed/artist/${spotify_artist.id}`}
        width="300"
        height="400"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    );
  }

  // youtube
  var videoList = [];
  const youtube_ids = spotifyArtist["youtube_ids"];
  var youtubeSection = "";
  if (youtube_ids && youtube_ids.length !== 0) {
    for (var i in youtube_ids) {
      videoList.push(
        <li className={styles.video} key={i}>
          <iframe
            title={`youtube${spotify_artist.name}_${i}`}
            id="ytplayer"
            src={`https://www.youtube.com/embed/${youtube_ids[i]}`}
            frameBorder="0"
            key={i}
          ></iframe>
        </li>
      );
    }
    youtubeSection = (
      <div className={styles.artistContent}>
        <h2>Youtube</h2>
        <ul className={styles.videoList}>{videoList}</ul>
      </div>
    );
  }

  //news list
  var articleList = "";
  if (artist.articles != null && artist.articles.length !== 0) {
    articleList = (
      <article className={styles.artistArticles}>
        <h2>関連ニュース</h2>
        <ArticleList list={artist.articles} count={6} />
      </article>
    );
  }

  // twitter
  var twitter_id = artist.twitter_id;
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
    <Layout
      headTitle={spotify_artist.name}
      description={spotify_artist.name}
      imageUrl={spotify_artist.images[0].url}
    >
      <div className={styles.artistWrap}>
        <div className={`box ${styles.mainContent}`}>
          <div className={styles.artistTopContent}>
            <div className={styles.thumbnail}>
              <h1 className={utilStyles.headingXl}>
                {artist.name ? artist.name : spotify_artist.name}
              </h1>
              <p>{hp_link}</p>
              <Image
                src={spotify_artist.images[0].url}
                alt={spotify_artist.name}
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
        {youtubeSection}
        <div className={`box ${styles.artistParts}`}>
          <div className={styles.artistContent}>{twitter_id}</div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllArtistIds();

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const artist = await getArtistData(params.id);
  const spotifyArtist = await getSpotifyArtistData(params.id);

  return {
    props: {
      artist,
      spotifyArtist,
    },
    revalidate: 60,
  };
}
