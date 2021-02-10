import Link from "next/link";
import Pagenation from "../pagenation";
import styles from "../../styles/artists/artist.module.css";

export default function ArtistList({ list, count }) {
  var content = "";
  if (list) {
    var artistList = [];
    for (var i in list) {
      artistList.push(
        <li className={styles.artist} key={i}>
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
      artistList.push(<li className={styles.artist} key={keyProps}></li>);
    }

    content = <ul className={styles.artistList}>{artistList}</ul>;

    var pagenation = "";
    if (count > 10) {
      pagenation = <Pagenation pageName="artists" count={count} />;
    }
  }

  return (
    <div>
      {content}
      {pagenation}
    </div>
  );
}
