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
      buttonRoundness: 999,
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
      buttonRoundness: 999,
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
      buttonRoundness: 26,
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
      buttonRoundness: 999,
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
      buttonRoundness: 20,
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
  const sanitized = hex.replace("#", "");
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((char) => char + char)
          .join("")
      : sanitized;

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function getReadableTextColor(hex: string) {
  const sanitized = hex.replace("#", "");
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((char) => char + char)
          .join("")
      : sanitized;

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  return luminance > 0.58 ? "#0f172a" : "#f8fafc";
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

export function buildThemePrompt(config: ThemeConfig) {
  const backgroundTreatment = config.useGradient
    ? `linear-gradient(${config.gradientDirection}, ${config.gradientStart}, ${config.gradientEnd}) layered over ${config.backgroundColor}`
    : `solid ${config.backgroundColor} with subtle tonal depth`;

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
    buttonRadius: `${config.buttonRoundness}px`,
    shadowIntensity: `${config.shadow}/100`,
    spacingDensity: `${config.spacing}px`,
    containerWidth: `${config.containerWidth}%`,
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

CSS variables
:root {
  --tf-radius: ${config.radius}px;
  --tf-button-radius: ${config.buttonRoundness}px;
  --tf-text: ${config.textColor};
  --tf-muted: ${config.mutedTextColor};
  --tf-bg: ${config.backgroundColor};
  --tf-surface: ${config.surfaceColor};
  --tf-accent: ${config.accentColor};
  --tf-button: ${config.buttonColor};
}

Implementation rules
- Apply the tokens above before styling any component details.
- Typography should use ${getThemeFontLabel(config.fontFamily)} at roughly ${config.fontScale}% scale.
- Cards should feel ${describeShadow(config.shadow)} with ${describeSpacing(config.spacing)} spacing.
- Use accent color for highlights, focus states, charts, badges, and premium moments.
- Use button color for primary CTAs and keep secondary actions lower contrast.
- Match radius across cards, inputs, and overlays, while buttons use their own radius token.
- Do not introduce extra brand colors unless accessibility requires it.

Return production-ready UI code plus the CSS variables needed to preserve this theme.`;
}
