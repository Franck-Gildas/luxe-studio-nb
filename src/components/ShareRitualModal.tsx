"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "@/styles/share-ritual.css";
import {
  getDisplayDescription,
  getDisplayName,
  getTagline,
  type MenuService,
} from "@/data/services-menu";
import { useLang } from "@/lib/LanguageContext";
import { generateServiceCard } from "@/lib/generateServiceCard";
import { shareRitualCard } from "@/lib/share-ritual";

type ShareRitualModalProps = {
  open: boolean;
  service: MenuService | null;
  onClose: () => void;
};

type ToastKind = "copied" | "fail" | null;

export default function ShareRitualModal({
  open,
  service,
  onClose,
}: ShareRitualModalProps) {
  const { lang } = useLang();
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<ToastKind>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      sourceCanvasRef.current = null;
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => closeRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(t);
  }, [toast]);

  const ensureCard = useCallback(async (): Promise<Blob | null> => {
    if (!service) return null;

    if (sourceCanvasRef.current) {
      return new Promise((resolve) => {
        sourceCanvasRef.current?.toBlob(
          (blob) => resolve(blob),
          "image/png"
        );
      });
    }

    setBusy(true);
    try {
      const name = getDisplayName(service, lang);
      const desc = getDisplayDescription(service, lang);
      const tagline = getTagline(desc);
      const canvas = await generateServiceCard({
        name,
        price: service.price,
        duration: service.duration,
        tagline,
        serviceId: service.serviceId,
      });
      sourceCanvasRef.current = canvas;
      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png");
      });
    } catch (err) {
      console.error("Failed to generate service card:", err);
      return null;
    } finally {
      setBusy(false);
    }
  }, [service, lang]);

  const handleShare = useCallback(async () => {
    if (!service) return;
    setBusy(true);
    try {
      const blob = await ensureCard();
      if (!blob) {
        setToast("fail");
        return;
      }
      const result = await shareRitualCard(blob, service.serviceId);
      if (result === "clipboard") {
        setToast("copied");
      } else if (result === "failed") {
        setToast("fail");
      } else if (result === "shared") {
        onClose();
      }
    } finally {
      setBusy(false);
    }
  }, [ensureCard, service, onClose]);

  const handleDownload = useCallback(async () => {
    if (!service) return;
    setBusy(true);
    try {
      const blob = await ensureCard();
      if (!blob) {
        setToast("fail");
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `luxe-${service.serviceId}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  }, [ensureCard, service]);

  if (!mounted || !open || !service) return null;

  const displayName = getDisplayName(service, lang);

  return createPortal(
    <>
      <div
        className="share-ritual-overlay"
        role="presentation"
        onClick={onClose}
      >
        <div
          className="share-ritual-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-ritual-title"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            ref={closeRef}
            type="button"
            className="share-ritual-close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>

          <header className="share-ritual-header">
            <h2 id="share-ritual-title" className="share-ritual-heading">
              <span className="en-only">Share This Ritual</span>
              <span className="fr-block">Partager ce Rituel</span>
            </h2>
            <p className="share-ritual-service-name">{displayName}</p>
          </header>

          {busy && (
            <p className="share-ritual-loading" aria-live="polite">
              <span className="en-only">Preparing your card…</span>
              <span className="fr-block">Préparation de votre carte…</span>
            </p>
          )}

          <div className="share-ritual-actions">
            <button
              type="button"
              className="share-ritual-action share-ritual-action--primary"
              disabled={busy}
              onClick={() => void handleShare()}
            >
              <span className="en-only">Share</span>
              <span className="fr-block">Partager</span>
            </button>
            <button
              type="button"
              className="share-ritual-action"
              disabled={busy}
              onClick={() => void handleDownload()}
            >
              <span className="en-only">Download Card</span>
              <span className="fr-block">Télécharger la carte</span>
            </button>
          </div>

          <p className="share-ritual-hint">
            <span className="en-only">
              Share opens your device&apos;s apps — Messages, Instagram, and more.
            </span>
            <span className="fr-block">
              Partager ouvre les applications de votre appareil — Messages, Instagram, et plus.
            </span>
          </p>
        </div>
      </div>
      {toast === "copied" && (
        <div className="share-ritual-toast" role="status" aria-live="polite">
          <span className="en-only">
            Image copied — paste into your post
          </span>
          <span className="fr-block">
            Image copiée — collez dans votre publication
          </span>
        </div>
      )}
      {toast === "fail" && (
        <div className="share-ritual-toast" role="status" aria-live="polite">
          <span className="en-only">
            Could not share — try Download Card instead
          </span>
          <span className="fr-block">
            Partage impossible — essayez Télécharger la carte
          </span>
        </div>
      )}
    </>,
    document.body
  );
}
