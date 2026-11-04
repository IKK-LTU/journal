import { loadDraft } from "./useEntryDraft";

describe("loadDraft", () => {
  afterEach(() => localStorage.clear());

  test("a draft from the older long flow keeps the thought the user already wrote", () => {
    localStorage.setItem(
      "entry-draft",
      JSON.stringify({
        date: "2026-11-01",
        emotions: [{ name: "Neramus", intensity: 6 }],
        place: "Darbe",
        people: [],
        situation: "Susitikimas",
        autoThought: "Jie mane teisia",
        thinkingTraps: ["mind-reading"],
        balancedThought: "",
        reactions: [],
        behavior: "",
        emotionAfter: [],
      }),
    );

    const draft = loadDraft();

    expect(draft?.situation).toBe("Susitikimas");
    expect(draft?.carriedOver).toMatchObject({ autoThought: "Jie mane teisia", thinkingTraps: ["mind-reading"] });
  });

  test("a quick-flow draft has nothing carried over", () => {
    localStorage.setItem("entry-draft", JSON.stringify({ date: "2026-11-01", emotions: [], place: "", people: [], situation: "Darbe" }));
    expect(loadDraft()?.carriedOver).toBeUndefined();
  });
});
