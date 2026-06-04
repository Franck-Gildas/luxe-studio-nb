"use client";

import { useEffect } from "react";
import {
  isRitualCategorySlug,
  RITUAL_SCROLL_STORAGE_KEY,
  SLUG_TO_SECTION,
} from "@/data/services-menu";

function scrollToRitualSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function useRitualDeepLinkScroll() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let slug = params.get("ritual");

    if (!slug) {
      slug = sessionStorage.getItem(RITUAL_SCROLL_STORAGE_KEY);
    }

    if (!slug || !isRitualCategorySlug(slug)) return;

    sessionStorage.removeItem(RITUAL_SCROLL_STORAGE_KEY);
    const sectionId = SLUG_TO_SECTION[slug];

    const cleanUrl = () => {
      if (params.has("ritual")) {
        window.history.replaceState(null, "", "/services");
      }
    };

    const attemptScroll = () => scrollToRitualSection(sectionId);

    const scheduleScrolls = () => {
      attemptScroll();
      const delays = [100, 400, 900, 1800, 2800];
      delays.forEach((ms) => {
        window.setTimeout(attemptScroll, ms);
      });
      window.setTimeout(cleanUrl, 3200);
    };

    if (document.readyState === "complete") {
      requestAnimationFrame(scheduleScrolls);
    } else {
      window.addEventListener("load", () => scheduleScrolls(), { once: true });
      requestAnimationFrame(scheduleScrolls);
    }
  }, []);
}
