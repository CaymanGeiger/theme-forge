"use client";

import { Braces, Layers3, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { type MouseEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getReadableTextColor, hexToRgba } from "@/lib/theme-presets";
import { smoothScrollToHash } from "@/lib/smooth-scroll";

type HeroProps = {
  accentColor: string;
  activePresetName: string;
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
};

export function Hero({
  accentColor,
  activePresetName,
  primaryCtaHref = "#builder",
  primaryCtaLabel = "Start Forging",
  secondaryCtaHref = "#presets",
  secondaryCtaLabel = "See Presets",
}: HeroProps) {
  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) {
      return;
    }

    if (smoothScrollToHash(href)) {
      event.preventDefault();
    }
  };

  const featureCards = [
    {
      icon: Sparkles,
      title: "Built for developers",
      text: "Keep websites, dashboards, and app screens visually consistent while AI writes the UI.",
    },
    {
      icon: Braces,
      title: "Files for your stack",
      text: "Generate theme files and AI instructions that match Tailwind, shadcn/ui, MUI, or plain CSS workflows.",
    },
    {
      icon: Layers3,
      title: "Preset-first workflow",
      text: "Start from a visual direction, see the product change instantly, then open the full forge to refine it.",
    },
  ];

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
            For developers building with AI
          </Badge>

          <div className="space-y-5">
            <h1 className="balanced-text max-w-4xl font-[family-name:var(--font-geist)] text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
              <span className="block">Stop fighting AI on styles.</span>
              <span className="block">Give it a system instead.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Theme Forge helps developers keep websites and applications
              visually consistent while AI builds the interface. Pick a visual
              direction, generate config files for your tech stack, and tell
              Claude, Cursor, ChatGPT, or your own model to build on top of the
              same theme instead of making up new styles every screen.
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
              {primaryCtaHref.startsWith("#") ? (
                <a href={primaryCtaHref} onClick={handleAnchorClick}>
                  {primaryCtaLabel}
                </a>
              ) : (
                <a href={primaryCtaHref}>{primaryCtaLabel}</a>
              )}
            </Button>
            <Button
              asChild
              className="h-12 rounded-full border-white/80 bg-white/75 px-6 text-base text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] hover:bg-white/92"
              size="lg"
              variant="outline"
            >
              {secondaryCtaHref.startsWith("#") ? (
                <a href={secondaryCtaHref} onClick={handleAnchorClick}>
                  {secondaryCtaLabel}
                </a>
              ) : (
                <a href={secondaryCtaHref}>{secondaryCtaLabel}</a>
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, text }) => (
            <Card
              className="gap-0 rounded-[24px] border-white/80 bg-white/72 py-0 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
              key={title}
            >
              <CardHeader className="p-4">
                <Icon className="size-5 text-slate-900" />
                <CardTitle className="text-sm font-semibold text-slate-950">
                  {title}
                </CardTitle>
                <p className="text-sm leading-6 text-slate-600">{text}</p>
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
                  How it works
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-950">
                  One theme system, reused everywhere
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
                Live preset
              </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="gap-0 rounded-[28px] border-white/70 bg-[#0b1020] py-0 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
                <CardContent className="p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">
                    AI build brief
                  </p>
                  <div className="mt-4 space-y-3 rounded-[22px] border border-white/10 bg-black/18 p-4 text-sm leading-6 text-white/82">
                    <p>Build the app using the supplied theme files.</p>
                    <p>Keep colors, radius, spacing, and typography consistent.</p>
                    <p>Do not invent new styling rules outside the theme system.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="gap-0 rounded-[28px] border-white/70 bg-white/82 py-0 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-500">Output bundle</span>
                    <span className="font-semibold text-slate-950">Stack-aware</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      "themeforge.json",
                      "theme.css",
                      "component-rules.md",
                      "prompt.md",
                    ].map((label, index) => (
                      <div
                        className="flex items-center justify-between rounded-[18px] border border-slate-200/80 bg-white/88 px-3 py-3 text-sm"
                        key={label}
                      >
                        <span className="font-medium text-slate-700">{label}</span>
                        <span
                          className="rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
                          style={{
                            backgroundColor: hexToRgba(accentColor, 0.14),
                            color: index === 0 ? "#0f172a" : "#334155",
                          }}
                        >
                          Ready
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "Preset selected",
                "Stack attached",
                "UI stays consistent",
              ].map((label, index) => (
                <Card
                  className="gap-0 rounded-[22px] border-white/75 bg-white/82 py-0 shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
                  key={label}
                >
                  <CardContent className="p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-950">{label}</p>
                    <p className="mt-1">
                      {index === 0
                        ? activePresetName
                        : index === 1
                          ? "Tailwind, shadcn/ui, MUI, or HTML + CSS"
                          : "AI keeps building against the same theme rules."}
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
