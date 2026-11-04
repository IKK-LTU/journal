import type { EntryDraft } from "./types";
import { validateBalancedThought, validateQuickStep, validateThought } from "./validation";

const draft = (overrides: Partial<EntryDraft> = {}): EntryDraft => ({
  date: "2026-10-27",
  emotions: [],
  place: "",
  people: [],
  situation: "",
  ...overrides,
});

describe("validateQuickStep", () => {
  test("feelings are required", () => {
    expect(validateQuickStep("emotions", draft())).toBe("Pasirink bent vieną jausmą");
    expect(validateQuickStep("emotions", draft({ emotions: [{ name: "Neramus", intensity: 5 }] }))).toBeNull();
  });

  test("what happened needs a few characters (spaces don't count); where/who are optional", () => {
    expect(validateQuickStep("context", draft({ situation: "  ab  " }))).toBe("Parašyk bent kelis žodžius apie tai, kas vyko");
    expect(validateQuickStep("context", draft({ situation: "Darbe" }))).toBeNull();
  });

  test("can't be dated in the future", () => {
    expect(validateQuickStep("context", draft({ situation: "Darbe", date: "2999-01-01" }))).toBe("Data negali būti ateityje");
  });
});

describe("deeper flow rules", () => {
  test("the thought is required — it's what the deeper part looks at", () => {
    expect(validateThought(" ")).toBe("Užrašyk mintį – bent kelis žodžius");
    expect(validateThought("Nepavyks")).toBeNull();
  });

  test("the friend's view is optional, up to 1000 characters", () => {
    expect(validateBalancedThought("")).toBeNull();
    expect(validateBalancedThought("a".repeat(1001))).toBe("Per ilga, iki 1000 simbolių");
  });
});
