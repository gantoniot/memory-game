// postcss.config.mjs
// ─── PostCSS — Tailwind CSS v4 ────────────────────────────────────────────────
// @tailwindcss/postcss replaces the old "tailwindcss" plugin from v3.
// Lightning CSS is bundled internally — no autoprefixer or postcss-import needed.

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
