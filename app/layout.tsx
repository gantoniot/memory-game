import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { StartDialog } from "@/components/ui/StartDialog";

export const metadata: Metadata = {
  title: {
    default:  "Cosmic Memory",
    template: "%s · Cosmic Memory",
  },
  description: "A space-themed Memory Game.",
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#110f1c" },
    { media: "(prefers-color-scheme: dark)",  color: "#0d0b12" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
					<StartDialog />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
