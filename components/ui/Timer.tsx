"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

interface TimerBarProps {
  timeLeft:  number;
  totalTime: number;
  active:    boolean;
}

export function TimerBar({ timeLeft, totalTime, active }: TimerBarProps) {
  const pct     = (timeLeft / totalTime) * 100;
  const isWarn  = timeLeft <= 10 && timeLeft > 5;
  const isCrit  = timeLeft <= 5;

  const barColor = isCrit
    ? "bg-supernova-500"
    : isWarn
    ? "bg-pulsar-500"
    : "bg-nebula-500";

  const textColor = isCrit
    ? "text-supernova-400"
    : isWarn
    ? "text-pulsar-400"
    : "text-nebula-400";

  return (
    <div className="flex items-center gap-3 w-full">
			{isWarn && <audio src="/ticking.mp3" autoPlay/>}
      <span
        className={[
          "font-mono font-bold text-lg min-w-[2.5rem] text-right tabular-nums",
          textColor,
          isCrit && active ? "animate-pulse" : "",
        ].join(" ")}
      >
        {timeLeft}s
      </span>

      {/* Progress bar track */}
      <div className="flex-1 h-1.5 rounded-full bg-void-700 overflow-hidden">
        <div
          className={[
            "h-full rounded-full",
            barColor,
            active ? "transition-[width] duration-1000 ease-linear" : "",
          ].join(" ")}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={timeLeft}
          aria-valuemin={0}
          aria-valuemax={totalTime}
          aria-label="Time remaining"
        />
      </div>

    </div>
  );
}