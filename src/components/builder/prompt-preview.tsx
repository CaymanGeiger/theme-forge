"use client";

import { useState } from "react";

import { Check, Copy, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  getGradientDirectionLabel,
  getThemeFontLabel,
  hexToRgba,
} from "@/lib/theme-presets";
import { type ThemeConfig } from "@/lib/theme-types";

type PromptPreviewProps = {
  config: ThemeConfig;
  prompt: string;
};

export function PromptPreview({ config, prompt }: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!navigator.clipboard) return;

    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-6 rounded-[40px] border border-white/70 bg-white/58 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:grid-cols-[0.42fr_minmax(0,0.58fr)] lg:p-7"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.48, ease: "easeOut" }}
    >
      <div className="flex flex-col justify-between gap-6">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
            Prompt Output
          </p>
          <h2 className="balanced-text font-[family-name:var(--font-geist)] text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Auto-generate the prompt your model should keep using.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
            This turns your live theme selections into reusable instructions so
            your next AI-generated screen still looks like the same product.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              label: "Font",
              value: getThemeFontLabel(config.fontFamily),
            },
            {
              label: "Gradient",
              value: config.useGradient
                ? getGradientDirectionLabel(config.gradientDirection)
                : "Solid background",
            },
            {
              label: "Radius",
              value: `${config.radius}px cards`,
            },
            {
              label: "Spacing",
              value: `${config.spacing}px rhythm`,
            },
          ].map((item) => (
            <div
              className="rounded-[24px] border border-white/80 bg-white/76 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.05)]"
              key={item.label}
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-sm font-semibold text-slate-950">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-slate-900/10 bg-[#0b1020] p-4 shadow-[0_28px_90px_rgba(15,23,42,0.18)] sm:p-5">
        <div
          className="absolute inset-x-0 top-0 h-36"
          style={{
            background: `linear-gradient(180deg, ${hexToRgba(
              config.accentColor,
              0.22,
            )}, transparent)`,
          }}
        />
        <div className="relative">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-300" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/72">
                <Sparkles className="size-3.5" />
                Theme prompt
              </div>
            </div>
            <Button
              className="bg-white/10 text-white shadow-none hover:bg-white/14"
              onClick={handleCopy}
              size="sm"
              variant="secondary"
            >
              {copied ? (
                <>
                  <Check className="size-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copy prompt
                </>
              )}
            </Button>
          </div>

          <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-[26px] border border-white/10 bg-black/18 p-5 font-[family-name:var(--font-mono)] text-sm leading-7 text-white/82">
            {prompt}
          </pre>
        </div>
      </div>
    </motion.section>
  );
}
