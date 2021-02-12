import Layout from "../../../components/layout";
import Box from "../../../components/box";
import ArticleList from "../../../components/article/articleList";
import { getLimitedArticlesData, getAllArticleIds } from "../../../lib/articles";

export default function NewsList({ articleList, articleIds, params }) {
  return (
    <Layout headTitle={`ニュース一覧 | ${params.id}ページ目`} description="たまロックのニュース一覧です。邦楽ロックをメインに、関心のあるニュースのみを配信しています。">
      <Box title="news">
        <ArticleList list={articleList} count={articleIds ? articleIds.length : 0} />
      </Box>
    </Layout>
  );
}

export async function getStaticPaths() {
  const PER_PAGE = 10;
  const articleIds = await getAllArticleIds();
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
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
      params,
    },
  };
}
