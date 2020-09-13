import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

export async function getArtistId({ id }) {
  const res = await fetch(`http://localhost:5010/api/artist/${id}`);
  const artist = await res.json();
  return {
    params: {
      id: artist.id,
    },
  };
}

export async function getArtistData(id) {
  const res = await fetch(`http://localhost:5010/api/artist/${id}`);
  const artist = await res.json();
  return {
    props: {
      id: artist.id,
    },
  };
}
