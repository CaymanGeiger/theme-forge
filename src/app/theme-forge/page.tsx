import type { Metadata } from "next";

import { ThemeForgeStudio } from "@/components/builder/theme-forge-studio";

export const metadata: Metadata = {
  title: "Theme Forge Studio | Full Theme Editor",
  description:
    "Use the full Theme Forge editor with live controls, responsive preview, and generated theme files in one dedicated workspace.",
};

export default function ThemeForgePage() {
  return <ThemeForgeStudio />;
}
