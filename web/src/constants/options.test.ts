import { findEmotionCategory } from "./emotions";
import { orderByUsage } from "./entry-options";

describe("orderByUsage", () => {
  test("the user's answers first (most used first), then unused defaults, no duplicates", () => {
    expect(orderByUsage({ Darbe: 3, "Sporto salėje": 1 }, ["Namie", "Darbe"])).toEqual(["Darbe", "Sporto salėje", "Namie"]);
  });
});

describe("findEmotionCategory", () => {
  test("finds the wheel core, case-insensitive", () => {
    expect(findEmotionCategory("neramus")?.name).toBe("Išsigandęs");
    expect(findEmotionCategory("Ramus")?.name).toBe("Ramus");
  });

  test("words from earlier app versions still map (legacyNames)", () => {
    expect(findEmotionCategory("Nerimas")?.name).toBe("Išsigandęs");
    expect(findEmotionCategory("Nuovargis")?.name).toBe("Liūdnas");
  });

  test("custom words have no category", () => {
    expect(findEmotionCategory("Keistas")).toBeUndefined();
  });
});
