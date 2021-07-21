import fetch from "node-fetch";
import { ARTICLE } from "../types/Types";

export const getAllArticlesData = async () => {
  const res = await fetch(new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles`));
  const articles = await res.json();

  var filteredArticles = getArticlesBeforeToday(articles);
  filteredArticles = sortArticleByPublishedAt(filteredArticles);

  return filteredArticles;
};

export async function getLimitedArticlesData(count: number = 10, page: number = 1, category_id: number = 0, column: any = null) {
  var end = page * count;
  var start = page == 1 ? 0 : end - count;
  var categoryParam = category_id > 0 ? category_id : "";
  var columnParam = column ? `&column=${column}` : "";
  const res = await fetch(new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles?_end=${end}&_order=DESC&_sort=id&_start=${start}${columnParam}&q=${categoryParam}`));
  const articles = await res.json();

  var filteredArticles = getArticlesBeforeToday(articles);
  filteredArticles = sortArticleByPublishedAt(filteredArticles);

  return filteredArticles;
}

export async function getAllArticleIds() {
  const res = await fetch(new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles`));
  const articles = await res.json();
  return articles && articles.length > 0
    ? articles.map((article) => {
        return {
          params: {
            id: String(article.id),
          },
        };
      })
    : [];
}

export async function getArticleData(id: string) {
  const res = await fetch(new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles/${id}`));
  const article = await res.json();
  return article;
}

// 今日以前の記事のみ取得
function getArticlesBeforeToday(articles: ARTICLE[]) {
  var tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  return articles && articles.length > 0 ? articles.filter((article) => new Date(article.published_at) < tomorrow) : [];
}

// 公開日順でソート
function sortArticleByPublishedAt(articles: ARTICLE[]) {
  return articles.sort(
    (a, b) =>
      new Date(String(b.published_at) === "0001-01-01T00:00:00Z" ? b.created_at : b.published_at).getTime() +
      1000 * 60 * 60 * 24 -
      (new Date(String(a.published_at) === "0001-01-01T00:00:00Z" ? a.created_at : a.published_at).getTime() + 1000 * 60 * 60 * 24)
  );
}
