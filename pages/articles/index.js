import Layout from "../../components/layout";
import ArticleList from "../../components/article/articleList";
import { getAllArticlesData } from "../../lib/articles";

export default function NewsList({ articleList }) {
  return (
    <Layout
      headTitle="ニュース一覧"
      description="たまロックのニュース一覧です。邦楽ロックをメインに、関心のあるニュースのみを配信しています。"
    >
      <div className="box">
        <h2>News</h2>
        <ArticleList list={articleList} count={10} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const articleList = await getAllArticlesData();

  return {
    props: {
      articleList
    },
  };
}
