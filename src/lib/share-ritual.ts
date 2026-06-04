import {
  getRitualDeepLinkUrl,
  type RitualCategorySlug,
} from "@/data/services-menu";

const SHARE_TITLE = "Luxe Studio NB";

export type SharePlatform =
  | "facebook"
  | "messenger"
  | "whatsapp"
  | "tiktok"
  | "twitter"
  | "telegram";

export function getShareUrl(serviceId: RitualCategorySlug): string {
  return getRitualDeepLinkUrl(serviceId);
}

export function blobToPngFile(
  blob: Blob,
  serviceId: RitualCategorySlug
): File {
  return new File([blob], `luxe-${serviceId}.png`, { type: "image/png" });
}

export function canShareFiles(file: File): boolean {
  if (typeof navigator === "undefined" || !navigator.share) return false;
  try {
    return navigator.canShare?.({ files: [file] }) ?? false;
  } catch {
    return false;
  }
}

export async function tryNativeShare(
  file: File,
  serviceId: RitualCategorySlug
): Promise<boolean> {
  if (!canShareFiles(file)) return false;
  try {
    await navigator.share({
      files: [file],
      title: SHARE_TITLE,
      url: getShareUrl(serviceId),
      text: SHARE_TITLE,
    });
    return true;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return true;
    }
    return false;
  }
}

export async function copyImageToClipboard(blob: Blob): Promise<boolean> {
  if (!navigator.clipboard?.write) return false;
  try {
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob }),
    ]);
    return true;
  } catch {
    return false;
  }
}

function openShareWindow(url: string) {
  window.open(url, "_blank", "noopener,noreferrer,width=600,height=520");
}

export function getPlatformShareUrl(
  platform: SharePlatform,
  serviceId: RitualCategorySlug
): string | null {
  const pageUrl = encodeURIComponent(getShareUrl(serviceId));
  const text = encodeURIComponent(`${SHARE_TITLE} — ${getShareUrl(serviceId)}`);

  switch (platform) {
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    case "messenger":
      return `fb-messenger://share?link=${pageUrl}`;
    case "whatsapp":
      return `https://wa.me/?text=${text}`;
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${pageUrl}&text=${encodeURIComponent(SHARE_TITLE)}`;
    case "telegram":
      return `https://t.me/share/url?url=${pageUrl}&text=${encodeURIComponent(SHARE_TITLE)}`;
    case "tiktok":
      return null;
    default:
      return null;
  }
}

export async function shareToPlatform(
  platform: SharePlatform,
  blob: Blob,
  serviceId: RitualCategorySlug
): Promise<"native" | "clipboard" | "failed"> {
  const file = blobToPngFile(blob, serviceId);

  const usedNative = await tryNativeShare(file, serviceId);
  if (usedNative) return "native";

  const copied = await copyImageToClipboard(blob);
  if (!copied) return "failed";

  const link = getPlatformShareUrl(platform, serviceId);
  if (link && platform !== "tiktok") {
    if (platform === "messenger") {
      window.location.href = link;
    } else {
      openShareWindow(link);
    }
  }

  return "clipboard";
}
