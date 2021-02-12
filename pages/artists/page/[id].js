import Layout from "../../../components/layout";
import Box from "../../../components/box";
import ArtistList from "../../../components/artist/artistList";
import { getLimitedArtistsData, getAllArtistIds } from "../../../lib/artists";

export default function ArtistListPage({ artistList, artistIds, params }) {
  var page = params ? `【${params.id}ページ目】` : "";
  return (
    <Layout headTitle={`アーティスト一覧${page}`} description="たまロックのニュース一覧です。邦楽ロックをメインに、関心のあるニュースのみを配信しています。">
      <Box title="Artist">
        <ArtistList list={artistList} count={artistIds ? artistIds.length : 0} />
      </Box>
    </Layout>
  );
}

export async function getStaticPaths() {
  const PER_PAGE = 10;
  const artistIds = await getAllArtistIds();
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(artistIds.length / PER_PAGE)).map((id) => {
    return {
      params: {
        id: String(id),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const artistList = await getLimitedArtistsData(10, params.id);
  const artistIds = await getAllArtistIds();

  return {
    props: {
      artistList,
      artistIds,
      params,
    },
  };
}
