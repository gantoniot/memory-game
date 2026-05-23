// components/ui/ResultModal.tsx
"use client";

import type { ModalKind } from "@/types/memory";

interface Props {
  kind:    ModalKind;
  onClose: () => void;
	onReset: () => void;
}

export function ResultModal({ kind, onClose, onReset }: Props) {

  const isSuccess = kind === "success";

	if (kind === "completed") {
  	return (
			<div className="absolute inset-0 z-20 flex items-center justify-center
											bg-void-950/90 backdrop-blur-sm rounded-2xl
											animate-in fade-in duration-300">
				<div className="glass border-supernova-800/40 rounded-2xl p-8
												max-w-xs w-full mx-4 flex flex-col items-center gap-4 text-center">

					<h3 className="font-display font-semibold text-star-100">
						You did it!
					</h3>

					<button onClick={onReset} className={`mt-2 btn btn-outline rounded-full
                     hover:animate-bounce focus-visible:animate-none
                     hover:border-nebula-500 hover:text-nebula-200
                     hover:bg-nebula-950/60 transition-all duration-700 ease-out`}>
						PLAY AGAIN
					</button>
				</div>
			</div>
		);
	}

	if (kind === "expired") {
  	return (
			<div className="absolute inset-0 z-20 flex items-center justify-center
											bg-void-950/90 backdrop-blur-sm rounded-2xl
											animate-in fade-in duration-300">
				<div className="glass border-supernova-800/40 rounded-2xl p-8
												max-w-xs w-full mx-4 flex flex-col items-center gap-4 text-center">

					<h3 className="font-display font-semibold text-star-100">
						Oops! you didn't find them all
					</h3>

					<button onClick={onReset} className={`mt-2 btn btn-outline rounded-full
                     hover:animate-bounce focus-visible:animate-none
                     hover:border-nebula-500 hover:text-nebula-200
                     hover:bg-nebula-950/60 transition-all duration-700 ease-out`}>
						PLAY AGAIN
					</button>
				</div>
			</div>
		);
	}

  if(kind === "success" || kind === "fail"){
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
							? "nice! it's a match"
							: "sorry, but this is not a match"}
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
}