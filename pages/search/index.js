import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

export default function Search({ listData }) {
  return (
    <Layout>
      <Head>
        <title>Search</title>
      </Head>
      <ul className={`${utilStyles.list} box`}>
        {listData.map(({ name, id }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href="/artists/[id]" as={`/artists/${id}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;
  const res = await fetch(
    `http://tamarock-api:5000/api/search?artist_name=${name}`
  );
  const list = await res.json();
  const listData = list["artists"]["items"];
  return {
    props: {
      listData,
    },
  };
}
