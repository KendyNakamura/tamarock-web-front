export interface ARTICLE {
  id: number;
  title: string;
  text: string;
  category: number;
  artists: ARTIST[];
  pictures: PICTURE[];
  createdat: Date;
  updatedat: Date;
}

export interface ARTIST {
  id: number;
  artist_id: string;
  name: string;
  url: string;
  twitter_id: string;
  articles: ARTICLE[];
  updated_at: Date;
}

export interface SPOTIFYARTIST {
  spotify_artist_info: {
    id: string,
    name: string,
    images: {
      url: string
    }
  };
  artist: ARTIST[];
}

interface PICTURE {
  src?: string
}
