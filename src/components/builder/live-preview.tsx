"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import {
  AlignJustify,
  Bell,
  CheckCircle2,
  ChevronRight,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  blendHexColors,
  buildShadow,
  ensureReadableTextColor,
  getReadableTextColor,
  getThemeFontFamily,
  hexToRgba,
  mixHexColors,
} from "@/lib/theme-presets";
import { type ThemeConfig } from "@/lib/theme-types";

type LivePreviewProps = {
  config: ThemeConfig;
  variant?: "full" | "compact";
};

export function LivePreview({
  config,
  variant = "full",
}: LivePreviewProps) {
  const previewFrameRef = useRef<HTMLDivElement | null>(null);
  const previewContentRef = useRef<HTMLDivElement | null>(null);
  const [frameWidth, setFrameWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [previewMode, setPreviewMode] = useState<"builder" | "prompt" | "presets">(
    "builder",
  );
  const [searchValue, setSearchValue] = useState("");
  const [openTask, setOpenTask] = useState<string | null>("Hero polish pass");

  useEffect(() => {
    const node = previewFrameRef.current;
    if (!node || typeof ResizeObserver === "undefined") {
      return;
    }

    const updateWidth = (nextWidth: number) => {
      const roundedWidth = Math.round(nextWidth);
      setFrameWidth((current) =>
        current === roundedWidth ? current : roundedWidth,
      );
    };

    updateWidth(node.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        updateWidth(entry.contentRect.width);
      }
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = previewContentRef.current;
    if (!node || typeof ResizeObserver === "undefined") {
      return;
    }

    const updateWidth = (nextWidth: number) => {
      const roundedWidth = Math.round(nextWidth);
      setContentWidth((current) =>
        current === roundedWidth ? current : roundedWidth,
      );
    };

    updateWidth(node.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        updateWidth(entry.contentRect.width);
      }
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const scale = config.fontScale / 100;
  const isCompact = variant === "compact";
  const spacing = config.spacing;
  const measuredFrameWidth =
    frameWidth || Math.round((config.containerWidth / 100) * 980);
  const effectiveContainerWidth =
    measuredFrameWidth < 480
      ? 100
      : measuredFrameWidth < 680
        ? Math.max(config.containerWidth, 96)
        : measuredFrameWidth < 920
          ? Math.max(config.containerWidth, 92)
          : config.containerWidth;
  const measuredContentWidth =
    contentWidth ||
    Math.round((effectiveContainerWidth / 100) * measuredFrameWidth);
  const microLayout = measuredContentWidth < 390;
  const compactLayout = measuredContentWidth < 560;
  const stackedLayout = measuredContentWidth < 960;
  const navCompact = measuredContentWidth < 760;
  const densePanelLayout = measuredContentWidth < 1120;
  const panelGap = Math.max(
    8,
    Math.round(
      config.moduleGap * (microLayout ? 0.82 : compactLayout ? 0.9 : 1),
    ),
  );
  const outerPanelPadding = Math.max(
    12,
    Math.round(
      config.panelPadding * (microLayout ? 0.78 : compactLayout ? 0.88 : 1),
    ),
  );
  const innerCardPadding = Math.max(
    12,
    Math.round(
      config.cardPadding * (microLayout ? 0.82 : compactLayout ? 0.9 : 1),
    ),
  );
  const buttonHeight = Math.max(
    38,
    Math.round(
      config.buttonHeight * (microLayout ? 0.84 : compactLayout ? 0.92 : 1),
    ),
  );
  const buttonPaddingX = Math.max(
    14,
    Math.round(
      config.buttonPaddingX * (microLayout ? 0.84 : compactLayout ? 0.92 : 1),
    ),
  );
  const inputHeight = Math.max(
    42,
    Math.round(
      config.inputHeight * (microLayout ? 0.84 : compactLayout ? 0.92 : 1),
    ),
  );
  const inputPaddingX = Math.max(
    12,
    Math.round(
      config.inputPaddingX * (microLayout ? 0.84 : compactLayout ? 0.92 : 1),
    ),
  );
  const toolbarHeight = Math.max(
    46,
    Math.round(
      config.toolbarHeight * (microLayout ? 0.84 : compactLayout ? 0.92 : 1),
    ),
  );
  const toolbarPaddingX = Math.max(
    16,
    Math.round(
      config.toolbarPaddingX * (microLayout ? 0.84 : compactLayout ? 0.92 : 1),
    ),
  );
  const inputIconInset = Math.max(12, Math.round(inputPaddingX * 0.9));
  const badgeRoundness =
    config.badgeRoundness > 120 ? 999 : Math.max(10, config.badgeRoundness);
  const heroContentMaxWidth = Math.max(
    360,
    Math.round(
      config.heroContentMaxWidth * (microLayout ? 0.72 : compactLayout ? 0.84 : 1),
    ),
  );
  const tileMinHeight = Math.max(
    92,
    Math.round(
      config.tileMinHeight * (microLayout ? 0.82 : compactLayout ? 0.9 : 1),
    ),
  );
  const heroHeadingSize =
    measuredContentWidth < 390
      ? 1.8 * scale
      : measuredContentWidth < 460
        ? 1.95 * scale
        : measuredContentWidth < 560
          ? 2.12 * scale
          : measuredContentWidth < 720
            ? 2.45 * scale
            : measuredContentWidth < 900
              ? 2.72 * scale
              : 2.95 * scale;
  const heroCopySize =
    measuredContentWidth < 520 ? 0.94 * scale : 1 * scale;
  const syncBadgeLabel =
    measuredContentWidth < 440
      ? "Theme applied"
      : measuredContentWidth < 620
        ? "Workspace themed"
        : "Theme applied across layout, cards, and controls";
  const topActionLabel = measuredContentWidth < 520 ? "Share" : "Share view";
  const primaryActionLabel =
    measuredContentWidth < 520 ? "New board" : "Create board";
  const secondaryActionLabel =
    measuredContentWidth < 520 ? "Invite" : "Invite team";
  const minPreviewHeight =
    isCompact
      ? measuredContentWidth < 390
        ? 420
        : measuredContentWidth < 560
          ? 470
          : measuredContentWidth < 760
            ? 500
            : 540
      : measuredContentWidth < 390
        ? 640
        : measuredContentWidth < 560
          ? 700
          : measuredContentWidth < 760
            ? 760
            : 780;
  const canvasBaseColor = config.useGradient
    ? mixHexColors(config.gradientStart, config.gradientEnd, 0.5)
    : config.backgroundColor;
  const surfaceContrastMix =
    0.72 + (config.surfaceContrast / 100) * (config.useGradient ? 0.18 : 0.24);
  const elevatedSurfaceContrastMix = Math.min(0.98, surfaceContrastMix + 0.05);
  const nestedSurfaceMix = 0.72 + (config.surfaceContrast / 100) * 0.18;
  const inputSurfaceMix = 0.8 + (config.surfaceContrast / 100) * 0.16;
  const accentTintMix = 0.08 + (config.accentTintStrength / 100) * 0.28;
  const buttonTintMix = 0.08 + (config.accentTintStrength / 100) * 0.24;
  const surfaceColor = blendHexColors(
    config.surfaceColor,
    canvasBaseColor,
    surfaceContrastMix,
  );
  const elevatedSurfaceColor = blendHexColors(
    config.surfaceColor,
    canvasBaseColor,
    elevatedSurfaceContrastMix,
  );
  const nestedSurfaceColor = blendHexColors(
    config.surfaceColor,
    surfaceColor,
    nestedSurfaceMix,
  );
  const inputBackgroundColor = blendHexColors(
    config.surfaceColor,
    surfaceColor,
    inputSurfaceMix,
  );
  const secondaryButtonBackgroundColor = blendHexColors(
    config.surfaceColor,
    surfaceColor,
    0.78,
  );
  const logoBackgroundColor = blendHexColors(config.accentColor, surfaceColor, 0.18);
  const accentTintColor = blendHexColors(
    config.accentColor,
    elevatedSurfaceColor,
    accentTintMix,
  );
  const buttonTintColor = blendHexColors(
    config.buttonColor,
    elevatedSurfaceColor,
    buttonTintMix,
  );
  const canvasTextColor = ensureReadableTextColor(
    config.textColor,
    canvasBaseColor,
    5.4,
  );
  const canvasMutedColor = ensureReadableTextColor(
    config.mutedTextColor,
    canvasBaseColor,
    4.8,
  );
  const surfaceTextColor = ensureReadableTextColor(
    config.textColor,
    surfaceColor,
    5.6,
  );
  const surfaceMutedColor = ensureReadableTextColor(
    config.mutedTextColor,
    surfaceColor,
    5,
  );
  const nestedTextColor = ensureReadableTextColor(
    config.textColor,
    nestedSurfaceColor,
    5.6,
  );
  const nestedMutedColor = ensureReadableTextColor(
    config.mutedTextColor,
    nestedSurfaceColor,
    5,
  );
  const accentTintTextColor = ensureReadableTextColor(
    config.textColor,
    accentTintColor,
    5.2,
  );
  const accentTintMutedColor = ensureReadableTextColor(
    config.mutedTextColor,
    accentTintColor,
    5,
  );
  const buttonTintTextColor = ensureReadableTextColor(
    config.textColor,
    buttonTintColor,
    5.2,
  );
  const buttonTintMutedColor = ensureReadableTextColor(
    config.mutedTextColor,
    buttonTintColor,
    5,
  );
  const inputTextColor = ensureReadableTextColor(
    config.textColor,
    inputBackgroundColor,
    5.6,
  );
  const inputMutedColor = ensureReadableTextColor(
    config.mutedTextColor,
    inputBackgroundColor,
    5.2,
  );
  const logoTextColor = ensureReadableTextColor(
    config.textColor,
    logoBackgroundColor,
    5.2,
  );
  const secondaryButtonTextColor = ensureReadableTextColor(
    config.textColor,
    secondaryButtonBackgroundColor,
    5.2,
  );
  const borderColor = hexToRgba(
    surfaceTextColor,
    0.06 + (config.borderStrength / 100) * (config.useGradient ? 0.16 : 0.12),
  );
  const softBorderColor = hexToRgba(
    surfaceTextColor,
    0.03 + (config.borderStrength / 100) * 0.08,
  );
  const previewShadow = buildShadow(config.shadow);
  const buttonTextColor = getReadableTextColor(config.buttonColor);

  const previewStyle = {
    "--tf-canvas-text": canvasTextColor,
    "--tf-canvas-muted": canvasMutedColor,
    "--tf-surface-text": surfaceTextColor,
    "--tf-surface-muted": surfaceMutedColor,
    "--tf-card-text": nestedTextColor,
    "--tf-card-muted": nestedMutedColor,
    "--tf-input-muted": inputMutedColor,
    "--tf-accent": config.accentColor,
    "--tf-button": config.buttonColor,
    "--tf-border": borderColor,
    "--tf-soft-border": softBorderColor,
    background: config.useGradient
      ? `linear-gradient(${config.gradientDirection}, ${config.gradientStart}, ${config.gradientEnd})`
      : config.backgroundColor,
    color: canvasTextColor,
    fontFamily: getThemeFontFamily(config.fontFamily),
  } as CSSProperties & Record<string, string>;

  const panelStyle: CSSProperties = {
    borderRadius: config.radius,
    border: `1px solid ${borderColor}`,
    backgroundColor: surfaceColor,
    boxShadow: previewShadow,
    color: surfaceTextColor,
  };

  const buttonStyle: CSSProperties = {
    borderRadius: config.buttonRoundness,
    backgroundColor: config.buttonColor,
    color: buttonTextColor,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
    minHeight: buttonHeight,
    padding: `0 ${buttonPaddingX}px`,
    fontSize: `${0.96 * scale}rem`,
  };

  const secondaryButtonStyle: CSSProperties = {
    borderRadius: config.buttonRoundness,
    border: `1px solid ${borderColor}`,
    backgroundColor: secondaryButtonBackgroundColor,
    color: secondaryButtonTextColor,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65)",
    minHeight: buttonHeight,
    padding: `0 ${buttonPaddingX}px`,
    fontSize: `${0.96 * scale}rem`,
  };

  const inputStyle: CSSProperties & { "--tf-input-muted": string } = {
    borderRadius: config.inputRoundness,
    border: `1px solid ${softBorderColor}`,
    backgroundColor: inputBackgroundColor,
    color: inputTextColor,
    minHeight: inputHeight,
    paddingTop: Math.max(10, Math.round((inputHeight - 22) / 2)),
    paddingRight: inputPaddingX,
    paddingBottom: Math.max(10, Math.round((inputHeight - 22) / 2)),
    paddingLeft: inputIconInset + 24,
    boxShadow: `inset 0 1px 0 ${hexToRgba("#ffffff", 0.55)}`,
    "--tf-input-muted": inputMutedColor,
  };

  const topGridStyle: CSSProperties = {
    gap: spacing,
    gridTemplateColumns: stackedLayout
      ? "minmax(0, 1fr)"
      : densePanelLayout
        ? "minmax(0, 1.04fr) minmax(320px, 0.96fr)"
        : "minmax(0, 1.08fr) minmax(340px, 0.92fr)",
  };

  const statsGridStyle: CSSProperties = {
    gap: panelGap,
    gridTemplateColumns: microLayout
      ? "minmax(0, 1fr)"
      : compactLayout
        ? "repeat(2, minmax(0, 1fr))"
        : measuredContentWidth < 760
          ? "repeat(3, minmax(0, 1fr))"
          : "repeat(auto-fit, minmax(132px, 1fr))",
  };

  const previewScenes = {
    builder: {
      syncLabel: syncBadgeLabel,
      heroHeading:
        "Preview how your theme feels inside a real product workspace.",
      heroCopy:
        "This sample dashboard updates typography, spacing, radius, surfaces, and buttons together so you can judge the whole system at a glance.",
      panelTitle: "Project queue",
      panelSubtitle: "Sample cards, forms, and team actions",
      searchPlaceholder: "Search projects or tasks",
      statCards: isCompact
        ? [
            { label: "Open projects", value: "12" },
            { label: "Tasks this week", value: "16" },
          ]
        : [
            { label: "Open projects", value: "12" },
            { label: "Team velocity", value: "94%" },
            { label: "Tasks this week", value: "16" },
          ],
      taskCards: isCompact
        ? [
            {
              title: "Homepage refresh",
              detail: "Review hierarchy, refine CTA weight, and confirm spacing.",
            },
          ]
        : [
            {
              title: "Homepage refresh",
              detail: "Review hierarchy, refine CTA weight, and confirm spacing.",
            },
            {
              title: "Analytics rollout",
              detail: "Test denser cards and tighter tables without losing clarity.",
            },
          ],
      signalTitle: "Performance snapshot",
      signalCards: isCompact
        ? [{ title: "Launch status", value: "Focused" }]
        : [
            { title: "Launch status", value: "Focused" },
            { title: "Review health", value: "High" },
          ],
    },
    prompt: {
      syncLabel:
        measuredContentWidth < 520
          ? "Report mode"
          : "Reporting view active",
      heroHeading: "Check the same theme in a denser reporting screen.",
      heroCopy:
        "A second layout helps you test contrast, hierarchy, and reading comfort before the style reaches more complex pages.",
      panelTitle: "Report center",
      panelSubtitle: "Saved views, alerts, and team summaries",
      searchPlaceholder: "Search reports or owners",
      statCards: isCompact
        ? [
            { label: "Saved reports", value: "04" },
            { label: "Review cycles", value: "07" },
          ]
        : [
            { label: "Saved reports", value: "04" },
            { label: "Active alerts", value: "11" },
            { label: "Review cycles", value: "07" },
          ],
      taskCards: isCompact
        ? [
            {
              title: "Revenue summary",
              detail:
                "Check tables, highlights, and supporting text against the same theme.",
            },
          ]
        : [
            {
              title: "Revenue summary",
              detail:
                "Check tables, highlights, and supporting text against the same theme.",
            },
            {
              title: "Billing review",
              detail:
                "Make sure denser layouts still feel readable and consistently weighted.",
            },
          ],
      signalTitle: "Insight tiles",
      signalCards: isCompact
        ? [{ title: "Trend line", value: "Stable" }]
        : [
            { title: "Trend line", value: "Stable" },
            { title: "Attention areas", value: "2" },
          ],
    },
    presets: {
      syncLabel:
        measuredContentWidth < 520
          ? "Board mode"
          : "Alternate layout active",
      heroHeading: "Pressure-test the theme in a busier planning surface.",
      heroCopy:
        "Switching to a more crowded workspace makes it easier to spot whether spacing, color, and hierarchy still feel balanced.",
      panelTitle: "Planning board",
      panelSubtitle: "A denser sample layout for cards and labels",
      searchPlaceholder: "Search boards or releases",
      statCards: isCompact
        ? [
            { label: "Board groups", value: "06" },
            { label: "Cards active", value: "12" },
          ]
        : [
            { label: "Board groups", value: "06" },
            { label: "Density checks", value: "09" },
            { label: "Cards active", value: "12" },
          ],
      taskCards: isCompact
        ? [
            {
              title: "Sprint planning",
              detail: "Compare nested cards, labels, and callouts in a denser view.",
            },
          ]
        : [
            {
              title: "Sprint planning",
              detail: "Compare nested cards, labels, and callouts in a denser view.",
            },
            {
              title: "Release board",
              detail: "Check how radius and spacing hold up across grouped content.",
            },
          ],
      signalTitle: "Board metrics",
      signalCards: isCompact
        ? [{ title: "Card density", value: "Balanced" }]
        : [
            { title: "Card density", value: "Balanced" },
            { title: "Style drift", value: "Low" },
          ],
    },
  } as const;

  const activeScene = previewScenes[previewMode];
  const statCards = activeScene.statCards;
  const taskCards = activeScene.taskCards;
  const signalCards = activeScene.signalCards;
  const resolvedOpenTask = taskCards.some((item) => item.title === openTask)
    ? openTask
    : null;

  const bottomCards = [
    {
      title: "Marketing module",
      text: "Headings, buttons, and supporting copy show how the theme handles emphasis.",
    },
    {
      title: "Form module",
      text: "Inputs, labels, and spacing reveal whether the interface still feels easy to use.",
    },
    {
      title: "Metric module",
      text: "Charts, stats, and utility cards show how accents carry into product surfaces.",
    },
  ];

  const signalGridStyle: CSSProperties = {
    gap: panelGap,
    gridTemplateColumns: compactLayout
      ? "minmax(0, 1fr)"
      : "repeat(auto-fit, minmax(148px, 1fr))",
  };

  const bottomGridStyle: CSSProperties = {
    gap: panelGap,
    gridTemplateColumns: compactLayout
      ? "minmax(0, 1fr)"
      : "repeat(auto-fit, minmax(162px, 1fr))",
  };

  const previewTabs = [
    { id: "builder", label: "Overview" },
    { id: "prompt", label: "Reports" },
    { id: "presets", label: "Boards" },
  ] as const;

  return (
    <section
      className="rounded-[34px] border border-white/70 bg-white/70 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl"
      data-live-preview-root
    >
      <div className="rounded-[30px] border border-slate-200/80 bg-slate-50/65 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
        <Card className="mb-3 gap-0 rounded-[24px] border-white/80 bg-white/75 py-0 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
          <CardContent className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-rose-400" />
              <span className="size-2.5 rounded-full bg-amber-300" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="font-medium">Live canvas</span>
            <Badge
              className="h-auto rounded-full border-slate-200/80 bg-white px-3 py-1 text-xs font-semibold text-slate-500"
              style={{ borderRadius: badgeRoundness }}
              variant="outline"
            >
              Responsive preview
            </Badge>
          </CardContent>
        </Card>

        <motion.div
          className="relative overflow-hidden rounded-[30px] border"
          ref={previewFrameRef}
          style={{ ...previewStyle, borderColor }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 18% 18%, ${hexToRgba(
                  config.accentColor,
                  config.useGradient ? 0.16 : 0.1,
                )}, transparent 22%),
                radial-gradient(circle at 86% 0%, ${hexToRgba(
                  config.buttonColor,
                  config.useGradient ? 0.14 : 0.09,
                )}, transparent 28%)
              `,
            }}
          />

          <div
            className="relative mx-auto flex flex-col"
            ref={previewContentRef}
            style={{
              gap: spacing,
              minHeight: minPreviewHeight,
              padding: spacing * 1.15,
              width: `${effectiveContainerWidth}%`,
              maxWidth: measuredFrameWidth < 540 ? "100%" : "1120px",
            }}
          >
            <nav
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition-[border-radius,box-shadow,background-color]"
              style={{
                ...panelStyle,
                minHeight: toolbarHeight,
                borderRadius: config.radius * 0.85,
                paddingLeft: toolbarPaddingX,
                paddingRight: toolbarPaddingX,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex size-11 items-center justify-center rounded-2xl text-sm font-semibold"
                  style={{
                    backgroundColor: logoBackgroundColor,
                    color: logoTextColor,
                  }}
                >
                  NS
                </div>
                <div>
                  <p className="text-sm font-semibold">Northstar</p>
                  <p className="text-xs" style={{ color: "var(--tf-surface-muted)" }}>
                    Sample workspace
                  </p>
                </div>
              </div>

              {!navCompact ? (
                <div
                  className="flex items-center gap-4 text-sm font-medium"
                  style={{ color: "var(--tf-surface-muted)" }}
                >
                  {previewTabs.map((tab) => {
                    const isActive = previewMode === tab.id;

                    return (
                      <Button
                        className="h-auto px-3 py-1.5 shadow-none hover:bg-transparent"
                        data-live-preview-tab={tab.id}
                        key={tab.id}
                        onClick={() => setPreviewMode(tab.id)}
                        style={{
                          borderColor: isActive ? borderColor : "transparent",
                          backgroundColor: isActive
                            ? secondaryButtonBackgroundColor
                            : "transparent",
                          color: isActive
                            ? surfaceTextColor
                            : "var(--tf-surface-muted)",
                        }}
                        type="button"
                        variant="ghost"
                      >
                        {tab.label}
                      </Button>
                    );
                  })}
                </div>
              ) : null}

              <div className="flex shrink-0 items-center gap-2">
                <Button
                  className="h-auto shrink-0 rounded-full px-4 py-2 text-sm font-medium shadow-none"
                  data-live-preview-action="export-tokens"
                  style={{
                    borderColor,
                    backgroundColor: secondaryButtonBackgroundColor,
                    color: secondaryButtonTextColor,
                  }}
                  type="button"
                  variant="outline"
                >
                  {topActionLabel}
                </Button>

                {navCompact ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-label="Open preview sections"
                        className="size-9 shrink-0 rounded-full shadow-none"
                        data-live-preview-nav-menu="trigger"
                        style={{
                          borderColor,
                          backgroundColor: secondaryButtonBackgroundColor,
                          color: secondaryButtonTextColor,
                        }}
                        type="button"
                        variant="outline"
                      >
                        <AlignJustify className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuLabel>Preview sections</DropdownMenuLabel>
                      <DropdownMenuRadioGroup
                        onValueChange={(value) =>
                          setPreviewMode(value as "builder" | "prompt" | "presets")
                        }
                        value={previewMode}
                      >
                        {previewTabs.map((tab) => (
                          <DropdownMenuRadioItem
                            data-live-preview-tab={tab.id}
                            key={tab.id}
                            value={tab.id}
                          >
                            {tab.label}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </div>
            </nav>

            <div
              className="grid flex-1 gap-4"
              style={topGridStyle}
            >
              <div className="flex min-w-0 flex-col" style={{ gap: spacing }}>
                <div className="pt-3">
                  <Badge
                    className="mb-5 h-auto rounded-full px-4 py-2 text-sm font-medium"
                    style={{
                      borderColor,
                      borderRadius: badgeRoundness,
                      backgroundColor: secondaryButtonBackgroundColor,
                      color: surfaceTextColor,
                    }}
                    variant="outline"
                  >
                    <Sparkles
                      className="size-4"
                      style={{ color: "var(--tf-accent)" }}
                    />
                    {activeScene.syncLabel}
                  </Badge>

                  <h3
                    className="balanced-text max-w-xl font-semibold tracking-[-0.05em] transition-[font-size,color]"
                    style={{
                      fontSize: `${heroHeadingSize}rem`,
                      lineHeight: 1,
                      color: "var(--tf-canvas-text)",
                      maxWidth: `${heroContentMaxWidth}px`,
                    }}
                  >
                    {activeScene.heroHeading}
                  </h3>

                  <p
                    className="mt-5 max-w-xl leading-8"
                    style={{
                      color: "var(--tf-canvas-muted)",
                      fontSize: `${heroCopySize}rem`,
                      maxWidth: `${heroContentMaxWidth}px`,
                    }}
                  >
                    {activeScene.heroCopy}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button
                      className="h-auto px-0 py-0 shadow-none"
                      data-live-preview-action="export-bundle"
                      style={buttonStyle}
                      type="button"
                      variant="ghost"
                    >
                      {primaryActionLabel}
                    </Button>
                    <Button
                      className="h-auto px-0 py-0 shadow-none"
                      data-live-preview-action="preview-presets"
                      style={secondaryButtonStyle}
                      type="button"
                      variant="ghost"
                    >
                      {secondaryActionLabel}
                    </Button>
                  </div>
                </div>

                <div className="grid" style={statsGridStyle}>
                  {statCards.map((stat) => (
                    <Card
                      className="min-w-0 overflow-hidden gap-0 rounded-[24px] py-0 ring-0"
                      key={stat.label}
                      style={panelStyle}
                    >
                      <CardContent
                        className="min-w-0"
                        style={{
                          padding: innerCardPadding,
                          minHeight: tileMinHeight,
                        }}
                      >
                        <p
                          className="break-words text-sm"
                          style={{ color: "var(--tf-surface-muted)" }}
                        >
                          {stat.label}
                        </p>
                        <p
                          className="mt-3 font-semibold tracking-[-0.03em]"
                          style={{ fontSize: `${1.75 * scale}rem` }}
                        >
                          {stat.value}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex min-w-0 flex-col" style={{ gap: spacing }}>
                <Card
                  className="min-w-0 overflow-hidden gap-0 rounded-[28px] py-0 ring-0"
                  style={panelStyle}
                >
                  <CardContent style={{ padding: outerPanelPadding }}>
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">{activeScene.panelTitle}</p>
                        <p
                          className="mt-1 text-sm"
                          style={{ color: "var(--tf-surface-muted)" }}
                        >
                          {activeScene.panelSubtitle}
                        </p>
                      </div>
                      <Bell
                        className="size-5"
                        style={{ color: "var(--tf-accent)" }}
                      />
                    </div>

                    <div className="relative">
                      <Search
                        className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2"
                        style={{
                          color: "var(--tf-input-muted)",
                          left: inputIconInset,
                        }}
                      />
                      <Input
                        className="h-auto bg-transparent text-sm placeholder:text-[var(--tf-input-muted)] focus-visible:ring-0"
                        onChange={(event) => setSearchValue(event.target.value)}
                        placeholder={activeScene.searchPlaceholder}
                        value={searchValue}
                        style={inputStyle}
                      />
                    </div>

                    <div className="mt-4 space-y-3">
                      {taskCards.map((item) => (
                        <Collapsible
                          key={item.title}
                          onOpenChange={(open) =>
                            setOpenTask(open ? item.title : null)
                          }
                          open={resolvedOpenTask === item.title}
                        >
                          <Card
                            className="min-w-0 overflow-hidden gap-0 rounded-[22px] py-0 ring-0"
                            style={{
                              border: `1px solid ${softBorderColor}`,
                              backgroundColor: nestedSurfaceColor,
                              color: nestedTextColor,
                            }}
                          >
                            <CardContent
                              className="min-w-0"
                              style={{ padding: innerCardPadding }}
                            >
                              <CollapsibleTrigger asChild>
                                <button
                                  className="flex w-full items-start justify-between gap-4 text-left"
                                  data-live-preview-task-trigger={item.title}
                                  type="button"
                                >
                                  <div className="min-w-0">
                                    <p className="font-medium">{item.title}</p>
                                  </div>
                                  <ChevronRight
                                    className="size-4 shrink-0 transition-transform duration-200"
                                    style={{
                                      color: "var(--tf-card-muted)",
                                      transform:
                                        resolvedOpenTask === item.title
                                          ? "rotate(90deg)"
                                          : "rotate(0deg)",
                                    }}
                                  />
                                </button>
                              </CollapsibleTrigger>

                              {resolvedOpenTask === item.title ? (
                                <CollapsibleContent
                                  className="overflow-hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1"
                                  forceMount
                                >
                                  <div className="pt-3">
                                    <p
                                      className="break-words text-sm leading-6"
                                      style={{ color: "var(--tf-card-muted)" }}
                                    >
                                      {item.detail}
                                    </p>
                                  </div>
                                </CollapsibleContent>
                              ) : null}
                            </CardContent>
                          </Card>
                        </Collapsible>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="min-w-0 overflow-hidden gap-0 rounded-[28px] py-0 ring-0"
                  style={{
                    ...panelStyle,
                    background: `linear-gradient(180deg, ${elevatedSurfaceColor}, ${surfaceColor})`,
                  }}
                >
                  <CardContent style={{ padding: outerPanelPadding }}>
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm font-semibold">{activeScene.signalTitle}</p>
                      <Star
                        className="size-5"
                        style={{ color: "var(--tf-accent)" }}
                      />
                    </div>
                    <div className="grid" style={signalGridStyle}>
                      {signalCards.map((card) => (
                        <Card
                          className="min-w-0 overflow-hidden gap-0 rounded-[22px] py-0 ring-0"
                          key={card.title}
                          style={{
                            backgroundColor:
                              card.title === "Launch status"
                                ? accentTintColor
                                : buttonTintColor,
                            border: `1px solid ${softBorderColor}`,
                            color:
                              card.title === "Launch status"
                                ? accentTintTextColor
                                : buttonTintTextColor,
                          }}
                        >
                          <CardContent
                            className="min-w-0"
                            style={{
                              padding: innerCardPadding,
                              minHeight: tileMinHeight,
                            }}
                          >
                            <p
                              className="break-words text-sm"
                              style={{
                                color:
                                  card.title === "Launch status"
                                    ? accentTintMutedColor
                                    : buttonTintMutedColor,
                              }}
                            >
                              {card.title}
                            </p>
                            <p className="mt-3 break-words text-xl font-semibold">
                              {card.value}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {!isCompact ? (
              <div className="grid" style={bottomGridStyle}>
                {bottomCards.map((card, index) => (
                  <Card
                    className="min-w-0 overflow-hidden gap-0 rounded-[26px] py-0 ring-0"
                    key={card.title}
                    style={{
                      ...panelStyle,
                      backgroundColor:
                        index === 1
                          ? elevatedSurfaceColor
                          : nestedSurfaceColor,
                      color: nestedTextColor,
                    }}
                  >
                    <CardContent
                      className="min-w-0"
                      style={{
                        padding: outerPanelPadding,
                        minHeight: tileMinHeight,
                      }}
                    >
                      <div
                        className="mb-4 h-2.5 rounded-full"
                        style={{
                          width: `${62 + index * 12}%`,
                          background: `linear-gradient(90deg, ${config.accentColor}, ${hexToRgba(
                            config.buttonColor,
                            0.7,
                          )})`,
                        }}
                      />
                      <p className="font-semibold">{card.title}</p>
                      <p
                        className="mt-2 break-words text-sm leading-6"
                        style={{ color: "var(--tf-card-muted)" }}
                      >
                        {card.text}
                      </p>
                      {previewMode === "prompt" && index === 0 ? (
                        <div
                          className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
                          style={{
                            backgroundColor: accentTintColor,
                            color: accentTintTextColor,
                            borderRadius: badgeRoundness,
                          }}
                        >
                          <CheckCircle2 className="size-3.5" />
                          Saved report view
                        </div>
                      ) : null}
                      {previewMode === "presets" && index === 2 ? (
                        <div
                          className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
                          style={{
                            backgroundColor: buttonTintColor,
                            color: buttonTintTextColor,
                            borderRadius: badgeRoundness,
                          }}
                        >
                          <CheckCircle2 className="size-3.5" />
                          Board density on
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
