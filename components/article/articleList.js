import Link from "next/link";
import Pagenation from "../Pagenation";
import styles from "../../styles/articles/article.module.css";

export default function ArticleList({ list, count }) {
  var content = "";
  if (list) {
    content = (
      <ol className={styles.articleList}>
        {list.map((article) => (
          <li className={styles.article} key={article.id}>
            <Link href="/articles/[id]" as={`/articles/${article.id}`}>
              <a>
                <p>
                  {article.title}
                  <br />
                  <span className={styles.articleDate}>
                    {formatDate(new Date(article.createdat))}
                  </span>
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ol>
    );
  }

  var pagenation = <Pagenation pageName="articles" totalCount={count} />;

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
