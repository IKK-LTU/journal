# Product Knowledge — Journal (Mind Journal)

## Open Questions

> Answer these to define the product direction before planning further.

1. **Who is the target user?** Is this a personal tool for yourself, a product for people doing CBT therapy, or a general mental wellness app for anyone? This shapes every UX and scope decision.

2. **Is there a backend / does there need to be one?** Right now check-ins are saved only to `localStorage` and lost if the user clears storage. Will there be a real API, a database, and accounts — or is offline-first / local-only the intentional model?

3. **What is the core loop you want users to repeat daily?** Is it just the check-in form, or do you envision a broader ritual (e.g. morning intention + evening reflection + weekly review)?

4. **What does "Analizuoti mintis" (Analyse thoughts) mean in practice?** The home screen shows this as a second card but it has no functionality yet. Is this AI-assisted reframing, a guided CBT worksheet, pattern visualisation over time, or something else?

5. **What is the MVP — the smallest thing you'd ship to a real user?** Knowing the hard boundary separates "must build now" from "nice to have later".

---

## What Exists Now

### Pages & Flows

#### Welcome (`/`)
Landing screen shown to new / unauthenticated users. Displays a greeting in Lithuanian and a single CTA button that navigates to Login.

#### Login (`/login`)
- Form with username/email + password fields, validated with react-hook-form.
- On submit, fetches user by hardcoded ID (`1`) from `http://localhost:8080/users/1` (demo logic, no real auth).
- On success, stores user in Redux and navigates to Home.
- If already logged in: shows user profile data and a logout button that clears the Redux user state.
- Validation: both fields required, password min 6 chars.

#### Home (`/home`)
The main dashboard after login. Contains:
- **Header** with a streak flame icon (left) and user/login icon (right).
- **Week strip** — 7-day horizontal strip showing the current week. Each day has a coloured circle: green if a check-in exists for that date, grey if not. Tapping an unchecked day opens a popup with "Registruoti mintis" that navigates to the check-in form pre-filled with that date.
- **Task cards** — three hardcoded feature cards:
  1. *"Laba diena / Registruoti mintis"* — navigates to the check-in form for today.
  2. *"Analizuoti mintis"* — placeholder, no action wired.
  3. *"Protui ir nuotaikai"* — placeholder, no action wired.

#### Check-in Form (`/check-in-form`)
CBT-structured journalling form. The date is passed via router `location.state`. Fields:

| Field | Type | Description |
|---|---|---|
| Situation | Textarea | Context: who, what, when, where |
| Emotion(s) | Dynamic list | Name (text) + intensity (slider 0–10). Multiple emotions can be added; each appears as a chip row with a delete button. At least one is required. |
| Automatic thoughts | Textarea | Thoughts before the emotion hit |
| Behaviour | Textarea | What the user did afterward |

On submit: dispatches `addCheckinItem` to Redux (which persists to `localStorage`) and navigates back to Home.

#### Check-in List (`/check-in-list`)
Lists all saved check-ins from Redux/localStorage. Each entry shows as a `CheckinCard` with date, situation text, and emotion chips. If empty, shows an illustration and a CTA to create the first entry. Has a `+` button in the header to add a new check-in for today.

---

### Data Model

```ts
CheckInDto {
  id: string           // generated from date string, e.g. "20250716"
  date: string         // "YYYY-MM-DD"
  createdAt: string    // ISO timestamp
  situation: string
  emotion: { name: string; intensity: number }[]
  autoThoughts: string[]
  behavior: string
}
```

---

### State & Persistence

- Check-ins are stored in Redux (`checkins` slice) and **persisted to `localStorage`** on every store change. Rehydrated on app boot.
- User is stored in Redux (`user` slice) but **not persisted** — lost on page refresh.
- No backend persistence currently. The API endpoint (`localhost:8080`) is expected but not running; login is demo-only.

---

### Planned / Stub Features (visible in UI but not functional)

| Feature | Where | Status |
|---|---|---|
| Analyse thoughts | Home task card #2 | No route or logic |
| Short course "Protui ir nuotaikai" | Home task card #3 | No route or logic |
| Streak counter | Flame icon in Home header | Icon only, no logic |
| Check-in detail view | CheckinCard is clickable | No navigation wired |
