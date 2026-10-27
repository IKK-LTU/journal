import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "./App";

// Smoke tests: the main screens render without crashing (theme, store, router wired up).
describe("App", () => {
  test("home shows the empty state for a new user", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Dar nieko neparašei/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Naujas įrašas" })).toBeInTheDocument();
  });

  test("new entry starts with the feelings question", () => {
    render(
      <MemoryRouter initialEntries={["/new-entry"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Ką dabar jauti?" })).toBeInTheDocument();
    // All groups are visible at once: a subtitle per core feeling, and the core word as an option.
    expect(screen.getByRole("heading", { name: "Išsigandęs" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Išsigandęs" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Atsipalaidavęs" })).toBeInTheDocument();
  });
});
