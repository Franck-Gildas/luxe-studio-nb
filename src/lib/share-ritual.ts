import {
  getRitualDeepLinkUrl,
  type RitualCategorySlug,
} from "@/data/services-menu";

const SHARE_TITLE = "Luxe Studio NB";

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

export type ShareRitualResult = "shared" | "clipboard" | "cancelled" | "failed";

/** Opens the OS share sheet when supported; otherwise copies the image to clipboard. */
export async function shareRitualCard(
  blob: Blob,
  serviceId: RitualCategorySlug
): Promise<ShareRitualResult> {
  const file = blobToPngFile(blob, serviceId);
  const url = getRitualDeepLinkUrl(serviceId);

  if (canShareFiles(file)) {
    try {
      await navigator.share({
        files: [file],
        title: SHARE_TITLE,
        url,
        text: SHARE_TITLE,
      });
      return "shared";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return "cancelled";
      }
    }
  }

  if (await copyImageToClipboard(blob)) {
    return "clipboard";
  }

  return "failed";
}

async function copyImageToClipboard(blob: Blob): Promise<boolean> {
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
