"use client";

import { motion } from "motion/react";

import { getThemeFontLabel } from "@/lib/theme-presets";
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

      <div className="grid gap-4 lg:grid-cols-5">
        {presets.map((preset) => {
          const isActive = activePresetId === preset.id;

          return (
            <button
              className={cn(
                "group rounded-[30px] border p-4 text-left transition duration-200 hover:-translate-y-1",
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-[0_24px_60px_rgba(15,23,42,0.24)]"
                  : "border-white/80 bg-white/78 text-slate-900 shadow-[0_18px_42px_rgba(15,23,42,0.06)] hover:bg-white",
              )}
              key={preset.id}
              onClick={() => onApplyPreset(preset.id)}
              type="button"
            >
              <div
                className="mb-4 overflow-hidden rounded-[24px] border border-white/20 p-4"
                style={{
                  background: preset.config.useGradient
                    ? `linear-gradient(${preset.config.gradientDirection}, ${preset.config.gradientStart}, ${preset.config.gradientEnd})`
                    : preset.config.backgroundColor,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-black/14 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                    {preset.eyebrow}
                  </span>
                  {isActive ? (
                    <span className="rounded-full bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                      Active
                    </span>
                  ) : null}
                </div>

                <div className="mt-8 grid gap-2">
                  <div
                    className="h-16 rounded-[18px] border border-white/15"
                    style={{ backgroundColor: preset.config.surfaceColor }}
                  />
                  <div className="flex gap-2">
                    {[preset.config.accentColor, preset.config.buttonColor].map(
                      (color) => (
                        <div
                          className="h-9 flex-1 rounded-[14px] border border-white/15"
                          key={color}
                          style={{ backgroundColor: color }}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-65">
                {getThemeFontLabel(preset.config.fontFamily)}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{preset.name}</h3>
              <p className="mt-3 text-sm leading-6 opacity-75">{preset.blurb}</p>
            </button>
          );
        })}
      </div>
    </motion.section>
  );
}
