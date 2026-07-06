import type { Metadata } from "next";
import "./globals.css";
import { IconDefs } from "@/components/Icons";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollPath from "@/components/ScrollPath";
import ElectricCursor from "@/components/ElectricCursor";

export const metadata: Metadata = {
  title: "SLVNEON — Reimagining Communication. Through Thought.",
  description:
    "SLVNEON builds next-generation Brain-Computer Interface (BCI) and Neuro-AI technologies. Flagship project: Mind-to-Speech — decoding thought into speech and text.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpolygon points='32,4 58,18 58,46 32,60 6,46 6,18' fill='none' stroke='%23F7941D' stroke-width='5'/%3E%3Ccircle cx='32' cy='32' r='7' fill='%23F7941D'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* gate reveal-animations behind JS so no-JS users still see content */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js");` }}
        />
        <IconDefs />
        <div className="grain" aria-hidden="true" />
        <ScrollPath />
        <ScrollProgress />
        <ElectricCursor />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
