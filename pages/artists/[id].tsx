import Layout from "../../components/layout";
import Box from "../../components/box";
import Article from "../../components/article";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { useRouter } from "next/router";
import Image from "next/image";
import { getAllArtistIds, getArtistData, getSpotifyArtistData } from "../../lib/artists";
import { GetStaticProps, GetStaticPaths } from "next";
import { ARTIST, SPOTIFYARTIST } from "../../types/Types";

interface ARTISTSHOW {
  spotifyArtist: SPOTIFYARTIST;
  artist: ARTIST
}

const ArtistShow: React.FC<ARTISTSHOW> = ({ spotifyArtist, artist }) => {
  // ページが存在しないとき
  const router = useRouter();

  if (router.isFallback || !artist || !spotifyArtist.spotify_artist_info) {
    return <div>Loading...</div>;
  }
  const spotify_artist = spotifyArtist.spotify_artist_info;

  // homepage link
  var url = artist.url;
  var hp_link =
    url !== "" ? (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {artist.name}のホームページ
      </a>
    ) : (
      ""
    );

  // spotify music list
  const spority_music =
    spotify_artist.id !== "" ? (
      <iframe className="w-full" src={`https://open.spotify.com/embed/artist/${spotify_artist.id}`} width="300" height="400" frameBorder="0" allow="encrypted-media"></iframe>
    ) : (
      ""
    );

  //news list
  var articleList = <></>;
  if (artist.articles != null && artist.articles.length !== 0) {
    articleList = (
      <article className="text-left mt-5">
        <h3>関連ニュース</h3>
        <ul className="list-none p-0">{artist.articles && artist.articles.map((article) => <Article key={article.id} {...article} />)}</ul>
      </article>
    );
  }

  // youtube
  const youtube_ids = spotifyArtist["youtube_ids"];
  var youtubeSection = <></>;
  if (youtube_ids && youtube_ids.length !== 0) {
    youtubeSection = (
      <Box title="youtube" h={3}>
        {youtube_ids.map((i, youtube_id) => (
          <li className="list-none mt-5" key={i}>
            <iframe className="w-full" title={`youtube${artist.name}_${i}`} id="ytplayer" src={`https://www.youtube.com/embed/${youtube_id}`} frameBorder="0"></iframe>
          </li>
        ))}
      </Box>
    );
  }

  // twitter
  var twitter_id = artist.twitter_id;
  var twitter =
    twitter_id !== "" ? (
      <Box title="twitter" h={3}>
        <TwitterTimelineEmbed className="w-full" sourceType="profile" screenName={twitter_id} theme="dark" options={{ height: 450 }} />
      </Box>
    ) : (
      <></>
    );

  return (
    <Layout headTitle={spotify_artist.name}>
      <div className="grid grid-cols-3 gap-x-2">
        <div className="col-span-3 md:col-span-2">
          <Box title={spotify_artist.name}>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="col-span-2 sm:col-span-1">
                <Image src={spotify_artist.images[0].url} alt={spotify_artist.name} width={320} height={320} />
                <p>{hp_link}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">{spority_music}</div>
            </div>
            {articleList}
          </Box>
        </div>
        <div className="col-span-3 md:col-span-1">
          {youtubeSection}
          {twitter}
        </div>
      </div>
    </Layout>
  );
};

export default ArtistShow;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllArtistIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const artist = await getArtistData(String(params.id));
  const spotifyArtist = await getSpotifyArtistData(String(params.id));
  return {
    props: {
      artist,
      spotifyArtist,
    },
    revalidate: 60,
  };
};
