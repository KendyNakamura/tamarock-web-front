import Link from "next/link";
import Pagenation from "../pagenation";

export default function ArticleList({ list, count }) {
  var content = "";
  if (list) {
    content = (
      <ol className="list-none p-0">
        {/* <ol className={styles.articleList}> */}
        {list.map((article) => (
          <li className="pl-5 my-8 border-b-2 border-yellow-400 border-dashed" key={article.id}>
            <Link href="/articles/[id]" as={`/articles/${article.id}`}>
              <a>
                <p>
                  {article.title}
                  <br />
                  <span className="text-gray-500">{formatDate(new Date(article.createdat))}</span>
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ol>
    );
  }

  if (count > 10) {
    var pagenation = <Pagenation pageName="articles" totalCount={count} />;
  }

  return (
    <div>
      {content}
      {pagenation}
    </div>
  );
}

function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
}
