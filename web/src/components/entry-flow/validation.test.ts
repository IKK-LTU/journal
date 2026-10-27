import type { EntryDraft } from "./types";
import { validateStep } from "./validation";

const draft = (overrides: Partial<EntryDraft> = {}): EntryDraft => ({
  date: "2026-10-27",
  emotions: [],
  place: "",
  people: [],
  situation: "",
  autoThought: "",
  reactions: [],
  behavior: "",
  emotionAfter: [],
  ...overrides,
});

describe("validateStep", () => {
  test("feelings are required", () => {
    expect(validateStep("emotions", draft())).toBe("Pasirink bent vieną jausmą");
    expect(validateStep("emotions", draft({ emotions: [{ name: "Neramus", intensity: 5 }] }))).toBeNull();
  });

  test("situation needs a few characters (spaces don't count)", () => {
    expect(validateStep("situation", draft({ situation: "  ab  " }))).toBe("Parašyk bent kelis žodžius");
    expect(validateStep("situation", draft({ situation: "Darbe" }))).toBeNull();
  });

  test("situation can't be dated in the future", () => {
    expect(validateStep("situation", draft({ situation: "Darbe", date: "2999-01-01" }))).toBe("Data negali būti ateityje");
  });

  test("optional steps pass when empty", () => {
    for (const step of ["place", "people", "thought", "reaction", "after"] as const) {
      expect(validateStep(step, draft())).toBeNull();
    }
  });
});
