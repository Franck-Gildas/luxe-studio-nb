"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";

export function Concierge() {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const appendMessage = useCallback((text: string, className: string, html?: string) => {
    const body = bodyRef.current;
    if (!body) return;
    const el = document.createElement("div");
    el.className = `concierge-msg ${className}`;
    if (html) {
      el.innerHTML = html;
    } else {
      el.textContent = text;
    }
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }, []);

  const handleChipClick = (label: string) => {
    appendMessage(label, "you");
    window.setTimeout(() => {
      appendMessage(
        "",
        "them",
        "A pleasure. <em>Un instant</em> — I'll thread you to the right artist now."
      );
    }, 700);
  };

  return (
    <div className={`concierge${open ? " open" : ""}`}>
      <div className="concierge-panel" role="dialog" aria-label="Concierge">
        <div className="concierge-head">
          <div className="concierge-avatar" aria-hidden />
          <div className="concierge-id">
            <div className="name">Élise — Concierge</div>
            <div className="role">
              <span className="live" aria-hidden />
              Atelier · Moncton · open
            </div>
          </div>
          <button
            type="button"
            className="concierge-close"
            aria-label="Close concierge"
            onClick={() => setOpen(false)}
          >
            CLOSE
          </button>
        </div>

        <div className="concierge-body" ref={bodyRef}>
          <div className="concierge-msg them">
            <em>Bonsoir.</em> Welcome to the atelier. I&apos;m Élise — I tend the room when the artists are at the chair. How may I make the next hour yours?
          </div>
          <div className="concierge-chips">
            <button type="button" className="concierge-chip" onClick={() => handleChipClick("Book a ritual")}>
              ◇ Book a ritual
            </button>
            <Link href="/services" className="concierge-chip" onClick={() => setOpen(false)}>
              ◇ The menu
            </Link>
            <button type="button" className="concierge-chip" onClick={() => handleChipClick("Gift card")}>
              ◇ Gift card
            </button>
            <button type="button" className="concierge-chip" onClick={() => handleChipClick("Hours & address")}>
              ◇ Hours &amp; address
            </button>
          </div>
          <div className="concierge-msg them">
            Or simply tell me what your week has been like — I&apos;ll suggest something quiet.
            <span
              style={{
                display: "block",
                marginTop: 8,
                fontFamily: "var(--serif-italic)",
                fontStyle: "italic",
                color: "var(--rose)",
                fontSize: 13,
              }}
            >
              Je parle aussi français — n&apos;hésitez pas.
            </span>
          </div>
        </div>

        <div className="concierge-input">
          <input type="text" placeholder="A note, in EN or FR…" aria-label="Message" />
          <button type="button" className="send" aria-label="Send">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7 L 12 7 M 8 3 L 12 7 L 8 11"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="concierge-foot">
          <span className="glow">◇</span> Replies within the hour · réponse sous une heure
        </div>
      </div>

      <button
        type="button"
        className="concierge-bubble"
        aria-label="Open concierge"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="badge" aria-hidden />
        <svg viewBox="0 0 26 26" fill="none" aria-hidden>
          <path
            d="M5 9 C 5 6, 7 4, 10 4 L 16 4 C 19 4, 21 6, 21 9 L 21 14 C 21 17, 19 19, 16 19 L 11 19 L 6 22 L 7 19 C 6 19, 5 18, 5 17 Z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="11.5" r="0.9" fill="currentColor" />
          <circle cx="13" cy="11.5" r="0.9" fill="currentColor" />
          <circle cx="16" cy="11.5" r="0.9" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
