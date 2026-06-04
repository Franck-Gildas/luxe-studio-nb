"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./not-found.module.css";

const MOBILE_MQ = "(max-width: 767px)";
const REDUCED_MQ = "(prefers-reduced-motion: reduce)";
const LERP = 0.12;
const EMBER_COUNT = 8;
const EMBER_OFFSETS = [42, 55, 48, 58, 45, 52, 50, 46];
const EMBER_DELAYS = [0, 0.6, 1.2, 1.8, 2.4, 0.9, 1.5, 2.1];

function FlameIcon({
  className,
  gradId,
}: {
  className?: string;
  gradId: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="12" y1="0" x2="12" y2="36">
          <stop offset="0%" stopColor="#f4ddb2" />
          <stop offset="45%" stopColor="#e8c9a0" />
          <stop offset="100%" stopColor="#b89968" />
        </linearGradient>
      </defs>
      <path
        d="M12 2C8 10 4 14 4 20c0 4.4 3.6 8 8 8s8-3.6 8-8c0-6-4-10-8-18z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M12 14c-2 4-3 6-3 9 0 2.2 1.8 4 4 4s4-1.8 4-4c0-3-1-5-3-9z"
        fill="#f4ddb2"
        opacity="0.85"
      />
    </svg>
  );
}

export default function NotFound() {
  const { t } = useTranslation("common");
  const candleGradId = useId();
  const cursorGradId = useId();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const warmRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -999, y: -999 });
  const current = useRef({ x: -999, y: -999 });
  const rafRef = useRef(0);

  const useReveal = isDesktop && !reducedMotion;

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mobileMq = window.matchMedia(MOBILE_MQ);
    const reducedMq = window.matchMedia(REDUCED_MQ);

    const update = () => {
      setIsDesktop(!mobileMq.matches);
      setReducedMotion(reducedMq.matches);
    };

    update();
    mobileMq.addEventListener("change", update);
    reducedMq.addEventListener("change", update);

    return () => {
      mobileMq.removeEventListener("change", update);
      reducedMq.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (useReveal) {
      document.documentElement.classList.add("not-found-page");
    } else {
      document.documentElement.classList.remove("not-found-page");
    }
    return () => {
      document.documentElement.classList.remove("not-found-page");
    };
  }, [useReveal]);

  useEffect(() => {
    if (!useReveal) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;

      const x = `${current.current.x}px`;
      const y = `${current.current.y}px`;

      overlayRef.current?.style.setProperty("--nf-x", x);
      overlayRef.current?.style.setProperty("--nf-y", y);
      warmRef.current?.style.setProperty("--nf-x", x);
      warmRef.current?.style.setProperty("--nf-y", y);

      if (flameRef.current) {
        flameRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -100%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [useReveal]);

  const revealPortal =
    mounted && useReveal
      ? createPortal(
          <>
            <div ref={warmRef} className={styles.warmGlow} aria-hidden />
            <div ref={overlayRef} className={styles.darkOverlay} aria-hidden />
            <div ref={flameRef} className={styles.flameCursor} aria-hidden>
              <FlameIcon className={styles.flameSvg} gradId={cursorGradId} />
            </div>
          </>,
          document.body,
        )
      : null;

  const ambientPortal =
    mounted
      ? createPortal(
          <>
            <div className={styles.vignette} aria-hidden />
            <div className={styles.grain} aria-hidden />
          </>,
          document.body,
        )
      : null;

  return (
    <>
      {revealPortal}
      {ambientPortal}
      <main className={styles.root}>
        <div className={styles.content}>
          <div className={styles.candleWrap} aria-hidden>
            <div className={styles.candle}>
              <div className={styles.candleFlame}>
                <FlameIcon gradId={candleGradId} />
              </div>
              <span className={styles.wick} />
              {Array.from({ length: EMBER_COUNT }, (_, i) => (
                <span
                  key={i}
                  className={styles.ember}
                  style={{
                    left: `${EMBER_OFFSETS[i]}%`,
                    animationDelay: `${EMBER_DELAYS[i]}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <p className={styles.code}>{t("notFound.code")}</p>
          <h1 className={styles.title}>{t("notFound.title")}</h1>
          <p className={styles.subtitleFr}>{t("notFound.titleFr")}</p>
          <p className={styles.body}>{t("notFound.body")}</p>
          <Link href="/" className={styles.homeLink}>
            {t("notFound.home")} →
          </Link>
        </div>
      </main>
    </>
  );
}
