"use client";

import type { CSSProperties } from "react";

import { Bell, ChevronRight, Search, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";

import {
  buildShadow,
  getReadableTextColor,
  getThemeFontFamily,
  hexToRgba,
} from "@/lib/theme-presets";
import { type ThemeConfig } from "@/lib/theme-types";

type LivePreviewProps = {
  config: ThemeConfig;
};

export function LivePreview({ config }: LivePreviewProps) {
  const scale = config.fontScale / 100;
  const spacing = config.spacing;
  const borderColor = hexToRgba(config.textColor, 0.12);
  const softBorderColor = hexToRgba(config.textColor, 0.08);
  const surfaceBackground = hexToRgba(config.surfaceColor, config.useGradient ? 0.82 : 0.93);
  const previewShadow = buildShadow(config.shadow);
  const buttonTextColor = getReadableTextColor(config.buttonColor);

  const previewStyle = {
    "--tf-text": config.textColor,
    "--tf-muted": config.mutedTextColor,
    "--tf-surface": surfaceBackground,
    "--tf-accent": config.accentColor,
    "--tf-button": config.buttonColor,
    "--tf-border": borderColor,
    "--tf-soft-border": softBorderColor,
    background: config.useGradient
      ? `linear-gradient(${config.gradientDirection}, ${config.gradientStart}, ${config.gradientEnd})`
      : config.backgroundColor,
    color: config.textColor,
    fontFamily: getThemeFontFamily(config.fontFamily),
  } as CSSProperties & Record<string, string>;

  const panelStyle: CSSProperties = {
    borderRadius: config.radius,
    border: `1px solid ${borderColor}`,
    background: "var(--tf-surface)",
    boxShadow: previewShadow,
    backdropFilter: "blur(18px)",
  };

  const buttonStyle: CSSProperties = {
    borderRadius: config.buttonRoundness,
    backgroundColor: config.buttonColor,
    color: buttonTextColor,
    boxShadow: `0 18px 36px ${hexToRgba(config.buttonColor, 0.28)}`,
    padding: `${Math.max(12, spacing * 0.62)}px ${Math.max(18, spacing * 1.1)}px`,
    fontSize: `${0.96 * scale}rem`,
  };

  const secondaryButtonStyle: CSSProperties = {
    borderRadius: config.buttonRoundness,
    border: `1px solid ${borderColor}`,
    backgroundColor: hexToRgba(config.surfaceColor, 0.62),
    color: config.textColor,
    padding: `${Math.max(12, spacing * 0.62)}px ${Math.max(18, spacing * 1.1)}px`,
    fontSize: `${0.96 * scale}rem`,
  };

  const inputStyle: CSSProperties = {
    borderRadius: config.radius * 0.8,
    border: `1px solid ${softBorderColor}`,
    backgroundColor: hexToRgba(config.surfaceColor, 0.84),
    color: config.textColor,
    paddingTop: Math.max(14, spacing * 0.7),
    paddingRight: Math.max(16, spacing),
    paddingBottom: Math.max(14, spacing * 0.7),
    paddingLeft: Math.max(16, spacing),
    boxShadow: `inset 0 1px 0 ${hexToRgba("#ffffff", 0.55)}`,
  };

  return (
    <section className="rounded-[34px] border border-white/70 bg-white/70 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="rounded-[30px] border border-slate-200/80 bg-slate-50/65 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
        <div className="mb-3 flex items-center justify-between rounded-[24px] border border-white/80 bg-white/75 px-4 py-3 text-sm text-slate-600 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-rose-400" />
            <span className="size-2.5 rounded-full bg-amber-300" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="font-medium">Live canvas</span>
          <span className="rounded-full border border-slate-200/80 px-3 py-1 text-xs font-semibold text-slate-500">
            Responsive preview
          </span>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-[30px] border"
          style={{ ...previewStyle, borderColor }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 18% 18%, ${hexToRgba(
                  config.accentColor,
                  0.24,
                )}, transparent 22%),
                radial-gradient(circle at 86% 0%, ${hexToRgba(
                  config.buttonColor,
                  0.2,
                )}, transparent 28%)
              `,
            }}
          />

          <div
            className="relative mx-auto flex min-h-[780px] flex-col"
            style={{
              gap: spacing,
              padding: spacing * 1.15,
              width: `${config.containerWidth}%`,
            }}
          >
            <nav
              className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 transition-[border-radius,box-shadow,background-color]"
              style={{
                ...panelStyle,
                borderRadius: config.radius * 0.85,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex size-11 items-center justify-center rounded-2xl text-sm font-semibold"
                  style={{
                    backgroundColor: hexToRgba(config.accentColor, 0.18),
                    color: config.textColor,
                  }}
                >
                  TF
                </div>
                <div>
                  <p className="text-sm font-semibold">Theme Forge</p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--tf-muted)" }}
                  >
                    Live system preview
                  </p>
                </div>
              </div>

              <div
                className="hidden items-center gap-6 text-sm font-medium lg:flex"
                style={{ color: "var(--tf-muted)" }}
              >
                <span>Builder</span>
                <span>Prompt</span>
                <span>Presets</span>
              </div>

              <div
                className="rounded-full border px-4 py-2 text-sm font-medium"
                style={{
                  borderColor,
                  backgroundColor: hexToRgba(config.surfaceColor, 0.65),
                }}
              >
                Export tokens
              </div>
            </nav>

            <div
              className="grid flex-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]"
              style={{ gap: spacing }}
            >
              <div className="flex flex-col" style={{ gap: spacing }}>
                <div className="pt-3">
                  <div
                    className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
                    style={{
                      borderColor,
                      backgroundColor: hexToRgba(config.surfaceColor, 0.52),
                      color: config.textColor,
                    }}
                  >
                    <Sparkles className="size-4" style={{ color: "var(--tf-accent)" }} />
                    Design system synced to controls
                  </div>

                  <h3
                    className="balanced-text max-w-xl font-semibold tracking-[-0.05em] transition-[font-size,color]"
                    style={{
                      fontSize: `${3.2 * scale}rem`,
                      lineHeight: 1,
                    }}
                  >
                    Ship interfaces that feel intentional before you write the
                    rest of the app.
                  </h3>

                  <p
                    className="mt-5 max-w-xl leading-8"
                    style={{
                      color: "var(--tf-muted)",
                      fontSize: `${1.02 * scale}rem`,
                    }}
                  >
                    Adjust the theme once and apply it to cards, inputs, CTAs,
                    stats, and future prompt output without juggling a dozen
                    separate style decisions.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button style={buttonStyle} type="button">
                      Generate prompt
                    </button>
                    <button style={secondaryButtonStyle} type="button">
                      Preview presets
                    </button>
                  </div>
                </div>

                <div
                  className="grid gap-3 sm:grid-cols-3"
                  style={{ gap: Math.max(12, spacing * 0.65) }}
                >
                  {[
                    { label: "Theme iterations", value: "12" },
                    { label: "Prompt confidence", value: "94%" },
                    { label: "Components synced", value: "16" },
                  ].map((stat) => (
                    <div
                      className="rounded-[24px] p-4"
                      key={stat.label}
                      style={panelStyle}
                    >
                      <p
                        className="text-sm"
                        style={{ color: "var(--tf-muted)" }}
                      >
                        {stat.label}
                      </p>
                      <p
                        className="mt-3 font-semibold tracking-[-0.03em]"
                        style={{ fontSize: `${1.75 * scale}rem` }}
                      >
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col" style={{ gap: spacing }}>
                <div className="rounded-[28px] p-5" style={panelStyle}>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Control pass</p>
                      <p
                        className="mt-1 text-sm"
                        style={{ color: "var(--tf-muted)" }}
                      >
                        Sample panel with forms and tasks
                      </p>
                    </div>
                    <Bell className="size-5" style={{ color: "var(--tf-accent)" }} />
                  </div>

                  <div className="relative">
                    <Search
                      className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2"
                      style={{ color: "var(--tf-muted)" }}
                    />
                    <input
                      defaultValue=""
                      placeholder="Search tokens or components"
                      style={{ ...inputStyle, paddingLeft: 44 }}
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
                      <div
                        className="rounded-[22px] p-4"
                        key={item.title}
                        style={{
                          border: `1px solid ${softBorderColor}`,
                          backgroundColor: hexToRgba(config.surfaceColor, 0.58),
                        }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p
                              className="mt-2 text-sm leading-6"
                              style={{ color: "var(--tf-muted)" }}
                            >
                              {item.detail}
                            </p>
                          </div>
                          <ChevronRight
                            className="size-4 shrink-0"
                            style={{ color: "var(--tf-muted)" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-[28px] p-5"
                  style={{
                    ...panelStyle,
                    background: `linear-gradient(180deg, ${hexToRgba(
                      config.surfaceColor,
                      0.76,
                    )}, ${hexToRgba(config.surfaceColor, 0.9)})`,
                  }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold">Signal cluster</p>
                    <Star className="size-5" style={{ color: "var(--tf-accent)" }} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        title: "Accent usage",
                        value: "Focused",
                        tint: hexToRgba(config.accentColor, 0.18),
                      },
                      {
                        title: "Prompt clarity",
                        value: "High",
                        tint: hexToRgba(config.buttonColor, 0.18),
                      },
                    ].map((card) => (
                      <div
                        className="rounded-[22px] p-4"
                        key={card.title}
                        style={{
                          backgroundColor: card.tint,
                          border: `1px solid ${softBorderColor}`,
                        }}
                      >
                        <p
                          className="text-sm"
                          style={{ color: "var(--tf-muted)" }}
                        >
                          {card.title}
                        </p>
                        <p className="mt-3 text-xl font-semibold">{card.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="grid gap-3 md:grid-cols-3"
              style={{ gap: Math.max(12, spacing * 0.65) }}
            >
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
                <div
                  className="rounded-[26px] p-5"
                  key={card.title}
                  style={{
                    ...panelStyle,
                    backgroundColor:
                      index === 1
                        ? hexToRgba(config.surfaceColor, 0.84)
                        : hexToRgba(config.surfaceColor, 0.74),
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
                    className="mt-2 text-sm leading-6"
                    style={{ color: "var(--tf-muted)" }}
                  >
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
