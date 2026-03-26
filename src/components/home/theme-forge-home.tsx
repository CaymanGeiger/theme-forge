"use client";

import { type MouseEvent } from "react";

import { HowItWorks } from "@/components/home/how-it-works";
import { HomeNav } from "@/components/home/home-nav";
import { ThemeForgeDemo } from "@/components/home/theme-forge-demo";
import { Hero } from "@/components/home/hero";
import { Button } from "@/components/ui/button";
import { smoothScrollToHash } from "@/lib/smooth-scroll";
import { themePresets } from "@/lib/theme-presets";

export function ThemeForgeHome() {
  const defaultPresetName = themePresets[0]?.name ?? "Minimal SaaS";
  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) {
      return;
    }

    if (smoothScrollToHash(href)) {
      event.preventDefault();
    }
  };

  return (
    <main className="relative overflow-hidden" id="top">
      <HomeNav />
      <div className="absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_72%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-10 px-4 pb-12 pt-24 sm:px-8 sm:pt-28 lg:px-10 lg:pb-16 lg:pt-[7.5rem]">
        <Hero
          accentColor={themePresets[0]?.config.accentColor ?? "#4f7cff"}
          activePresetName={defaultPresetName}
          primaryCtaHref="/theme-forge"
          primaryCtaLabel="Start Forging"
          secondaryCtaHref="#demo"
          secondaryCtaLabel="See Presets"
        />

        <ThemeForgeDemo />

        <HowItWorks />

        <footer className="flex flex-col gap-5 rounded-[32px] border border-white/70 bg-white/60 px-6 py-7 text-sm text-slate-600 shadow-[0_18px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-geist)] text-base font-semibold text-slate-950">
              Theme Forge
            </p>
            <p className="mt-1">
              Theme consistency for developers building websites and apps with AI.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <Button
              asChild
              className="h-auto p-0 text-sm font-medium text-slate-500 hover:text-slate-950"
              variant="link"
            >
              <a href="/theme-forge">Start Forging</a>
            </Button>
            <Button
              asChild
              className="h-auto p-0 text-sm font-medium text-slate-500 hover:text-slate-950"
              variant="link"
            >
              <a href="#demo" onClick={handleAnchorClick}>Presets</a>
            </Button>
            <Button
              asChild
              className="h-auto p-0 text-sm font-medium text-slate-500 hover:text-slate-950"
              variant="link"
            >
              <a href="#">GitHub</a>
            </Button>
          </div>
        </footer>
      </div>
    </main>
  );
}
