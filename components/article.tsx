import Link from "next/link";
import Image from "next/image";
import { ARTICLE } from "../types/Types";

const ArticleList: React.FC<ARTICLE> = ({ id, title, pictures, published_at, created_at }) => {
  const showDate = String(published_at) === "0001-01-01T00:00:00Z" ? new Date(created_at) : new Date(published_at);
  // サムネイル表示
  var thumbnail = <></>;
  var imageUrl = "";
  if (pictures && pictures[0].src !== "") {
    imageUrl = pictures[0].src;
    thumbnail = (
      <div className="mr-3">
        <Image src={imageUrl} alt={title} width={150} height={100} layout="fixed" />
      </div>
    );
  }

  return (
    <li className="pl-5 my-4 border-b-2 border-yellow-400 border-dashed" key={id}>
      <Link href="/articles/[id]" as={`/articles/${id}`}>
        <a className="flex">
          {thumbnail}
          <p className="mt-0">
            {title}
            <br />
            <span className="text-gray-500">{formatDate(showDate)}</span>
          </p>
        </a>
      </Link>
    </li>
  );
};

export default ArticleList;

const formatDate = (dt) => {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
};
