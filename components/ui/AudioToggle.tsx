import { RefObject, useState } from "react";
import soundOn from "@/assets/img/sound--on.svg";
import soundOff from "@/assets/img/sound--off.svg";
import Image from "next/image";

interface IAudioToggle {
	audio: RefObject<HTMLAudioElement | null>
}
// ── Theme toggle ──────────────────────────────────────────────────────────────
export function AudioToggle({ audio }: IAudioToggle) {
	const [muted, setMuted] = useState<boolean>(true);

	function toggleAudios(){
		if(muted)
			audio.current?.play()
		else 
			audio.current?.pause();
		setMuted(!muted);
	}

	return (
		<button
			onClick={() => toggleAudios()}
			className="btn btn-subtle btn-sm"
			aria-label="Toggle theme"
		>
			<Image className="invert" src={muted  ? soundOff  : soundOn} alt="icon" width={50} height={50} />
		</button>
	);
}