import type { CheckInDto } from "@/api/services/types";
import {
  averageIntensityDrop,
  coreFeelingShares,
  dailyAverageIntensity,
  describeTopPattern,
  difficultVsPleasant,
  filterByPeriod,
  placePatterns,
} from "./insights";

let nextId = 0;
const entry = (overrides: Partial<CheckInDto>): CheckInDto => ({
  id: String(nextId++),
  date: "2026-10-27",
  createdAt: "",
  emotion: [],
  place: "",
  people: [],
  situation: "…",
  autoThought: "",
  reactions: [],
  behavior: "",
  emotionAfter: [],
  ...overrides,
});

describe("coreFeelingShares", () => {
  test("groups precise feelings into their wheel core; custom words go to 'Kita'", () => {
    const entries = [
      entry({ emotion: [{ name: "Neramus", intensity: 7 }, { name: "Pavargęs", intensity: 4 }] }),
      entry({ emotion: [{ name: "Nesaugus", intensity: 5 }, { name: "Keistas", intensity: 3 }] }),
    ];
    expect(coreFeelingShares(entries)).toEqual([
      { name: "Išsigandęs", count: 2, percent: 50 },
      { name: "Liūdnas", count: 1, percent: 25 },
      { name: "Kita", count: 1, percent: 25 },
    ]);
  });
});

describe("difficultVsPleasant", () => {
  test("ignores custom emotions", () => {
    const entries = [
      entry({ emotion: [{ name: "Neramus", intensity: 7 }, { name: "Ramus", intensity: 5 }] }),
      entry({ emotion: [{ name: "Linksmas", intensity: 6 }, { name: "Keistas", intensity: 2 }] }),
    ];
    expect(difficultVsPleasant(entries)).toEqual({ difficultPercent: 33, pleasantPercent: 67 });
  });

  test("null when there is nothing to compare", () => {
    expect(difficultVsPleasant([])).toBeNull();
  });
});

describe("patterns", () => {
  test("a place needs at least 2 entries; the strongest emotion decides the core", () => {
    const entries = [
      entry({ place: "Darbe", emotion: [{ name: "Neramus", intensity: 7 }] }),
      entry({ place: "Darbe", emotion: [{ name: "Sužeistas", intensity: 3 }, { name: "Nesaugus", intensity: 8 }] }),
      entry({ place: "Namie", emotion: [{ name: "Ramus", intensity: 6 }] }),
    ];
    expect(placePatterns(entries)).toEqual([{ context: "Darbe", core: "Išsigandęs", count: 2 }]);
    expect(describeTopPattern(entries)).toBe("Darbe dažniausiai jauti: Išsigandęs");
  });

  test("falls back to people; 'Niekas' reads naturally", () => {
    const entries = [
      entry({ people: ["Niekas"], emotion: [{ name: "Vienišas", intensity: 6 }] }),
      entry({ people: ["Niekas"], emotion: [{ name: "Pavargęs", intensity: 5 }] }),
    ];
    expect(describeTopPattern(entries)).toBe("Kai šalia nieko nėra, dažniausiai jauti: Liūdnas");
  });

  test("no pattern from a single entry", () => {
    expect(describeTopPattern([entry({ place: "Darbe", emotion: [{ name: "Neramus", intensity: 7 }] })])).toBeNull();
  });
});

describe("averageIntensityDrop", () => {
  test("mean drop over re-rated entries", () => {
    const entries = [
      entry({ emotion: [{ name: "Neramus", intensity: 8 }], emotionAfter: [{ name: "Neramus", intensity: 4 }] }),
      entry({ emotion: [{ name: "Piktas", intensity: 6 }], emotionAfter: [{ name: "Piktas", intensity: 5 }] }),
      entry({ emotion: [{ name: "Ramus", intensity: 5 }] }), // not re-rated → ignored
    ];
    expect(averageIntensityDrop(entries)).toEqual({ average: 2.5, entryCount: 2 });
  });

  test("null with fewer than 2 re-rated entries", () => {
    const one = entry({ emotion: [{ name: "Neramus", intensity: 8 }], emotionAfter: [{ name: "Neramus", intensity: 4 }] });
    expect(averageIntensityDrop([one])).toBeNull();
  });
});

describe("filterByPeriod", () => {
  test("last 7 days including today; never the future", () => {
    const entries = [
      entry({ date: "2026-10-27" }),
      entry({ date: "2026-10-21" }), // 6 days ago → in
      entry({ date: "2026-10-20" }), // 7 days ago → out
      entry({ date: "2026-10-28" }), // future → out
    ];
    expect(filterByPeriod(entries, 7, "2026-10-27").map((item) => item.date)).toEqual(["2026-10-27", "2026-10-21"]);
    expect(filterByPeriod(entries, null, "2026-10-27")).toHaveLength(4);
  });
});

describe("dailyAverageIntensity", () => {
  test("one point per day, oldest first, null on empty days", () => {
    const entries = [
      entry({ date: "2026-10-25", emotion: [{ name: "Neramus", intensity: 8 }, { name: "Pavargęs", intensity: 4 }] }),
      entry({ date: "2026-10-27", emotion: [{ name: "Ramus", intensity: 3 }] }),
    ];
    expect(dailyAverageIntensity(entries, 3, "2026-10-27")).toEqual([
      { date: "2026-10-25", average: 6 },
      { date: "2026-10-26", average: null },
      { date: "2026-10-27", average: 3 },
    ]);
  });
});
