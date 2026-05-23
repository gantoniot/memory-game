// app/page.tsx
// ─── Space Theme Showcase — all tokens and component classes in action ─────────
"use client";

import { MemoryCard } from "@/components/ui/Card";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useMemoryGame } from "@/hooks/useMemory";
import { ResultModal } from "@/components/ui/ResultModal";
import { TimerBar } from "@/components/ui/Timer";
import { AudioToggle } from "@/components/ui/AudioToggle";

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
  const { state, flipCard, closeModal, reset, isWon, totalTime, timeLeft, timerActive } = useMemoryGame();

	const bAudioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <main className="min-h-screen bg-background bg-space-gradient">
			<audio ref={bAudioRef} src="/background.mp3" />
      <header className="sticky top-0 z-50 ">
        <div className="container-app">
          <div className="flex items-center justify-end h-14 md:h-16">
            <div className="flex items-center gap-2">
							<TimerBar timeLeft={timeLeft} totalTime={totalTime} active={timerActive} />
              <ThemeToggle />
							<AudioToggle audio={bAudioRef} />
            </div>
          </div>
        </div>
      </header>

      <section className="container-app py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {
					state.cards.map((card) => (
						<MemoryCard key={card.id} card={card} onFlipped={flipCard} />
					))
					}
        </div>
				<ResultModal
            kind={state.modal}
            onClose={closeModal}
						onReset={reset}
          />
      </section>
    </main>
  );
}
