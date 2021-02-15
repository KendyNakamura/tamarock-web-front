import Link from "next/link";
import React from "react";
import { ARTIST } from "../types/Types";

const Artist: React.FC<ARTIST> = ({ id, artist_id, name }) => {
  return (
    <li className="col-span-4 md:col-span-1 pb-2" key={id}>
      <Link href="/artists/[id]" as={`/artists/${artist_id}`}>
        <a>{name}</a>
      </Link>
    </li>
  );
};

export default Artist;
