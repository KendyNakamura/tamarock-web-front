import Layout from "../../../components/layout";
import Box from "../../../components/box";
import Artist from "../../../components/artist";
import Pagination from "../../../components/pagenation";
import { getLimitedArtistsData, getAllArtistIds } from "../../../lib/artists";
import { GetStaticProps, GetStaticPaths } from "next";
import { ARTIST } from "../../../types/Types";

interface ARTISTLISTPROPS {
  artistList: ARTIST[];
  artistIds: string[];
  params: {
    id: number;
  };
}

const ArtistList: React.FC<ARTISTLISTPROPS> = ({ artistList, artistIds, params }) => {
  var page = params ? `【${params.id}ページ目】` : "";
  return (
    <Layout headTitle={`アーティスト一覧${page}`} description="たまロックのニュース一覧です。邦楽ロックをメインに、関心のあるニュースのみを配信しています。">
      <Box title="Artist">
        <ul className="list-none flex justify-center flex-Kwrap p-0">{artistList && artistList.map((artist) => <Artist key={artist.id} {...artist} />)}</ul>
        <Pagination pageName="artists" totalCount={artistIds ? artistIds.length : 0} />
      </Box>
    </Layout>
  );
};

export default ArtistList;

export const getStaticPaths: GetStaticPaths = async () => {
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
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const artistList = await getLimitedArtistsData(10, Number(params.id));
  const artistIds = await getAllArtistIds();

  return {
    props: {
      artistList,
      artistIds,
      params,
    },
    revalidate: 60,
  };
};
