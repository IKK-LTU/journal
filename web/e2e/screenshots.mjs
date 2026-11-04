// Clicks through the main flows on a phone-sized screen and saves screenshots for design review.
// Run by .github/workflows/ui-screenshots.yml against `vite preview`. Not part of the app bundle.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:4173";
const OUT = process.env.OUT_DIR ?? "screenshots";
mkdirSync(OUT, { recursive: true });

const today = new Date();
const day = (offset) => {
  const d = new Date(today);
  d.setDate(d.getDate() - offset);
  return d.toISOString().slice(0, 10); // fine for seed data
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

const browser = await chromium.launch();

async function newPage({ seed = true, dark = false } = {}) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, locale: "lt-LT" });
  await context.addInitScript(
    ({ seed, dark, data }) => {
      if (window.sessionStorage.getItem("seeded")) return;
      window.sessionStorage.setItem("seeded", "1");
      window.localStorage.clear();
      if (seed) window.localStorage.setItem("checkins", JSON.stringify(data));
      window.localStorage.setItem("mui-mode", dark ? "dark" : "light");
    },
    { seed, dark, data: SEED },
  );
  return context.newPage();
}

const shot = async (page, name, fullPage = true) => {
  await page.waitForTimeout(700); // let fonts and small animations settle
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage });
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
  await page.getByRole("button", { name: "Neramus", exact: true }).first().click();
  await shot(page, "11-quick-1-picked", false);
  await page.getByRole("button", { name: "Toliau" }).click();
  await shot(page, "12-quick-2-context", false);
  await page.getByRole("button", { name: "Išsaugoti" }).click();
  await shot(page, "13-quick-2-error", false);
  await page.getByRole("textbox", { name: "Kas vyko" }).fill("Vadovas paprašė perdaryti ataskaitą prieš visus.");
  await page.getByRole("button", { name: "Darbe", exact: true }).click();
  await page.getByRole("button", { name: "Kolegos", exact: true }).click();
  await shot(page, "14-quick-2-filled");
  await page.getByRole("button", { name: "Išsaugoti" }).click();
  await page.waitForTimeout(900);
  await shot(page, "15-saved", false);

  await page.getByRole("button", { name: "Pažvelk giliau" }).click();
  await shot(page, "20-deeper-1-thought", false);
  await page.getByRole("textbox", { name: "Mintis" }).fill("Aš viską darau ne taip.");
  await page.getByRole("button", { name: "Toliau" }).click();
  await shot(page, "21-deeper-2-traps");
  await page.getByRole("button", { name: /Etiketės/ }).click();
  await page.getByRole("button", { name: /Visada \/ niekada/ }).click();
  await page.getByRole("button", { name: "Toliau" }).click();
  await shot(page, "22-deeper-3-balanced", false);
  await page.getByRole("textbox", { name: "Subalansuota mintis" }).fill("Vieną ataskaitą reikia pataisyti – tai nereiškia, kad viską darau ne taip.");
  await page.getByRole("button", { name: "Toliau" }).click();
  await page.getByRole("radio", { name: "3" }).first().check({ force: true });
  await shot(page, "23-deeper-4-after", false);
  await page.getByRole("button", { name: "Išsaugoti" }).click();
  await page.waitForTimeout(900);
  await shot(page, "24-deeper-done", false);
  await page.getByRole("button", { name: "Peržiūrėti įrašą" }).click();
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

await browser.close();
