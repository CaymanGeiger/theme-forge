"use client";

import { startTransition, useState } from "react";

import { LivePreview } from "@/components/builder/live-preview";
import { PresetGrid } from "@/components/builder/preset-grid";
import { PromptPreview } from "@/components/builder/prompt-preview";
import { ThemeControls } from "@/components/builder/theme-controls";
import { Hero } from "@/components/home/hero";
import { buildThemePrompt, defaultThemeConfig, themePresets } from "@/lib/theme-presets";
import { type ThemeConfig } from "@/lib/theme-types";

export function ThemeForgeHome() {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    ...defaultThemeConfig,
  });
  const [activePresetId, setActivePresetId] = useState<string | null>(
    themePresets[0]?.id ?? null,
  );

  const activePreset = themePresets.find((preset) => preset.id === activePresetId);
  const generatedPrompt = buildThemePrompt(themeConfig);

  function updateTheme<K extends keyof ThemeConfig>(
    key: K,
    value: ThemeConfig[K],
  ) {
    setActivePresetId(null);
    setThemeConfig((current) => ({ ...current, [key]: value }));
  }

  function patchTheme(changes: Partial<ThemeConfig>) {
    setActivePresetId(null);
    setThemeConfig((current) => ({ ...current, ...changes }));
  }

  function applyPreset(id: string) {
    const preset = themePresets.find((entry) => entry.id === id);
    if (!preset) return;

    startTransition(() => {
      setActivePresetId(id);
      setThemeConfig({ ...preset.config });
    });
  }

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_72%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-10 px-4 pb-12 pt-4 sm:px-8 lg:px-10 lg:pb-16 lg:pt-6">
        <Hero
          accentColor={themeConfig.accentColor}
          activePresetName={activePreset?.name ?? "Custom Mix"}
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

          <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
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

        <PromptPreview config={themeConfig} prompt={generatedPrompt} />

        <PresetGrid
          activePresetId={activePresetId}
          onApplyPreset={applyPreset}
          presets={themePresets}
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
            <a className="transition hover:text-slate-950" href="#">
              GitHub
            </a>
            <a className="transition hover:text-slate-950" href="#">
              Twitter
            </a>
            <a className="transition hover:text-slate-950" href="#builder">
              Back to builder
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
