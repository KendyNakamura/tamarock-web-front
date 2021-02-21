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
  rest.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles?_end=10&_order=DESC&_sort=id&_start=0`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          title: "title1",
          text: "content1",
          category: 1,
          artists: [
            {
              id: 1,
              artist_id: "123xyz",
              name: "artist1",
              url: "http://example.com",
              twitter_id: "kenji__n",
            },
            {
              id: 2,
              artist_id: "456xyz",
              name: "artist2",
              url: "http://example2.com",
              twitter_id: "kenji__n2",
            },
          ],
          created_at: "2021-01-12 14:59:41",
          updatedat: "2021-01-12 14:59:41",
        },
        {
          id: 2,
          title: "title2",
          text: "content2",
          category: 2,
          artists: [
            {
              id: 1,
              artist_id: "123xyz",
              name: "artist1",
              url: "http://example.com",
              twitter_id: "kenji__n",
            },
            {
              id: 2,
              artist_id: "456xyz",
              name: "artist2",
              url: "http://example2.com",
              twitter_id: "kenji__n2",
            },
          ],
          created_at: "2021-01-12 14:59:41",
          updatedat: "2021-01-12 14:59:41",
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

describe("ArticlePage Test Cases", () => {
  // it("Should route to article page and route back to home page", async () => {
  //   const { page } = await getPage({
  //     route: "/",
  //   });
  //   render(page);
  //   userEvent.click(screen.getByTestId("article-nav"));
  //   expect(await screen.findByText("ニュース一覧")).toBeInTheDocument();
  //   userEvent.click(screen.getByTestId("home-nav"));
  //   expect(await screen.findByText("Top")).toBeInTheDocument();
  // });

  it("Should render the list of articles pre-fetched by getStaticProps", async () => {
    const { page } = await getPage({
      route: "/articles/page/1",
    });
    render(page);
    expect(await screen.findByText("ニュース一覧")).toBeInTheDocument();
    expect(screen.getByText("title1")).toBeInTheDocument();
    expect(screen.getByText("title2")).toBeInTheDocument();
  });
});
