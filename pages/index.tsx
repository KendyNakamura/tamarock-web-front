import { useEffect } from "react";
import Layout from "../components/layout";
import Box from "../components/box";
import Article from "../components/article";
import Link from "next/link";
import { getLimitedArticlesData } from "../lib/articles";
import { getLimitedArtistsData } from "../lib/artists";
import useSWR from "swr";
import { GetStaticProps } from "next";
import { ARTICLE, ARTIST } from "../types/Types";
import SideBar from "../components/sidebar";

const fetcher = (url) => fetch(url).then((res) => res.json());
const newsApiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles?_end=5&_order=DESC&_sort=id&_start=0&column=category&q=1`;

interface STSTICPROPS {
  artistList: ARTIST[];
  newsList: ARTICLE[];
  blogList: ARTICLE[];
}

const Top: React.FC<STSTICPROPS> = ({ newsList, blogList, artistList }) => {
  const { data: news, mutate } = useSWR(newsApiUrl, fetcher, {
    initialData: newsList,
  });
  const filteredNewsList = news?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout home>
      <div className="grid grid-cols-3 gap-x-2">
        <div className="col-span-3 md:col-span-2">
          <Box title="news" data-testId="top-news">
            <ul className="list-none p-0">{filteredNewsList && filteredNewsList.map((news) => (new Date(news.published_at) <= new Date() ? <Article key={news.id} {...news} /> : ""))}</ul>
            <div className="text-right">
              <Link href="/articles/page/1">
                <a>もっと見る</a>
              </Link>
            </div>
          </Box>
          <Box title="Blog">
            <ul className="list-none p-0">{blogList && blogList.map((blog) => (new Date(blog.published_at) <= new Date() ? <Article key={blog.id} {...blog} /> : ""))}</ul>
            <div className="text-right">
              <Link href="/articles/page/1">
                <a>もっと見る</a>
              </Link>
            </div>
          </Box>
        </div>
        <div className="col-span-3 md:col-span-1">
          <SideBar artistList={artistList} />
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

  return {
    props: {
      newsList,
      blogList,
      artistList,
    },
    revalidate: 3,
  };
};
