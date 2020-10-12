import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    width: "90%",
    marginBottom: "10px",
    padding: "10px",
  },
  text: {
    wordBreak: "break-word",
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
          <div
            className={classes.text}
            dangerouslySetInnerHTML={{ __html: article.text }}
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
