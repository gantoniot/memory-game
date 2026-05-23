# Cosmic Memory — Space Memory Game

A space-themed memory card game built with Next.js 15, Tailwind CSS v4, TypeScript, and next-intl. Features a 30-second countdown timer, animated card flips, pair matching logic, and a fully localized interface.

---

## Technology summary

### Next.js 15 (App Router)
The project uses the App Router introduced in Next.js 13 and stabilized in 15. All pages live under `app/` and use React Server Components by default — only files that need browser APIs or interactivity are marked `"use client"`.

### React 19
Hooks drive all game and UI state. `useState` and `useCallback` manage the memory game state machine. `useEffect` owns the interval lifecycle for the countdown timer, keeping it declarative rather than imperative.

### TypeScript
Strict mode is enabled. Every piece of state is typed with discriminated unions so invalid states are unrepresentable at compile time. The UI can never accidentally render an unknown modal state.

### Tailwind CSS v4 (CSS-first)
Version 4 eliminates `tailwind.config.js` for theming. The entire design system lives in `styles/globals.css` under `@theme {}`. Colors are defined in OKLCH for perceptual uniformity and Display P3 support. Semantic tokens in `:root` and `.dark` automatically switch between color schemes.

### next-themes
Manages the `dark` class on `<html>` and persists the user's color mode preference to `localStorage`. The app defaults to dark mode — appropriate for a space aesthetic

---

## Prerequisites

| Tool | Minimum version | Notes |
|---|---|---|
| Node.js | 20.x | Required by Next.js 15 |
| npm | 10.x | Comes with Node 20 |
| Git | Any | For cloning |

---

## Installation

### 1. Clone and install dependencies

```bash
git clone https://github.com/your-username/cosmos-ui.git
cd cosmos-ui
npm install
```

### 2. Install all required packages

If starting from scratch rather than cloning:

```bash
# Core framework
npm install next@15 react@19 react-dom@19

# Styling
npm install tailwindcss @tailwindcss/postcss

# Dark mode
npm install next-themes

# Internationalisation
npm install next-intl

# TypeScript and types
npm install -D typescript @types/node @types/react @types/react-dom
```

### 3. Configure PostCSS

Ensure `postcss.config.mjs` exists at the root with Tailwind v4's plugin:

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

Do not add `autoprefixer` — Tailwind v4 handles vendor prefixes internally via Lightning CSS.

### 5. Import the global stylesheet

In `app/layout.tsx`, import the stylesheet directly. No separate Tailwind directives file is needed in v4:

```ts
import "../styles/globals.css";
```

---

## Running the project

### Development

```bash
npm run dev
```

Opens at `http://localhost:3000`. Hot module replacement is active — changes to components, hooks, and the CSS theme reflect immediately without a full reload.

### Production build

```bash
npm run build
npm run start
```

`build` compiles the app, generates static pages where possible, and outputs the result to `.next/`. `start` serves that output. Always run `build` before deploying.

### Type checking

```bash
npx tsc --noEmit
```

Run this before committing. It catches type errors without emitting any output files.

### Linting

```bash
npm run lint
```

Uses Next.js's built-in ESLint configuration. Fix any errors before opening a pull request.

---

## Color palette reference

| Scale | OKLCH hue | Role |
|---|---|---|
| `nebula-*` | 295° purple | Primary brand, buttons, focus rings |
| `void-*` | 270° near-black | Backgrounds, surfaces |
| `cosmos-*` | 250° deep blue | Secondary color, info states |
| `nova-*` | 320° violet-pink | Accent, CTAs, highlights |
| `star-*` | 295° near-white | Text and icons on dark surfaces |
| `aurora-*` | 190° teal-cyan | Success, positive states |
| `pulsar-*` | 60° amber | Warning states, timer urgency |
| `supernova-*` | 20° red | Error, danger, timer critical |

### Semantic token flow

```
@theme { --color-nebula-500: oklch(...) }   ← raw palette token
         ↓ generates: bg-nebula-500, text-nebula-500

:root  { --color-brand: oklch(0.55 0.27 295) }  ← light mode value
.dark  { --color-brand: oklch(0.62 0.28 295) }  ← dark mode value

@theme inline { --color-brand: var(--color-brand) }
         ↓ generates: bg-brand, text-brand  (switches automatically)
```

### Fonts

| Font | Source | Class | Used for |
|---|---|---|---|
| Syne | Google Fonts | `font-display` | Headings, logo, UI chrome |
| DM Sans | Google Fonts | `font-sans` | Body text, form labels |
| Space Mono | Google Fonts | `font-mono` | Code blocks, numeric displays, timer |

---

## Memory game rules

- 8 cards form 4 pairs
- Flip two cards per turn — a global lock prevents clicks mid-animation
- Match → both cards stay face-up for the rest of the game
- Mismatch → a fail modal appears; closing it flips the cards back
- Timer starts on the first flip and counts down from 30 seconds
- Running out of time locks the board and shows an expired modal
- Match all 4 pairs before time runs out to win

---

## Deployment

The project deploys to Vercel with zero configuration. Push to a GitHub repository, import it in the Vercel dashboard.

```bash
# Or deploy directly from the CLI
npm install -g vercel
vercel --prod
```
