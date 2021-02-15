import Layout from "../../components/layout";
import Box from "../../components/box";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { SEARCHLIST } from "../../types/Types";
import { GetServerSideProps } from "next";

interface SEARCHLISTS {
  listData: SEARCHLIST[];
}

const Search: React.FC<SEARCHLISTS> = ({ listData }) => {
  return (
    <Layout headTitle="search">
      <Box title="search">
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
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.query;
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/search?artist_name=${name}`);
  const list = await res.json();
  const listData = list["artists"]["items"];
  return {
    props: {
      listData,
    },
  };
};
