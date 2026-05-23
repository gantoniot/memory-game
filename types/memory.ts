export type CardStatus = "hidden" | "flipped" | "matched";

export interface Card {
  id:     number;
  pairId:  string;
  icon:    string;
  status:  CardStatus;
}

export type ModalKind = "success" | "fail" | "expired" | null;

export interface GameState {
  cards: Card[];
  selected: number[];   // unevaluated cards
  locked: boolean;    // global click guard
  matchedPairs: number;
  modal: ModalKind;
  startTime: number | null;
	timeLeft: number;
	timerRunning: boolean;
}