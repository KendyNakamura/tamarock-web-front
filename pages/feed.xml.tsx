import { GetServerSidePropsContext } from 'next';
import RSS from 'rss';
import { getAllArticlesData } from "../lib/articles";

async function generateFeedXml() {
  const feed = new RSS({
    title: "title",
    description: "description",
    site_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    feed_url: `${process.env.NEXT_PUBLIC_SITE_URL}feed.xml`,
    language: 'ja',
  });

  // 例としてpostsを含めるイメージ
  // このあたりの書き方はライブラリのドキュメントを参考にしてください
  const articles = await getAllArticlesData();
  console.log(articles);
  articles?.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.text.slice(0, 80),
      date: new Date(article.createdat),
      url: `${process.env.NEXT_PUBLIC_SITE_URL}articles/${article.id}`,
    });
  })
  
  // XML形式の文字列にする
  return feed.xml();
}

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateFeedXml(); // フィードのXMLを生成する（後述）

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間キャッシュする
  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return {
    props: {},
  };
};

const Feed = () => null;
export default Feed;