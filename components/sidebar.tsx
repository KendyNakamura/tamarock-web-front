import { ARTIST } from "../types/Types";
import Artist from "../components/artist";
import Box from "../components/box";
import Link from "next/link";

interface SIDEBARPROPS {
  artistList: ARTIST[];
}

const SideBar: React.FC<SIDEBARPROPS> = ({ artistList }) => {
  return (
    <Box title="Artists">
      <ul>{artistList && artistList.map((artist) => <Artist key={artist.id} {...artist} />)}</ul>
      <div className="text-right">
        <Link href="/artists/page/1">
          <a>もっと見る</a>
        </Link>
      </div>
    </Box>
  );
};

export default SideBar;
