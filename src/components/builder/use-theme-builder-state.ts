"use client";

import { startTransition, useMemo, useState } from "react";

import {
  defaultThemeConfig,
  normalizeHexColor,
  themePresets,
} from "@/lib/theme-presets";
import { type ThemeConfig } from "@/lib/theme-types";

const colorKeys = new Set<keyof ThemeConfig>([
  "textColor",
  "mutedTextColor",
  "backgroundColor",
  "surfaceColor",
  "accentColor",
  "buttonColor",
  "gradientStart",
  "gradientEnd",
]);

function normalizeThemeValue<K extends keyof ThemeConfig>(
  key: K,
  value: ThemeConfig[K],
  fallback: ThemeConfig[K],
) {
  if (colorKeys.has(key) && typeof value === "string") {
    return (normalizeHexColor(value) ?? fallback) as ThemeConfig[K];
  }

  return value;
}

export function useThemeBuilderState() {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    ...defaultThemeConfig,
  });
  const [activePresetId, setActivePresetId] = useState<string | null>(
    themePresets[0]?.id ?? null,
  );

  const activePreset = useMemo(
    () => themePresets.find((preset) => preset.id === activePresetId),
    [activePresetId],
  );

  function updateTheme<K extends keyof ThemeConfig>(
    key: K,
    value: ThemeConfig[K],
  ) {
    setActivePresetId((current) => (current === null ? current : null));
    setThemeConfig((current) => {
      const nextValue = normalizeThemeValue(key, value, current[key]);

      if (Object.is(current[key], nextValue)) {
        return current;
      }

      return { ...current, [key]: nextValue };
    });
  }

  function patchTheme(changes: Partial<ThemeConfig>) {
    setActivePresetId((current) => (current === null ? current : null));
    setThemeConfig((current) => {
      let hasChanges = false;
      const nextConfig = { ...current };

      for (const [rawKey, rawValue] of Object.entries(changes) as Array<
        [keyof ThemeConfig, ThemeConfig[keyof ThemeConfig] | undefined]
      >) {
        if (typeof rawValue === "undefined") {
          continue;
        }

        const nextValue = normalizeThemeValue(rawKey, rawValue, current[rawKey]);

        if (Object.is(current[rawKey], nextValue)) {
          continue;
        }

        nextConfig[rawKey] = nextValue as never;
        hasChanges = true;
      }

      return hasChanges ? nextConfig : current;
    });
  }

  function applyPreset(id: string) {
    const preset = themePresets.find((entry) => entry.id === id);
    if (!preset) return;

    startTransition(() => {
      setActivePresetId(id);
      setThemeConfig({ ...preset.config });
    });
  }

  return {
    themeConfig,
    activePresetId,
    activePreset,
    updateTheme,
    patchTheme,
    applyPreset,
    presets: themePresets,
    siteAccentColor: defaultThemeConfig.accentColor,
  };
}
