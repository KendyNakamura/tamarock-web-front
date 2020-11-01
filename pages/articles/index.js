import React from "react";
import Layout from "../../components/layout";
import ArticleList from "../../components/article/articleList";
import fetch from "isomorphic-unfetch";

export default function NewsList({ articleList, articleCountJSON }) {
  return (
    <Layout headTitle="ニュース一覧">
      <div className="box">
        <h2>News</h2>
        <ArticleList list={articleList} count={articleCountJSON} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  var end_num = 10;
  var start_num = 0;
  if (page > 1) {
    start_num = end_num * (page - 1);
    end_num = end_num * page;
  }
  const articles = await fetch(
    `http://tamarock-api:5000/api/articles?_end=${end_num}&_order=DESC&_sort=id&_start=${start_num}`
  );
  const articleList = await articles.json();

  const articleCount = await fetch(
    "http://tamarock-api:5000/api/articles/count"
  );
  const articleCountJSON = await articleCount.json();

  return {
    props: {
      articleList,
      articleCountJSON,
    },
  };
}
