"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const ELISE_GREETING =
  "Bonjour — I'm Élise, your concierge at Luxe Studio NB. How may I assist you today?";

const FALLBACK_REPLY =
  "Forgive me — I'm momentarily unavailable. Please reach the studio directly at hello@luxestudionb.com or (506) 555-0187.";

export function Concierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const hasGreeted = useRef(false);

  const scrollToBottom = useCallback(() => {
    const body = bodyRef.current;
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (open && !hasGreeted.current) {
      hasGreeted.current = true;
      setMessages([{ role: "assistant", content: ELISE_GREETING }]);
    }
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMessage: ChatMessage = { role: "user", content: trimmed };
      const updatedHistory = [...messages, userMessage];

      setMessages(updatedHistory);
      setInput("");
      setIsTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedHistory }),
        });

        const data = await res.json();

        if (!res.ok || typeof data.content !== "string") {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: FALLBACK_REPLY },
          ]);
          return;
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: FALLBACK_REPLY },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
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
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`concierge-msg ${msg.role === "user" ? "you" : "them"}`}
            >
              {msg.content}
            </div>
          ))}

          {isTyping && (
            <div className="concierge-msg them typing" aria-label="Élise is typing">
              <span className="typing-dots">
                <span />
                <span />
                <span />
              </span>
            </div>
          )}

          <div className="concierge-chips">
            <button
              type="button"
              className="concierge-chip"
              disabled={isTyping}
              onClick={() => void sendMessage("Book a ritual")}
            >
              ◇ Book a ritual
            </button>
            <Link href="/services" className="concierge-chip" onClick={() => setOpen(false)}>
              ◇ The menu
            </Link>
            <button
              type="button"
              className="concierge-chip"
              disabled={isTyping}
              onClick={() => void sendMessage("Gift card")}
            >
              ◇ Gift card
            </button>
            <button
              type="button"
              className="concierge-chip"
              disabled={isTyping}
              onClick={() => void sendMessage("Hours & address")}
            >
              ◇ Hours &amp; address
            </button>
          </div>
        </div>

        <div className="concierge-input">
          <input
            type="text"
            placeholder="A note, in EN or FR…"
            aria-label="Message"
            value={input}
            disabled={isTyping}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="send"
            aria-label="Send"
            disabled={isTyping || !input.trim()}
            onClick={() => void sendMessage(input)}
          >
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
