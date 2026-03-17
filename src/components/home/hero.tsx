"use client";

import { Braces, Layers3, Sparkles, WandSparkles } from "lucide-react";
import { motion } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { getReadableTextColor, hexToRgba } from "@/lib/theme-presets";
import { cn } from "@/lib/utils";

type HeroProps = {
  accentColor: string;
  activePresetName: string;
};

export function Hero({ accentColor, activePresetName }: HeroProps) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-8 rounded-[40px] border border-white/70 bg-white/55 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:p-8"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="flex flex-col justify-between gap-8 py-2">
        <div className="space-y-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
            <Sparkles className="size-4" style={{ color: accentColor }} />
            Live theme controls and prompt output
          </span>

          <div className="space-y-5">
            <h1 className="balanced-text max-w-4xl font-[family-name:var(--font-geist)] text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
              Build a visual theme your AI can actually follow.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Theme Forge lets you sculpt spacing, radius, typography, shadows,
              and gradients in real time, then turns that system into a
              structured prompt you can hand to Claude, Cursor, ChatGPT, or
              your own model.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              className={cn(buttonVariants({ size: "lg" }), "px-7")}
              href="#builder"
              style={{
                backgroundColor: accentColor,
                color: getReadableTextColor(accentColor),
                boxShadow: `0 18px 40px ${hexToRgba(accentColor, 0.3)}`,
              }}
            >
              Start Building
            </a>
            <a
              className={buttonVariants({ size: "lg", variant: "outline" })}
              href="#presets"
            >
              See Presets
            </a>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Layers3,
              title: "Single theme object",
              text: "Everything flows from one config instead of scattered styles.",
            },
            {
              icon: WandSparkles,
              title: "Live design system",
              text: "Cards, navigation, buttons, and form controls react instantly.",
            },
            {
              icon: Braces,
              title: "Prompt-ready output",
              text: "Generate instructions that preserve the exact theme in code.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              className="rounded-[24px] border border-white/80 bg-white/72 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
              key={title}
            >
              <Icon className="mb-3 size-5 text-slate-900" />
              <p className="text-sm font-semibold text-slate-950">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="relative overflow-hidden rounded-[34px] border border-white/80 p-5 shadow-[0_22px_80px_rgba(15,23,42,0.1)]"
        initial={{ opacity: 0, x: 16 }}
        style={{
          background: `radial-gradient(circle at top right, ${hexToRgba(
            accentColor,
            0.28,
          )}, transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.74))`,
        }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
      >
        <div className="relative flex h-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                Theme DNA
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-950">
                Active preset: {activePresetName}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              Updating live
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-white/70 bg-[#0b1020] p-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">
                Prompt Output
              </p>
              <pre className="mt-4 whitespace-pre-wrap font-[family-name:var(--font-mono)] text-xs leading-6 text-white/82">
                {`SYSTEM:
Apply the selected theme to every
surface, CTA, card, and dashboard.

TOKENS:
radius, spacing, font, text, bg,
surface, accent, button, gradient`}
              </pre>
            </div>

            <div className="space-y-4 rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-500">Token stack</span>
                <span className="font-semibold text-slate-950">Ready</span>
              </div>
              <div className="space-y-3">
                {["Typography", "Spacing", "Surfaces", "Motion"].map(
                  (label, index) => (
                    <div key={label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-600">{label}</span>
                        <span className="font-medium text-slate-950">
                          {index === 0 ? "Adaptive" : "Synced"}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200/80">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${74 + index * 7}%`,
                            background: `linear-gradient(90deg, ${accentColor}, ${hexToRgba(
                              accentColor,
                              0.6,
                            )})`,
                          }}
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "Radius + shadow",
              "Prompt aligned",
              "Preview synced",
            ].map((label, index) => (
              <div
                className="rounded-[22px] border border-white/75 bg-white/82 px-4 py-4 text-sm text-slate-600 shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
                key={label}
              >
                <p className="font-semibold text-slate-950">{label}</p>
                <p className="mt-1">
                  {index === 0
                    ? "Control the tactile feel."
                    : index === 1
                      ? "Auto-generated for your model."
                      : "Changes appear instantly."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
