import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import About from "../pages/about";
// import { getPage } from "next-page-tester";
// import { initTestHelpers } from "next-page-tester";
// import userEvent from "@testing-library/user-event";

// initTestHelpers();

describe(`AboutPage Test Cases`, () => {
  it("Should render about title", async () => {
    render(<About />);
    expect(await screen.findByTestId("たまロックについて")).toBeInTheDocument();
  });

  // it("Should back to home using breadcrumbs", async () => {
  //   const { page } = await getPage({
  //     route: "/about",
  //   });
  //   render(page);
  //   expect(await screen.findByTestId("たまロックについて")).toBeInTheDocument();
  //   userEvent.click(screen.getByTestId("first-link"));
  //   expect(await screen.findByTestId("top-news")).toBeInTheDocument();
  // });
});
