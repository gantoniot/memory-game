// hooks/useMemoryGame.ts
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { Card, GameState } from "@/types/memory";

const TOTAL_TIME = 30;

const PAIRS = [
  { pid: "moon",  icon: "/moon.svg"  },
  { pid: "star",    icon: "/star.svg"    },
  { pid: "sun",  icon: "/sun.svg"  },
  { pid: "comet",   icon: "/comet.svg"   },
];

function buildDeck(): Card[] {
  return [...PAIRS, ...PAIRS]
    .map((p, i) => ({ id: i, pairId: p.pid, status: "hidden" as const, ...p }))
    .sort(() => Math.random() - 0.5);
}

const INITIAL_STATE: GameState = {
  cards: buildDeck(),
  selected: [],
  locked: false,
  matchedPairs: 0,
  modal: null,
  startTime: null,
  timeLeft: TOTAL_TIME,
  timerRunning: false,
};

export function useMemoryGame() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
    if (!state.timerRunning) return;

    intervalRef.current = setInterval(() => {
      setState(prev => {
        const next = prev.timeLeft - 1;

        // Time ran out — stop the interval on the next render cycle
        if (next <= 0) {
          return {
            ...prev,
            timeLeft:     0,
            timerRunning: false,
            locked:       true,
            modal:         "expired",
            // Flip any unmatched face-up cards back over
            cards: prev.cards.map(c =>
              c.status === "flipped" ? { ...c, status: "hidden" } : c
            ),
            selected: [],
          };
        }

        return { ...prev, timeLeft: next };
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // Re-run only when timerRunning flips — not on every state change
  }, [state.timerRunning]);

	function evaluate(selected: number[]) {
    const [a, b] = selected.map(uid => state.cards.find(c => c.id === uid)!);
		console.log(a, b);
    const isMatch = a.pairId === b.pairId;
		const newMatchedPairs = state.matchedPairs + (isMatch ? 1 : 0);
		const allDone = isMatch && newMatchedPairs === PAIRS.length;

    setState(prev => ({
      ...prev,
      modal: isMatch ? "success" : "fail",
      matchedPairs: isMatch ? prev.matchedPairs + 1 : prev.matchedPairs,
			timerRunning: allDone ? false : prev.timerRunning,
      cards: prev.cards.map(c =>
        selected.includes(c.id)
          ? { ...c, status: isMatch ? "matched" : "flipped" }
          : c
      ),
    }));
  }

  const flipCard = useCallback((id: number) => {
    const card = state.cards.find(c => c.id === id);

    // Guard: locked, already face-up, or already have two selected
    if (state.locked || !card || card.status !== "hidden" || state.selected.length >= 2) return;

		const isFirstFlip = state.selected.length === 0 && !state.timerRunning;
    const nextSelected = [...state.selected, id];

    setState(prev => ({
      ...prev,
      startTime: prev.startTime ?? Date.now(),
			timerRunning: prev.timerRunning ? true : isFirstFlip,
      selected: [...prev.selected, ...nextSelected],
      cards: prev.cards.map(c => c.id === id ? { ...c, status: "flipped" } : c),
      locked: nextSelected.length === 2,
    }));

    
  }, []);

	useEffect(() => {
		
		console.log(state);
		// Evaluate after the flip animation completes (500ms)
    if (state.selected.length === 2) {
      setTimeout(() => evaluate(state.selected), 520);
    }
	}, [state.selected])

  // Called when the user closes the result modal
  const closeModal = useCallback(() => {
		if (state.modal === "expired") {
			return { ...state, modal: null };
		}

    setState(prev => {
      const wasSuccess = prev.modal === "success";
      return {
        ...prev,
        modal: null,
        locked: false,
        selected: [],
        // Flip non-matched selected cards back on fail
        cards: prev.cards.map(c =>
          prev.selected.includes(c.id) && !wasSuccess
            ? { ...c, status: "hidden" }
            : c
        ),
      };
    });
  }, []);

  const reset = useCallback(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
    setState({ ...INITIAL_STATE, cards: buildDeck() });
  }, []);

  const isWon = state.matchedPairs === PAIRS.length && state.modal === null;
	const isExpired = state.modal === "expired";

  return { state, flipCard, closeModal, reset, isWon, isExpired, timeLeft: state.timeLeft, timerActive: state.timerRunning, totalTime: TOTAL_TIME };
}