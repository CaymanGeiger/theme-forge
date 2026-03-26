# Theme Forge

Theme Forge is a homepage-first visual theme builder for AI-assisted product development.

It lets you tune typography, radius, spacing, shadows, colors, and gradients in real time, preview the system on a realistic UI canvas, and compile a reusable theme specification that can generate CSS variables, component rules, framework config, and AI build instructions.

## Links

- Live site: `https://theme-forge.caymangeiger.com`
- GitHub: [https://github.com/CaymanGeiger/theme-forge](https://github.com/CaymanGeiger/theme-forge)

## What Ships In V1

- Homepage-only product experience built with the Next.js App Router
- Preset-driven theme builder with a single source-of-truth `ThemeConfig`
- Generated `themeforge.json` spec as the foundation for downstream outputs
- Live responsive preview that updates immediately as controls change
- Stack-aware output bundle for React + Tailwind, React + shadcn/ui, React + MUI, and HTML + CSS
- Six built-in presets:
  - Minimal SaaS
  - Dark Glass
  - Neon
  - Soft Editorial
  - Developer Dashboard
  - Sunlit Studio

## Core Experience

The page is organized around three main pieces:

1. Presets
   Users can start from a full visual direction instead of a blank panel.

2. Theme Builder
   Controls update a single theme object in real time:
   - border radius
   - button roundness
   - shadow intensity
   - spacing density
   - font scale
   - container width
   - font family
   - text, surface, background, accent, and button colors
   - gradient mode, stops, direction, and swatches

3. Generated Outputs
   The current theme is compiled into a reusable file bundle:
   - `themeforge.json`
   - `theme.css`
   - `component-rules.md`
   - `prompt.md`
   - stack-aware framework files where applicable

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Motion for React
- `react-colorful`
- `lucide-react`
- shadcn-style UI primitives in `src/components/ui`

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/
  app/
    layout.tsx
    loading.tsx
    page.tsx
  components/
    builder/
      live-preview.tsx
      preset-grid.tsx
      prompt-preview.tsx
      theme-controls.tsx
    home/
      hero.tsx
      theme-forge-home.tsx
    ui/
      ...
  lib/
    theme-presets.ts
    theme-types.ts
    utils.ts
```

## Theme Model

The app is driven by a single `ThemeConfig` object:

```ts
type ThemeConfig = {
  radius: number
  shadow: number
  spacing: number
  fontFamily: ThemeFontKey
  fontScale: number
  containerWidth: number
  buttonRoundness: number
  textColor: string
  mutedTextColor: string
  backgroundColor: string
  surfaceColor: string
  accentColor: string
  buttonColor: string
  useGradient: boolean
  gradientStart: string
  gradientEnd: string
  gradientDirection: ThemeGradientDirection
}
```

That same object powers:

- the controls panel
- the responsive preview
- the generated prompt output
- preset application

## Notable Implementation Details

- Presets update the preview system and prompt content, while the broader page chrome stays visually stable.
- Top-level preset cards scroll the user directly into the builder after selection.
- Color values are normalized before updates to avoid render loops and no-op state churn.
- Preview contrast is derived defensively so shipped presets stay readable across light and dark systems.
- Sliders, tabs, selects, switches, inputs, cards, badges, separators, collapsibles, checkboxes, and loading states are all built on the shared UI layer in `src/components/ui`.

## Current Scope

Included now:

- homepage
- live theme controls
- preset application
- responsive system preview
- theme spec and output bundle panel
- polished motion and layout work

Not included yet:

- auth
- saving or sharing themes
- export flows
- multi-page app structure
- actual AI generation backend
- theme gallery

## Deployment

The project is set up for Vercel deployment.

If you are attaching a custom subdomain, verify:

- the subdomain has a `CNAME` pointing to the Vercel target shown in the dashboard
- the domain is attached to the correct Vercel project and scope
- local DNS caches are cleared if public DNS resolves correctly but your machine still shows `ERR_NAME_NOT_RESOLVED`

## Repository Notes

- Primary branch: `main`
- Current app title: `Theme Forge | Visual Theme Builder for AI Apps`
- Product framing: homepage-only v1 for a visual theme builder that creates reusable AI prompt instructions
