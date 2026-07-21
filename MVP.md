# MVP Plan — CBT Thought Journal

## Product Vision

A mobile-first emotional awareness journal with two modes: a guided CBT thought record for difficult moments (catch → challenge → reframe) and a lightweight "good moment" capture for positive ones. The dual-entry model gives users a reason to open the app both when something is wrong and when something goes right — making it a daily habit rather than a crisis tool.

---

## Core Product Insight: Dual-Mode Journal

Most CBT apps fail at retention because users only open them when they feel bad. The app becomes associated with pain. This product solves that with two complementary entry types:

| Entry type | When | Purpose | Effort |
|---|---|---|---|
| **Thought Record** | Something is bothering me | Challenge a negative thought, reduce its intensity | ~5 min, 7 steps |
| **Good Moment** | Something good just happened | Capture it before it fades, reinforce it | ~1 min, 3 fields |

Both entries feed the same emotion timeline. Over time, users see the ratio of hard days to good ones shifting — which is itself therapeutic.

---

## Target User

> _To be defined. See RESEARCH.md — Q1._

Placeholder assumption: **Adults experiencing everyday anxiety or low mood**, either in therapy or self-directed, who want a digital alternative to the paper CBT thought diary. Not a clinical tool — no crisis support, no diagnosis.

---

## The Two Loops

### Loop A — Thought Record (hard moment)
```
Trigger (bad feeling)
    ↓
CATCH    → Situation + Emotion + Hot Thought
    ↓
IDENTIFY → Pick the cognitive distortion
    ↓
CHALLENGE → Answer 3 Socratic questions
    ↓
REFRAME  → Write alternative thought + re-rate emotion
    ↓
REFLECT  → See the emotion drop → feel accomplished
```

### Loop B — Good Moment (positive moment)
```
Trigger (something nice happened)
    ↓
CAPTURE  → What happened? (1–2 sentences)
    ↓
FEEL     → What emotion? How intense? (0–100)
    ↓
SAVOUR   → Why does this matter to you? (1 sentence)
    ↓
SAVED    → Entry added to journal → brief affirmation screen
```

Loop B is intentionally short. If it requires more than 60 seconds, users won't do it spontaneously.

---

## Phase 1 — MVP Scope

### In scope

| # | Feature | Rationale |
|---|---------|-----------|
| 1 | **Guided thought record wizard** (7 steps) | Core CBT loop — loop A |
| 2 | **Cognitive distortion picker** | The "aha" moment of CBT |
| 3 | **Socratic questions** (3 guided prompts) | Creates actual reframing, not just a diary |
| 4 | **Alternative thought + emotion re-rating** | Completes loop A; gives user a visible win |
| 5 | **Completion summary** (emotion delta) | The dopamine moment — "anxiety dropped 50%" |
| 6 | **Good moment capture** (3-field quick form) | Loop B — gives a positive daily reason to open the app |
| 7 | **Journal history list** | Both entry types in one chronological list |
| 8 | **Entry detail view** | Full read-back of any entry |

### Explicitly out of scope for MVP

| Feature | Why deferred |
|---------|-------------|
| Insights dashboard / charts | Needs data volume first; useless on day 1 |
| Emotion calendar | Same — needs history |
| Push notifications / reminders | Requires PWA service worker or native; adds platform complexity |
| User accounts / backend | Mocked with localStorage; add BE in phase 2 |
| AI-assisted distortion detection | High effort; user can self-identify first |
| "Mood check-in" (quick daily pulse) | Separate flow; build after core loop is solid |

---

## User Flows

### Flow A — Thought record (hard moment)

```
Home → "Kažkas slegia" button
  → Wizard Step 1: Situation
  → Wizard Step 2: Emotions + intensity (0–100)
  → Wizard Step 3: Hot thought
  → Wizard Step 4: Distortion picker
  → Wizard Step 5: Socratic questions
  → Wizard Step 6: Alternative thought
  → Wizard Step 7: Re-rate emotions
  → Summary: emotion delta + encouraging message
  → Home
```

### Flow B — Good moment (positive capture)

```
Home → "Geras momentas" button
  → Step 1: What happened? (short text)
  → Step 2: What emotion + intensity? (0–100)
  → Step 3: Why does this matter? (short text)
  → Affirmation screen ("Puiku, išsaugota!")
  → Home
```

### Flow C — Review journal

```
Home → Journal / history
  → Chronological list (thought records + good moments, visually distinct)
  → Tap any entry → Detail view (read-only)
```

---

## Screen Inventory

### Screens to build / modify

| Screen | Status | Changes needed |
|--------|--------|---------------|
| Home | exists | Replace 3 hardcoded task cards with two clear CTAs: "Kažkas slegia" + "Geras momentas" |
| Week strip | exists | Keep as-is; green dot = any entry that day (thought record or good moment) |
| Wizard shell | **NEW** | Generic step container with progress bar, back/next, step counter |
| Wizard — Step 1: Situation | exists (partial) | Port into wizard shell |
| Wizard — Step 2: Emotions | exists (partial) | Change scale to 0–100, port into wizard shell |
| Wizard — Step 3: Hot thought | exists (partial) | Single text field (not array), port into wizard shell |
| Wizard — Step 4: Distortions | **NEW** | Chip picker from static distortions list |
| Wizard — Step 5: Socratic Qs | **NEW** | 3 prompts with text areas |
| Wizard — Step 6: Alt. thought | **NEW** | Single text area |
| Wizard — Step 7: Re-rate | **NEW** | Re-rate same emotions; show before/after side by side |
| Thought record summary | **NEW** | Emotion delta + message |
| Good moment form | **NEW** | 3-step inline form (not a full wizard — simpler layout) |
| Good moment affirmation | **NEW** | Brief confirmation screen |
| Journal list | exists (rename) | Mixed list: thought records + good moments, visually distinct |
| Entry detail | **NEW** | Read-only; adapts layout to entry type |

---

## Data Model

Two entry types. Both live in the same journal list and share the `date` / `createdAt` shape.

### ThoughtRecordDto (Loop A)

```ts
// src/api/services/types.ts

type EmotionRating = {
  name: string
  intensity: number  // 0–100 (changing from current 0–10)
}

type ThoughtRecordDto = {
  id: string
  date: string        // "YYYY-MM-DD"
  createdAt: string   // ISO timestamp

  // Step 1
  situation: string

  // Step 2
  emotions: EmotionRating[]

  // Step 3
  hotThought: string  // single string, renamed from autoThoughts

  // Step 4
  distortions: string[]  // distortion IDs, e.g. ["catastrophizing", "mind-reading"]

  // Step 5 — Socratic answers
  socratesAnswers: {
    evidence: string       // "What's the evidence this is 100% true?"
    friendAdvice: string   // "What would you tell a friend in this situation?"
    worstBestLikely: string // "Worst / best / most likely scenario?"
  }

  // Step 6
  alternativeThought: string

  // Step 7
  emotionsAfter: EmotionRating[]  // same emotion names, re-rated
}
```

### GoodMomentDto (Loop B)

```ts
type GoodMomentDto = {
  id: string
  type: 'good-moment'   // discriminator field — used to render the right card/detail
  date: string          // "YYYY-MM-DD"
  createdAt: string

  what: string          // What happened?
  emotion: EmotionRating // Single emotion + intensity (0–100)
  why: string           // Why does this matter to you?
}
```

**Discriminator pattern:** Both types get a `type` field (`'thought-record'` | `'good-moment'`). The journal list uses it to render the right card variant. The Redux slice stores a union: `JournalEntry = ThoughtRecordDto | GoodMomentDto`.

**Migration note:** The existing `checkins` localStorage key stores the old shape. Clear it during dev or bump a `JOURNAL_VERSION` key on store init and reset if version mismatches.

---

## Cognitive Distortions List (static data)

Stored as a static JSON/TS file — no backend needed. Suggested 10 for MVP:

| ID | Lithuanian name | English |
|----|----------------|---------|
| `all-or-nothing` | Viskas arba nieko | All-or-nothing thinking |
| `catastrophizing` | Katastrofizavimas | Catastrophizing |
| `mind-reading` | Minčių skaitymas | Mind reading |
| `overgeneralization` | Pernelyg didelis apibendrinimas | Overgeneralization |
| `emotional-reasoning` | Emocinis pagrįstumas | Emotional reasoning |
| `should-statements` | „Turėjimas" | Should statements |
| `labeling` | Ženklinimas | Labeling |
| `personalization` | Personalizavimas | Personalization |
| `mental-filter` | Selektyvus dėmesys | Mental filter |
| `minimization` | Sumažinimas / padidimas | Minimization / magnification |

Each entry also needs: a short 1-sentence plain-language description + an icon or emoji anchor.

> _The full Lithuanian descriptions need to be written. See RESEARCH.md — Q3._

---

## Mocked / Local-only Architecture (Phase 1)

| Concern | Solution |
|---------|----------|
| Data persistence | Redux + localStorage (already in place) |
| User identity | Hardcoded mock user, no real login required |
| Distortions content | Static `.ts` file in `src/constants/` |
| Socratic questions | Hardcoded strings in the component or constants file |
| No backend calls | Remove RTK Query `usersApi` from the critical path |

---

## Build Sequence (suggested order)

1. Define `ThoughtRecordDto` and update Redux slice + localStorage key
2. Build static distortions data file
3. Refactor existing check-in form into a multi-step wizard shell (step indicator + back/next navigation)
4. Port existing steps 1–3 into the new wizard
5. Build Step 4: distortion picker
6. Build Step 5: Socratic questions
7. Build Step 6: alternative thought
8. Build Step 7: re-rate emotions
9. Build summary/completion screen
10. Build check-in detail view
11. Wire home → list → detail navigation
