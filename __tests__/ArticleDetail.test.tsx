import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester";

initTestHelpers();

process.env.NEXT_PUBLIC_RESTAPI_URL = "http://localhost:5000/";

const server = setupServer(
  rest.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles/1`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
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
        updated_at: "2021-01-12 14:59:41",
      })
    );
  }),
  rest.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/articles/2`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
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
        updated_at: "2021-01-12 14:59:41",
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

describe(`ArticleDetailPage Test Cases`, () => {
  it("Should render detailed content of ID 1", async () => {
    const { page } = await getPage({
      route: "/articles/1",
    });
    render(page);
    expect(await screen.findByText("title1")).toBeInTheDocument();
    expect(screen.getByText("content1")).toBeInTheDocument();
    expect(screen.getByText("artist1")).toBeInTheDocument();
    expect(screen.getByText("artist2")).toBeInTheDocument();
  });

  it("Should render detailed content of ID 2", async () => {
    const { page } = await getPage({
      route: "/articles/2",
    });
    render(page);
    expect(await screen.findByText("title2")).toBeInTheDocument();
    expect(screen.getByText("content2")).toBeInTheDocument();
    expect(screen.getByText("artist1")).toBeInTheDocument();
    expect(screen.getByText("artist2")).toBeInTheDocument();
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
