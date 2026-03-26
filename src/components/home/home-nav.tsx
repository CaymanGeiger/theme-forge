"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { type MouseEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { smoothScrollToHash } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

const demoLinks = [
  {
    href: "#demo",
    title: "Presets",
    text: "Try visual directions and watch the preview update.",
  },
  {
    href: "#how-it-works",
    title: "How it works",
    text: "See how Theme Forge turns styles into files for your stack.",
  },
];

export function HomeNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) {
      return;
    }

    if (smoothScrollToHash(href)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-x-0 top-0 z-50"
      initial={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className={cn(
          "absolute inset-0 transition-all duration-300",
          isScrolled ? "bg-white/22 backdrop-blur-xl" : "bg-transparent",
        )}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-px transition-opacity duration-300",
          isScrolled
            ? "opacity-100 bg-[linear-gradient(90deg,transparent,rgba(17,24,39,0.14),transparent)]"
            : "opacity-70 bg-[linear-gradient(90deg,transparent,rgba(17,24,39,0.1),transparent)]",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute left-0 right-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_74%)] transition-opacity duration-300",
          isScrolled ? "opacity-0" : "opacity-100",
        )}
      />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            isScrolled
              ? "py-3"
              : "py-5",
          )}
        >
          <a className="group flex items-center gap-3" href="#top" onClick={handleAnchorClick}>
            <div className="relative">
              <motion.span
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(79,124,255,0.34),transparent_68%)] blur-xl"
                initial={{ opacity: 0, scale: 0.72 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
              />
              <div className="relative flex flex-col leading-none">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-slate-500">
                  Theme
                </span>
                <motion.span
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  className="brand-spectrum font-[family-name:var(--font-geist)] text-2xl font-semibold tracking-[-0.08em] sm:text-[1.75rem]"
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  transition={{ duration: 0.72, ease: "easeOut", delay: 0.06 }}
                >
                  Forge
                </motion.span>
              </div>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <HoverCard openDelay={120}>
              <HoverCardTrigger asChild>
                <Button
                  asChild
                  className={cn(
                    "rounded-full border px-4 text-sm font-medium shadow-none transition-all duration-300 hover:bg-white/70",
                    isScrolled
                      ? "h-9 border-white/30 bg-white/26 text-slate-700"
                      : "h-10 border-white/55 bg-white/56 text-slate-800",
                  )}
                  variant="outline"
                >
                  <a href="#demo" onClick={handleAnchorClick}>
                    Demo
                    <ChevronDown className="size-4" />
                  </a>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                align="end"
                className="brand-spectrum-shell w-[340px] rounded-[24px] border-0 bg-transparent p-[1px] shadow-[0_22px_60px_rgba(15,23,42,0.12)]"
                sideOffset={10}
              >
                <div className="rounded-[23px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.88))] p-2 backdrop-blur-xl">
                  <div className="grid gap-1">
                    {demoLinks.map((link) => (
                      <a
                        className="group block rounded-[18px] border border-transparent px-3 py-3 transition-colors hover:border-slate-200/80 hover:bg-white/90"
                        href={link.href}
                        key={link.href}
                        onClick={handleAnchorClick}
                      >
                        <span className="block">
                          <span className="block text-sm font-semibold text-slate-950">
                            {link.title}
                          </span>
                          <span className="mt-1 block text-sm leading-6 text-slate-600">
                            {link.text}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
