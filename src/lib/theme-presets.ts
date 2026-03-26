import {
  fontOptions,
  gradientDirections,
  type ThemeConfig,
  type ThemeFontKey,
  type ThemeGradientDirection,
  type ThemePreset,
} from "@/lib/theme-types";

export const themePresets: ThemePreset[] = [
  {
    id: "minimal-saas",
    name: "Minimal SaaS",
    eyebrow: "Default",
    blurb: "Neutral surfaces, crisp typography, and restrained blue energy.",
    config: {
      radius: 24,
      shadow: 48,
      spacing: 20,
      fontFamily: "geist",
      fontScale: 104,
      containerWidth: 88,
      panelPadding: 20,
      cardPadding: 16,
      moduleGap: 14,
      toolbarHeight: 58,
      toolbarPaddingX: 24,
      buttonHeight: 46,
      buttonPaddingX: 22,
      inputHeight: 52,
      inputPaddingX: 16,
      buttonRoundness: 999,
      inputRoundness: 22,
      badgeRoundness: 999,
      heroContentMaxWidth: 620,
      tileMinHeight: 132,
      surfaceContrast: 70,
      borderStrength: 48,
      accentTintStrength: 34,
      textColor: "#111827",
      mutedTextColor: "#667085",
      backgroundColor: "#f7f8fc",
      surfaceColor: "#ffffff",
      accentColor: "#4f7cff",
      buttonColor: "#171717",
      useGradient: false,
      gradientStart: "#f7f8fc",
      gradientEnd: "#e8efff",
      gradientDirection: "135deg",
    },
  },
  {
    id: "dark-glass",
    name: "Dark Glass",
    eyebrow: "Atmospheric",
    blurb: "Glossy dark layers with cool highlights and cinematic depth.",
    config: {
      radius: 30,
      shadow: 72,
      spacing: 22,
      fontFamily: "inter",
      fontScale: 106,
      containerWidth: 90,
      panelPadding: 22,
      cardPadding: 18,
      moduleGap: 16,
      toolbarHeight: 60,
      toolbarPaddingX: 28,
      buttonHeight: 48,
      buttonPaddingX: 24,
      inputHeight: 54,
      inputPaddingX: 18,
      buttonRoundness: 999,
      inputRoundness: 24,
      badgeRoundness: 999,
      heroContentMaxWidth: 580,
      tileMinHeight: 144,
      surfaceContrast: 82,
      borderStrength: 44,
      accentTintStrength: 58,
      textColor: "#f8fafc",
      mutedTextColor: "#94a3b8",
      backgroundColor: "#09111f",
      surfaceColor: "#111c30",
      accentColor: "#88c7ff",
      buttonColor: "#62d0ff",
      useGradient: true,
      gradientStart: "#07111f",
      gradientEnd: "#1f2a5a",
      gradientDirection: "135deg",
    },
  },
  {
    id: "neon",
    name: "Neon",
    eyebrow: "Bold",
    blurb: "Electric gradients, vivid contrast, and a more synthetic pulse.",
    config: {
      radius: 28,
      shadow: 88,
      spacing: 18,
      fontFamily: "poppins",
      fontScale: 110,
      containerWidth: 84,
      panelPadding: 18,
      cardPadding: 15,
      moduleGap: 13,
      toolbarHeight: 56,
      toolbarPaddingX: 22,
      buttonHeight: 44,
      buttonPaddingX: 21,
      inputHeight: 50,
      inputPaddingX: 15,
      buttonRoundness: 26,
      inputRoundness: 22,
      badgeRoundness: 18,
      heroContentMaxWidth: 520,
      tileMinHeight: 124,
      surfaceContrast: 88,
      borderStrength: 52,
      accentTintStrength: 72,
      textColor: "#f8faff",
      mutedTextColor: "#bcc7ff",
      backgroundColor: "#09051a",
      surfaceColor: "#151136",
      accentColor: "#70f0ff",
      buttonColor: "#ff4fd8",
      useGradient: true,
      gradientStart: "#1a0848",
      gradientEnd: "#0d5fff",
      gradientDirection: "90deg",
    },
  },
  {
    id: "soft-editorial",
    name: "Soft Editorial",
    eyebrow: "Story-led",
    blurb: "Cream tones, warm depth, and sharper serif-driven hierarchy.",
    config: {
      radius: 22,
      shadow: 36,
      spacing: 24,
      fontFamily: "playfair",
      fontScale: 112,
      containerWidth: 82,
      panelPadding: 22,
      cardPadding: 18,
      moduleGap: 16,
      toolbarHeight: 60,
      toolbarPaddingX: 28,
      buttonHeight: 48,
      buttonPaddingX: 24,
      inputHeight: 52,
      inputPaddingX: 18,
      buttonRoundness: 999,
      inputRoundness: 20,
      badgeRoundness: 999,
      heroContentMaxWidth: 560,
      tileMinHeight: 146,
      surfaceContrast: 66,
      borderStrength: 40,
      accentTintStrength: 30,
      textColor: "#241b19",
      mutedTextColor: "#6f625c",
      backgroundColor: "#f7efe6",
      surfaceColor: "#fff8f1",
      accentColor: "#b76049",
      buttonColor: "#241b19",
      useGradient: true,
      gradientStart: "#fff6e9",
      gradientEnd: "#f3dccf",
      gradientDirection: "180deg",
    },
  },
  {
    id: "developer-dashboard",
    name: "Developer Dashboard",
    eyebrow: "Utility",
    blurb: "Denser spacing, tactical accents, and a clean operator mindset.",
    config: {
      radius: 18,
      shadow: 58,
      spacing: 16,
      fontFamily: "manrope",
      fontScale: 98,
      containerWidth: 94,
      panelPadding: 16,
      cardPadding: 14,
      moduleGap: 12,
      toolbarHeight: 52,
      toolbarPaddingX: 20,
      buttonHeight: 42,
      buttonPaddingX: 18,
      inputHeight: 46,
      inputPaddingX: 14,
      buttonRoundness: 20,
      inputRoundness: 16,
      badgeRoundness: 18,
      heroContentMaxWidth: 640,
      tileMinHeight: 120,
      surfaceContrast: 78,
      borderStrength: 58,
      accentTintStrength: 42,
      textColor: "#d8e0ef",
      mutedTextColor: "#7f8a9f",
      backgroundColor: "#0f172a",
      surfaceColor: "#131d34",
      accentColor: "#9eff6b",
      buttonColor: "#3b82f6",
      useGradient: false,
      gradientStart: "#101826",
      gradientEnd: "#112241",
      gradientDirection: "225deg",
    },
  },
  {
    id: "sunlit-studio",
    name: "Sunlit Studio",
    eyebrow: "Radiant",
    blurb: "Golden warmth, soft surfaces, and a brighter creative-tool energy.",
    config: {
      radius: 26,
      shadow: 44,
      spacing: 21,
      fontFamily: "manrope",
      fontScale: 103,
      containerWidth: 86,
      panelPadding: 20,
      cardPadding: 16,
      moduleGap: 15,
      toolbarHeight: 58,
      toolbarPaddingX: 26,
      buttonHeight: 46,
      buttonPaddingX: 22,
      inputHeight: 52,
      inputPaddingX: 16,
      buttonRoundness: 999,
      inputRoundness: 24,
      badgeRoundness: 999,
      heroContentMaxWidth: 600,
      tileMinHeight: 138,
      surfaceContrast: 68,
      borderStrength: 42,
      accentTintStrength: 46,
      textColor: "#2a1f19",
      mutedTextColor: "#7a685d",
      backgroundColor: "#fff6e7",
      surfaceColor: "#fffdf8",
      accentColor: "#f29b38",
      buttonColor: "#e56a2c",
      useGradient: true,
      gradientStart: "#fff3d7",
      gradientEnd: "#ffd5a8",
      gradientDirection: "135deg",
    },
  },
];

export const defaultThemeConfig = themePresets[0].config;

export const gradientSwatches = [
  {
    name: "Aurora",
    start: "#6ee7ff",
    end: "#5b45ff",
    direction: "135deg" as ThemeGradientDirection,
  },
  {
    name: "Flare",
    start: "#ffce8a",
    end: "#ff6b6b",
    direction: "180deg" as ThemeGradientDirection,
  },
  {
    name: "Terminal",
    start: "#183850",
    end: "#7cff67",
    direction: "225deg" as ThemeGradientDirection,
  },
  {
    name: "Orchid",
    start: "#fbc2eb",
    end: "#7f7fd5",
    direction: "90deg" as ThemeGradientDirection,
  },
];

const fontStacks: Record<ThemeFontKey, string> = {
  inter: "var(--font-inter), sans-serif",
  geist: "var(--font-geist), sans-serif",
  poppins: "var(--font-poppins), sans-serif",
  manrope: "var(--font-manrope), sans-serif",
  playfair: "var(--font-playfair), serif",
};

export function getThemeFontLabel(fontKey: ThemeFontKey) {
  return fontOptions.find((option) => option.value === fontKey)?.label ?? "Inter";
}

export function getThemeFontFamily(fontKey: ThemeFontKey) {
  return fontStacks[fontKey];
}

export function getGradientDirectionLabel(direction: ThemeGradientDirection) {
  return (
    gradientDirections.find((option) => option.value === direction)?.label ??
    "Diagonal Rise"
  );
}

export function hexToRgba(hex: string, alpha: number) {
  const normalized = normalizeHexColor(hex)?.slice(1) ?? "000000";

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function getReadableTextColor(hex: string) {
  const normalized = normalizeHexColor(hex)?.slice(1) ?? "000000";

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  return luminance > 0.58 ? "#0f172a" : "#f8fafc";
}

export function normalizeHexColor(hex: string) {
  const sanitized = hex.trim().replace(/^#/, "").replace(/[^0-9a-f]/gi, "");

  if (sanitized.length === 3) {
    return `#${sanitized
      .toLowerCase()
      .split("")
      .map((char) => char + char)
      .join("")}`;
  }

  if (sanitized.length === 6) {
    return `#${sanitized.toLowerCase()}`;
  }

  return null;
}

type RgbColor = {
  r: number;
  g: number;
  b: number;
};

export function hexToRgb(hex: string) {
  const normalized = normalizeHexColor(hex);
  if (!normalized) {
    return null;
  }

  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  } satisfies RgbColor;
}

export function rgbToHex({ r, g, b }: RgbColor) {
  const toHex = (value: number) =>
    Math.round(Math.max(0, Math.min(255, value)))
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function mixHexColors(colorA: string, colorB: string, amount = 0.5) {
  const first = hexToRgb(colorA) ?? { r: 0, g: 0, b: 0 };
  const second = hexToRgb(colorB) ?? { r: 255, g: 255, b: 255 };
  const weight = Math.max(0, Math.min(1, amount));

  return rgbToHex({
    r: first.r + (second.r - first.r) * weight,
    g: first.g + (second.g - first.g) * weight,
    b: first.b + (second.b - first.b) * weight,
  });
}

export function blendHexColors(
  foreground: string,
  background: string,
  alpha: number,
) {
  return mixHexColors(background, foreground, alpha);
}

function getRelativeLuminance(hex: string) {
  const rgb = hexToRgb(hex) ?? { r: 0, g: 0, b: 0 };
  const convert = (channel: number) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return (
    0.2126 * convert(rgb.r) +
    0.7152 * convert(rgb.g) +
    0.0722 * convert(rgb.b)
  );
}

export function getContrastRatio(foreground: string, background: string) {
  const light = getRelativeLuminance(foreground);
  const dark = getRelativeLuminance(background);
  const [brighter, dimmer] = light > dark ? [light, dark] : [dark, light];

  return (brighter + 0.05) / (dimmer + 0.05);
}

export function ensureReadableTextColor(
  foreground: string,
  background: string,
  minRatio = 4.5,
) {
  const safeForeground = normalizeHexColor(foreground) ?? "#111827";
  const safeBackground = normalizeHexColor(background) ?? "#ffffff";

  if (getContrastRatio(safeForeground, safeBackground) >= minRatio) {
    return safeForeground;
  }

  const darkTarget = "#0f172a";
  const lightTarget = "#f8fafc";
  const target =
    getContrastRatio(lightTarget, safeBackground) >=
    getContrastRatio(darkTarget, safeBackground)
      ? lightTarget
      : darkTarget;

  for (let step = 1; step <= 12; step += 1) {
    const candidate = mixHexColors(safeForeground, target, step / 12);
    if (getContrastRatio(candidate, safeBackground) >= minRatio) {
      return candidate;
    }
  }

  return target;
}

export function buildShadow(strength: number, color = "#0f172a") {
  const y = Math.round(14 + strength * 0.22);
  const blur = Math.round(28 + strength * 0.55);
  const spread = Math.round(strength * -0.12);

  return `0 ${y}px ${blur}px ${spread}px ${hexToRgba(
    color,
    0.12 + strength / 300,
  )}`;
}

function describeSpacing(spacing: number) {
  if (spacing < 18) return "compact";
  if (spacing < 23) return "balanced";
  return "airy";
}

function describeShadow(strength: number) {
  if (strength < 35) return "soft";
  if (strength < 70) return "layered";
  return "cinematic";
}

type ThemePromptOptions = {
  includeCssVariables?: boolean;
  includeImplementationRules?: boolean;
};

export function buildThemePrompt(
  config: ThemeConfig,
  options: ThemePromptOptions = {},
) {
  const {
    includeCssVariables = true,
    includeImplementationRules = true,
  } = options;
  const backgroundTreatment = config.useGradient
    ? `linear-gradient(${config.gradientDirection}, ${config.gradientStart}, ${config.gradientEnd}) layered over ${config.backgroundColor}`
    : `solid ${config.backgroundColor} with subtle tonal depth`;

  const cssVariables = includeCssVariables
    ? `

CSS variables
:root {
  --tf-radius: ${config.radius}px;
  --tf-panel-padding: ${config.panelPadding}px;
  --tf-card-padding: ${config.cardPadding}px;
  --tf-module-gap: ${config.moduleGap}px;
  --tf-toolbar-height: ${config.toolbarHeight}px;
  --tf-toolbar-padding-x: ${config.toolbarPaddingX}px;
  --tf-button-radius: ${config.buttonRoundness}px;
  --tf-button-height: ${config.buttonHeight}px;
  --tf-button-padding-x: ${config.buttonPaddingX}px;
  --tf-input-radius: ${config.inputRoundness}px;
  --tf-input-height: ${config.inputHeight}px;
  --tf-input-padding-x: ${config.inputPaddingX}px;
  --tf-badge-radius: ${config.badgeRoundness}px;
  --tf-hero-content-max-width: ${config.heroContentMaxWidth}px;
  --tf-tile-min-height: ${config.tileMinHeight}px;
  --tf-text: ${config.textColor};
  --tf-muted: ${config.mutedTextColor};
  --tf-bg: ${config.backgroundColor};
  --tf-surface: ${config.surfaceColor};
  --tf-surface-contrast: ${config.surfaceContrast};
  --tf-border-strength: ${config.borderStrength};
  --tf-accent-tint-strength: ${config.accentTintStrength};
  --tf-accent: ${config.accentColor};
  --tf-button: ${config.buttonColor};
}`
    : "";

  const implementationRules = includeImplementationRules
    ? `

Implementation rules
- Apply the tokens above before styling any component details.
- Typography should use ${getThemeFontLabel(config.fontFamily)} at roughly ${config.fontScale}% scale.
- Cards should feel ${describeShadow(config.shadow)} with ${describeSpacing(config.spacing)} spacing.
- Major toolbars should target about ${config.toolbarHeight}px height with ${config.toolbarPaddingX}px side padding.
- Badges and utility pills should use about ${config.badgeRoundness}px radius.
- Hero-style copy blocks should stay near ${config.heroContentMaxWidth}px max width.
- Stats and summary tiles should keep at least ${config.tileMinHeight}px height.
- Use accent color for highlights, focus states, charts, badges, and premium moments.
- Use button color for primary CTAs and keep secondary actions lower contrast.
- Match radius across cards, inputs, and overlays, while buttons use their own radius token.
- Do not introduce extra brand colors unless accessibility requires it.`
    : "";

  return `Use the following Theme Forge system for every UI surface, component, and landing-page section.

Goal
- Make the interface feel premium, creative, and AI-product ready.
- Keep the system consistent across navigation, hero, cards, forms, CTAs, and dashboard modules.

Theme tokens
${JSON.stringify(
  {
    fontFamily: getThemeFontLabel(config.fontFamily),
    fontScale: `${config.fontScale}%`,
    radius: `${config.radius}px`,
    panelPadding: `${config.panelPadding}px`,
    cardPadding: `${config.cardPadding}px`,
    moduleGap: `${config.moduleGap}px`,
    toolbarHeight: `${config.toolbarHeight}px`,
    toolbarPaddingX: `${config.toolbarPaddingX}px`,
    buttonRadius: `${config.buttonRoundness}px`,
    buttonHeight: `${config.buttonHeight}px`,
    buttonPaddingX: `${config.buttonPaddingX}px`,
    inputRadius: `${config.inputRoundness}px`,
    inputHeight: `${config.inputHeight}px`,
    inputPaddingX: `${config.inputPaddingX}px`,
    badgeRoundness: `${config.badgeRoundness}px`,
    heroContentMaxWidth: `${config.heroContentMaxWidth}px`,
    tileMinHeight: `${config.tileMinHeight}px`,
    shadowIntensity: `${config.shadow}/100`,
    spacingDensity: `${config.spacing}px`,
    containerWidth: `${config.containerWidth}%`,
    surfaceContrast: `${config.surfaceContrast}/100`,
    borderStrength: `${config.borderStrength}/100`,
    accentTintStrength: `${config.accentTintStrength}/100`,
    textColor: config.textColor,
    mutedTextColor: config.mutedTextColor,
    backgroundColor: config.backgroundColor,
    surfaceColor: config.surfaceColor,
    accentColor: config.accentColor,
    buttonColor: config.buttonColor,
    backgroundTreatment,
  },
  null,
  2,
)}
${cssVariables}
${implementationRules}

Return production-ready UI code plus the CSS variables needed to preserve this theme.`;
}
