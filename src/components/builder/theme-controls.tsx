"use client";

import { useCallback } from "react";

import { HexColorPicker } from "react-colorful";
import { Palette, Sparkles, Type } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import {
  blendHexColors,
  ensureReadableTextColor,
  gradientSwatches,
  hexToRgba,
  mixHexColors,
  normalizeHexColor,
} from "@/lib/theme-presets";
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

const controlCardClass =
  "gap-0 rounded-[24px] border-white/80 bg-white/78 py-0 shadow-[0_14px_36px_rgba(15,23,42,0.05)]";

const largeControlCardClass =
  "gap-0 rounded-[26px] border-white/75 bg-white/78 py-0 shadow-[0_14px_36px_rgba(15,23,42,0.05)]";

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
    <Card className={controlCardClass}>
      <CardContent className="p-4">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <Label className="text-slate-900">{label}</Label>
            <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
          </div>
          <Badge
            className="h-auto rounded-full border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
            variant="outline"
          >
            {formatValue(value)}
          </Badge>
        </div>
        <Slider
          className="[&_[data-slot=slider-range]]:bg-slate-900 [&_[data-slot=slider-thumb]]:border-slate-900/12 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:ring-slate-300/70 [&_[data-slot=slider-thumb]]:shadow-[0_2px_10px_rgba(15,23,42,0.18)] [&_[data-slot=slider-track]]:bg-slate-200/90"
          max={max}
          min={min}
          onValueChange={(values) =>
            onChange(Array.isArray(values) ? (values[0] ?? value) : values)
          }
          step={step}
          value={[value]}
        />
      </CardContent>
    </Card>
  );
}

function ColorField({ label, hint, value, onChange }: ColorFieldProps) {
  const normalizedValue = normalizeHexColor(value) ?? "#000000";

  const handleChange = useCallback(
    (nextValue: string) => {
      const normalized = normalizeHexColor(nextValue);

      if (!normalized || normalized === normalizedValue) {
        return;
      }

      onChange(normalized);
    },
    [normalizedValue, onChange],
  );

  const handleInputChange = useCallback(
    (nextValue: string) => {
      const normalized = normalizeHexColor(nextValue);

      if (!normalized || normalized === normalizedValue) {
        return;
      }

      onChange(normalized);
    },
    [normalizedValue, onChange],
  );

  const handleInputBlur = useCallback(
    (nextValue: string) => normalizeHexColor(nextValue) ?? normalizedValue,
    [normalizedValue],
  );

  return (
    <Card className={cn(controlCardClass, "theme-picker")}>
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <Label className="text-slate-900">{label}</Label>
            <p className="mt-1 text-sm leading-6 text-slate-500">{hint}</p>
          </div>
          <div
            className="size-9 shrink-0 rounded-full border border-white/80 shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
            style={{ backgroundColor: normalizedValue }}
          />
        </div>
        <HexColorPicker color={normalizedValue} onChange={handleChange} />
        <Input
          className="mt-3 h-11 rounded-2xl border-slate-200/80 bg-slate-50/70 px-3 text-sm font-medium text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-200/70"
          defaultValue={normalizedValue}
          inputMode="text"
          key={normalizedValue}
          onBlur={(event) => {
            const nextValue = handleInputBlur(event.target.value);
            event.target.value = nextValue;
            handleInputChange(nextValue);
          }}
          onChange={(event) => handleInputChange(event.target.value)}
          placeholder="#000000"
          spellCheck={false}
        />
      </CardContent>
    </Card>
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
  const washBaseColor = config.useGradient
    ? mixHexColors(config.gradientStart, config.gradientEnd, 0.5)
    : config.backgroundColor;
  const washPanelColor = blendHexColors(
    config.surfaceColor,
    washBaseColor,
    config.useGradient ? 0.78 : 0.9,
  );
  const washPanelTextColor = ensureReadableTextColor(
    config.textColor,
    washPanelColor,
    5.8,
  );
  const washPanelMutedColor = ensureReadableTextColor(
    config.mutedTextColor,
    washPanelColor,
    5,
  );
  const washPanelBorderColor = hexToRgba(washPanelTextColor, 0.12);

  return (
    <motion.aside
      animate={{ opacity: 1, y: 0 }}
      className="lg:sticky lg:top-6"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Card className="h-fit gap-0 rounded-[34px] border-white/70 bg-[#f9f7f2]/88 py-0 shadow-[0_22px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Theme controls
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-geist)] text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                Dial in the system
              </h3>
            </div>
            <Badge
              className="h-auto rounded-full border-white/70 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
              variant="outline"
            >
              {activePresetId
                ? presets.find((preset) => preset.id === activePresetId)?.name
                : "Custom Mix"}
            </Badge>
          </div>

          <div className="mb-6">
            <p className="mb-3 text-sm font-medium text-slate-700">Quick presets</p>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => {
                const isActive = activePresetId === preset.id;

                return (
                  <Button
                    className={cn(
                      "h-auto w-full flex-col items-start justify-start gap-0 rounded-[18px] border px-3 py-3 text-left whitespace-normal transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:ring-slate-300/60",
                      isActive
                        ? "border-slate-900 bg-slate-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(15,23,42,0.14)] hover:border-slate-900 hover:bg-slate-900 hover:text-white focus-visible:border-slate-900 focus-visible:bg-slate-900 focus-visible:text-white active:bg-slate-900 active:text-white aria-expanded:bg-slate-900 aria-expanded:text-white"
                        : "border-white/75 bg-white/80 text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.84),0_1px_2px_rgba(15,23,42,0.04)] hover:border-white hover:bg-white hover:text-slate-800 focus-visible:border-white focus-visible:bg-white focus-visible:text-slate-800 active:bg-white active:text-slate-800 aria-expanded:bg-white aria-expanded:text-slate-800",
                    )}
                    key={preset.id}
                    onClick={() => onApplyPreset(preset.id)}
                    type="button"
                    variant="ghost"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: preset.config.accentColor }}
                      />
                      <Badge
                        className={cn(
                          "h-auto rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] shadow-none",
                          isActive
                            ? "border-white/18 bg-white/10 text-white"
                            : "border-transparent bg-slate-100 text-slate-600",
                        )}
                        variant="outline"
                      >
                        {preset.eyebrow}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold">{preset.name}</p>
                  </Button>
                );
              })}
            </div>
          </div>

          <Tabs className="w-full" defaultValue="foundation">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="foundation">Foundation</TabsTrigger>
              <TabsTrigger value="palette">Palette</TabsTrigger>
              <TabsTrigger value="atmosphere">Atmosphere</TabsTrigger>
            </TabsList>

            <TabsContent value="foundation">
              <div className="space-y-4 pt-5">
                <Card className={largeControlCardClass}>
                  <CardContent className="p-4">
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
                      <SelectTrigger className="w-full border-slate-200 bg-white text-slate-900 shadow-none focus-visible:ring-slate-300">
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
                  </CardContent>
                </Card>

                <SliderField
                  description="How soft cards, panels, and forms feel."
                  formatValue={(value) => `${value}px`}
                  label="Border radius"
                  max={36}
                  min={8}
                  onChange={(value) => onUpdate("radius", value)}
                  value={config.radius}
                />
                <SliderField
                  description="Separate CTA curvature for pills or sharper actions."
                  formatValue={(value) => (value > 120 ? "pill" : `${value}px`)}
                  label="Button roundness"
                  max={999}
                  min={14}
                  onChange={(value) => onUpdate("buttonRoundness", value)}
                  value={config.buttonRoundness}
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
                  formatValue={(value) => `${value}px`}
                  label="Spacing density"
                  max={30}
                  min={12}
                  onChange={(value) => onUpdate("spacing", value)}
                  value={config.spacing}
                />
                <SliderField
                  description="Scale all type without losing hierarchy."
                  formatValue={(value) => `${value}%`}
                  label="Font scale"
                  max={125}
                  min={90}
                  onChange={(value) => onUpdate("fontScale", value)}
                  value={config.fontScale}
                />
                <SliderField
                  description="Control how wide the preview content should sit."
                  formatValue={(value) => `${value}%`}
                  label="Container width"
                  max={100}
                  min={70}
                  onChange={(value) => onUpdate("containerWidth", value)}
                  value={config.containerWidth}
                />
              </div>
            </TabsContent>

            <TabsContent value="palette">
              <div className="grid gap-4 pt-5">
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
              <div className="space-y-4 pt-5">
                <Card className={largeControlCardClass}>
                  <CardContent className="p-4">
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
                        className="data-checked:bg-slate-900 data-unchecked:bg-slate-200/80"
                        onCheckedChange={(checked) =>
                          onUpdate("useGradient", checked)
                        }
                      />
                    </div>

                    <Card
                      className="mt-4 gap-0 rounded-[22px] border-white/75 py-0"
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
                      <CardContent className="p-4">
                        <div
                          className="rounded-[16px] border p-4 backdrop-blur-sm"
                          style={{
                            backgroundColor: hexToRgba(
                              washPanelColor,
                              config.useGradient ? 0.9 : 0.96,
                            ),
                            borderColor: washPanelBorderColor,
                            boxShadow: `inset 0 1px 0 ${hexToRgba(
                              "#ffffff",
                              0.3,
                            )}`,
                          }}
                        >
                          <p
                            className="text-sm font-semibold"
                            style={{ color: washPanelTextColor }}
                          >
                            Preview wash
                          </p>
                          <p
                            className="mt-1 text-sm leading-6"
                            style={{ color: washPanelMutedColor }}
                          >
                            Makes the canvas feel more cinematic.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

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

                <Card className={largeControlCardClass}>
                  <CardContent className="p-4">
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
                      <SelectTrigger className="w-full border-slate-200 bg-white text-slate-900 shadow-none focus-visible:ring-slate-300">
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

                    <Separator className="my-4 bg-slate-200/80" />

                    <div>
                      <p className="mb-3 text-sm font-medium text-slate-700">
                        Gradient swatches
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {gradientSwatches.map((swatch) => {
                          const swatchBaseColor = mixHexColors(
                            swatch.start,
                            swatch.end,
                            0.5,
                          );
                          const swatchLabelColor = ensureReadableTextColor(
                            "#f8fafc",
                            swatchBaseColor,
                            5.2,
                          );

                          return (
                            <Button
                              className="h-auto min-h-24 items-start justify-start rounded-[18px] border border-white/75 p-3 text-left text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_1px_2px_rgba(15,23,42,0.08)] transition hover:bg-transparent hover:brightness-[1.02]"
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
                              variant="ghost"
                            >
                              <span
                                className="rounded-full border px-2.5 py-1 text-sm font-semibold backdrop-blur-sm"
                                style={{
                                  color: swatchLabelColor,
                                  borderColor: hexToRgba(swatchLabelColor, 0.18),
                                  backgroundColor: hexToRgba(swatchLabelColor, 0.12),
                                }}
                              >
                                {swatch.name}
                              </span>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.aside>
  );
}
