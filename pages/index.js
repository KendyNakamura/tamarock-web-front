import { useEffect } from "react";
import Layout from "../components/layout";
import Box from "../components/box";
import ArticleList from "../components/article/articleList";
import ArtistList from "../components/artist/artistList";
import Link from "next/link";
import { getLimitedArticlesData } from "../lib/articles";
import { getLimitedArtistsData } from "../lib/artists";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const articleApiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/artist/infos?_end=10&_order=DESC&_sort=id&_start=5`;
const newsApiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles?_end=5&_order=DESC&_sort=id&_start=0&column=category&q=1`;

export default function Top({ artistList, newsList, blogList }) {
  const { data: news, mutate } = useSWR(newsApiUrl, fetcher, {
    initialData: newsList,
  });
  const filteredNewsList = news?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout home>
      <Box title="news">
        <ArticleList list={filteredNewsList} count={5} />
        <Link href="/articles/page/1">
          <a>記事一覧へ</a>
        </Link>
      </Box>
      <Box title="Artists">
        <ArtistList list={artistList} count={10} />
        <Link href="/artists/page/1">
          <a>artist一覧へ</a>
        </Link>
      </Box>
      <Box title="Blog">
        <ArticleList list={blogList} count={5} />
        <Link href="/articles/page/1">
          <a>記事一覧へ</a>
        </Link>
      </Box>
    </Layout>
  );
}

export async function getStaticProps() {
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
