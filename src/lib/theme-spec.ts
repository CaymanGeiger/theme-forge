import {
  buildShadow,
  getReadableTextColor,
  getThemeFontLabel,
} from "@/lib/theme-presets";
import {
  stackOptions,
  type ThemeArtifact,
  type ThemeConfig,
  type ThemeForgeSpec,
  type ThemeOutputStack,
} from "@/lib/theme-types";

type ArtifactOptions = {
  stack: ThemeOutputStack;
  includePromptFile: boolean;
  includeComponentRules: boolean;
};

function round(value: number, precision = 2) {
  return Number(value.toFixed(precision));
}

function getStackLabel(stack: ThemeOutputStack) {
  return stackOptions.find((option) => option.value === stack)?.label ?? "React + shadcn/ui";
}

function getBackgroundTreatment(spec: ThemeForgeSpec) {
  return spec.useGradient
    ? `linear-gradient(${spec.gradientDirection}, ${spec.gradientStart}, ${spec.gradientEnd}) layered over ${spec.backgroundColor}`
    : `solid ${spec.backgroundColor}`;
}

export function buildThemeForgeSpec(config: ThemeConfig): ThemeForgeSpec {
  return {
    fontFamily: getThemeFontLabel(config.fontFamily),
    fontScale: round(config.fontScale / 100),
    radius: config.radius,
    panelPadding: config.panelPadding,
    cardPadding: config.cardPadding,
    moduleGap: config.moduleGap,
    toolbarHeight: config.toolbarHeight,
    toolbarPaddingX: config.toolbarPaddingX,
    buttonRadius: config.buttonRoundness,
    buttonHeight: config.buttonHeight,
    buttonPaddingX: config.buttonPaddingX,
    inputRadius: config.inputRoundness,
    inputHeight: config.inputHeight,
    inputPaddingX: config.inputPaddingX,
    badgeRoundness: config.badgeRoundness,
    heroContentMaxWidth: config.heroContentMaxWidth,
    tileMinHeight: config.tileMinHeight,
    spacingDensity: config.spacing,
    shadowIntensity: config.shadow,
    containerWidth: round(config.containerWidth / 100),
    surfaceContrast: config.surfaceContrast,
    borderStrength: config.borderStrength,
    accentTintStrength: config.accentTintStrength,
    textColor: config.textColor,
    mutedTextColor: config.mutedTextColor,
    backgroundColor: config.backgroundColor,
    surfaceColor: config.surfaceColor,
    accentColor: config.accentColor,
    buttonColor: config.buttonColor,
    useGradient: config.useGradient,
    gradientStart: config.gradientStart,
    gradientEnd: config.gradientEnd,
    gradientDirection: config.gradientDirection,
  };
}

export function buildThemeForgeJson(spec: ThemeForgeSpec) {
  return JSON.stringify(spec, null, 2);
}

export function buildThemeCss(spec: ThemeForgeSpec) {
  return `:root {
  --tf-font-family: "${spec.fontFamily}", sans-serif;
  --tf-font-scale: ${spec.fontScale};
  --tf-radius: ${spec.radius}px;
  --tf-panel-padding: ${spec.panelPadding}px;
  --tf-card-padding: ${spec.cardPadding}px;
  --tf-module-gap: ${spec.moduleGap}px;
  --tf-toolbar-height: ${spec.toolbarHeight}px;
  --tf-toolbar-padding-x: ${spec.toolbarPaddingX}px;
  --tf-button-radius: ${spec.buttonRadius}px;
  --tf-button-height: ${spec.buttonHeight}px;
  --tf-button-padding-x: ${spec.buttonPaddingX}px;
  --tf-input-radius: ${spec.inputRadius}px;
  --tf-input-height: ${spec.inputHeight}px;
  --tf-input-padding-x: ${spec.inputPaddingX}px;
  --tf-badge-radius: ${spec.badgeRoundness}px;
  --tf-hero-content-max-width: ${spec.heroContentMaxWidth}px;
  --tf-tile-min-height: ${spec.tileMinHeight}px;
  --tf-spacing-density: ${spec.spacingDensity}px;
  --tf-shadow-intensity: ${spec.shadowIntensity};
  --tf-container-width: ${round(spec.containerWidth * 100)}%;
  --tf-surface-contrast: ${spec.surfaceContrast};
  --tf-border-strength: ${spec.borderStrength};
  --tf-accent-tint-strength: ${spec.accentTintStrength};
  --tf-text: ${spec.textColor};
  --tf-muted: ${spec.mutedTextColor};
  --tf-background: ${spec.backgroundColor};
  --tf-surface: ${spec.surfaceColor};
  --tf-accent: ${spec.accentColor};
  --tf-button: ${spec.buttonColor};
  --tf-gradient-start: ${spec.gradientStart};
  --tf-gradient-end: ${spec.gradientEnd};
  --tf-gradient-direction: ${spec.gradientDirection};
  --tf-background-treatment: ${getBackgroundTreatment(spec)};
  --tf-card-shadow: ${buildShadow(spec.shadowIntensity)};
}

body {
  color: var(--tf-text);
  background: ${spec.useGradient ? "var(--tf-background-treatment)" : "var(--tf-background)"};
  font-family: var(--tf-font-family);
}

.theme-surface {
  background: var(--tf-surface);
  color: var(--tf-text);
  border-radius: var(--tf-radius);
  box-shadow: var(--tf-card-shadow);
}

.theme-button-primary {
  background: var(--tf-button);
  color: ${getReadableTextColor(spec.buttonColor)};
  border-radius: var(--tf-button-radius);
}
`;
}

export function buildComponentRules(spec: ThemeForgeSpec) {
  return `# Component Rules

## Hard Constraints

- Use only the tokens defined in \`themeforge.json\` and \`theme.css\`.
- Do not introduce new colors, radii, shadows, spacing scales, or gradients.
- Reuse the same component styling rules across navigation, hero, cards, forms, stats, dialogs, and empty states.
- Keep the interface visually consistent across both app shells and marketing surfaces.

## Component Rules

- Cards: use \`${spec.surfaceColor}\`, shared ${spec.radius}px radius, and a ${spec.shadowIntensity}/100 depth profile.
- Major panels: use ${spec.panelPadding}px internal spacing before nested modules.
- Inner cards and stats: use ${spec.cardPadding}px internal spacing for a consistent density profile.
- Module spacing: keep major preview sections separated by roughly ${spec.moduleGap}px.
- Toolbar sizing: nav bars and control rails should target roughly ${spec.toolbarHeight}px height with about ${spec.toolbarPaddingX}px horizontal inset.
- Primary buttons: use \`${spec.buttonColor}\` with the shared ${spec.buttonRadius}px button radius.
- Primary and secondary buttons: target roughly ${spec.buttonHeight}px height with about ${spec.buttonPaddingX}px horizontal padding.
- Secondary buttons: derive from surface and text tokens instead of inventing new fills.
- Inputs and selects: use the dedicated ${spec.inputRadius}px input radius, roughly ${spec.inputHeight}px field height, and about ${spec.inputPaddingX}px horizontal padding.
- Badges and pills: use the shared ${spec.badgeRoundness}px radius instead of inventing one-off chip shapes.
- Hero-style copy blocks: keep their readable measure near ${spec.heroContentMaxWidth}px max width.
- Stats and summary tiles: hold at least about ${spec.tileMinHeight}px height so density stays consistent.
- Accent color: reserve \`${spec.accentColor}\` for focus states, badges, charts, highlights, and premium moments.
- Border strength: keep outlines aligned to the shared ${spec.borderStrength}/100 border profile.
- Surface contrast: hold cards and nested surfaces to the shared ${spec.surfaceContrast}/100 separation from the canvas.
- Accent tint strength: keep tinted tiles and highlights aligned to the shared ${spec.accentTintStrength}/100 tint profile.
- Background treatment: ${getBackgroundTreatment(spec)}.
- Typography: use ${spec.fontFamily} at ${round(spec.fontScale * 100)}% scale for the full system.

## Forbidden Patterns

- Avoid random gradients outside the specified background treatment.
- Avoid multiple accent colors.
- Avoid sharp corners that ignore the shared radius system.
- Avoid one-off button treatments that drift from the shared button token.
- Avoid ad hoc spacing values when the shared density token already covers the layout.
`;
}

export function buildTailwindConfig(spec: ThemeForgeSpec) {
  return `import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        background: "${spec.backgroundColor}",
        surface: "${spec.surfaceColor}",
        foreground: "${spec.textColor}",
        muted: "${spec.mutedTextColor}",
        accent: "${spec.accentColor}",
        button: "${spec.buttonColor}",
      },
      fontFamily: {
        sans: ["${spec.fontFamily}", "sans-serif"],
      },
      borderRadius: {
        card: "${spec.radius}px",
        button: "${spec.buttonRadius}px",
        input: "${spec.inputRadius}px",
        badge: "${spec.badgeRoundness}px",
      },
      boxShadow: {
        card: "${buildShadow(spec.shadowIntensity)}",
      },
      maxWidth: {
        content: "${round(spec.containerWidth * 100)}%",
      },
    },
  },
};

export default config;
`;
}

export function buildMuiTheme(spec: ThemeForgeSpec) {
  return `import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "${spec.buttonColor}" },
    secondary: { main: "${spec.accentColor}" },
    background: {
      default: "${spec.backgroundColor}",
      paper: "${spec.surfaceColor}",
    },
    text: {
      primary: "${spec.textColor}",
      secondary: "${spec.mutedTextColor}",
    },
  },
  shape: {
    borderRadius: ${spec.radius},
  },
  typography: {
    fontFamily: "${spec.fontFamily}, sans-serif",
    htmlFontSize: ${round(16 * spec.fontScale, 1)},
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: ${spec.radius},
          boxShadow: "${buildShadow(spec.shadowIntensity)}",
          backgroundColor: "${spec.surfaceColor}",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: ${spec.buttonRadius},
          textTransform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: ${spec.inputRadius},
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: ${spec.badgeRoundness},
        },
      },
    },
  },
});

export default theme;
`;
}

export function buildPromptFromSpec(
  spec: ThemeForgeSpec,
  stack: ThemeOutputStack,
  includeComponentRules: boolean,
) {
  const stackLabel = getStackLabel(stack);

  return `# Build Prompt

Build a ${stackLabel} interface using the theme defined in \`themeforge.json\` and \`theme.css\`.

## Required Inputs

- \`themeforge.json\` is the source-of-truth design spec.
- \`theme.css\` defines the CSS variables and base surface behavior.
${stack === "react-tailwind" || stack === "react-shadcn" ? "- `tailwind.config.ts` extends the tokens into the Tailwind layer." : ""}
${stack === "react-mui" ? "- `mui-theme.ts` is the framework theme object and should stay aligned with the JSON spec." : ""}
${includeComponentRules ? "- `component-rules.md` defines the guardrails for cards, buttons, inputs, surfaces, and forbidden drift." : ""}

## Hard Constraints

- Use only the provided tokens and CSS variables.
- Do not introduce additional brand colors, gradients, radii, or shadow systems.
- Reuse the same component styling rules throughout the interface.
- Keep cards, buttons, inputs, nav, stats, and empty states visibly part of the same system.

## Theme Summary

- Font: ${spec.fontFamily}
- Font scale: ${round(spec.fontScale * 100)}%
- Radius: ${spec.radius}px
- Panel padding: ${spec.panelPadding}px
- Card padding: ${spec.cardPadding}px
- Module gap: ${spec.moduleGap}px
- Toolbar height: ${spec.toolbarHeight}px
- Toolbar padding X: ${spec.toolbarPaddingX}px
- Button radius: ${spec.buttonRadius}px
- Button height: ${spec.buttonHeight}px
- Button padding X: ${spec.buttonPaddingX}px
- Input radius: ${spec.inputRadius}px
- Input height: ${spec.inputHeight}px
- Input padding X: ${spec.inputPaddingX}px
- Badge roundness: ${spec.badgeRoundness}px
- Hero content max width: ${spec.heroContentMaxWidth}px
- Tile minimum height: ${spec.tileMinHeight}px
- Spacing density: ${spec.spacingDensity}px
- Shadow intensity: ${spec.shadowIntensity}/100
- Surface contrast: ${spec.surfaceContrast}/100
- Border strength: ${spec.borderStrength}/100
- Accent tint strength: ${spec.accentTintStrength}/100
- Background treatment: ${getBackgroundTreatment(spec)}

## Forbidden Patterns

- Avoid random gradients.
- Avoid multiple accent colors.
- Avoid sharp corners that ignore the radius tokens.
- Avoid custom spacing scales that drift from the shared density.

## Deliverable

Return production-ready UI code that clearly follows the provided theme files. The prompt defines what to build. The theme files define how it must look.
`;
}

export function getThemeArtifacts(
  config: ThemeConfig,
  options: ArtifactOptions,
) {
  const spec = buildThemeForgeSpec(config);

  const artifacts: ThemeArtifact[] = [
    {
      id: "themeforge-json",
      fileName: "themeforge.json",
      label: "Theme Spec",
      description: "Primary source-of-truth spec generated from the visual builder.",
      content: buildThemeForgeJson(spec),
    },
    {
      id: "theme-css",
      fileName: "theme.css",
      label: "CSS Variables",
      description: "Tokenized CSS variables and baseline surface behavior.",
      content: buildThemeCss(spec),
    },
  ];

  if (options.includeComponentRules) {
    artifacts.push({
      id: "component-rules",
      fileName: "component-rules.md",
      label: "Component Rules",
      description: "Hard constraints, component-level rules, and forbidden patterns.",
      content: buildComponentRules(spec),
    });
  }

  if (options.stack === "react-tailwind" || options.stack === "react-shadcn") {
    artifacts.push({
      id: "tailwind-config",
      fileName: "tailwind.config.ts",
      label: "Tailwind Config",
      description: "Tailwind extensions aligned to the generated theme spec.",
      content: buildTailwindConfig(spec),
    });
  }

  if (options.stack === "react-mui") {
    artifacts.push({
      id: "mui-theme",
      fileName: "mui-theme.ts",
      label: "MUI Theme",
      description: "Material UI theme object synchronized to the generated spec.",
      content: buildMuiTheme(spec),
    });
  }

  if (options.includePromptFile) {
    artifacts.push({
      id: "prompt-md",
      fileName: "prompt.md",
      label: "Build Prompt",
      description: "AI-facing build instructions derived from the theme spec bundle.",
      content: buildPromptFromSpec(
        spec,
        options.stack,
        options.includeComponentRules,
      ),
    });
  }

  return { spec, artifacts };
}
