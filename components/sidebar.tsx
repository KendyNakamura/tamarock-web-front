import { ARTIST, ARTICLE } from "../types/Types";
import Artist from "../components/artist";
import Article from "../components/article";
import Box from "../components/box";
import Link from "next/link";

interface SIDEBARPROPS {
  artistList: ARTIST[];
  newsList: ARTICLE[];
}

const SideBar: React.FC<SIDEBARPROPS> = ({ artistList, newsList }) => {
  return (
    <>
      <Box title="Artists">
        <ul>{artistList && artistList.map((artist) => <Artist key={artist.id} {...artist} />)}</ul>
        <div className="text-right">
          <Link href="/artists/page/1">
            <a>もっと見る</a>
          </Link>
        </div>
      </Box>
      <Box title="News">
        <ul>{newsList && newsList.map((news) => <Article key={news.id} {...news} />)}</ul>
        <div className="text-right">
          <Link href="/articles/page/1">
            <a>もっと見る</a>
          </Link>
        </div>
      </Box>
    </>
  );
};

export default SideBar;
