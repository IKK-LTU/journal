import { daysBetween, formatDayHeading, formatTime, getGreeting, getWeekDates, toLocalDateString } from "./date";

describe("toLocalDateString", () => {
  test("uses the local day, even right after midnight", () => {
    // toISOString() would give the previous day in UTC+2/+3.
    expect(toLocalDateString(new Date(2026, 9, 29, 0, 30))).toBe("2026-10-29");
  });
});

describe("daysBetween", () => {
  test("counts whole days across the daylight-saving change (25 Oct 2026)", () => {
    expect(daysBetween("2026-10-24", "2026-10-26")).toBe(2);
  });
});

describe("formatDayHeading", () => {
  const today = "2026-10-29";

  test.each([
    ["2026-10-29", "Šiandien"],
    ["2026-10-28", "Vakar"],
    ["2026-10-26", "Pirmadienis"],
    ["2026-10-12", "spalio 12 d."],
  ])("%s → %s", (date, expected) => {
    expect(formatDayHeading(date, today)).toBe(expected);
  });
});

describe("getWeekDates", () => {
  test("Monday → Sunday of the current week", () => {
    expect(getWeekDates(new Date(2026, 9, 29))).toEqual([
      "2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30", "2026-10-31", "2026-11-01",
    ]);
  });

  test("on a Sunday it still shows the week that ends today (old bug: showed next week)", () => {
    const sunday = new Date(2026, 10, 1);
    expect(getWeekDates(sunday)[0]).toBe("2026-10-26");
    expect(getWeekDates(sunday)[6]).toBe("2026-11-01");
  });
});

describe("formatTime", () => {
  test("old entries without a timestamp show nothing", () => {
    expect(formatTime("")).toBe("");
  });

  test("hours and minutes, zero-padded", () => {
    expect(formatTime(new Date(2026, 9, 29, 8, 5).toISOString())).toBe("08:05");
  });
});

describe("getGreeting", () => {
  test.each([
    [8, "Labas rytas"],
    [14, "Laba diena"],
    [22, "Labas vakaras"],
    [3, "Labas vakaras"],
  ])("%i h → %s", (hour, expected) => {
    expect(getGreeting(new Date(2026, 9, 29, hour))).toBe(expected);
  });
});
