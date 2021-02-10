import fetch from "node-fetch";

export async function getAllArticlesData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles`)
  );
  const articles = await res.json();
  const filteredArticles = articles.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return filteredArticles;
}

export async function getLimitedArticlesData(count = 10, page = 1, category_id = 0, column = null) {
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
  const filteredArticles = articles.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
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

export async function getArticleData(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles/${id}`)
  );
  const article = await res.json();
  return article;
}