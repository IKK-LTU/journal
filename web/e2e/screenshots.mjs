// Clicks through the main flows on a phone-sized screen and saves screenshots for design review.
// Run by .github/workflows/ui-screenshots.yml against `vite preview`. Not part of the app bundle.
import { chromium, devices, webkit } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:4173";
const OUT = process.env.OUT_DIR ?? "screenshots";
mkdirSync(OUT, { recursive: true });

const today = new Date();
const day = (offset) => {
  const d = new Date(today);
  d.setDate(d.getDate() - offset);
  // Local date (like the app's toLocalDateString) — toISOString() is UTC and would shift late entries a day.
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const entry = (id, offset, hour, emotion, situation, extra = {}) => ({
  id,
  date: day(offset),
  createdAt: new Date(`${day(offset)}T${String(hour).padStart(2, "0")}:15:00`).toISOString(),
  emotion,
  place: "",
  people: [],
  situation,
  autoThought: "",
  reactions: [],
  behavior: "",
  thinkingTraps: [],
  balancedThought: "",
  emotionAfter: [],
  ...extra,
});

const SEED = {
  checkinsList: [
    entry("e1", 0, 21, [{ name: "Neramus", intensity: 7 }, { name: "Sugėdintas", intensity: 4 }], "Pristačiau projektą komandai ir niekas nieko nepasakė.", {
      place: "Darbe",
      people: ["Kolegos"],
      autoThought: "Turbūt jiems nepatiko ir dabar mane vertina prasčiau.",
      thinkingTraps: ["mind-reading"],
      balancedThought: "Tyla nereiškia nepritarimo – jie tiesiog klausėsi.",
      emotionAfter: [{ name: "Neramus", intensity: 4 }, { name: "Sugėdintas", intensity: 2 }],
    }),
    entry("e2", 0, 8, [{ name: "Ramus", intensity: 6 }], "Rytinis pasivaikščiojimas parke, buvo rūko ir tylu.", { place: "Lauke", people: ["Niekas"] }),
    entry("e3", 1, 18, [{ name: "Piktas", intensity: 8 }, { name: "Nusivylęs", intensity: 5 }], "Kolega vėl perkėlė susitikimą paskutinę minutę.", { place: "Darbe", people: ["Kolegos"] }),
    entry("e4", 2, 14, [{ name: "Laimingas", intensity: 8 }, { name: "Dėkingas", intensity: 7 }], "Sesuo paskambino tiesiog pasiteirauti, kaip laikausi.", { place: "Namie", people: ["Šeima"] }),
  ],
};

// ENGINE=webkit runs the same flows as Safari on an iPhone.
const ENGINE = process.env.ENGINE ?? "chromium";
const browser = ENGINE === "webkit" ? await webkit.launch() : await chromium.launch();
const deviceOptions = ENGINE === "webkit" ? devices["iPhone 13"] : { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 };

// Any uncaught error or console.error on any page fails the run — a broken screen must not pass silently.
const pageErrors = [];
const watchErrors = (page, label) => {
  page.on("pageerror", (error) => pageErrors.push(`[${label}] ${error.message}\n${error.stack ?? ""}`));
  page.on("console", (message) => {
    if (message.type() === "error") pageErrors.push(`[${label}] console.error: ${message.text()}`);
  });
};

async function newPage({ seed = true, dark = false, extraStorage = {} } = {}) {
  const context = await browser.newContext({ ...deviceOptions, locale: "lt-LT" });
  await context.addInitScript(
    ({ seed, dark, data, extraStorage }) => {
      if (window.sessionStorage.getItem("seeded")) return;
      window.sessionStorage.setItem("seeded", "1");
      window.localStorage.clear();
      if (seed) window.localStorage.setItem("checkins", JSON.stringify(data));
      window.localStorage.setItem("mui-mode", dark ? "dark" : "light");
      for (const [key, value] of Object.entries(extraStorage)) window.localStorage.setItem(key, value);
    },
    { seed, dark, data: SEED, extraStorage },
  );
  const page = await context.newPage();
  watchErrors(page, `seed=${seed} dark=${dark}${Object.keys(extraStorage).length ? " +old data" : ""}`);
  return page;
}

// WebKit's iPhone emulation doesn't reliably auto-scroll to off-screen elements (real iPhones do),
// so scroll explicitly before tapping.
const tap = async (locator) => {
  await locator.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await locator.click();
};

const shot = async (page, name, fullPage = true) => {
  await page.waitForTimeout(700); // let fonts and small animations settle
  await page.screenshot({ path: `${OUT}/${ENGINE}-${name}.png`, fullPage });
  console.log("saved", name);
};

// Home
for (const dark of [false, true]) {
  const page = await newPage({ dark });
  await page.goto(`${BASE}/home`);
  await shot(page, dark ? "01-home-dark" : "01-home");
}
{
  const page = await newPage({ seed: false });
  await page.goto(`${BASE}/home`);
  await shot(page, "02-home-empty");
}

// Quick entry → saved → deeper → done
{
  const page = await newPage();
  await page.goto(`${BASE}/new-entry`);
  await shot(page, "10-quick-1-emotions", false);
  await tap(page.getByRole("button", { name: "Neramus", exact: true }).first());
  await shot(page, "11-quick-1-picked", false);
  await tap(page.getByRole("button", { name: "Toliau" }));
  await shot(page, "12-quick-2-context", false);
  await tap(page.getByRole("button", { name: "Išsaugoti" }));
  await shot(page, "13-quick-2-error", false);
  await page.getByRole("textbox", { name: "Kas vyko" }).fill("Vadovas paprašė perdaryti ataskaitą prieš visus.");
  await tap(page.getByRole("button", { name: "Darbe", exact: true }));
  await tap(page.getByRole("button", { name: "Kolegos", exact: true }));
  await shot(page, "14-quick-2-filled");
  await tap(page.getByRole("button", { name: "Išsaugoti" }));
  await page.waitForTimeout(900);
  await shot(page, "15-saved", false);

  await tap(page.getByRole("button", { name: "Pažvelk giliau" }));
  await shot(page, "20-deeper-1-thought", false);
  await page.getByRole("textbox", { name: "Mintis" }).fill("Aš viską darau ne taip.");
  await tap(page.getByRole("button", { name: "Toliau" }));
  await shot(page, "21-deeper-2-traps");
  await tap(page.getByRole("button", { name: /Etiketės/ }));
  await tap(page.getByRole("button", { name: /Visada \/ niekada/ }));
  await tap(page.getByRole("button", { name: "Toliau" }));
  await shot(page, "22-deeper-3-balanced", false);
  await page.getByRole("textbox", { name: "Subalansuota mintis" }).fill("Vieną ataskaitą reikia pataisyti – tai nereiškia, kad viską darau ne taip.");
  await tap(page.getByRole("button", { name: "Toliau" }));
  await page.getByRole("radio", { name: "3" }).first().check({ force: true });
  await shot(page, "23-deeper-4-after", false);
  await tap(page.getByRole("button", { name: "Išsaugoti" }));
  await page.waitForTimeout(900);
  await shot(page, "24-deeper-done", false);
  await tap(page.getByRole("button", { name: "Peržiūrėti įrašą" }));
  await shot(page, "30-entry-detail");
}

// Entry without reframe, insights, settings
{
  const page = await newPage();
  await page.goto(`${BASE}/entry/e3`);
  await shot(page, "31-entry-detail-no-reframe");
  await page.goto(`${BASE}/insights`);
  await shot(page, "40-insights");
}

// A browser that used older app versions: entries in the very first format and a half-finished
// draft from the old 9-step form. Step 2 must still work.
{
  const OLD_ENTRIES = {
    checkinsList: [
      { id: "20251016", date: "2025-10-16", situation: "Darbe", emotion: [{ name: "Nerimas", intensity: 6 }], autoThoughts: "Nepavyks", behavior: "" },
      { id: "20251016", date: "2025-10-16", situation: "Vėl darbe", emotion: [{ name: "Pyktis", intensity: 8 }] },
    ],
  };
  const OLD_DRAFT = {
    date: "2026-11-01",
    emotions: [{ name: "Neramus", intensity: 6 }],
    place: "Darbe",
    people: ["Kolegos"],
    situation: "Susitikimas",
    autoThought: "Jie mane teisia",
    reactions: [],
    behavior: "",
    thinkingTraps: ["mind-reading"],
    balancedThought: "",
    emotionAfter: [],
  };
  const page = await newPage({
    seed: false,
    extraStorage: { checkins: JSON.stringify(OLD_ENTRIES), "entry-draft": JSON.stringify(OLD_DRAFT) },
  });
  await page.goto(`${BASE}/new-entry`);
  await shot(page, "50-old-data-step1", false);
  await tap(page.getByRole("button", { name: "Toliau" }));
  await shot(page, "51-old-data-step2", false);
  await tap(page.getByRole("button", { name: "Išsaugoti" }));
  await shot(page, "52-old-data-saved", false);
}

await browser.close();

if (pageErrors.length > 0) {
  console.error(`\n${pageErrors.length} page error(s):\n` + pageErrors.join("\n\n"));
  process.exit(1);
}
console.log("no page errors");
