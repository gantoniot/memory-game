// hooks/useMemoryGame.ts
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { Card, GameState, ModalKind } from "@/types/memory";

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
};

export function useMemoryGame() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

	function evaluate(selected: number[]) {
    const [a, b] = selected.map(uid => state.cards.find(c => c.id === uid)!);
		console.log(a, b);
    const isMatch = a.pairId === b.pairId;

    setState(prev => ({
      ...prev,
      modal: isMatch ? "success" : "fail",
      matchedPairs: isMatch ? prev.matchedPairs + 1 : prev.matchedPairs,
      cards: prev.cards.map(c =>
        selected.includes(c.id)
          ? { ...c, status: isMatch ? "matched" : "flipped" }
          : c
      ),
    }));
  }

  const flipCard = useCallback((id: number) => {
    /* const s = stateRef.current; */
    const card = state.cards.find(c => c.id === id);

    // Guard: locked, already face-up, or already have two selected
    if (state.locked || !card || card.status !== "hidden" || state.selected.length >= 2) return;

    const startTime = state.startTime ?? Date.now();
    const nextSelected = [...state.selected, id];

    setState(prev => ({
      ...prev,
      startTime,
      selected: [...prev.selected, ...nextSelected],
      cards: prev.cards.map(c => c.id === id ? { ...c, status: "flipped" } : c),
      // Lock immediately when second card is chosen
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
    setState({ ...INITIAL_STATE, cards: buildDeck() });
  }, []);

  const isWon = state.matchedPairs === PAIRS.length && state.modal === null;

  return { state, flipCard, closeModal, reset, isWon };
}