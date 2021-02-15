import { useEffect } from "react";
import Layout from "../components/layout";
import Box from "../components/box";
import Article from "../components/article";
import Artist from "../components/artist";
import Link from "next/link";
import { getLimitedArticlesData } from "../lib/articles";
import { getLimitedArtistsData } from "../lib/artists";
import useSWR from "swr";
import { GetStaticProps } from "next";
import { ARTICLE, ARTIST } from '../types/Types'


const fetcher = (url) => fetch(url).then((res) => res.json());
const newsApiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles?_end=5&_order=DESC&_sort=id&_start=0&column=category&q=1`;

interface STSTICPROPS {
  artistList: ARTIST[];
  newsList: ARTICLE[];
  blogList: ARTICLE[];
}

const Top: React.FC<STSTICPROPS> = ({ artistList, newsList, blogList }) => {
  const { data: news, mutate } = useSWR(newsApiUrl, fetcher, {
    initialData: newsList,
  });
  const filteredNewsList = news?.sort((a, b) => new Date(b.createdat).getTime() - new Date(a.createdat).getTime());
  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout home>
      <Box title="news">
        <ul className="list-none p-0">{newsList && newsList.map((news) => <Article key={news.id} {...news} />)}</ul>
        <Link href="/articles/page/1">
          <a>記事一覧へ</a>
        </Link>
      </Box>
      <Box title="Artists">
        <ul className="list-none flex justify-center flex-Kwrap p-0">{artistList && artistList.map((artist) => <Artist key={artist.id} {...artist} />)}</ul>
        <Link href="/artists/page/1">
          <a>artist一覧へ</a>
        </Link>
      </Box>
      <Box title="Blog">
        <ul className="list-none p-0">{blogList && blogList.map((blog) => <Article key={blog.id} {...blog} />)}</ul>
        <Link href="/articles/page/1">
          <a>記事一覧へ</a>
        </Link>
      </Box>
    </Layout>
  );
}

export default Top;

export const getStaticProps: GetStaticProps = async () => {
  const artistList = await getLimitedArtistsData();
  const newsList = await getLimitedArticlesData(5, 1, 1, "category");
  const blogList = await getLimitedArticlesData(5, 1, 2, "category");

  return {
    props: {
      artistList,
      newsList,
      blogList,
    },
    revalidate: 3,
  };
}
