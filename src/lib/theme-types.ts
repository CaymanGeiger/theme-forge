export const fontOptions = [
  {
    value: "inter",
    label: "Inter",
    description: "Neutral, crisp, and product-ready.",
  },
  {
    value: "geist",
    label: "Geist",
    description: "Sharp and modern with a Vercel-like feel.",
  },
  {
    value: "poppins",
    label: "Poppins",
    description: "Friendly geometry with stronger personality.",
  },
  {
    value: "manrope",
    label: "Manrope",
    description: "Dense and contemporary for dashboards.",
  },
  {
    value: "playfair",
    label: "Playfair Display",
    description: "Editorial contrast for premium storytelling.",
  },
] as const;

export type ThemeFontKey = (typeof fontOptions)[number]["value"];

export const gradientDirections = [
  { value: "135deg", label: "Diagonal Rise" },
  { value: "90deg", label: "Left to Right" },
  { value: "180deg", label: "Top to Bottom" },
  { value: "225deg", label: "Diagonal Fall" },
] as const;

export type ThemeGradientDirection =
  (typeof gradientDirections)[number]["value"];

export const stackOptions = [
  {
    value: "react-tailwind",
    label: "React + Tailwind",
    description: "CSS variables, Tailwind config, and AI build guidance.",
  },
  {
    value: "react-shadcn",
    label: "React + shadcn/ui",
    description: "Tailwind-first output tuned for token-driven component systems.",
  },
  {
    value: "react-mui",
    label: "React + MUI",
    description: "Theme object output for MUI-driven app shells.",
  },
  {
    value: "html-css",
    label: "HTML + CSS",
    description: "Framework-light files for direct markup and stylesheet workflows.",
  },
] as const;

export type ThemeOutputStack = (typeof stackOptions)[number]["value"];

export type ThemeConfig = {
  radius: number;
  shadow: number;
  spacing: number;
  fontFamily: ThemeFontKey;
  fontScale: number;
  containerWidth: number;
  panelPadding: number;
  cardPadding: number;
  moduleGap: number;
  toolbarHeight: number;
  toolbarPaddingX: number;
  buttonHeight: number;
  buttonPaddingX: number;
  inputHeight: number;
  inputPaddingX: number;
  buttonRoundness: number;
  inputRoundness: number;
  badgeRoundness: number;
  heroContentMaxWidth: number;
  tileMinHeight: number;
  surfaceContrast: number;
  borderStrength: number;
  accentTintStrength: number;
  textColor: string;
  mutedTextColor: string;
  backgroundColor: string;
  surfaceColor: string;
  accentColor: string;
  buttonColor: string;
  useGradient: boolean;
  gradientStart: string;
  gradientEnd: string;
  gradientDirection: ThemeGradientDirection;
};

export type ThemePreset = {
  id: string;
  name: string;
  eyebrow: string;
  blurb: string;
  config: ThemeConfig;
};

export type ThemeForgeSpec = {
  fontFamily: string;
  fontScale: number;
  radius: number;
  panelPadding: number;
  cardPadding: number;
  moduleGap: number;
  toolbarHeight: number;
  toolbarPaddingX: number;
  buttonRadius: number;
  buttonHeight: number;
  buttonPaddingX: number;
  inputRadius: number;
  inputHeight: number;
  inputPaddingX: number;
  badgeRoundness: number;
  heroContentMaxWidth: number;
  tileMinHeight: number;
  spacingDensity: number;
  shadowIntensity: number;
  containerWidth: number;
  surfaceContrast: number;
  borderStrength: number;
  accentTintStrength: number;
  textColor: string;
  mutedTextColor: string;
  backgroundColor: string;
  surfaceColor: string;
  accentColor: string;
  buttonColor: string;
  useGradient: boolean;
  gradientStart: string;
  gradientEnd: string;
  gradientDirection: ThemeGradientDirection;
};

export type ThemeArtifact = {
  id: string;
  fileName: string;
  label: string;
  description: string;
  content: string;
};
