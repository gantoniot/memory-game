"use client";

import { MemoryCard } from "@/components/ui/Card";
import { useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useMemoryGame } from "@/hooks/useMemory";
import { ResultModal } from "@/components/ui/ResultModal";
import { TimerBar } from "@/components/ui/Timer";
import { AudioToggle } from "@/components/ui/AudioToggle";

export default function Page() {
  const { state, flipCard, closeModal, reset, totalTime, timeLeft, timerActive } = useMemoryGame();

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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 place-items-center">
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
