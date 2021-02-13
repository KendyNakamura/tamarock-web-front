import Layout from "../../components/layout";
import Box from "../../components/box";
import ArtistList from "../../components/artist/artistList";
import { useRouter } from "next/router";
import Image from "next/image";
import { getAllArticleIds, getArticleData } from "../../lib/articles";

export default function Post({ article }) {
  // ページが存在しないとき
  const router = useRouter();

  if (router.isFallback || !article) {
    return <div>Loading...</div>;
  }

  // サムネイル表示
  var thumbnail = "";
  var imageUrl = "";
  if (article.pictures[0].src !== "") {
    imageUrl = article.pictures[0].src;
    thumbnail = (
      <div className="text-center">
        <Image src={imageUrl} alt={article.title} width={400} height={400} />
      </div>
    );
  }

  // 関連アーティスト
  var artistList =
    article.artists.length > 0 ? (
      <div>
        <h2>関連アーティスト</h2>
        <ArtistList list={article.artists} count={6} className="justify-start" />
      </div>
    ) : (
      ""
    );

  return (
    <Layout headTitle={article.title} description={article.title} imageUrl={imageUrl}>
      <Box title={article.title}>
        {thumbnail}
        <div dangerouslySetInnerHTML={{ __html: article.text }} className="articleText min-h-screen mx-2 md:mx-14"></div>
        {artistList}
      </Box>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllArticleIds();

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const article = await getArticleData(params.id);
  return {
    props: {
      article,
    },
    revalidate: 60,
  };
}
