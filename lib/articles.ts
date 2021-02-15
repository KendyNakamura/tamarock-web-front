import fetch from "node-fetch";

export const getAllArticlesData = async () => {
  const res = await fetch(new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles`));
  const articles = await res.json();
  const filteredArticles = articles.sort((a, b) => new Date(b.createdat).getDate() - new Date(a.createdat).getDate());
  return filteredArticles;
};

export async function getLimitedArticlesData(count: number = 10, page: number = 1, category_id: number = 0, column: any = null) {
  var end = page * count;
  var start = page == 1 ? 0 : end - count;
  var categoryParam = category_id > 0 ? category_id : "";
  var columnParam = column ? `&column=${column}` : "";
  const res = await fetch(
    new URL(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles?_end=${end}&_order=DESC&_sort=id&_start=${start}${columnParam}&q=${categoryParam}`
    )
  );
  const articles = await res.json();
  const filteredArticles = articles.sort((a, b) => new Date(b.createdat).getDate() - new Date(a.createdat).getDate());
  return filteredArticles;
}

export async function getAllArticleIds() { 
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles`)
  );
  const articles = await res.json();
  return articles.map((article) => {
    return {
      params: {
        id: String(article.id),
      },
    };
  });
}

export async function getArticleData(id: string) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles/${id}`)
  );
  const article = await res.json();
  return article;
}