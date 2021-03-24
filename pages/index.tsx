import { useEffect } from "react";
import Layout from "../components/layout";
import Box from "../components/box";
import FeedArticle from "../components/feedArticle";
import { getLimitedArticlesData } from "../lib/articles";
import { getFeedArticles } from "../lib/feedArticle";
import useSWR from "swr";
import { GetStaticProps } from "next";
import { ARTICLE, FEEDARTICLE } from "../types/Types";
import SideBar from "../components/sidebar";

const fetcher = (url) => fetch(url).then((res) => res.json());
const blogApiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles?_end=5&_order=DESC&_sort=id&_start=0`;

interface STSTICPROPS {
  blogList: ARTICLE[];
  towerArticles: FEEDARTICLE[];
  gekirockArticles: FEEDARTICLE[];
  cinraArticles: FEEDARTICLE[];
  barksArticles: FEEDARTICLE[];
}

const Top: React.FC<STSTICPROPS> = ({ blogList, towerArticles, gekirockArticles, cinraArticles, barksArticles }) => {
  // ISR
  const { data: blog, mutate } = useSWR(blogApiUrl, fetcher, {
    initialData: blogList,
  });
  const filteredBlogList = blog?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout home>
      <div className="grid grid-cols-3 gap-x-12">
        <div className="col-span-3 md:col-span-2">

          <div className="grid grid-cols-2 gap-x-2">
            <div className="col-span-2 sm:col-span-1">
              <Box title="タワレコ" src="https://cdfront.tower.jp/img12/common/headerNav_logo_01.gif">
                <ul className="list-none p-0">{towerArticles && towerArticles.map((article) => <FeedArticle key={article.link} {...article} />)}</ul>
              </Box>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Box title="激ロック" src="/images/logo.jpeg">
                <ul className="list-none p-0">{gekirockArticles && gekirockArticles.map((article) => <FeedArticle key={article.link} {...article} />)}</ul>
              </Box>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2">
            <div className="col-span-2 sm:col-span-1">
              <Box title="CINRA" src="/images/cinra_logo.jpg">
                <ul className="list-none p-0">{cinraArticles && cinraArticles.map((article) => <FeedArticle key={article.link} {...article} />)}</ul>
              </Box>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Box title="BARKS" src="/images/barks_logo.jpg">
                <ul className="list-none p-0">{barksArticles && barksArticles.map((article) => <FeedArticle key={article.link} {...article} />)}</ul>
              </Box>
            </div>
          </div>
        </div>

        <div className="col-span-3 md:col-span-1">
          <SideBar newsList={filteredBlogList} />
        </div>
      </div>
    </Layout>
  );
};

export default Top;

export const getStaticProps: GetStaticProps = async () => {
  const blogList = await getLimitedArticlesData(5, 1);
  const towerArticles = await getFeedArticles("https://tower.jp/feeds/article/");
  const gekirockArticles = await getFeedArticles("https://gekirock.com/news/index.xml");
  const cinraArticles = await getFeedArticles("https://www.cinra.net/feed/news?genre=music");
  const barksArticles = await getFeedArticles("https://feeds.barks.jp/rss/barks_news_jpop.rdf", true);

  return {
    props: {
      blogList,
      towerArticles,
      gekirockArticles,
      cinraArticles,
      barksArticles,
    },
    revalidate: 3,
  };
};
