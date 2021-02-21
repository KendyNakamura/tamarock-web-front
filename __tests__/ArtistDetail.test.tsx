import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester";

initTestHelpers();

process.env.NEXT_PUBLIC_RESTAPI_URL = "http://localhost:5000/";

const server = setupServer(
  rest.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/artist/info/1CWmF1EcrKoWIbZt9Ivfg2?_end=5&_order=DESC&_sort=articles.id&_start=0`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 16,
        artist_id: "1CWmF1EcrKoWIbZt9Ivfg2",
        name: "BLUE ENCOUNT",
        url: "https://blueencount.jp/",
        twitter_id: "BLUEN_official",
        articles: [
          {
            id: 1,
            title: "Voluptatem sit perferendis aut consequatur accusantium.",
            text:
              "Aut voluptatem consequatur sit accusantium perferendis. Aut voluptatem consequatur accusantium perferendis sit. Sit consequatur voluptatem aut perferendis accusantium.\n" +
              "\n" +
              '<iframe width="660" height="371" src="https://www.youtube.com/embed/cSjyv-A0rBI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n' +
              "\n" +
              "<blockquote>aaadsaasdf</blockquote>",
            category: 2,
            artists: null,
            createdat: "2021-02-09T10:35:57.497Z",
            updatedat: "2021-02-11T08:25:57.164Z",
            deletedat: "0001-01-01T00:00:00Z",
          },
          {
            id: 2,
            title: "Accusantium aut voluptatem sit perferendis consequatur.",
            text: "Perferendis aut consequatur sit voluptatem accusantium. Perferendis sit consequatur aut accusantium voluptatem.",
            category: 2,
            artists: null,
            createdat: "2021-02-09T10:35:57.351Z",
            updatedat: "2021-02-09T10:36:39.065Z",
            deletedat: "0001-01-01T00:00:00Z",
          },
        ],
        youtube_ids: ["Isb7Q4jEA04", "l9t0a5CiBBo", "soIveYMAZwM", "W76xngzmAkU", "CMseeq7EhcI", "-MnlFslr3Go"],
        created_at: "0001-01-01T00:00:00Z",
        updated_at: "0001-01-01T00:00:00Z",
        deleted_at: "0001-01-01T00:00:00Z",
      })
    );
  }),
  rest.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/artist/info/3NTbOmzlj2cL86XFuDVFvZ?_end=5&_order=DESC&_sort=articles.id&_start=0`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 2,
        artist_id: "3NTbOmzlj2cL86XFuDVFvZ",
        name: "MAN WITH A MISSION",
        url: "https://www.mwamjapan.info/",
        twitter_id: "MWAMofficial",
        articles: [
          {
            id: 10,
            // title: "Voluptatem sit perferendis aut consequatur accusantium.",
            title: "title1",
            text:
              "Aut voluptatem consequatur sit accusantium perferendis. Aut voluptatem consequatur accusantium perferendis sit. Sit consequatur voluptatem aut perferendis accusantium.\n" +
              "\n" +
              '<iframe width="660" height="371" src="https://www.youtube.com/embed/cSjyv-A0rBI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n' +
              "\n" +
              "<blockquote>aaadsaasdf</blockquote>",
            category: 2,
            artists: null,
            createdat: "2021-02-09T10:35:57.497Z",
            updatedat: "2021-02-11T08:25:57.164Z",
            deletedat: "0001-01-01T00:00:00Z",
          },
          {
            id: 7,
            title: "Accusantium aut voluptatem sit perferendis consequatur.",
            text: "Perferendis aut consequatur sit voluptatem accusantium. Perferendis sit consequatur aut accusantium voluptatem.",
            category: 2,
            artists: null,
            createdat: "2021-02-09T10:35:57.351Z",
            updatedat: "2021-02-09T10:36:39.065Z",
            deletedat: "0001-01-01T00:00:00Z",
          },
        ],
        youtube_ids: ["C9c8QymgYXY", "4hSEZdezI44", "HIRfc3ybbPg", "r3sBIsngsbU", "yM6-QVxIXTs", "JjIiK9VcIsA"],
        created_at: "0001-01-01T00:00:00Z",
        updated_at: "0001-01-01T00:00:00Z",
        deleted_at: "0001-01-01T00:00:00Z",
      })
    );
  }),
  rest.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/artist/1CWmF1EcrKoWIbZt9Ivfg2`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        spotify_artist_info: {
          name: "BLUE ENCOUNT",
          id: "1CWmF1EcrKoWIbZt9Ivfg2",
          uri: "spotify:artist:1CWmF1EcrKoWIbZt9Ivfg2",
          href: "https://api.spotify.com/v1/artists/1CWmF1EcrKoWIbZt9Ivfg2",
          external_urls: {
            spotify: "https://open.spotify.com/artist/1CWmF1EcrKoWIbZt9Ivfg2",
          },
          popularity: 61,
          genres: ["anime", "j-pop", "j-poprock", "j-rock", "japanese alternative rock"],
          followers: {
            total: 255355,
            href: "",
          },
          images: [
            {
              height: 640,
              width: 640,
              url: "https://i.scdn.co/image/e8d1aa477696a5e546d54ad5ad1080e25ad9a12e",
            },
            {
              height: 320,
              width: 320,
              url: "https://i.scdn.co/image/b4c59290937b85f0137328c69487a2d1a052d8a6",
            },
            {
              height: 160,
              width: 160,
              url: "https://i.scdn.co/image/9b206d4a26bfb7f31fb7d31b97ec63311c84ba44",
            },
          ],
        }
      })
    );
  }),
  rest.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/artist/3NTbOmzlj2cL86XFuDVFvZ`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        spotify_artist_info: {
          name: "MAN WITH A MISSION",
          id: "3NTbOmzlj2cL86XFuDVFvZ",
          uri: "spotify:artist:3NTbOmzlj2cL86XFuDVFvZ",
          href: "https://api.spotify.com/v1/artists/3NTbOmzlj2cL86XFuDVFvZ",
          external_urls: {
            spotify: "https://open.spotify.com/artist/3NTbOmzlj2cL86XFuDVFvZ",
          },
          popularity: 63,
          genres: ["anime", "anime rock", "j-pop", "j-poprock", "j-rock", "otacore"],
          followers: { total: 738150, href: "" },
          images: [
            {
              height: 640,
              width: 640,
              url: "https://i.scdn.co/image/34f35e08ee6b82772612b3a5bc10e1d58e970a05",
            },
            {
              height: 320,
              width: 320,
              url: "https://i.scdn.co/image/0f1f4706877b5d8161c19f3009fad1a2c3b0d7a4",
            },
            {
              height: 160,
              width: 160,
              url: "https://i.scdn.co/image/f12a558b98fac1b8c08277974ac00951a2d29582",
            },
          ],
        }
      })
    );
  })
);
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe(`ArtistDetailPage Test Cases`, () => {
  it("Should render detailed content of ID 1", async () => {
    const { page } = await getPage({
      route: "/artists/1CWmF1EcrKoWIbZt9Ivfg2",
    });
    render(page);
    expect(await screen.findByTestId("BLUE ENCOUNT")).toBeInTheDocument();
    expect(await screen.getByText("Voluptatem sit perferendis aut consequatur accusantium.")).toBeInTheDocument();
    expect(screen.getByText("Accusantium aut voluptatem sit perferendis consequatur.")).toBeInTheDocument();
  });

  it("Should render detailed content of ID 2", async () => {
    const { page } = await getPage({
      route: "/artists/3NTbOmzlj2cL86XFuDVFvZ",
    });
    render(page);
    expect(await screen.findByTestId("MAN WITH A MISSION")).toBeInTheDocument();
    expect(await screen.getByText("title1")).toBeInTheDocument();
    expect(screen.getByText("Accusantium aut voluptatem sit perferendis consequatur.")).toBeInTheDocument();
  });

  // it("Should route back to article-page from detail page", async () => {
  //   const { page } = await getPage({
  //     route: "/posts/2",
  //   });
  //   render(page);
  //   await screen.findByText("title2");
  //   userEvent.click(screen.getByTestId("back-blog"));
  //   expect(await screen.findByText("blog page")).toBeInTheDocument();
  // });
});
