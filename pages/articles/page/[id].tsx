import Layout from "../../../components/layout";
import Box from "../../../components/box";
import Article from "../../../components/article";
import Pagination from "../../../components/pagenation";
import { getLimitedArticlesData, getAllArticleIds } from "../../../lib/articles";
import { GetStaticProps, GetStaticPaths } from "next";
import { ARTICLE } from "../../../types/Types";

interface ARTISTLISTPROPS {
  articleList: ARTICLE[];
  articleIds: string[];
  params: {
    id: number;
  };
}

const ArticleList: React.FC<ARTISTLISTPROPS> = ({ articleList, articleIds, params }) => {
  var page = params ? `【${params.id}ページ目】` : "";
  return (
    <Layout headTitle={`ニュース一覧${page}`} description="たまロックのニュース一覧です。邦楽ロックをメインに、関心のあるニュースのみを配信しています。">
      <Box title="ニュース一覧">
        <ul className="list-none p-0">{articleList && articleList.map((article) => <Article key={article.id} {...article} />)}</ul>
        <Pagination pageName="articles" totalCount={articleIds ? articleIds.length : 0} />
      </Box>
    </Layout>
  );
};

export default ArticleList;

export const getStaticPaths: GetStaticPaths = async () => {
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
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleList = await getLimitedArticlesData(10, Number(params.id));
  const articleIds = await getAllArticleIds();

  return {
    props: {
      articleList,
      articleIds,
      params,
    },
    revalidate: 60,
  };
};
