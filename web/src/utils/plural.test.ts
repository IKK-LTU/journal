import { ENTRY_FORMS, pluralizeLt } from "./plural";

describe("pluralizeLt", () => {
  test.each([
    [0, "įrašų"],
    [1, "įrašas"],
    [2, "įrašai"],
    [9, "įrašai"],
    [10, "įrašų"],
    [11, "įrašų"],
    [19, "įrašų"],
    [21, "įrašas"],
    [22, "įrašai"],
    [111, "įrašų"],
  ])("%i %s", (count, expected) => {
    expect(pluralizeLt(count, ENTRY_FORMS)).toBe(expected);
  });
});
