import Layout from "../../../components/layout";
import ArticleList from "../../../components/article/articleList";
import {
  getLimitedArticlesData,
  getAllArticleIds,
} from "../../../lib/articles";

export default function NewsList({ articleList, articleIds }) {
  return (
    <Layout
      headTitle="ニュース一覧"
      description="たまロックのニュース一覧です。邦楽ロックをメインに、関心のあるニュースのみを配信しています。"
    >
      <div className="box">
        <h2>News</h2>
        <ArticleList list={articleList} count={articleIds.length} />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const PER_PAGE = 10;
  const articleIds = await getAllArticleIds();
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(articleIds.length / PER_PAGE)).map((id) => {
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
}

export async function getStaticProps({ params }) {
  const articleList = await getLimitedArticlesData(10, params.id);
  const articleIds = await getAllArticleIds();

  return {
    props: {
      articleList,
      articleIds,
    },
  };
}
