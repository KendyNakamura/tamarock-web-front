import { useEffect } from "react";
import Layout from "../components/layout";
import Box from "../components/box";
import Article from "../components/article";
import FeedArticle from "../components/feedArticle";
import Link from "next/link";
import { getLimitedArticlesData } from "../lib/articles";
import { getLimitedArtistsData } from "../lib/artists";
import { getFeedArticles } from "../lib/feedArticle";
import useSWR from "swr";
import { GetStaticProps } from "next";
import { ARTICLE, ARTIST, FEEDARTICLE } from "../types/Types";
import SideBar from "../components/sidebar";

const fetcher = (url) => fetch(url).then((res) => res.json());
const blogApiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles?_end=5&_order=DESC&_sort=id&_start=0&column=category&q=2`;

interface STSTICPROPS {
  artistList: ARTIST[];
  newsList: ARTICLE[];
  blogList: ARTICLE[];
  towerArticles: FEEDARTICLE[];
  gekirockArticles: FEEDARTICLE[];
  cinraArticles: FEEDARTICLE[];
  barksArticles: FEEDARTICLE[];
}

const Top: React.FC<STSTICPROPS> = ({ newsList, blogList, artistList, towerArticles, gekirockArticles, cinraArticles, barksArticles }) => {
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
      <div className="grid grid-cols-3 gap-x-2">
        <div className="col-span-3 md:col-span-2">
          <div className="grid grid-cols-2 gap-x-2">
            <div className="col-span-2 md:col-span-1">
              <Box title="タワレコ">
                <ul className="list-none p-0">{towerArticles && towerArticles.map((article) => <FeedArticle key={article.link} {...article} />)}</ul>
              </Box>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Box title="激ロック">
                <ul className="list-none p-0">{gekirockArticles && gekirockArticles.map((article) => <FeedArticle key={article.link} {...article} />)}</ul>
              </Box>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2">
            <div className="col-span-2 md:col-span-1">
              <Box title="CINRA">
                <ul className="list-none p-0">{cinraArticles && cinraArticles.map((article) => <FeedArticle key={article.link} {...article} />)}</ul>
              </Box>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Box title="BARKS">
                <ul className="list-none p-0">{barksArticles && barksArticles.map((article) => <FeedArticle key={article.link} {...article} />)}</ul>
              </Box>
            </div>
          </div>

          <Box title="Blog/コラム">
            <ul className="list-none p-0">{filteredBlogList && filteredBlogList.map((blog) => (new Date(blog.published_at) <= new Date() ? <Article key={blog.id} {...blog} /> : ""))}</ul>
            <div className="text-right">
              <Link href="/articles/page/1">
                <a>もっと見る</a>
              </Link>
            </div>
          </Box>
        </div>

        <div className="col-span-3 md:col-span-1">
          <SideBar artistList={artistList} newsList={newsList} />
        </div>
      </div>
    </Layout>
  );
};

export default Top;

export const getStaticProps: GetStaticProps = async () => {
  const newsList = await getLimitedArticlesData(5, 1, 1, "category");
  const blogList = await getLimitedArticlesData(5, 1, 2, "category");
  const artistList = await getLimitedArtistsData();
  const towerArticles = await getFeedArticles("https://tower.jp/feeds/article/");
  const gekirockArticles = await getFeedArticles("https://gekirock.com/news/index.xml");
  const cinraArticles = await getFeedArticles("https://www.cinra.net/feed/news?genre=music");
  const barksArticles = await getFeedArticles("https://feeds.barks.jp/rss/barks_news_jpop.rdf", true);
  return {
    props: {
      newsList,
      blogList,
      artistList,
      towerArticles,
      gekirockArticles,
      cinraArticles,
      barksArticles,
    },
    revalidate: 3,
  };
};
