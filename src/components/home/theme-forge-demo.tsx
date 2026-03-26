"use client";

import { ArrowRight, Check, Files, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";

import { LivePreview } from "@/components/builder/live-preview";
import { useThemeBuilderState } from "@/components/builder/use-theme-builder-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getReadableTextColor,
  hexToRgba,
  mixHexColors,
} from "@/lib/theme-presets";
import { cn } from "@/lib/utils";

export function ThemeForgeDemo() {
  const {
    activePresetId,
    applyPreset,
    themeConfig,
    presets,
  } = useThemeBuilderState();
  const presetLabels: Record<string, string> = {
    "minimal-saas": "Minimal",
    "dark-glass": "Dark Glass",
    "sunlit-studio": "Sunlit",
    neon: "Neon",
  };
  const demoPresets = ["minimal-saas", "dark-glass", "sunlit-studio", "neon"]
    .flatMap((presetId) => {
      const preset = presets.find((item) => item.id === presetId);
      return preset ? [preset] : [];
    });

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="scroll-mt-20 rounded-[40px] border border-white/70 bg-white/58 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:scroll-mt-24 lg:p-7"
      id="demo"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
            Preset Demo
          </p>
          <h2 className="balanced-text font-[family-name:var(--font-geist)] text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Pick a preset. Watch the same product shift styles instantly.
          </h2>
        </div>
        <div className="max-w-xl">
          <p className="text-sm leading-7 text-slate-600 sm:text-base">
            Theme Forge gives developers a theme system AI can actually follow.
            Pick a visual direction, see the example update immediately, then
            open the forge when you want the full editor and exports for your
            stack.
          </p>
        </div>
      </div>

      <Card className="gap-0 rounded-[32px] border-white/80 bg-white/74 py-0 shadow-[0_18px_56px_rgba(15,23,42,0.06)]">
        <CardContent className="space-y-5 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge
                className="h-auto rounded-full border-white/80 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                variant="outline"
              >
                <Sparkles className="size-3.5" />
                Live presets
              </Badge>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                See the example change before you commit.
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Click a preset and watch the same product adopt a different
                theme system instantly. Then open the full forge when you want
                to fine-tune it.
              </p>
            </div>

            <Button
              asChild
              className="h-11 rounded-full bg-slate-950 px-5 text-sm text-white hover:bg-slate-900 hover:text-white"
              size="lg"
              style={{ color: "#ffffff" }}
            >
              <a href="/theme-forge">
                Start Forging
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <div className="grid gap-2 lg:grid-cols-4">
            {demoPresets.map((preset) => {
              const isActive = activePresetId === preset.id;
              const presetBackground = preset.config.useGradient
                ? `linear-gradient(${preset.config.gradientDirection}, ${mixHexColors(
                    preset.config.surfaceColor,
                    preset.config.gradientStart,
                    isActive ? 0.34 : 0.2,
                  )}, ${mixHexColors(
                    preset.config.surfaceColor,
                    preset.config.gradientEnd,
                    isActive ? 0.48 : 0.28,
                  )})`
                : `linear-gradient(180deg, ${mixHexColors(
                    preset.config.surfaceColor,
                    preset.config.backgroundColor,
                    0.18,
                  )}, ${preset.config.surfaceColor})`;
              const presetBorder = mixHexColors(
                preset.config.surfaceColor,
                preset.config.accentColor,
                isActive ? 0.56 : 0.34,
              );
              const presetText = preset.config.textColor;
              const presetMuted = mixHexColors(
                preset.config.mutedTextColor,
                preset.config.textColor,
                0.18,
              );
              const presetCardStyle = {
                background: presetBackground,
                borderColor: presetBorder,
                color: presetText,
                boxShadow: isActive
                  ? `0 14px 36px ${hexToRgba(preset.config.accentColor, 0.18)}`
                  : `0 10px 24px ${hexToRgba(preset.config.textColor, 0.06)}`,
              } satisfies CSSProperties;

              return (
                <Button
                  className={cn(
                    "h-auto items-start justify-start rounded-[20px] border px-4 py-3 text-left shadow-none transition-colors",
                    "hover:brightness-[1.02] hover:[color:inherit]",
                  )}
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  style={presetCardStyle}
                  type="button"
                  variant="ghost"
                >
                  <span className="flex w-full items-start justify-between gap-3">
                    <span className="block">
                      <span
                        className="block text-[11px] font-medium uppercase tracking-[0.18em]"
                        style={{ color: presetMuted }}
                      >
                        {preset.eyebrow}
                      </span>
                      <span className="mt-2 block text-base font-semibold">
                        {presetLabels[preset.id] ?? preset.name}
                      </span>
                    </span>
                    {isActive ? (
                      <span
                        className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border"
                        style={{
                          backgroundColor: preset.config.accentColor,
                          borderColor: hexToRgba(preset.config.accentColor, 0.4),
                          color: getReadableTextColor(preset.config.accentColor),
                        }}
                      >
                        <Check className="size-4" />
                      </span>
                    ) : null}
                  </span>
                </Button>
              );
            })}
          </div>

          <LivePreview config={themeConfig} variant="compact" />
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="gap-0 rounded-[32px] border-white/80 bg-white/74 py-0 shadow-[0_18px_56px_rgba(15,23,42,0.06)]">
          <CardContent className="p-5">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Built for developers shipping with AI
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  Theme Forge creates files your AI can reference for your
                  stack, so you can focus on asking it to build the product
                  instead of constantly correcting the styles.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["React + Tailwind", "shadcn/ui", "MUI", "HTML + CSS"].map(
                  (stack) => (
                    <Badge
                      className="h-auto rounded-full border-white/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
                      key={stack}
                      variant="outline"
                    >
                      {stack}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-0 rounded-[32px] border-white/80 bg-white/74 py-0 shadow-[0_18px_56px_rgba(15,23,42,0.06)]">
          <CardContent className="p-5">
            <div className="rounded-[20px] border border-white/80 bg-[#f9f7f2] p-4">
              <div className="mb-3 flex items-center gap-2">
                <Files className="size-4 text-slate-900" />
                <p className="text-sm font-semibold text-slate-950">
                  Files your AI can reference
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  "themeforge.json",
                  "theme.css",
                  "component-rules.md",
                  "prompt.md",
                ].map((file) => (
                  <div
                    className="flex items-center gap-2 text-sm text-slate-600"
                    key={file}
                  >
                    <Check className="size-4 text-slate-900" />
                    <span>{file}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}
