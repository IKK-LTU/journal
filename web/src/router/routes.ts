export const ROUTES = {
  WELCOME: { path: "/", label: "Pradinis" },
  LOGIN: { path: "/login", label: "Prisijungimas" },
  HOME: { path: "/home", label: "Namai" },
  NEW_ENTRY: { path: "/new-entry", label: "Naujas įrašas" },
  ENTRY: { path: "/entry/:id", label: "Įrašas" },
  ENTRY_REFRAME: { path: "/entry/:id/reframe", label: "Pažvelk kitaip" },
  SETTINGS: { path: "/settings", label: "Nustatymai" },
  INSIGHTS: { path: "/insights", label: "Įžvalgos" },
};

export const getEntryPath = (id: string) => `/entry/${encodeURIComponent(id)}`;
export const getEntryReframePath = (id: string) => `${getEntryPath(id)}/reframe`;

/** Passed via router state when opening the new-entry flow. */
export type NewEntryRouteState = { date?: string };

/** Passed via router state when returning to a page, to show a confirmation there. */
export type ToastRouteState = { toast?: string };
export type HomeRouteState = ToastRouteState;
