import Layout from "../components/layout";
import ArticleList from "../components/article/articleList";
import ArtistList from "../components/artist/artistList";
import Link from "next/link";
import { getLimitedArticlesData } from "../lib/articles";
import { getLimitedArtistsData } from "../lib/artists";

export default function Top({ artistList, newsList, blogList }) {
  return (
    <Layout home>
      <div className="box">
        <h2>News</h2>
        <ArticleList list={newsList} count={5} />
        <Link href="/articles/page/1">
          <a>記事一覧へ</a>
        </Link>
      </div>
      <div className="box">
        <h2>Artists</h2>
        <ArtistList list={artistList} count={10} />
        <Link href="/artists/page/1">
          <a>artist一覧へ</a>
        </Link>
      </div>
      <div className="box">
        <h2>Blog</h2>
        <ArticleList list={blogList} count={5} />
        <Link href="/articles/page/1">
          <a>記事一覧へ</a>
        </Link>
      </div>
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
  };
}
