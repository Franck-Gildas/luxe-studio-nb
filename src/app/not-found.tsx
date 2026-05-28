"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation("common");

  return (
    <main className="relative mx-auto flex min-h-[70vh] max-w-[1320px] flex-col items-center justify-center px-6 py-32 text-center">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[280px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_50%_20%,rgba(232,201,160,0.35)_0%,rgba(232,201,160,0.08)_40%,transparent_70%)]"
        aria-hidden
      />
      <div className="relative flex flex-col items-center gap-6">
        <div
          className="relative h-32 w-8 rounded-full bg-linear-to-b from-petal/80 via-champagne/40 to-charcoal border border-hairline shadow-[0_0_40px_rgba(232,201,160,0.15)]"
          aria-hidden
        >
          <span className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-champagne/30 blur-sm" />
          <span className="absolute top-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-champagne opacity-60" />
        </div>
        <p className="mono text-brass">{t("notFound.code")}</p>
        <h1 className="serif max-w-lg text-4xl leading-tight tracking-tight text-bone md:text-5xl">
          {t("notFound.title")}
        </h1>
        <p className="fr-accent max-w-md text-lg">{t("notFound.body")}</p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3 font-mono text-[10px] tracking-[0.2em] text-champagne uppercase transition-colors hover:border-champagne hover:bg-charcoal"
        >
          {t("notFound.home")} →
        </Link>
      </div>
    </main>
  );
}
