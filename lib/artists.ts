import fetch from "node-fetch";

export const getAllArtistsData = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/artist/infos`)
  );
  const artists = await res.json();
  const filteredArtists = artists.sort(
    (a, b) => new Date(b.createdat).getDate() - new Date(a.createdat).getDate()
  );
  return filteredArtists;
}

export async function getLimitedArtistsData(count: number = 10, page: number = 1) {
  var end = page * count;
  var start = page == 1 ? 0 : end - count;
  const res = await fetch(
    new URL(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/artist/infos?_end=${end}&_order=DESC&_sort=id&_start=${start}`
    )
  );
  const artists = await res.json();
  const filteredArtists = artists.sort((a, b) => new Date(b.createdat).getDate() - new Date(a.createdat).getDate());
  return filteredArtists;
}

export async function getAllArtistIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/artist/infos`)
  );
  const artists = await res.json();
  return artists.map((artist) => {
    return {
      params: {
        id: String(artist.artist_id),
      },
    };
  });
}

export async function getArtistData(id: string) {
  const res = await fetch(
    new URL(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/artist/info/${id}?_end=5&_order=DESC&_sort=articles.id&_start=0`
    )
  );
  const artist = await res.json();
  return artist;
}

export async function getSpotifyArtistData(id: string) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/artist/${id}`)
  );

  const spotifyArtist = await res.json();
  return spotifyArtist;
}
