"use client";

import { Braces, Layers3, Sparkles, WandSparkles } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getReadableTextColor, hexToRgba } from "@/lib/theme-presets";

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
          <Badge
            className="h-auto w-fit rounded-full border-white/70 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
            variant="outline"
          >
            <Sparkles className="size-4" style={{ color: accentColor }} />
            Live theme controls and prompt output
          </Badge>

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
            <Button
              asChild
              className="h-12 rounded-full px-7 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] hover:brightness-[1.02]"
              size="lg"
              style={{
                backgroundColor: accentColor,
                color: getReadableTextColor(accentColor),
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)",
              }}
            >
              <a href="#builder">Start Building</a>
            </Button>
            <Button
              asChild
              className="h-12 rounded-full border-white/80 bg-white/75 px-6 text-base text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] hover:bg-white/92"
              size="lg"
              variant="outline"
            >
              <a href="#presets">See Presets</a>
            </Button>
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
            <Card
              className="gap-0 rounded-[24px] border-white/80 bg-white/72 py-0 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
              key={title}
            >
              <CardHeader className="p-4">
                <Icon className="size-5 text-slate-900" />
                <CardTitle className="text-sm font-semibold text-slate-950">
                  {title}
                </CardTitle>
                <CardDescription className="text-sm leading-6 text-slate-600">
                  {text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 16 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
      >
        <Card
          className="relative h-full gap-0 overflow-hidden rounded-[34px] border-white/80 py-0 shadow-[0_22px_80px_rgba(15,23,42,0.1)]"
          style={{
            background: `radial-gradient(circle at top right, ${hexToRgba(
              accentColor,
              0.28,
            )}, transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.74))`,
          }}
        >
          <CardContent className="relative flex h-full flex-col gap-4 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                  Theme DNA
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-950">
                  Active preset: {activePresetName}
                </p>
              </div>
              <Badge
                className="h-auto rounded-full border-white/70 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
                variant="outline"
              >
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                Updating live
              </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="gap-0 rounded-[28px] border-white/70 bg-[#0b1020] py-0 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
                <CardContent className="p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">
                    Prompt Output
                  </p>
                  <Textarea
                    className="mt-4 min-h-[150px] resize-none border-white/10 bg-black/18 font-[family-name:var(--font-mono)] text-xs leading-6 text-white/82 focus-visible:border-white/20 focus-visible:ring-white/10"
                    readOnly
                    value={`SYSTEM:
Apply the selected theme to every
surface, CTA, card, and dashboard.

TOKENS:
radius, spacing, font, text, bg,
surface, accent, button, gradient`}
                  />
                </CardContent>
              </Card>

              <Card className="gap-0 rounded-[28px] border-white/70 bg-white/82 py-0 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                <CardContent className="space-y-4 p-5">
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
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "Radius + shadow",
                "Prompt aligned",
                "Preview synced",
              ].map((label, index) => (
                <Card
                  className="gap-0 rounded-[22px] border-white/75 bg-white/82 py-0 shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
                  key={label}
                >
                  <CardContent className="p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-950">{label}</p>
                    <p className="mt-1">
                      {index === 0
                        ? "Control the tactile feel."
                        : index === 1
                          ? "Auto-generated for your model."
                          : "Changes appear instantly."}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}
