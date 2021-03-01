import Layout from "../../components/layout";
import Box from "../../components/box";
import Artist from "../../components/artist";
import { useRouter } from "next/router";
import Image from "next/image";
import { getAllArticleIds, getArticleData } from "../../lib/articles";
import { ARTICLE } from "../../types/Types";
import { GetStaticProps, GetStaticPaths } from "next";

const ArticlePage: React.FC<ARTICLE> = ({ title, text, artists, pictures }) => {
  // ページが存在しないとき
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // サムネイル表示
  var thumbnail = <></>;
  var imageUrl = "";
  if (pictures && pictures[0].src !== "") {
    imageUrl = pictures[0].src;
    thumbnail = (
      <div className="text-center">
        <Image src={imageUrl} alt={title} width={400} height={400} />
      </div>
    );
  }

  // 関連アーティスト
  var artistList =
    artists && artists.length > 0 ? (
      <div>
        <h2>関連アーティスト</h2>
        <ul className="grid grid-cols-3 gap-x-2">{artists && artists.map((artist) => <Artist key={artist.id} {...artist} />)}</ul>
      </div>
    ) : (
      ""
    );

  return (
    <Layout headTitle={title} description={title} imageUrl={imageUrl} secondList="News" secondUrl="/articles/page/1" thirdList={title}>
      <Box title={title} h={1}>
        {thumbnail}
        <div dangerouslySetInnerHTML={{ __html: text }} className="articleText min-h-screen"></div>
        {artistList}
      </Box>
    </Layout>
  );
};

export default ArticlePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllArticleIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const article = await getArticleData(String(params.id));
  return {
    props: {
      ...article,
    },
    revalidate: 60,
  };
};
