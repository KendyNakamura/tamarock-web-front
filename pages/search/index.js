import Layout from "../../components/layout";
import Box from "../../components/box";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

export default function Search({ listData }) {
  return (
    <Layout title="search">
      <Head>
        <title>Search</title>
      </Head>
      <Box headTitle="search">
        <ul className="list-none p-0">
          {listData.map(({ name, id }) => (
            <li className="pl-5 my-8 border-b-2 border-yellow-400 border-dashed" key={id}>
              <Link href="/artists/[id]" as={`/artists/${id}`}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/search?artist_name=${name}`);
  const list = await res.json();
  const listData = list["artists"]["items"];
  return {
    props: {
      listData,
    },
  };
}
