import { countStreakDays } from "./streak";

describe("countStreakDays", () => {
  test("counts consecutive days ending today", () => {
    expect(countStreakDays(["2026-10-27", "2026-10-26", "2026-10-24"], "2026-10-27")).toBe(2);
  });

  test("no entry today → no streak yet", () => {
    expect(countStreakDays(["2026-10-26", "2026-10-25"], "2026-10-27")).toBe(0);
  });

  test("works across month boundaries", () => {
    expect(countStreakDays(["2026-11-01", "2026-10-31", "2026-10-30"], "2026-11-01")).toBe(3);
  });
});
