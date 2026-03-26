"use client";

import { Braces, FileCode2, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    icon: Sparkles,
    title: "Choose a visual direction",
    text: "Start from presets and shape the feel of the product before you ask AI to build the next screen.",
  },
  {
    icon: FileCode2,
    title: "Generate stack-aware files",
    text: "Theme Forge outputs files like theme tokens, CSS variables, and implementation guidance for your stack.",
  },
  {
    icon: Braces,
    title: "Point your AI at the system",
    text: "Tell Claude, Cursor, or ChatGPT to build against those files so the product stays visually consistent.",
  },
];

export function HowItWorks() {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="scroll-mt-20 rounded-[40px] border border-white/70 bg-white/58 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:scroll-mt-24 lg:p-7"
      id="how-it-works"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Badge
            className="h-auto rounded-full border-white/80 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
            variant="outline"
          >
            How it works
          </Badge>
          <h2 className="balanced-text mt-4 font-[family-name:var(--font-geist)] text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Give AI a theme system first, then let it build faster.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          The goal is simple: stop re-explaining styles every prompt. Theme Forge
          turns a visual direction into files and rules your AI can keep reusing.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <Card
            className="gap-0 rounded-[28px] border-white/80 bg-white/76 py-0 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
            key={title}
          >
            <CardHeader className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-[#f9f7f2] text-slate-900">
                  <Icon className="size-5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  0{index + 1}
                </span>
              </div>
              <CardTitle className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-0 text-sm leading-6 text-slate-600">
              {text}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}
