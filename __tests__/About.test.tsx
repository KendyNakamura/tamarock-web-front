import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import About from "../pages/about";

it("Should render about title", () => {
  render(<About />);
  expect(screen.getByTestId("たまロックについて")).toBeInTheDocument();
});
