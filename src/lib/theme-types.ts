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

export type ThemeConfig = {
  radius: number;
  shadow: number;
  spacing: number;
  fontFamily: ThemeFontKey;
  fontScale: number;
  containerWidth: number;
  buttonRoundness: number;
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
