import { findBiggestDrop, formatIntensityChange, haveSameItems, haveSameRatings, startingAfterRatings } from "./ratings";

describe("haveSameItems / haveSameRatings", () => {
  test("order doesn't matter", () => {
    expect(haveSameItems(["labeling", "should"], ["should", "labeling"])).toBe(true);
    expect(haveSameItems(["labeling"], ["labeling", "should"])).toBe(false);
    expect(haveSameRatings([{ name: "Neramus", intensity: 4 }], [{ name: "Neramus", intensity: 5 }])).toBe(false);
  });
});

describe("startingAfterRatings", () => {
  test("keeps an earlier re-rating, else starts from the original; removed feelings disappear", () => {
    const before = [
      { name: "Neramus", intensity: 7 },
      { name: "Piktas", intensity: 5 },
    ];
    const earlier = [
      { name: "Neramus", intensity: 4 },
      { name: "Liūdnas", intensity: 2 }, // no longer in the entry
    ];
    expect(startingAfterRatings(before, earlier)).toEqual([
      { name: "Neramus", intensity: 4 },
      { name: "Piktas", intensity: 5 },
    ]);
  });
});

describe("findBiggestDrop", () => {
  test("the feeling that got weakest", () => {
    const change = findBiggestDrop(
      [
        { name: "Neramus", intensity: 7 },
        { name: "Piktas", intensity: 5 },
      ],
      [
        { name: "Neramus", intensity: 3 },
        { name: "Piktas", intensity: 4 },
      ],
    );
    expect(change && formatIntensityChange(change)).toBe("Neramus 7 → 3");
  });

  test("nothing got weaker → undefined", () => {
    expect(findBiggestDrop([{ name: "Neramus", intensity: 5 }], [{ name: "Neramus", intensity: 6 }])).toBeUndefined();
  });
});
