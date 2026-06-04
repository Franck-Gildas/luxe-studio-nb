"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "@/styles/share-ritual.css";
import { SharePlatformIcon, SHARE_PLATFORMS } from "@/components/SharePlatformIcon";
import {
  getDisplayDescription,
  getDisplayName,
  getTagline,
  type MenuService,
} from "@/data/services-menu";
import { useLang } from "@/lib/LanguageContext";
import { generateServiceCard } from "@/lib/generateServiceCard";
import {
  shareToPlatform,
  type SharePlatform,
} from "@/lib/share-ritual";

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
  const [generating, setGenerating] = useState(false);
  const [sharing, setSharing] = useState<SharePlatform | "download" | null>(
    null
  );
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

    setGenerating(true);
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
      setGenerating(false);
    }
  }, [service, lang]);

  const handleDownload = useCallback(async () => {
    if (!service) return;
    setSharing("download");
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
      setSharing(null);
    }
  }, [ensureCard, service]);

  const handlePlatformShare = useCallback(
    async (platform: SharePlatform) => {
      if (!service) return;
      setSharing(platform);
      try {
        const blob = await ensureCard();
        if (!blob) {
          setToast("fail");
          return;
        }
        const result = await shareToPlatform(
          platform,
          blob,
          service.serviceId
        );
        if (result === "clipboard") {
          setToast("copied");
        } else if (result === "failed") {
          setToast("fail");
        }
      } finally {
        setSharing(null);
      }
    },
    [ensureCard, service]
  );

  if (!mounted || !open || !service) return null;

  const busy = generating || sharing !== null;
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

          <div className="share-ritual-share-to">
            <h3 className="share-ritual-share-to-label">
              <span className="en-only">Share To</span>
              <span className="fr-block">Partager sur</span>
            </h3>
            {generating && !sharing && (
              <p className="share-ritual-loading" aria-live="polite">
                <span className="en-only">Preparing your card…</span>
                <span className="fr-block">Préparation de votre carte…</span>
              </p>
            )}
            <div
              className="share-ritual-platform-grid"
              role="group"
              aria-label="Share to platform"
            >
              {SHARE_PLATFORMS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className="share-ritual-platform-btn"
                  disabled={busy}
                  aria-busy={sharing === id}
                  onClick={() => void handlePlatformShare(id)}
                >
                  <span className="share-ritual-platform-icon">
                    <SharePlatformIcon platform={id} />
                  </span>
                  <span className="share-ritual-platform-name">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="share-ritual-download-link"
            disabled={busy}
            onClick={() => void handleDownload()}
          >
            <span className="en-only">Download card image</span>
            <span className="fr-block">Télécharger l&apos;image</span>
          </button>
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
            Could not share — try Download card image
          </span>
          <span className="fr-block">
            Partage impossible — essayez Télécharger l&apos;image
          </span>
        </div>
      )}
    </>,
    document.body
  );
}
