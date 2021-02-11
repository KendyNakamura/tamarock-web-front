import Layout from "../../components/layout";
import Box from "../../components/box";
import ArtistList from "../../components/artist/artistList";
import { useRouter } from "next/router";
import styles from "../../styles/articles/article.module.css";
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
    thumbnail = (
      <div className={styles.imageBox}>
        <Image src={article.pictures[0].src} alt={article.title} width={400} height={400} />
      </div>
    );
    imageUrl = article.pictures[0].src;
  }

  return (
    <Layout headTitle={article.title} description={article.title} imageUrl={imageUrl}>
      <Box title={article.title}>
        {thumbnail}
        <div dangerouslySetInnerHTML={{ __html: article.text }} className={`${styles.articleText} text`}></div>
        <h2>関連アーティスト</h2>
        <ArtistList list={article.artists} count={6} className={styles.artistList} />
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
    revalidate: 3,
  };
}
