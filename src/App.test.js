import { render} from "@testing-library/react";
import App from "./App";
import Game from "./components/Game";

describe("App", () => {
  test("renders without crashing", () => {
    render(<App />);
  });
});

