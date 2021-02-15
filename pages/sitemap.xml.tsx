import fetch from "isomorphic-unfetch";
import React from "react";
import { ARTICLE, ARTIST } from '../types/Types'

interface SITEMAPPROPS {
  artistList: ARTIST[];
  articleList: ARTICLE[];
  location: string;
}

const GenerateSitemap: React.FC<SITEMAPPROPS> = ({ articleList, artistList, location }) => {
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
    const articleURL = location + "articles/" + article.id;

    xml += `<url>
        <loc>${articleURL}</loc>
        <lastmod>${articleDate}</lastmod>
        <priority>0.60</priority>
      </url>`;
  });

  // アーティストページ
  artistList.map((artist) => {
    const artistDate = formatDate(new Date(artist.updatedat));
    const artistURL = location + "artists/" + artist.artist_id;

    xml += `<url>
        <loc>${artistURL}</loc>
        <lastmod>${artistDate}</lastmod>
        <priority>0.50</priority>
      </url>`;
  });

  return (<>
    {`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${xml}
    </urlset>`}
    </>);
};

export default GenerateSitemap;

const formatDate = (dt) => {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
};

export const getServerSideProps = async ({ res }) => {
  const location = `${process.env.NEXT_PUBLIC_SITE_URL}`;
  const artists = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/artist/infos`
  );
  const articles = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles`);
  const artistList = await artists.json();
  const articleList = await articles.json();
  // const sitemap = GenerateSitemap(articleList, artistList, location);
  // res.setHeader("content-type", "application/xml");
  // res.write(sitemap);
  // res.end();

  return {
    props: {
      articleList: articleList,
      artistList: artistList,
      location: location,
  } };
};