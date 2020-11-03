import React from "react";
import fetch from "isomorphic-unfetch";

const generateSitemap = (articleList, artistList, location) => {
  let xml = "";

  // トップページ
  xml += `<url>
        <loc>${location}</loc>
        <lastmod>2020-10-01</lastmod>
        <priority>0.90</priority>
      </url>`;

  // 記事ページ
  articleList.map((article) => {
    const articleDate = formatDate(new Date(article.updatedat));
    const articleURL = location + "/articles/" + article.id;

    xml += `<url>
        <loc>${articleURL}</loc>
        <lastmod>${articleDate}</lastmod>
        <priority>0.60</priority>
      </url>`;
  });

  // アーティストページ
  artistList.map((artist) => {
    const artistDate = formatDate(new Date(artist.updated_at));
    const artistURL = location + "/artists/" + artist.artist_id;

    xml += `<url>
        <loc>${artistURL}</loc>
        <lastmod>${artistDate}</lastmod>
        <priority>0.50</priority>
      </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${xml}
    </urlset>`;
};

const formatDate = (dt) => {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
};

export const getServerSideProps = async ({ res }) => {
  const location = "https://tamarock.jp";
  const artists = await fetch("http://tamarock-api:5000/api/artist/infos");
  const articles = await fetch("http://tamarock-api:5000/api/articles");
  const artistList = await artists.json();
  const articleList = await articles.json();
  console.log(artistList);
  const sitemap = generateSitemap(articleList, artistList, location);
  res.setHeader("content-type", "application/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

const sitemap = () => null;

export default sitemap;
