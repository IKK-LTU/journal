import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "./App";
import { store } from "./store/store";
import { addCheckinItem, checkinsSelectors } from "./store/features/checkins";

// Smoke tests: the main screens render without crashing (theme, store, router wired up).
describe("App", () => {
  test("home shows the empty state for a new user", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Pradėk nuo vieno jausmo" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Užrašyti pirmą įrašą" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Naujas įrašas" })).toBeInTheDocument();
  });

  test("new entry starts with the feelings question", () => {
    render(
      <MemoryRouter initialEntries={["/new-entry"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Ką dabar jauti?" })).toBeInTheDocument();
    expect(screen.getByText("1 iš 2")).toBeInTheDocument();
    // All groups are visible at once: a subtitle per core feeling, and the core word as an option.
    expect(screen.getByRole("heading", { name: "Išsigandęs" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Išsigandęs" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Atsipalaidavęs" })).toBeInTheDocument();
  });

  test("the deeper part opens on an entry and starts with the thought", () => {
    store.dispatch(
      addCheckinItem({
        date: "2026-11-04",
        emotion: [{ name: "Neramus", intensity: 7 }],
        place: "",
        people: [],
        situation: "Susitikimas",
        autoThought: "Turbūt jiems nepatiko",
        reactions: [],
        behavior: "",
        thinkingTraps: [],
        balancedThought: "",
        emotionAfter: [],
      }),
    );
    const [saved] = checkinsSelectors.selectCheckinsList(store.getState());

    render(
      <MemoryRouter initialEntries={[`/entry/${saved.id}/deeper`]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Kokia mintis tada šovė į galvą?" })).toBeInTheDocument();
    expect(screen.getByText("1 iš 4")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Turbūt jiems nepatiko")).toBeInTheDocument(); // starts from what's saved
  });
});
