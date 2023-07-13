import { render, screen } from "@testing-library/react";
import App from "./App";
import Game from "./components/Game";
import Cell from "./components/Cell";
import Button from "./components/Button";

describe("App", () => {
  test("renders without crashing", () => {
    render(<App />);
  });
});

describe("Game", () => {
  test("renders without crashing", () => {
    render(<Game />);
  });
});

describe("Cell", () => {
  test("renders without crashing", () => {
    render(<Cell />);
  });
});

describe("Button", () => {
  test("renders without crashing", () => {
    render(<Button />);
  });
});
