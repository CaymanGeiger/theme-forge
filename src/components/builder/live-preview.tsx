"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Bell, ChevronRight, Search, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
};

export function LivePreview({ config }: LivePreviewProps) {
  const previewFrameRef = useRef<HTMLDivElement | null>(null);
  const previewContentRef = useRef<HTMLDivElement | null>(null);
  const [frameWidth, setFrameWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

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
    10,
    spacing * (compactLayout ? 0.55 : stackedLayout ? 0.6 : 0.7),
  );
  const outerPanelPadding = microLayout ? 15 : compactLayout ? 18 : 20;
  const innerCardPadding = microLayout ? 14 : compactLayout ? 15 : 16;
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
      ? "Theme synced"
      : measuredContentWidth < 620
        ? "System synced"
        : "Design system synced to controls";
  const exportLabel = measuredContentWidth < 520 ? "Export" : "Export tokens";
  const previewButtonLabel =
    measuredContentWidth < 520 ? "Presets" : "Preview presets";
  const minPreviewHeight =
    measuredContentWidth < 390
      ? 640
      : measuredContentWidth < 560
        ? 700
        : measuredContentWidth < 760
          ? 760
          : 780;
  const canvasBaseColor = config.useGradient
    ? mixHexColors(config.gradientStart, config.gradientEnd, 0.5)
    : config.backgroundColor;
  const surfaceColor = blendHexColors(
    config.surfaceColor,
    canvasBaseColor,
    config.useGradient ? 0.9 : 0.96,
  );
  const elevatedSurfaceColor = blendHexColors(
    config.surfaceColor,
    canvasBaseColor,
    config.useGradient ? 0.94 : 0.98,
  );
  const nestedSurfaceColor = blendHexColors(
    config.surfaceColor,
    surfaceColor,
    config.useGradient ? 0.82 : 0.9,
  );
  const inputBackgroundColor = blendHexColors(
    config.surfaceColor,
    surfaceColor,
    config.useGradient ? 0.9 : 0.95,
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
    0.16,
  );
  const buttonTintColor = blendHexColors(
    config.buttonColor,
    elevatedSurfaceColor,
    0.16,
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
  const borderColor = hexToRgba(surfaceTextColor, config.useGradient ? 0.16 : 0.12);
  const softBorderColor = hexToRgba(surfaceTextColor, 0.08);
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
    padding: `${Math.max(12, spacing * 0.62)}px ${Math.max(18, spacing * 1.1)}px`,
    fontSize: `${0.96 * scale}rem`,
  };

  const secondaryButtonStyle: CSSProperties = {
    borderRadius: config.buttonRoundness,
    border: `1px solid ${borderColor}`,
    backgroundColor: secondaryButtonBackgroundColor,
    color: secondaryButtonTextColor,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65)",
    padding: `${Math.max(12, spacing * 0.62)}px ${Math.max(18, spacing * 1.1)}px`,
    fontSize: `${0.96 * scale}rem`,
  };

  const inputStyle: CSSProperties & { "--tf-input-muted": string } = {
    borderRadius: config.radius * 0.8,
    border: `1px solid ${softBorderColor}`,
    backgroundColor: inputBackgroundColor,
    color: inputTextColor,
    paddingTop: Math.max(14, spacing * 0.7),
    paddingRight: Math.max(16, spacing),
    paddingBottom: Math.max(14, spacing * 0.7),
    paddingLeft: 44,
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

  return (
    <section className="rounded-[34px] border border-white/70 bg-white/70 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
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
                borderRadius: config.radius * 0.85,
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
                  TF
                </div>
                <div>
                  <p className="text-sm font-semibold">Theme Forge</p>
                  <p className="text-xs" style={{ color: "var(--tf-surface-muted)" }}>
                    Live system preview
                  </p>
                </div>
              </div>

              {!navCompact ? (
                <div
                  className="flex items-center gap-4 text-sm font-medium"
                  style={{ color: "var(--tf-surface-muted)" }}
                >
                  <span>Builder</span>
                  <span>Prompt</span>
                  <span>Presets</span>
                </div>
              ) : null}

              <Button
                className="h-auto shrink-0 rounded-full px-4 py-2 text-sm font-medium shadow-none hover:bg-transparent"
                style={{
                  borderColor,
                  backgroundColor: secondaryButtonBackgroundColor,
                  color: secondaryButtonTextColor,
                }}
                type="button"
                variant="outline"
              >
                {exportLabel}
              </Button>
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
                      backgroundColor: secondaryButtonBackgroundColor,
                      color: surfaceTextColor,
                    }}
                    variant="outline"
                    >
                    <Sparkles
                      className="size-4"
                      style={{ color: "var(--tf-accent)" }}
                    />
                    {syncBadgeLabel}
                  </Badge>

                  <h3
                    className="balanced-text max-w-xl font-semibold tracking-[-0.05em] transition-[font-size,color]"
                    style={{
                      fontSize: `${heroHeadingSize}rem`,
                      lineHeight: 1,
                      color: "var(--tf-canvas-text)",
                    }}
                  >
                    Ship interfaces that feel intentional before you write the
                    rest of the app.
                  </h3>

                  <p
                    className="mt-5 max-w-xl leading-8"
                    style={{
                      color: "var(--tf-canvas-muted)",
                      fontSize: `${heroCopySize}rem`,
                    }}
                  >
                    Adjust the theme once and apply it to cards, inputs, CTAs,
                    stats, and future prompt output without juggling a dozen
                    separate style decisions.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button
                      className="h-auto px-0 py-0 shadow-none hover:bg-transparent hover:brightness-[1.02]"
                      style={buttonStyle}
                      type="button"
                      variant="ghost"
                    >
                      Generate prompt
                    </Button>
                    <Button
                      className="h-auto px-0 py-0 shadow-none hover:bg-transparent"
                      style={secondaryButtonStyle}
                      type="button"
                      variant="ghost"
                    >
                      {previewButtonLabel}
                    </Button>
                  </div>
                </div>

                <div className="grid" style={statsGridStyle}>
                  {[
                    { label: "Theme iterations", value: "12" },
                    { label: "Prompt confidence", value: "94%" },
                    { label: "Components synced", value: "16" },
                  ].map((stat) => (
                    <Card
                      className="min-w-0 overflow-hidden gap-0 rounded-[24px] py-0 ring-0"
                      key={stat.label}
                      style={panelStyle}
                    >
                      <CardContent
                        className="min-w-0"
                        style={{ padding: innerCardPadding }}
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
                        <p className="text-sm font-semibold">Control pass</p>
                        <p
                          className="mt-1 text-sm"
                          style={{ color: "var(--tf-surface-muted)" }}
                        >
                          Sample panel with forms and tasks
                        </p>
                      </div>
                      <Bell
                        className="size-5"
                        style={{ color: "var(--tf-accent)" }}
                      />
                    </div>

                    <div className="relative">
                      <Search
                        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2"
                        style={{ color: "var(--tf-input-muted)" }}
                      />
                      <Input
                        className="h-auto bg-transparent text-sm placeholder:text-[var(--tf-input-muted)] focus-visible:ring-0"
                        placeholder="Search tokens or components"
                        style={inputStyle}
                      />
                    </div>

                    <div className="mt-4 space-y-3">
                      {[
                        {
                          title: "Hero polish pass",
                          detail: "Align gradients, bump CTA contrast, export prompt.",
                        },
                        {
                          title: "Dashboard variation",
                          detail: "Test denser spacing without breaking readability.",
                        },
                      ].map((item) => (
                        <Card
                          className="min-w-0 overflow-hidden gap-0 rounded-[22px] py-0 ring-0"
                          key={item.title}
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
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <p className="font-medium">{item.title}</p>
                                <p
                                  className="mt-2 break-words text-sm leading-6"
                                  style={{ color: "var(--tf-card-muted)" }}
                                >
                                  {item.detail}
                                </p>
                              </div>
                              <ChevronRight
                                className="size-4 shrink-0"
                                style={{ color: "var(--tf-card-muted)" }}
                              />
                            </div>
                          </CardContent>
                        </Card>
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
                      <p className="text-sm font-semibold">Signal cluster</p>
                      <Star
                        className="size-5"
                        style={{ color: "var(--tf-accent)" }}
                      />
                    </div>
                    <div className="grid" style={signalGridStyle}>
                      {[
                        {
                          title: "Accent usage",
                          value: "Focused",
                        },
                        {
                          title: "Prompt clarity",
                          value: "High",
                        },
                      ].map((card) => (
                        <Card
                          className="min-w-0 overflow-hidden gap-0 rounded-[22px] py-0 ring-0"
                          key={card.title}
                          style={{
                            backgroundColor:
                              card.title === "Accent usage"
                                ? accentTintColor
                                : buttonTintColor,
                            border: `1px solid ${softBorderColor}`,
                            color:
                              card.title === "Accent usage"
                                ? accentTintTextColor
                                : buttonTintTextColor,
                          }}
                        >
                          <CardContent
                            className="min-w-0"
                            style={{ padding: innerCardPadding }}
                          >
                            <p
                              className="break-words text-sm"
                              style={{
                                color:
                                  card.title === "Accent usage"
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

            <div className="grid" style={bottomGridStyle}>
              {[
                {
                  title: "Hero card",
                  text: "Your chosen radius and shadows shape the whole product tone.",
                },
                {
                  title: "Input module",
                  text: "Typography, color, and density stay consistent with forms.",
                },
                {
                  title: "Stats card",
                  text: "Accents and surfaces extend into dashboards and analytics.",
                },
              ].map((card, index) => (
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
                    style={{ padding: outerPanelPadding }}
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
