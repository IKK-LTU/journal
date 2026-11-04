import { descendingBy, newestFirstBy } from "./sort";

describe("descendingBy", () => {
  test("highest value first", () => {
    const shares = [{ count: 1 }, { count: 3 }, { count: 2 }];
    expect(shares.sort(descendingBy((share) => share.count)).map((share) => share.count)).toEqual([3, 2, 1]);
  });
});

describe("newestFirstBy", () => {
  test("latest ISO date first", () => {
    const entries = [{ date: "2026-10-01" }, { date: "2026-11-04" }, { date: "2026-10-15" }];
    expect(entries.sort(newestFirstBy((entry) => entry.date)).map((entry) => entry.date)).toEqual([
      "2026-11-04",
      "2026-10-15",
      "2026-10-01",
    ]);
  });
});
