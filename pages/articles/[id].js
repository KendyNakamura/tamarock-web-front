import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import styles from "../../styles/articles/article.module.css";

export default function Post({ article }) {
  if (article.length === 0) {
    return <span>Loading...</span>;
  }

  return (
    <Layout>
      <Head>
        <title>{article.title}</title>
      </Head>
      <div>
        <article className="box">
          <h2>{article.title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: article.text }}
            className={styles.articleText}
          ></div>
        </article>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
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
