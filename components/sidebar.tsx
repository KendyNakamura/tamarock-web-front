import { ARTICLE } from "../types/Types";
import Article from "../components/article";
import Box from "../components/box";
import Link from "next/link";

interface SIDEBARPROPS {
  newsList: ARTICLE[];
}

const SideBar: React.FC<SIDEBARPROPS> = ({ newsList }) => {
  return (
    <>
      <Box title="Articles">
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
