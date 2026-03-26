"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useCallback, useLayoutEffect, useState } from "react";

import { LivePreview } from "@/components/builder/live-preview";
import { PromptPreview } from "@/components/builder/prompt-preview";
import { ThemeControls } from "@/components/builder/theme-controls";
import { useThemeBuilderState } from "@/components/builder/use-theme-builder-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  themedTabsListClass,
  themedTabsTriggerClass,
} from "@/lib/theme-tab-styles";

const workspaceTabs = ["controls", "preview", "outputs"] as const;
type WorkspaceTab = (typeof workspaceTabs)[number];

export function ThemeForgeStudio() {
  const {
    themeConfig,
    activePresetId,
    applyPreset,
    patchTheme,
    presets,
    siteAccentColor,
    updateTheme,
  } = useThemeBuilderState();
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("controls");
  const [tabDirection, setTabDirection] = useState<1 | -1>(1);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const handleTabChange = useCallback((nextValue: string) => {
    if (!workspaceTabs.includes(nextValue as WorkspaceTab)) {
      return;
    }

    setActiveTab((currentTab) => {
      if (currentTab === nextValue) {
        return currentTab;
      }

      const currentIndex = workspaceTabs.indexOf(currentTab);
      const nextIndex = workspaceTabs.indexOf(nextValue as WorkspaceTab);
      setTabDirection(nextIndex > currentIndex ? 1 : -1);

      return nextValue as WorkspaceTab;
    });
  }, []);

  const sectionEnter = {
    initial: { opacity: 0, scale: 0.985, filter: "blur(12px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  } as const;

  const renderWorkspacePanel = () => {
    switch (activeTab) {
      case "controls":
        return (
          <ThemeControls
            activePresetId={activePresetId}
            animateOnMount={false}
            config={themeConfig}
            contentClassName="lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto"
            onApplyPreset={applyPreset}
            onPatch={patchTheme}
            onUpdate={updateTheme}
            panelClassName="lg:max-h-[calc(100vh-12rem)]"
            presets={presets}
            sticky={false}
          />
        );
      case "preview":
        return <LivePreview config={themeConfig} />;
      case "outputs":
        return (
          <PromptPreview
            accentColor={siteAccentColor}
            animateOnMount={false}
            config={themeConfig}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_72%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1520px] flex-col gap-8 px-4 pb-12 pt-4 sm:px-8 lg:px-10 lg:pb-16 lg:pt-6">
        <motion.section
          animate={sectionEnter.animate}
          className="rounded-[38px] border border-white/70 bg-white/58 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:p-7"
          data-forge-hero
          initial={sectionEnter.initial}
          transition={{ duration: 0.52, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Button
                asChild
                className="mb-4 h-10 rounded-full px-4 text-sm"
                variant="outline"
              >
                <Link href="/">
                  <ArrowLeft className="size-4" />
                  Back home
                </Link>
              </Button>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                Theme Forge Studio
              </p>
              <h1 className="balanced-text font-[family-name:var(--font-geist)] text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                Controls, preview, and outputs in one focused workspace.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Move between controls, the responsive preview, and generated
                outputs without losing your current theme state. The whole forge
                now uses the same tabbed flow on every screen size.
              </p>
            </div>

            <Card className="gap-0 rounded-[28px] border-white/80 bg-white/78 py-0 shadow-[0_16px_40px_rgba(15,23,42,0.06)] lg:max-w-sm">
              <CardContent className="p-4 text-sm leading-6 text-slate-600">
                <p className="font-semibold text-slate-950">Recommended flow</p>
                <p className="mt-2">
                  Tune the theme in Controls, check it in Preview, then grab the
                  spec and files in Outputs once the system feels locked.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section
          animate={sectionEnter.animate}
          className="w-full"
          data-forge-workspace
          initial={sectionEnter.initial}
          transition={{ duration: 0.56, ease: "easeOut", delay: 0.08 }}
        >
          <Tabs
            className="w-full"
            onValueChange={handleTabChange}
            value={activeTab}
          >
            <TabsList className={themedTabsListClass} data-forge-tabs>
              <TabsTrigger
                className={themedTabsTriggerClass}
                id="forge-tab-controls"
                value="controls"
              >
                Controls
              </TabsTrigger>
              <TabsTrigger
                className={themedTabsTriggerClass}
                id="forge-tab-preview"
                value="preview"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                className={themedTabsTriggerClass}
                id="forge-tab-outputs"
                value="outputs"
              >
                Outputs
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div
            aria-labelledby={`forge-tab-${activeTab}`}
            className="overflow-x-clip pt-5"
            role="tabpanel"
          >
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: tabDirection > 0 ? 28 : -28 }}
              key={activeTab}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderWorkspacePanel()}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
