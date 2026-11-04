import { getVisibleSteps } from "./steps";

describe("getVisibleSteps", () => {
  test("without a thought there is nothing to reframe: 7 steps", () => {
    const steps = getVisibleSteps({ autoThought: "   " });
    expect(steps).toHaveLength(7);
    expect(steps).not.toContain("traps");
    expect(steps).not.toContain("balanced");
  });

  test("with a thought the reframe steps come after the reaction, before re-rating: 9 steps", () => {
    const steps = getVisibleSteps({ autoThought: "Turbūt jiems nepatiko" });
    expect(steps).toHaveLength(9);
    expect(steps.slice(-4)).toEqual(["reaction", "traps", "balanced", "after"]);
  });
});
