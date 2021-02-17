import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester";

initTestHelpers();

process.env.NEXT_PUBLIC_RESTAPI_URL = "http://localhost:5000/";

const server = setupServer(
  rest.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/artist/infos?_end=10&_order=DESC&_sort=id&_start=0`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          artist_id: "1CWmF1EcrKoWIbZt9Ivfg2",
          name: "BLUE ENCOUNT",
          url: "https://blueencount.jp/",
          twitter_id: "BLUEN_official",
          articles: [
            {
              id: 1,
              title: "title1",
              text: "content1",
              category: 1,
              created_at: "2021-01-12 14:59:41",
              updated_at: "2021-01-12 14:59:41",
            },
            {
              id: 2,
              title: "title2",
              text: "content2",
              category: 2,
              created_at: "2021-01-12 14:59:41",
              updated_at: "2021-01-12 14:59:41",
            },
          ],
          created_at: "2021-01-12 14:59:41",
          updated_at: "2021-01-12 14:59:41",
        },
        {
          id: 2,
          artist_id: "0zEbGW70TQHSOf4Ip1oeVn",
          name: "ACIDMAN",
          url: "http://acidman.jp/content/",
          twitter_id: "acidman_staff",
          articles: [
            {
              id: 1,
              title: "title1",
              text: "content1",
              category: 1,
              created_at: "2021-01-12 14:59:41",
              updated_at: "2021-01-12 14:59:41",
            },
            {
              id: 2,
              title: "title2",
              text: "content2",
              category: 2,
              created_at: "2021-01-12 14:59:41",
              updated_at: "2021-01-12 14:59:41",
            },
          ],
          created_at: "2021-01-12 14:59:41",
          updated_at: "2021-01-12 14:59:41",
        },
      ])
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

describe("ArtistPage Test Cases", () => {
  // it("Should route to artist page and route back to home page", async () => {
  //   const { page } = await getPage({
  //     route: "/",
  //   });
  //   render(page);
  //   userEvent.click(screen.getByTestId("artist-nav"));
  //   expect(await screen.findByText("アーティスト一覧")).toBeInTheDocument();
  //   userEvent.click(screen.getByTestId("home-nav"));
  //   expect(await screen.findByText("Top")).toBeInTheDocument();
  // });

  it("Should render the list of artists pre-fetched by getStaticProps", async () => {
    const { page } = await getPage({
      route: "/artists/page/1",
    });
    render(page);
    expect(await screen.findByText("アーティスト一覧")).toBeInTheDocument();
    expect(screen.getByText("BLUE ENCOUNT")).toBeInTheDocument();
    expect(screen.getByText("ACIDMAN")).toBeInTheDocument();
  });
});
