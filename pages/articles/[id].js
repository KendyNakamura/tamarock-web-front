import Layout from "../../components/layout";
import fetch from "isomorphic-unfetch";
import styles from "../../styles/articles/article.module.css";

export default function Post({ article }) {
  if (article.length === 0) {
    return <span>Loading...</span>;
  }

  return (
    <Layout headTitle={article.title.slice(0, 10)}>
      <div>
        <article className="box">
          <h1>{article.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: article.text }}
            className={`${styles.articleText} article`}
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
