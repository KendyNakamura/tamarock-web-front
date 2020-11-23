import Layout from "../../components/layout";
import ArtistList from "../../components/artist/artistList";
import fetch from "isomorphic-unfetch";
import styles from "../../styles/articles/article.module.css";
import Error from "../_error";

export default function Post({ article }) {
  // ページが存在しないとき
  if (!article || article.id === 0) {
    return <Error status={404} />;
  }

  // ページリロード中
  if (article.length === 0) {
    return <span>Loading...</span>;
  }

  return (
    <Layout headTitle={article.title} description={article.title}>
      <article className="box">
        <h1>{article.title}</h1>
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

export async function getServerSideProps({ params }) {
  if (!params) {
    return {
      props: {},
    };
  }
  const article_res = await fetch(
    `http://tamarock-api:5000/api/articles/${params.id}`
  );
  const article = await article_res.json();
  return {
    props: {
      article,
    },
  };
}
