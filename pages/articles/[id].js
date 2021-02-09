import Layout from "../../components/layout";
import ArtistList from "../../components/artist/artistList";
import { useRouter } from "next/router";
// import fetch from "isomorphic-unfetch";
import styles from "../../styles/articles/article.module.css";
import Image from "next/image";
import { getAllArticleIds, getArticleData } from "../../lib/articles";

export default function Post({ article }) {
  // ページが存在しないとき
  const router = useRouter();

  if (router.isFallback || !article) {
    return <div>Loading...</div>;
  }

  // ページリロード中
  // if (article.length === 0) {
  //   return <span>Loading...</span>;
  // }

  // サムネイル表示
  var thumbnail = "";
  var imageUrl = "";
  if (article.pictures[0].src !== "") {
    thumbnail = (
      <div className={styles.imageBox}>
        <Image
          src={article.pictures[0].src}
          alt={article.title}
          width={400}
          height={400}
        />
      </div>
    );
    imageUrl = article.pictures[0].src;
  }

  return (
    <Layout
      headTitle={article.title}
      description={article.title}
      imageUrl={imageUrl}
    >
      <article className="box">
        <h1>{article.title}</h1>
        {thumbnail}
        <div
          dangerouslySetInnerHTML={{ __html: article.text }}
          className={`${styles.articleText} text`}
        ></div>
        <h2>関連アーティスト</h2>
        <ArtistList
          list={article.artists}
          count={6}
          className={styles.artistList}
        />
      </article>
    </Layout>
  );
}

// export async function getServerSideProps({ params }) {
//   if (!params) {
//     return {
//       props: {},
//     };
//   }
//   const article_res = await fetch(
//     `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles/${params.id}`
//   );
//   const article = await article_res.json();
//   console.log(article);
//   return {
//     props: {
//       article,
//     },
//   };
// }

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
