import { loadCheckins } from "./checkinsStorage";

describe("loadCheckins", () => {
  afterEach(() => localStorage.clear());

  test("entries saved by older versions get the newer fields with empty defaults", () => {
    localStorage.setItem(
      "checkins",
      JSON.stringify({
        checkinsList: [
          { id: "20251016", date: "2025-10-16", situation: "Darbe", emotion: [{ name: "Nerimas", intensity: 6 }], autoThoughts: "Nepavyks" },
        ],
      }),
    );

    const [entry] = loadCheckins().checkinsList;

    expect(entry.autoThought).toBe("Nepavyks"); // old field name migrated
    expect(entry).toMatchObject({ place: "", people: [], reactions: [], emotionAfter: [], thinkingTraps: [], balancedThought: "" });
  });

  test("broken storage → empty list instead of a crash", () => {
    localStorage.setItem("checkins", "{not json");
    expect(loadCheckins().checkinsList).toEqual([]);
  });
});
