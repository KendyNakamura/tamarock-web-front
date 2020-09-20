import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Post({ article }) {
  if (article.length === 0) {
    return <span>Loading...</span>;
  }

  const classes = useStyles();
  return (
    <Layout>
      <Head>
        <title>{article.title}</title>
      </Head>
      <div className={classes.root}>
        <article>
          <h2 className={utilStyles.headingXl}>{article.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: article.text }}></div>
        </article>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const article_res = await fetch(
    `http://nginx:5010/api/articles/${params.id}`
  );
  const article = await article_res.json();
  return {
    props: {
      article,
    },
  };
}
