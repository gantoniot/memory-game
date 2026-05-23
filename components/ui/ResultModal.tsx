// components/ui/ResultModal.tsx
"use client";

import type { Card, ModalKind } from "@/types/memory";
import { useEffect, useEffectEvent, useRef, useState } from "react";

interface Props {
  kind:    ModalKind;
  cardA:   Card | null;
  cardB:   Card | null;
  onClose: () => void;
}

export function ResultModal({ kind, cardA, cardB, onClose }: Props) {

  if (!kind || !cardA || !cardB) return null;

  const isSuccess = kind === "success";

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center
                    bg-void-950/85 backdrop-blur-sm rounded-2xl
                    animate-in fade-in duration-300">
											{isSuccess ? <audio src="/correct.mp3" autoPlay /> :
			<audio src="/incorrect.mp3" autoPlay />}
      <div className={[
        "glass rounded-2xl p-8 max-w-xs w-full mx-4 flex flex-col items-center gap-4 text-center",
        isSuccess ? "border-aurora-700/35" : "border-supernova-700/35",
      ].join(" ")}>

        {/* Icon */}
        <div className={[
          "size-12 rounded-full flex items-center justify-center text-xl",
          isSuccess
            ? "bg-aurora-950 border border-aurora-700/30 text-aurora-400"
            : "bg-supernova-950 border border-supernova-700/30 text-supernova-400",
        ].join(" ")}>
          {isSuccess ? "✓" : "✕"}
        </div>

        <h3 className="font-display font-semibold text-star-100">
          {isSuccess ? `pair found!` : "No match"}
        </h3>

        <p className="text-foreground-muted text-sm leading-relaxed">
          {isSuccess
            ? "Correct! These two cards form a pair and will stay face-up."
            : "These cards don't match. They'll flip back so you can try again."}
        </p>

        <button
          onClick={onClose}
          className={[
            "btn rounded-full mt-1",
            isSuccess ? "btn-outline border-aurora-600 text-aurora-400" : "btn-outline border-supernova-600 text-supernova-400",
          ].join(" ")}
        >
          {isSuccess ? "Keep going →" : "Try again"}
        </button>
      </div>
    </div>
  );
}