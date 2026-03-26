"use client";

import { useCallback, useState, type ReactNode } from "react";

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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  themedTabsListClass,
  themedTabsTriggerClass,
} from "@/lib/theme-tab-styles";
import { cn } from "@/lib/utils";

type ThemeControlsProps = {
  config: ThemeConfig;
  presets: ThemePreset[];
  activePresetId: string | null;
  onUpdate: <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => void;
  onPatch: (changes: Partial<ThemeConfig>) => void;
  onApplyPreset: (presetId: string) => void;
  sticky?: boolean;
  panelClassName?: string;
  contentClassName?: string;
  animateOnMount?: boolean;
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
  scope?: "basic" | "advanced";
};

type ColorFieldProps = {
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  scope?: "basic" | "advanced";
};

type ScopeBadgeProps = {
  scope: "basic" | "advanced";
  label?: string;
};

type ControlCategoryProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const controlCardClass =
  "gap-0 rounded-[24px] border-white/80 bg-white/78 py-0 shadow-[0_14px_36px_rgba(15,23,42,0.05)]";

const largeControlCardClass =
  "gap-0 rounded-[26px] border-white/75 bg-white/78 py-0 shadow-[0_14px_36px_rgba(15,23,42,0.05)]";

const builderTabs = ["foundation", "palette", "atmosphere"] as const;
type BuilderTab = (typeof builderTabs)[number];

function ScopeBadge({ scope, label }: ScopeBadgeProps) {
  return (
    <Badge
      className={cn(
        "h-auto rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] shadow-none",
        scope === "basic"
          ? "border-emerald-200/90 bg-emerald-50 text-emerald-700"
          : "border-amber-200/90 bg-amber-50 text-amber-700",
      )}
      variant="outline"
    >
      {label ?? (scope === "basic" ? "Basic" : "Advanced")}
    </Badge>
  );
}

function ModeSummaryCard({
  scope,
  title,
  description,
}: {
  scope: "basic" | "advanced";
  title: string;
  description: string;
}) {
  return (
    <Card className={controlCardClass}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-950">{title}</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
          </div>
          <ScopeBadge scope={scope} />
        </div>
      </CardContent>
    </Card>
  );
}

function ControlCategory({
  title,
  description,
  children,
}: ControlCategoryProps) {
  return (
    <section className="space-y-3">
      <div className="px-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {title}
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function SliderField({
  label,
  description,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue = (current) => `${current}`,
  scope,
}: SliderFieldProps) {
  return (
    <Card className={controlCardClass}>
      <CardContent className="p-4">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Label className="text-slate-900">{label}</Label>
              {scope ? <ScopeBadge label={scope} scope={scope} /> : null}
            </div>
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

function ColorField({ label, hint, value, onChange, scope }: ColorFieldProps) {
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
            <div className="flex items-center gap-2">
              <Label className="text-slate-900">{label}</Label>
              {scope ? <ScopeBadge label={scope} scope={scope} /> : null}
            </div>
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
  sticky = true,
  panelClassName,
  contentClassName,
  animateOnMount = true,
}: ThemeControlsProps) {
  const [controlMode, setControlMode] = useState<"basic" | "advanced">("basic");
  const [activeTab, setActiveTab] = useState<BuilderTab>("foundation");
  const [tabDirection, setTabDirection] = useState<1 | -1>(1);
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

  const handleTabChange = useCallback((nextValue: string) => {
    if (!builderTabs.includes(nextValue as BuilderTab)) {
      return;
    }

    setActiveTab((currentTab) => {
      if (currentTab === nextValue) {
        return currentTab;
      }

      const currentIndex = builderTabs.indexOf(currentTab);
      const nextIndex = builderTabs.indexOf(nextValue as BuilderTab);
      setTabDirection(nextIndex > currentIndex ? 1 : -1);

      return nextValue as BuilderTab;
    });
  }, []);

  const renderBuilderPanel = () => {
    switch (activeTab) {
      case "foundation":
        return (
          <div className="space-y-5 pt-5">
            <ModeSummaryCard
              description={
                controlMode === "basic"
                  ? "Use the core system tokens first. These are the fastest controls for locking the overall feel."
                  : "Advanced mode unlocks deeper refinement for depth, CTA curvature, toolbar geometry, tile sizing, and content measure."
              }
              scope={controlMode}
              title={
                controlMode === "basic"
                  ? "Basic foundation tokens"
                  : "Advanced foundation refinements"
              }
            />
            <ControlCategory
              description="Set the type system first so the rest of the preview inherits the right voice and scale."
              title="Typography"
            >
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
                description="Scale all type without losing hierarchy."
                formatValue={(value) => `${value}%`}
                label="Font scale"
                max={125}
                min={90}
                onChange={(value) => onUpdate("fontScale", value)}
                value={config.fontScale}
              />
            </ControlCategory>

            <ControlCategory
              description="Control how roomy the layout feels, how modules separate, and how wide content sits."
              title="Containers"
            >
              <SliderField
                description="Change how compact or breathable every layout becomes."
                formatValue={(value) => `${value}px`}
                label="Spacing density"
                max={30}
                min={12}
                onChange={(value) => onUpdate("spacing", value)}
                value={config.spacing}
              />
              {controlMode === "advanced" ? (
                <>
                  <SliderField
                    description="Change how much breathing room major panels keep inside."
                    formatValue={(value) => `${value}px`}
                    label="Panel padding"
                    max={30}
                    min={12}
                    onChange={(value) => onUpdate("panelPadding", value)}
                    scope="advanced"
                    value={config.panelPadding}
                  />
                  <SliderField
                    description="Control the inner padding of cards, stats, and modules."
                    formatValue={(value) => `${value}px`}
                    label="Card padding"
                    max={24}
                    min={10}
                    onChange={(value) => onUpdate("cardPadding", value)}
                    scope="advanced"
                    value={config.cardPadding}
                  />
                  <SliderField
                    description="Control the gap between larger modules, cards, and layout groups."
                    formatValue={(value) => `${value}px`}
                    label="Module gap"
                    max={24}
                    min={8}
                    onChange={(value) => onUpdate("moduleGap", value)}
                    scope="advanced"
                    value={config.moduleGap}
                  />
                  <SliderField
                    description="Set the max measure for hero-style text blocks so copy feels tighter or more expansive."
                    formatValue={(value) => `${value}px`}
                    label="Hero text width"
                    max={820}
                    min={420}
                    onChange={(value) => onUpdate("heroContentMaxWidth", value)}
                    scope="advanced"
                    value={config.heroContentMaxWidth}
                  />
                  <SliderField
                    description="Control how wide the preview content should sit."
                    formatValue={(value) => `${value}%`}
                    label="Container width"
                    max={100}
                    min={70}
                    onChange={(value) => onUpdate("containerWidth", value)}
                    scope="advanced"
                    value={config.containerWidth}
                  />
                </>
              ) : null}
            </ControlCategory>

            <ControlCategory
              description="Shape the system silhouette and how much elevation it carries."
              title="Borders & Depth"
            >
              <SliderField
                description="How soft cards, panels, and forms feel."
                formatValue={(value) => `${value}px`}
                label="Border radius"
                max={36}
                min={8}
                onChange={(value) => onUpdate("radius", value)}
                value={config.radius}
              />
              {controlMode === "advanced" ? (
                <SliderField
                  description="Tweak depth and how elevated the UI feels."
                  label="Shadow intensity"
                  max={100}
                  min={0}
                  onChange={(value) => onUpdate("shadow", value)}
                  scope="advanced"
                  value={config.shadow}
                />
              ) : null}
            </ControlCategory>

            {controlMode === "advanced" ? (
              <>
                <ControlCategory
                  description="Separate CTA shape and sizing from the rest of the system."
                  title="Buttons"
                >
                  <SliderField
                    description="Separate CTA curvature for pills or sharper actions."
                    formatValue={(value) => (value > 120 ? "pill" : `${value}px`)}
                    label="Button roundness"
                    max={999}
                    min={14}
                    onChange={(value) => onUpdate("buttonRoundness", value)}
                    scope="advanced"
                    value={config.buttonRoundness}
                  />
                  <SliderField
                    description="Adjust how tall calls to action feel across the system."
                    formatValue={(value) => `${value}px`}
                    label="Button height"
                    max={58}
                    min={38}
                    onChange={(value) => onUpdate("buttonHeight", value)}
                    scope="advanced"
                    value={config.buttonHeight}
                  />
                  <SliderField
                    description="Control the horizontal weight and width of CTAs."
                    formatValue={(value) => `${value}px`}
                    label="Button padding"
                    max={34}
                    min={14}
                    onChange={(value) => onUpdate("buttonPaddingX", value)}
                    scope="advanced"
                    value={config.buttonPaddingX}
                  />
                </ControlCategory>

                <ControlCategory
                  description="Tune field shape and density separately from cards and buttons."
                  title="Inputs"
                >
                  <SliderField
                    description="Decouple form fields from the global card radius."
                    formatValue={(value) => `${value}px`}
                    label="Input roundness"
                    max={32}
                    min={10}
                    onChange={(value) => onUpdate("inputRoundness", value)}
                    scope="advanced"
                    value={config.inputRoundness}
                  />
                  <SliderField
                    description="Tune the field height separately from button sizing."
                    formatValue={(value) => `${value}px`}
                    label="Input height"
                    max={62}
                    min={42}
                    onChange={(value) => onUpdate("inputHeight", value)}
                    scope="advanced"
                    value={config.inputHeight}
                  />
                  <SliderField
                    description="Adjust the horizontal breathing room inside text fields."
                    formatValue={(value) => `${value}px`}
                    label="Input padding"
                    max={28}
                    min={12}
                    onChange={(value) => onUpdate("inputPaddingX", value)}
                    scope="advanced"
                    value={config.inputPaddingX}
                  />
                </ControlCategory>

                <ControlCategory
                  description="Refine the top rail, chip styling, and summary-card proportions."
                  title="Navigation & Tiles"
                >
                  <SliderField
                    description="Adjust the height of nav bars and top control rails."
                    formatValue={(value) => `${value}px`}
                    label="Toolbar height"
                    max={70}
                    min={46}
                    onChange={(value) => onUpdate("toolbarHeight", value)}
                    scope="advanced"
                    value={config.toolbarHeight}
                  />
                  <SliderField
                    description="Control how much inset the top nav and header rails keep on each side."
                    formatValue={(value) => `${value}px`}
                    label="Toolbar inset"
                    max={40}
                    min={16}
                    onChange={(value) => onUpdate("toolbarPaddingX", value)}
                    scope="advanced"
                    value={config.toolbarPaddingX}
                  />
                  <SliderField
                    description="Shape the chips, status labels, and preview pills separately from buttons."
                    formatValue={(value) => (value > 120 ? "pill" : `${value}px`)}
                    label="Badge roundness"
                    max={999}
                    min={10}
                    onChange={(value) => onUpdate("badgeRoundness", value)}
                    scope="advanced"
                    value={config.badgeRoundness}
                  />
                  <SliderField
                    description="Control the minimum height of stats, metrics, and summary tiles."
                    formatValue={(value) => `${value}px`}
                    label="Tile height"
                    max={168}
                    min={96}
                    onChange={(value) => onUpdate("tileMinHeight", value)}
                    scope="advanced"
                    value={config.tileMinHeight}
                  />
                </ControlCategory>
              </>
            ) : null}
          </div>
        );
      case "palette":
        return (
          <div className="space-y-5 pt-5">
            <ModeSummaryCard
              description={
                controlMode === "basic"
                  ? "Basic color controls handle the main contrast and brand accents without extra support channels."
                  : "Advanced color mode adds support text tuning so captions and utility copy can be controlled separately."
              }
              scope={controlMode}
              title={
                controlMode === "basic"
                  ? "Basic palette controls"
                  : "Advanced palette controls"
              }
            />
            <ControlCategory
              description="Handle the main copy colors first so readability stays stable across presets."
              title="Text"
            >
              <ColorField
                hint="High-contrast type for headlines and body copy."
                label="Primary text"
                onChange={(value) => onUpdate("textColor", value)}
                value={config.textColor}
              />
              {controlMode === "advanced" ? (
                <ColorField
                  hint="Secondary labels, captions, and support copy."
                  label="Muted text"
                  onChange={(value) => onUpdate("mutedTextColor", value)}
                  scope="advanced"
                  value={config.mutedTextColor}
                />
              ) : null}
            </ControlCategory>

            <ControlCategory
              description="Set the canvas and surface layers that everything else sits on."
              title="Surfaces"
            >
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
            </ControlCategory>

            <ControlCategory
              description="Define the brand moments and the main CTA color separately from the base surfaces."
              title="Accent & Actions"
            >
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
            </ControlCategory>
            {controlMode === "advanced" ? (
              <ControlCategory
                description="Refine how distinct the layers feel and how visible dividers become."
                title="Contrast & Borders"
              >
                <SliderField
                  description="Increase or soften the separation between canvas and surfaces."
                  label="Surface contrast"
                  max={100}
                  min={30}
                  onChange={(value) => onUpdate("surfaceContrast", value)}
                  scope="advanced"
                  value={config.surfaceContrast}
                />
                <SliderField
                  description="Strengthen outlines and internal dividers across cards and inputs."
                  label="Border strength"
                  max={100}
                  min={0}
                  onChange={(value) => onUpdate("borderStrength", value)}
                  scope="advanced"
                  value={config.borderStrength}
                />
              </ControlCategory>
            ) : null}
          </div>
        );
      case "atmosphere":
        return (
          <div className="space-y-5 pt-5">
            <ModeSummaryCard
              description={
                controlMode === "basic"
                  ? "Basic atmosphere keeps the canvas simple: turn gradients on and try swatches."
                  : "Advanced atmosphere opens up manual gradient stops and directional tuning."
              }
              scope={controlMode}
              title={
                controlMode === "basic"
                  ? "Basic atmosphere controls"
                  : "Advanced atmosphere controls"
              }
            />
            <ControlCategory
              description="Choose whether the system stays flat or leans into a stronger ambient background treatment."
              title="Background Mode"
            >
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
                      onCheckedChange={(checked) => onUpdate("useGradient", checked)}
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
                          boxShadow: `inset 0 1px 0 ${hexToRgba("#ffffff", 0.3)}`,
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
            </ControlCategory>

            {controlMode === "advanced" ? (
              <ControlCategory
                description="Adjust how much atmosphere tinted highlights add to the preview."
                title="Atmosphere Tuning"
              >
                <SliderField
                  description="Control how strongly accent-tinted cards and highlights pull forward."
                  label="Accent tint strength"
                  max={100}
                  min={0}
                  onChange={(value) => onUpdate("accentTintStrength", value)}
                  scope="advanced"
                  value={config.accentTintStrength}
                />
              </ControlCategory>
            ) : null}

            {controlMode === "advanced" ? (
              <ControlCategory
                description="Manually tune the exact colors feeding the gradient background."
                title="Gradient Colors"
              >
                <ColorField
                  hint="The first stop in your gradient."
                  label="Gradient start"
                  onChange={(value) => onUpdate("gradientStart", value)}
                  scope="advanced"
                  value={config.gradientStart}
                />
                <ColorField
                  hint="The second stop in your gradient."
                  label="Gradient end"
                  onChange={(value) => onUpdate("gradientEnd", value)}
                  scope="advanced"
                  value={config.gradientEnd}
                />
              </ControlCategory>
            ) : null}

            <ControlCategory
              description="Pick a direction and try swatches to move through atmosphere quickly."
              title="Direction & Swatches"
            >
              <Card className={largeControlCardClass}>
                <CardContent className="p-4">
                  {controlMode === "advanced" ? (
                    <>
                      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-800">
                        <Palette className="size-4" />
                        Gradient direction
                        <ScopeBadge label="Advanced" scope="advanced" />
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
                    </>
                  ) : null}

                  <div>
                    <p className="mb-3 text-sm font-medium text-slate-700">
                      {controlMode === "advanced"
                        ? "Gradient swatches"
                        : "Quick atmosphere swatches"}
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
            </ControlCategory>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.aside
      animate={{ opacity: 1, y: 0 }}
      className={sticky ? "lg:sticky lg:top-6" : undefined}
      initial={animateOnMount ? { opacity: 0, y: 18 } : false}
      transition={animateOnMount ? { duration: 0.45, ease: "easeOut" } : { duration: 0 }}
    >
      <Card
        className={cn(
          "h-fit gap-0 rounded-[34px] border-white/70 bg-[#f9f7f2]/88 py-0 shadow-[0_22px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl",
          panelClassName,
        )}
      >
        <CardContent className={cn("p-4", contentClassName)}>
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
            <p className="mb-3 text-sm font-medium text-slate-700">Control depth</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  value: "basic" as const,
                  label: "Basic mode",
                },
                {
                  value: "advanced" as const,
                  label: "Advanced mode",
                },
              ].map((mode) => {
                const isActive = controlMode === mode.value;

                return (
                  <Button
                    className={cn(
                      "h-11 rounded-2xl border text-sm font-medium shadow-none",
                      isActive
                        ? "border-slate-900 bg-slate-900 text-white hover:border-slate-900 hover:bg-slate-900 hover:text-white focus-visible:border-slate-900 focus-visible:bg-slate-900 focus-visible:text-white active:bg-slate-900 active:text-white aria-expanded:bg-slate-900 aria-expanded:text-white"
                        : "border-white/75 bg-white/82 text-slate-700 hover:border-white hover:bg-white hover:text-slate-700 focus-visible:border-white focus-visible:bg-white focus-visible:text-slate-700 active:bg-white active:text-slate-700 aria-expanded:bg-white aria-expanded:text-slate-700",
                    )}
                    key={mode.value}
                    onClick={() => setControlMode(mode.value)}
                    type="button"
                    variant="ghost"
                  >
                    {mode.label}
                  </Button>
                );
              })}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {controlMode === "basic"
                ? "Basic mode keeps presets visible and focuses on the essential tokens that change the system fastest."
                : "Advanced mode hides presets and unlocks manual refinement for depth, support colors, width, and gradients."}
            </p>
          </div>

          {controlMode === "basic" ? (
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-700">Quick presets</p>
                <ScopeBadge label="Basic only" scope="basic" />
              </div>
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
          ) : (
            <Card className={cn(controlCardClass, "mb-6")}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-950">
                      Advanced mode is manual
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Quick presets are hidden here so you can refine the theme
                      token by token instead of jumping between full directions.
                    </p>
                  </div>
                  <ScopeBadge label="Advanced only" scope="advanced" />
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs className="w-full" onValueChange={handleTabChange} value={activeTab}>
            <TabsList className={themedTabsListClass}>
              <TabsTrigger
                className={themedTabsTriggerClass}
                id="theme-controls-tab-foundation"
                value="foundation"
              >
                Foundation
              </TabsTrigger>
              <TabsTrigger
                className={themedTabsTriggerClass}
                id="theme-controls-tab-palette"
                value="palette"
              >
                Palette
              </TabsTrigger>
              <TabsTrigger
                className={themedTabsTriggerClass}
                id="theme-controls-tab-atmosphere"
                value="atmosphere"
              >
                Atmosphere
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div
            aria-labelledby={`theme-controls-tab-${activeTab}`}
            className="overflow-x-clip px-3 sm:px-4"
            role="tabpanel"
          >
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: tabDirection > 0 ? 24 : -24 }}
              key={activeTab}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderBuilderPanel()}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.aside>
  );
}
