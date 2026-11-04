import type { CheckInDto } from "@/api/services/types";
import { canGoDeeper, describeEntryContext } from "./entry";

const entry = (overrides: Partial<CheckInDto>): CheckInDto => ({
  id: "e1",
  date: "2026-11-04",
  createdAt: "",
  emotion: [],
  place: "",
  people: [],
  situation: "…",
  autoThought: "",
  reactions: [],
  behavior: "",
  thinkingTraps: [],
  balancedThought: "",
  emotionAfter: [],
  ...overrides,
});

describe("describeEntryContext", () => {
  test("only the parts the entry has", () => {
    expect(describeEntryContext(entry({ place: "Darbe", people: ["Kolegos", "Draugai"] }), "2026-11-04")).toBe(
      "Šiandien · Darbe · Šalia: Kolegos, Draugai",
    );
    expect(describeEntryContext(entry({}), "2026-11-05")).toBe("Vakar");
  });
});

describe("canGoDeeper", () => {
  test("hard feelings without a friend's view → yes", () => {
    expect(canGoDeeper(entry({ emotion: [{ name: "Neramus", intensity: 6 }] }))).toBe(true);
  });

  test("a good moment → no", () => {
    expect(canGoDeeper(entry({ emotion: [{ name: "Laimingas", intensity: 8 }] }))).toBe(false);
  });

  test("already reframed → no; a thought without a friend's view → yes (to finish)", () => {
    expect(canGoDeeper(entry({ emotion: [{ name: "Neramus", intensity: 6 }], balancedThought: "Tyla nėra kritika" }))).toBe(false);
    expect(canGoDeeper(entry({ emotion: [{ name: "Laimingas", intensity: 8 }], autoThought: "Neužsitarnavau" }))).toBe(true);
  });
});
