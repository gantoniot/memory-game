"use client";

import { useState, useEffect } from "react";
import Logo from "@/assets/img/logo.svg";
import Image from "next/image";

export function StartDialog() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Mount with a tiny delay so the CSS transition fires cleanly
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => setDismissed(true);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      className={[
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-void-950/85 backdrop-blur-md",
        "transition-opacity duration-500",
        visible && !dismissed ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div
        className={[
          "bg-transparent h-full w-full mx-4",
          "flex flex-col items-center gap-4 p-10 justify-center text-center",
          "transition-all duration-500",
          visible && !dismissed
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95",
        ].join(" ")}
      >
        <div className={`p-1 rounded-3xl bg-star-100 transition-all duration-700 ease-out ${visible ? "translate-y-0" : "-translate-y-40"}`}>
					<Image src={Logo} alt="Logo" width={200} height={200} />
				</div>

        {/* Copy */}
        <h2
          id="welcome-title"
          className="font-display font-bold text-xl text-star-100 tracking-tight"
        >
          Welcome to the cosmos
        </h2>

        <p className="text-foreground-muted text-sm leading-relaxed max-w-xs">
					<span className="text-nebula-300 font-medium">deep space interface</span>.
          Signal lock established. Navigation systems online.{" "}
          <span className="text-nebula-300 font-medium">Proceed when ready.</span>
        </p>
				<p>Find the pairs before time runs out!</p>

        {/* CTA button — bounce on hover */}
        <button
          onClick={handleEnter}
          className={`mt-2 btn btn-outline rounded-full
                     hover:animate-bounce focus-visible:animate-none
                     hover:border-nebula-500 hover:text-nebula-200
                     hover:bg-nebula-950/60 transition-all duration-700 ease-out ${visible ? "translate-y-0" : "translate-y-80"}`}
        >
          START
        </button>
      </div>
    </div>
  );
}