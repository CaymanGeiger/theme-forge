"use client";

import { HexColorInput, HexColorPicker } from "react-colorful";
import { Palette, Sparkles, Type } from "lucide-react";
import { motion } from "motion/react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gradientSwatches, hexToRgba } from "@/lib/theme-presets";
import {
  fontOptions,
  gradientDirections,
  type ThemeConfig,
  type ThemePreset,
} from "@/lib/theme-types";
import { cn } from "@/lib/utils";

type ThemeControlsProps = {
  config: ThemeConfig;
  presets: ThemePreset[];
  activePresetId: string | null;
  onUpdate: <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => void;
  onPatch: (changes: Partial<ThemeConfig>) => void;
  onApplyPreset: (presetId: string) => void;
};

type SliderFieldProps = {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
};

type ColorFieldProps = {
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
};

function SliderField({
  label,
  description,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue = (current) => `${current}`,
}: SliderFieldProps) {
  return (
    <div className="rounded-[24px] border border-white/80 bg-white/78 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <Label>{label}</Label>
          <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
        </div>
        <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          {formatValue(value)}
        </span>
      </div>
      <Slider
        max={max}
        min={min}
        onValueChange={(values) => onChange(values[0] ?? value)}
        step={step}
        value={[value]}
      />
    </div>
  );
}

function ColorField({ label, hint, value, onChange }: ColorFieldProps) {
  return (
    <div className="theme-picker rounded-[24px] border border-white/80 bg-white/78 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <Label>{label}</Label>
          <p className="mt-1 text-sm leading-6 text-slate-500">{hint}</p>
        </div>
        <div
          className="size-9 shrink-0 rounded-full border border-white/80 shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
          style={{ backgroundColor: value }}
        />
      </div>
      <HexColorPicker color={value} onChange={onChange} />
      <HexColorInput
        className="mt-3 h-11 w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 px-3 text-sm font-medium text-slate-900 outline-none transition focus:ring-4 focus:ring-slate-200/70"
        color={value}
        onChange={onChange}
        prefixed
      />
    </div>
  );
}

export function ThemeControls({
  config,
  presets,
  activePresetId,
  onUpdate,
  onPatch,
  onApplyPreset,
}: ThemeControlsProps) {
  return (
    <motion.aside
      animate={{ opacity: 1, y: 0 }}
      className="h-fit rounded-[34px] border border-white/70 bg-[#f9f7f2]/88 p-4 shadow-[0_22px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:sticky lg:top-6"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Theme controls
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-geist)] text-2xl font-semibold tracking-[-0.04em] text-slate-950">
            Dial in the system
          </h3>
        </div>
        <div className="rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
          {activePresetId
            ? presets.find((preset) => preset.id === activePresetId)?.name
            : "Custom Mix"}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-slate-700">Quick presets</p>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset) => {
            const isActive = activePresetId === preset.id;

            return (
              <button
                className={cn(
                  "rounded-[18px] border px-3 py-3 text-left transition hover:-translate-y-0.5",
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white shadow-[0_18px_36px_rgba(15,23,42,0.2)]"
                    : "border-white/75 bg-white/80 text-slate-800 shadow-[0_12px_28px_rgba(15,23,42,0.05)] hover:bg-white",
                )}
                key={preset.id}
                onClick={() => onApplyPreset(preset.id)}
                type="button"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: preset.config.accentColor }}
                  />
                  <span className="text-xs font-medium uppercase tracking-[0.16em] opacity-70">
                    {preset.eyebrow}
                  </span>
                </div>
                <p className="text-sm font-semibold">{preset.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      <Tabs className="w-full" defaultValue="foundation">
        <TabsList className="grid h-auto w-full grid-cols-3">
          <TabsTrigger value="foundation">Foundation</TabsTrigger>
          <TabsTrigger value="palette">Palette</TabsTrigger>
          <TabsTrigger value="atmosphere">Atmosphere</TabsTrigger>
        </TabsList>

        <TabsContent value="foundation">
          <div className="space-y-4">
            <div className="rounded-[26px] border border-white/75 bg-white/78 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-800">
                <Type className="size-4" />
                Font family
              </div>
              <Select
                onValueChange={(value) =>
                  onUpdate("fontFamily", value as ThemeConfig["fontFamily"])
                }
                value={config.fontFamily}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a font" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {
                  fontOptions.find((font) => font.value === config.fontFamily)
                    ?.description
                }
              </p>
            </div>

            <SliderField
              description="How soft cards, panels, and forms feel."
              label="Border radius"
              max={36}
              min={8}
              onChange={(value) => onUpdate("radius", value)}
              value={config.radius}
              formatValue={(value) => `${value}px`}
            />
            <SliderField
              description="Separate CTA curvature for pills or sharper actions."
              label="Button roundness"
              max={999}
              min={14}
              onChange={(value) => onUpdate("buttonRoundness", value)}
              value={config.buttonRoundness}
              formatValue={(value) => (value > 120 ? "pill" : `${value}px`)}
            />
            <SliderField
              description="Tweak depth and how elevated the UI feels."
              label="Shadow intensity"
              max={100}
              min={0}
              onChange={(value) => onUpdate("shadow", value)}
              value={config.shadow}
            />
            <SliderField
              description="Change how compact or breathable every layout becomes."
              label="Spacing density"
              max={30}
              min={12}
              onChange={(value) => onUpdate("spacing", value)}
              value={config.spacing}
              formatValue={(value) => `${value}px`}
            />
            <SliderField
              description="Scale all type without losing hierarchy."
              label="Font scale"
              max={125}
              min={90}
              onChange={(value) => onUpdate("fontScale", value)}
              value={config.fontScale}
              formatValue={(value) => `${value}%`}
            />
            <SliderField
              description="Control how wide the preview content should sit."
              label="Container width"
              max={100}
              min={70}
              onChange={(value) => onUpdate("containerWidth", value)}
              value={config.containerWidth}
              formatValue={(value) => `${value}%`}
            />
          </div>
        </TabsContent>

        <TabsContent value="palette">
          <div className="grid gap-4">
            <ColorField
              hint="High-contrast type for headlines and body copy."
              label="Primary text"
              onChange={(value) => onUpdate("textColor", value)}
              value={config.textColor}
            />
            <ColorField
              hint="Secondary labels, captions, and support copy."
              label="Muted text"
              onChange={(value) => onUpdate("mutedTextColor", value)}
              value={config.mutedTextColor}
            />
            <ColorField
              hint="The page canvas behind every layout."
              label="Background"
              onChange={(value) => onUpdate("backgroundColor", value)}
              value={config.backgroundColor}
            />
            <ColorField
              hint="Cards, nav bars, forms, and inner surfaces."
              label="Surface"
              onChange={(value) => onUpdate("surfaceColor", value)}
              value={config.surfaceColor}
            />
            <ColorField
              hint="Highlights, badges, charts, and standout moments."
              label="Accent"
              onChange={(value) => onUpdate("accentColor", value)}
              value={config.accentColor}
            />
            <ColorField
              hint="Primary CTA fill for actions that matter."
              label="Button"
              onChange={(value) => onUpdate("buttonColor", value)}
              value={config.buttonColor}
            />
          </div>
        </TabsContent>

        <TabsContent value="atmosphere">
          <div className="space-y-4">
            <div className="rounded-[26px] border border-white/75 bg-white/78 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    <Sparkles className="size-4" />
                    Gradient mode
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Turn on a stronger atmosphere for hero areas and ambient
                    backgrounds.
                  </p>
                </div>
                <Switch
                  checked={config.useGradient}
                  onCheckedChange={(checked) => onUpdate("useGradient", checked)}
                />
              </div>

              <div
                className="mt-4 rounded-[22px] border border-white/75 p-4"
                style={{
                  background: config.useGradient
                    ? `linear-gradient(${config.gradientDirection}, ${config.gradientStart}, ${config.gradientEnd})`
                    : config.backgroundColor,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5), 0 12px 30px ${hexToRgba(
                    config.textColor,
                    0.08,
                  )}`,
                }}
              >
                <p className="text-sm font-semibold text-white/90 mix-blend-plus-lighter">
                  Preview wash
                </p>
                <p className="mt-1 text-sm text-white/70 mix-blend-plus-lighter">
                  Makes the canvas feel more cinematic.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <ColorField
                hint="The first stop in your gradient."
                label="Gradient start"
                onChange={(value) => onUpdate("gradientStart", value)}
                value={config.gradientStart}
              />
              <ColorField
                hint="The second stop in your gradient."
                label="Gradient end"
                onChange={(value) => onUpdate("gradientEnd", value)}
                value={config.gradientEnd}
              />
            </div>

            <div className="rounded-[26px] border border-white/75 bg-white/78 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-800">
                <Palette className="size-4" />
                Gradient direction
              </div>
              <Select
                onValueChange={(value) =>
                  onUpdate(
                    "gradientDirection",
                    value as ThemeConfig["gradientDirection"],
                  )
                }
                value={config.gradientDirection}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a direction" />
                </SelectTrigger>
                <SelectContent>
                  {gradientDirections.map((direction) => (
                    <SelectItem key={direction.value} value={direction.value}>
                      {direction.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Separator className="my-4" />

              <div>
                <p className="mb-3 text-sm font-medium text-slate-700">
                  Gradient swatches
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {gradientSwatches.map((swatch) => (
                    <button
                      className="rounded-[18px] border border-white/75 p-3 text-left shadow-[0_14px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5"
                      key={swatch.name}
                      onClick={() =>
                        onPatch({
                          useGradient: true,
                          gradientStart: swatch.start,
                          gradientEnd: swatch.end,
                          gradientDirection: swatch.direction,
                        })
                      }
                      style={{
                        background: `linear-gradient(${swatch.direction}, ${swatch.start}, ${swatch.end})`,
                      }}
                      type="button"
                    >
                      <span className="text-sm font-semibold text-white/92 drop-shadow-sm">
                        {swatch.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.aside>
  );
}
