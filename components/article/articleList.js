import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import Pagenation from "../pagenation";
import styles from "../../styles/articles/article.module.css";

export default function ArticleList({ list, count }) {
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  else {
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

  var pagenation = "";
  if (count > 10) {
    pagenation = <Pagenation list={content} count={count} />;
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
