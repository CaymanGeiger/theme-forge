"use client";

import { useState } from "react";

import { Check, ChevronDown, Copy, Files, Layers3, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { hexToRgba } from "@/lib/theme-presets";
import { getThemeArtifacts } from "@/lib/theme-spec";
import {
  stackOptions,
  type ThemeConfig,
  type ThemeOutputStack,
} from "@/lib/theme-types";

type PromptPreviewProps = {
  accentColor: string;
  config: ThemeConfig;
  animateOnMount?: boolean;
};

export function PromptPreview({
  accentColor,
  config,
  animateOnMount = true,
}: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [stack, setStack] = useState<ThemeOutputStack>("react-shadcn");
  const [includePromptFile, setIncludePromptFile] = useState(true);
  const [includeComponentRules, setIncludeComponentRules] = useState(true);
  const [selectedArtifactId, setSelectedArtifactId] = useState("themeforge-json");

  const activeStack =
    stackOptions.find((option) => option.value === stack) ?? stackOptions[1];
  const { spec, artifacts } = getThemeArtifacts(config, {
    stack,
    includePromptFile,
    includeComponentRules,
  });
  const selectedArtifact =
    artifacts.find((artifact) => artifact.id === selectedArtifactId) ?? artifacts[0];
  const selectedArtifactValue =
    artifacts.find((artifact) => artifact.id === selectedArtifactId)?.id ??
    artifacts[0]?.id ??
    "themeforge-json";

  async function handleCopy() {
    if (!navigator.clipboard || !selectedArtifact) return;

    await navigator.clipboard.writeText(selectedArtifact.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-6 rounded-[40px] border border-white/70 bg-white/58 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:grid-cols-[0.42fr_minmax(0,0.58fr)] lg:p-7"
      initial={animateOnMount ? { opacity: 0, y: 18 } : false}
      transition={animateOnMount ? { duration: 0.48, ease: "easeOut" } : { duration: 0 }}
    >
      <div className="flex flex-col gap-6 self-start">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
            Theme Spec Output
          </p>
          <h2 className="balanced-text font-[family-name:var(--font-geist)] text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Generate a reusable theme spec, real files, and AI build guidance.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
            Theme Forge now treats the spec as the source of truth first, then
            derives CSS variables, component rules, framework config, and the
            build prompt from that bundle.
          </p>
        </div>

        <Card className="gap-0 rounded-[26px] border-white/80 bg-white/74 py-0 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-slate-950 p-2 text-white">
                <Layers3 className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-950">
                  Recommended workflow
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Prompt = what to build. Theme files = how it must look.
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Build the interface using <span className="font-medium text-slate-950">themeforge.json</span> and{" "}
                  <span className="font-medium text-slate-950">theme.css</span>.
                  Use the prompt only to describe the feature or screen.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-0 rounded-[26px] border-white/80 bg-white/74 py-0 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
          <CardContent className="p-4">
            <div className="mb-3">
              <p className="text-sm font-semibold text-slate-950">Target stack</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Generate files that match the frontend stack your team actually uses.
              </p>
            </div>

            <Select onValueChange={(value) => setStack(value as ThemeOutputStack)} value={stack}>
              <SelectTrigger className="w-full border-slate-200 bg-white text-slate-900 shadow-none focus-visible:ring-slate-300">
                <SelectValue placeholder="Choose a stack" />
              </SelectTrigger>
              <SelectContent>
                {stackOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {activeStack.description}
            </p>
          </CardContent>
        </Card>

        <Collapsible
          className="overflow-hidden rounded-[26px] border border-white/80 bg-white/74 shadow-[0_14px_36px_rgba(15,23,42,0.05)]"
          onOpenChange={setOptionsOpen}
          open={optionsOpen}
        >
          <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-950">Bundle options</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Control which supporting files are generated from the current spec.
              </p>
            </div>
            <CollapsibleTrigger asChild>
              <Button
                className="gap-2 rounded-full border-white/80 bg-white/84 text-slate-700 shadow-none hover:bg-white"
                size="sm"
                variant="outline"
              >
                {optionsOpen ? "Hide" : "Customize"}
                <ChevronDown
                  className={`size-4 transition-transform ${optionsOpen ? "rotate-180" : ""}`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="overflow-hidden">
            <Separator className="bg-slate-200/80" />
            <div className="grid gap-3 p-4">
              <div className="flex items-start gap-3 rounded-[18px] border border-white/75 bg-white/72 p-3">
                <Checkbox
                  checked={includePromptFile}
                  id="include-prompt-file"
                  onCheckedChange={(checked) => setIncludePromptFile(checked === true)}
                />
                <div className="min-w-0">
                  <Label
                    className="cursor-pointer text-sm font-semibold text-slate-950"
                    htmlFor="include-prompt-file"
                  >
                    Include prompt.md
                  </Label>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Keep the AI-facing build prompt derived from the spec bundle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-[18px] border border-white/75 bg-white/72 p-3">
                <Checkbox
                  checked={includeComponentRules}
                  id="include-component-rules"
                  onCheckedChange={(checked) =>
                    setIncludeComponentRules(checked === true)
                  }
                />
                <div className="min-w-0">
                  <Label
                    className="cursor-pointer text-sm font-semibold text-slate-950"
                    htmlFor="include-component-rules"
                  >
                    Include component-rules.md
                  </Label>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Add hard constraints, shared component logic, and forbidden drift.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              label: "Stack",
              value: activeStack.label,
            },
            {
              label: "Bundle",
              value: `${artifacts.length} files`,
            },
            {
              label: "Source of truth",
              value: "themeforge.json",
            },
            {
              label: "Workflow",
              value: "Spec -> files -> AI",
            },
          ].map((item) => (
            <Card
              className="gap-0 rounded-[24px] border-white/80 bg-white/76 py-0 shadow-[0_14px_36px_rgba(15,23,42,0.05)]"
              key={item.label}
            >
              <CardHeader className="p-4">
                <CardDescription className="text-sm text-slate-500">
                  {item.label}
                </CardDescription>
                <CardTitle className="text-sm font-semibold text-slate-950">
                  {item.value}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Card className="relative gap-0 overflow-hidden rounded-[32px] border-slate-900/10 bg-[#0b1020] py-0 text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
        <div
          className="absolute inset-x-0 top-0 h-36"
          style={{
            background: `linear-gradient(180deg, ${hexToRgba(
              accentColor,
              0.22,
            )}, transparent)`,
          }}
        />
        <CardContent className="relative p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-300" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <Badge className="h-auto rounded-full border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/72">
                <Files className="size-3.5" />
                Theme bundle
              </Badge>
            </div>
            <Button
              className="border-white/10 bg-white/10 text-white shadow-none hover:bg-white/14"
              onClick={handleCopy}
              size="sm"
              variant="outline"
            >
              {copied ? (
                <>
                  <Check className="size-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copy file
                </>
              )}
            </Button>
          </div>

          <div className="mb-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Select
              onValueChange={(value) => {
                if (!value) return;
                setSelectedArtifactId(value);
              }}
              value={selectedArtifactValue}
            >
              <SelectTrigger className="w-full border-white/10 bg-white/8 text-white shadow-none focus-visible:ring-white/20">
                <SelectValue placeholder="Choose a generated file" />
              </SelectTrigger>
              <SelectContent>
                {artifacts.map((artifact) => (
                  <SelectItem key={artifact.id} value={artifact.id}>
                    {artifact.fileName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/72">
              <p className="font-medium text-white">
                {spec.fontFamily} / {Math.round(spec.fontScale * 100)}%
              </p>
              <p className="mt-1 text-white/60">
                {spec.radius}px radius, {spec.spacingDensity}px spacing
              </p>
            </div>
          </div>

          <div className="mb-4 rounded-[24px] border border-white/10 bg-white/6 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">
                  {selectedArtifact?.fileName}
                </p>
                <p className="mt-1 text-sm leading-6 text-white/60">
                  {selectedArtifact?.description}
                </p>
              </div>
              <Badge className="h-auto rounded-full border-white/10 bg-white/8 px-3 py-1.5 text-xs font-medium text-white/72">
                <Sparkles className="size-3.5" />
                {activeStack.label}
              </Badge>
            </div>
          </div>

          <Textarea
            className="min-h-[560px] resize-none rounded-[26px] border-white/10 bg-black/18 p-5 font-[family-name:var(--font-mono)] text-sm leading-7 text-white/82 placeholder:text-white/45 focus-visible:border-white/20 focus-visible:ring-white/10"
            readOnly
            value={selectedArtifact?.content ?? ""}
          />
        </CardContent>
      </Card>
    </motion.section>
  );
}
