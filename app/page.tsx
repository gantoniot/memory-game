// app/page.tsx
// ─── Space Theme Showcase — all tokens and component classes in action ─────────
"use client";

import { useTheme } from "next-themes";

// ── Theme toggle ──────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="btn btn-subtle btn-sm"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "☀ Light" : "☾ Dark"}
    </button>
  );
}

// ── Feature cards ─────────────────────────────────────────────────────────────
const features = [
  {
    badge:  { label: "Palette",  cls: "badge-nebula" },
    icon:   "◈",
    title:  "OKLCH Color System",
    desc:   "Nebula purples, void blacks, cosmos blues. Perceptually uniform, Display P3 ready.",
  },
  {
    badge:  { label: "Type",     cls: "badge-cosmos" },
    icon:   "Aa",
    title:  "Syne + DM Sans",
    desc:   "Geometric display face paired with a clean body typeface. Space Mono for code.",
  },
  {
    badge:  { label: "Tokens",   cls: "badge-aurora" },
    icon:   "✦",
    title:  "Semantic Tokens",
    desc:   "All colors are aliased through semantic variables that adapt to light/dark mode.",
  },
  {
    badge:  { label: "Layout",   cls: "badge-nebula" },
    icon:   "⊞",
    title:  "Responsive Grid",
    desc:   "Mobile-first breakpoints, container queries, and fluid typography — all native to v4.",
  },
  {
    badge:  { label: "Glass",    cls: "badge-nova" },
    icon:   "◑",
    title:  "Glassmorphism",
    desc:   "Space-station panel aesthetic with backdrop-blur and translucent surfaces.",
  },
  {
    badge:  { label: "Glow",     cls: "badge-error" },
    icon:   "⬡",
    title:  "Nebula Glow Effects",
    desc:   "Glow shadows, gradient text, and luminous borders for depth and atmosphere.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-background bg-space-gradient">

      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border glass-sm">
        <div className="container-app">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Logo */}
            <span className="font-display font-bold text-xl tracking-tight text-gradient-nebula">
              COSMOS UI
            </span>

            {/* Nav — hidden on mobile */}
            <nav className="max-md:hidden flex items-center gap-1">
              <a href="#" className="btn btn-ghost btn-sm">Docs</a>
              <a href="#" className="btn btn-ghost btn-sm">Components</a>
              <a href="#" className="btn btn-ghost btn-sm">Themes</a>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button className="btn btn-primary btn-sm max-md:hidden">
                Get started
              </button>
              <button className="btn btn-ghost btn-sm md:hidden">☰</button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="container-app pt-20 pb-16 md:pt-28 md:pb-24 text-center">
        <div className="flex flex-col items-center gap-6 md:gap-8 max-w-4xl mx-auto">

          <span className="badge badge-nebula">
            ✦ Tailwind CSS v4 · Space Theme
          </span>

          <h1 className="text-fluid-2xl font-display font-bold tracking-tight
                         text-gradient-nebula leading-none">
            Beyond the Event Horizon
          </h1>

          <p className="text-fluid-md text-foreground-muted max-w-2xl leading-relaxed">
            A design system built for the void. Deep purples, absolute blacks,
            and nebula blues — a UI that feels like it was forged among the stars.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button className="btn btn-primary btn-lg w-full sm:w-auto">
              Explore the cosmos →
            </button>
            <button className="btn btn-outline btn-lg w-full sm:w-auto">
              View source
            </button>
          </div>

          {/* Inline code sample */}
          <p className="text-foreground-subtle text-sm font-mono">
            <code>npm install tailwindcss@4 @tailwindcss/postcss</code>
          </p>
        </div>
      </section>

      {/* ── Feature grid ──────────────────────────────────────────────────── */}
      <section className="container-app pb-20 md:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((f) => (
            <div key={f.title} className="card @container group">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className={`badge ${f.badge.cls}`}>{f.badge.label}</span>
                  <span className="text-2xl text-foreground-subtle group-hover:text-nebula-400
                                   transition-colors duration-normal">
                    {f.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base @sm:text-lg
                                 text-foreground mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-foreground-muted text-sm leading-relaxed line-clamp-3">
                    {f.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Component showcase ────────────────────────────────────────────── */}
      <section className="container-app pb-24">
        <div className="divider" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Buttons panel */}
          <div className="card-glow">
            <h3 className="font-display font-semibold text-foreground mb-4">
              Buttons
            </h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-accent">Nova Accent</button>
              <button className="btn btn-outline">Outline</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-subtle">Subtle</button>
              <button className="btn btn-primary btn-sm">Small</button>
              <button className="btn btn-primary btn-lg">Large</button>
              <button className="btn btn-primary" disabled>Disabled</button>
            </div>
          </div>

          {/* Badges panel */}
          <div className="card">
            <h3 className="font-display font-semibold text-foreground mb-4">
              Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-nebula">Nebula</span>
              <span className="badge badge-nova">Nova</span>
              <span className="badge badge-cosmos">Cosmos</span>
              <span className="badge badge-aurora">Aurora</span>
              <span className="badge badge-error">Supernova</span>
            </div>

            <h3 className="font-display font-semibold text-foreground mt-6 mb-4">
              Text effects
            </h3>
            <div className="flex flex-col gap-2">
              <p className="font-display font-bold text-xl text-glow-nebula">
                Nebula glow text
              </p>
              <p className="font-display font-bold text-xl text-glow-nova">
                Nova glow text
              </p>
              <p className="font-display font-bold text-xl text-gradient-nebula">
                Gradient text
              </p>
              <p className="font-display font-bold text-xl text-gradient-cosmos">
                Cosmos gradient
              </p>
            </div>
          </div>

          {/* Form inputs */}
          <div className="card lg:col-span-2">
            <h3 className="font-display font-semibold text-foreground mb-4">
              Form inputs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Transmission target</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter coordinates..."
                />
              </div>
              <div>
                <label className="label">Signal frequency</label>
                <input
                  type="email"
                  className="input"
                  placeholder="signal@cosmos.dev"
                />
              </div>
              <div>
                <label className="label">Error state</label>
                <input
                  type="text"
                  className="input input-error"
                  placeholder="Invalid input"
                  aria-invalid="true"
                />
              </div>
              <div>
                <label className="label">Disabled</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Offline"
                  disabled
                />
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
