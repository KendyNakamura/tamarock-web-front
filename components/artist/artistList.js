import Link from "next/link";
import Pagenation from "../pagenation";

export default function ArtistList({ list, count }) {
  var content = "";
  if (list) {
    var artistList = [];
    for (var i in list) {
      artistList.push(
        <li className="w-64 my-3 leading-8" key={i}>
          <Link href="/artists/[id]" as={`/artists/${list[i].artist_id}`}>
            <a>{list[i].name}</a>
          </Link>
        </li>
      );
    }
    var $listCount = 4 - (list.length % 4),
      j;

    for (j = 0; j < $listCount; j++) {
      var keyProps = artistList.length + 1;
      artistList.push(<li className="w-64 my-3 leading-8" key={keyProps}></li>);
    }

    content = <ul className="list-none flex justify-center flex-wrap p-0">{artistList}</ul>;

    var pagenation = "";
    if (count > 10) {
      pagenation = <Pagenation pageName="artists" totalCount={count} />;
    }
  }

  return (
    <div>
      {content}
      {pagenation}
    </div>
  );
}
