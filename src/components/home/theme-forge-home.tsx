"use client";

import { startTransition, useState } from "react";

import { LivePreview } from "@/components/builder/live-preview";
import { PresetGrid } from "@/components/builder/preset-grid";
import { PromptPreview } from "@/components/builder/prompt-preview";
import { ThemeControls } from "@/components/builder/theme-controls";
import { Hero } from "@/components/home/hero";
import { Button } from "@/components/ui/button";
import {
  defaultThemeConfig,
  normalizeHexColor,
  themePresets,
} from "@/lib/theme-presets";
import { type ThemeConfig } from "@/lib/theme-types";

const colorKeys = new Set<keyof ThemeConfig>([
  "textColor",
  "mutedTextColor",
  "backgroundColor",
  "surfaceColor",
  "accentColor",
  "buttonColor",
  "gradientStart",
  "gradientEnd",
]);

function normalizeThemeValue<K extends keyof ThemeConfig>(
  key: K,
  value: ThemeConfig[K],
  fallback: ThemeConfig[K],
) {
  if (colorKeys.has(key) && typeof value === "string") {
    return (normalizeHexColor(value) ?? fallback) as ThemeConfig[K];
  }

  return value;
}

export function ThemeForgeHome() {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    ...defaultThemeConfig,
  });
  const [activePresetId, setActivePresetId] = useState<string | null>(
    themePresets[0]?.id ?? null,
  );

  const activePreset = themePresets.find((preset) => preset.id === activePresetId);
  const siteAccentColor = defaultThemeConfig.accentColor;

  function updateTheme<K extends keyof ThemeConfig>(
    key: K,
    value: ThemeConfig[K],
  ) {
    setActivePresetId((current) => (current === null ? current : null));
    setThemeConfig((current) => {
      const nextValue = normalizeThemeValue(key, value, current[key]);

      if (Object.is(current[key], nextValue)) {
        return current;
      }

      return { ...current, [key]: nextValue };
    });
  }

  function patchTheme(changes: Partial<ThemeConfig>) {
    setActivePresetId((current) => (current === null ? current : null));
    setThemeConfig((current) => {
      let hasChanges = false;
      const nextConfig = { ...current };

      for (const [rawKey, rawValue] of Object.entries(changes) as Array<
        [keyof ThemeConfig, ThemeConfig[keyof ThemeConfig] | undefined]
      >) {
        if (typeof rawValue === "undefined") {
          continue;
        }

        const nextValue = normalizeThemeValue(rawKey, rawValue, current[rawKey]);

        if (Object.is(current[rawKey], nextValue)) {
          continue;
        }

        nextConfig[rawKey] = nextValue as never;
        hasChanges = true;
      }

      return hasChanges ? nextConfig : current;
    });
  }

  function applyPreset(id: string) {
    const preset = themePresets.find((entry) => entry.id === id);
    if (!preset) return;

    startTransition(() => {
      setActivePresetId(id);
      setThemeConfig({ ...preset.config });
    });
  }

  function applyPresetFromGrid(id: string) {
    applyPreset(id);

    const builder = document.getElementById("builder");
    if (!builder) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    builder.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_72%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-10 px-4 pb-12 pt-4 sm:px-8 lg:px-10 lg:pb-16 lg:pt-6">
        <Hero
          accentColor={siteAccentColor}
          activePresetName={activePreset?.name ?? "Custom Mix"}
        />

        <PresetGrid
          activePresetId={activePresetId}
          onApplyPreset={applyPresetFromGrid}
          presets={themePresets}
        />

        <section
          id="builder"
          className="rounded-[40px] border border-white/70 bg-white/55 p-4 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7"
        >
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                Theme Builder
              </p>
              <h2 className="balanced-text font-[family-name:var(--font-geist)] text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Tune the system, inspect the canvas, and generate a prompt your
                AI can keep following.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Every control maps directly to the preview so you can shape a
              design system instead of nudging one isolated component.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(340px,380px)_minmax(0,1fr)] 2xl:grid-cols-[390px_minmax(0,1fr)]">
            <ThemeControls
              activePresetId={activePresetId}
              config={themeConfig}
              onApplyPreset={applyPreset}
              onPatch={patchTheme}
              onUpdate={updateTheme}
              presets={themePresets}
            />
            <LivePreview config={themeConfig} />
          </div>
        </section>

        <PromptPreview
          accentColor={siteAccentColor}
          config={themeConfig}
        />

        <footer className="flex flex-col gap-5 rounded-[32px] border border-white/70 bg-white/60 px-6 py-7 text-sm text-slate-600 shadow-[0_18px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-geist)] text-base font-semibold text-slate-950">
              Theme Forge
            </p>
            <p className="mt-1">
              Visual theme builder for AI workflows, prompts, and component
              systems.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <Button
              asChild
              className="h-auto p-0 text-sm font-medium text-slate-500 hover:text-slate-950"
              variant="link"
            >
              <a href="#">GitHub</a>
            </Button>
            <Button
              asChild
              className="h-auto p-0 text-sm font-medium text-slate-500 hover:text-slate-950"
              variant="link"
            >
              <a href="#">Twitter</a>
            </Button>
            <Button
              asChild
              className="h-auto p-0 text-sm font-medium text-slate-500 hover:text-slate-950"
              variant="link"
            >
              <a href="#builder">Back to builder</a>
            </Button>
          </div>
        </footer>
      </div>
    </main>
  );
}
