
import { useTheme } from "next-themes";
import { useEffect, useEffectEvent, useState } from "react";

// ── Theme toggle ──────────────────────────────────────────────────────────────
export function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	//useEffectEvent lets us use setState functions inside useEffects
	//Getting rid of React19 cascade loops and unwanted rerenders warning and surely not using stale values anymore
  const checkMount = useEffectEvent(() => {
    setMounted(true);
  });

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		checkMount();
	}, []);

	if (!mounted) return null;

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="btn btn-subtle btn-sm"
			aria-label="Toggle theme"
		>
			{theme === "dark" ? "☀ Light" : "☾ Dark"}
		</button>
	);
}