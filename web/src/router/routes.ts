export const ROUTES = {
  WELCOME: { path: "/", label: "Pradinis" },
  LOGIN: { path: "/login", label: "Prisijungimas" },
  HOME: { path: "/home", label: "Namai" },
  NEW_ENTRY: { path: "/new-entry", label: "Naujas įrašas" },
  ENTRY: { path: "/entry/:id", label: "Įrašas" },
  SETTINGS: { path: "/settings", label: "Nustatymai" },
  INSIGHTS: { path: "/insights", label: "Įžvalgos" },
};

export const getEntryPath = (id: string) => `/entry/${encodeURIComponent(id)}`;

/** Passed via router state when opening the new-entry flow. */
export type NewEntryRouteState = { date?: string };

/** Passed via router state when returning home, to show a confirmation. */
export type HomeRouteState = { toast?: string };
