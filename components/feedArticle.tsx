import Link from "next/link";
import { FEEDARTICLE } from "../types/Types";

const FeedArticle: React.FC<FEEDARTICLE> = ({ title, link }) => {
  return (
    <li className="pl-5 my-4 border-b-2 border-yellow-400 border-dashed" key={link}>
      <Link href={link} passHref={true}>
        <a target="_blank" rel="noreferrer">
          <p>{title}</p>
        </a>
      </Link>
    </li>
  );
};

export default FeedArticle;
