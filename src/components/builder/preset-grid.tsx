"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getReadableTextColor,
  getThemeFontLabel,
  hexToRgba,
} from "@/lib/theme-presets";
import { type ThemePreset } from "@/lib/theme-types";
import { cn } from "@/lib/utils";

type PresetGridProps = {
  presets: ThemePreset[];
  activePresetId: string | null;
  onApplyPreset: (presetId: string) => void;
};

export function PresetGrid({
  presets,
  activePresetId,
  onApplyPreset,
}: PresetGridProps) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[40px] border border-white/70 bg-white/58 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:p-7"
      id="presets"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.48, ease: "easeOut" }}
    >
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
            Presets
          </p>
          <h2 className="balanced-text font-[family-name:var(--font-geist)] text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Start from a visual direction instead of an empty panel.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          Each preset rewires the same theme object, so you can branch from a
          full aesthetic and keep refining from there.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {presets.map((preset) => {
          const isActive = activePresetId === preset.id;
          const pillTextColor = preset.config.textColor;
          const pillBackground = hexToRgba(preset.config.textColor, 0.12);
          const pillBorder = hexToRgba(preset.config.textColor, 0.18);
          const activePillBackground = preset.config.buttonColor;
          const activePillText = getReadableTextColor(preset.config.buttonColor);
          const previewOutline = hexToRgba(preset.config.textColor, 0.16);
          const previewShadow = "0 16px 30px rgba(15, 23, 42, 0.14)";

          return (
            <Button
              className={cn(
                "group h-auto w-full flex-col items-start justify-start rounded-[30px] border p-4 text-left whitespace-normal transition duration-200",
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(15,23,42,0.16)] hover:bg-slate-900 hover:text-white active:text-white focus-visible:text-white aria-expanded:text-white"
                  : "border-white/80 bg-white/78 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.84),0_1px_2px_rgba(15,23,42,0.05)] hover:bg-white hover:text-slate-900 active:text-slate-900 focus-visible:text-slate-900 aria-expanded:text-slate-900",
              )}
              key={preset.id}
              onClick={() => onApplyPreset(preset.id)}
              type="button"
              variant="ghost"
            >
              <Card
                className="mb-4 w-full gap-0 overflow-hidden rounded-[24px] border py-0 ring-0"
                style={{
                  background: preset.config.useGradient
                    ? `linear-gradient(${preset.config.gradientDirection}, ${preset.config.gradientStart}, ${preset.config.gradientEnd})`
                    : preset.config.backgroundColor,
                  borderColor: previewOutline,
                  boxShadow: `inset 0 1px 0 ${hexToRgba("#ffffff", 0.18)}`,
                }}
              >
                <CardContent className="p-4">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                    <div className="min-w-0">
                      <Badge
                        className="h-auto max-w-full justify-start overflow-hidden rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ellipsis whitespace-nowrap backdrop-blur-sm"
                        style={{
                          backgroundColor: pillBackground,
                          borderColor: pillBorder,
                          color: pillTextColor,
                        }}
                      >
                        {preset.eyebrow}
                      </Badge>
                    </div>
                    {isActive ? (
                      <span
                        aria-label="Selected preset"
                        className="inline-flex shrink-0 items-center justify-center rounded-full border px-2.5 py-1 backdrop-blur-sm"
                        style={{
                          backgroundColor: activePillBackground,
                          borderColor: hexToRgba(activePillBackground, 0.32),
                          color: activePillText,
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.18), 0 1px 2px rgba(15,23,42,0.16)",
                        }}
                      >
                        <Check className="size-3.5" strokeWidth={2.75} />
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-8 grid gap-2">
                    <Card
                      className="h-16 gap-0 rounded-[18px] border py-0 ring-0"
                      style={{
                        backgroundColor: preset.config.surfaceColor,
                        borderColor: previewOutline,
                        boxShadow: `${previewShadow}, inset 0 1px 0 ${hexToRgba(
                          "#ffffff",
                          0.24,
                        )}`,
                      }}
                    />
                    <div className="flex gap-2">
                      {[preset.config.accentColor, preset.config.buttonColor].map(
                        (color) => (
                          <Card
                            className="h-9 flex-1 gap-0 rounded-[14px] border py-0 ring-0"
                            key={color}
                            style={{
                              backgroundColor: color,
                              borderColor: hexToRgba(
                                getReadableTextColor(color),
                                0.14,
                              ),
                              boxShadow: `inset 0 1px 0 ${hexToRgba(
                                "#ffffff",
                                0.18,
                              )}`,
                            }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-65">
                {getThemeFontLabel(preset.config.fontFamily)}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{preset.name}</h3>
              <p className="mt-3 text-sm leading-6 opacity-75">{preset.blurb}</p>
            </Button>
          );
        })}
      </div>
    </motion.section>
  );
}
