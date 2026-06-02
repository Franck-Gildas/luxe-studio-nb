"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE_MQ = "(max-width: 767px)";
const HOVER_SELECTOR =
  'a, button, input[type="submit"], input[type="button"], [role="button"], .btn-ghost, .btn-gold, .concierge-chip';

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);

    const applyMode = () => {
      const enabled = !mq.matches;
      setActive(enabled);
      document.documentElement.classList.toggle("custom-cursor-active", enabled);
    };

    applyMode();
    mq.addEventListener("change", applyMode);

    return () => {
      mq.removeEventListener("change", applyMode);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const onMove = (e: MouseEvent) => {
      dotPos.current.x = e.clientX;
      dotPos.current.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      setHovering(!!target.closest(HOVER_SELECTOR));
    };

    const tick = () => {
      const lerp = 0.12;
      ringPos.current.x += (dotPos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (dotPos.current.y - ringPos.current.y) * lerp;

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring) {
        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="custom-cursor"
      aria-hidden
      data-hovering={hovering ? "true" : "false"}
    >
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </div>
  );
}
