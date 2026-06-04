import QRCode from "qrcode";
import {
  getRitualDeepLinkUrl,
  type RitualCategorySlug,
} from "@/data/services-menu";

const CARD_SIZE = 1080;
const PADDING = 80;
const CHAMPAGNE = "#C9A96E";
const BONE = "#E8E2D9";
const BG = "#0a0a0a";
const SERIF = '"Cormorant Garamond", serif';
const MONO = '"JetBrains Mono", monospace';

export type ServiceCardInput = {
  name: string;
  price: number;
  duration: string;
  tagline: string;
  serviceId: RitualCategorySlug;
};

let fontsLoaded = false;

async function ensureFontFace(
  family: string,
  url: string,
  weight: string,
  style: string
): Promise<void> {
  const desc = `${weight} ${style} 16px "${family}"`;
  if (document.fonts.check(desc)) return;
  try {
    const face = new FontFace(family, `url(${url})`, { weight, style });
    await face.load();
    document.fonts.add(face);
  } catch {
    /* fall through to document.fonts.load */
  }
}

export async function loadCanvasFonts(): Promise<void> {
  if (fontsLoaded) return;

  await Promise.all([
    ensureFontFace(
      "Cormorant Garamond",
      "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3WmX5slCNrHLp8bYe6.woff2",
      "400",
      "normal"
    ),
    ensureFontFace(
      "Cormorant Garamond",
      "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNrHLp8bYewl8B1g.woff2",
      "400",
      "italic"
    ),
    ensureFontFace(
      "JetBrains Mono",
      "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnZmxl.woff2",
      "400",
      "normal"
    ),
  ]);

  await Promise.all([
    document.fonts.load(`400 28px ${SERIF}`),
    document.fonts.load(`italic 400 32px ${SERIF}`),
    document.fonts.load(`400 72px ${SERIF}`),
    document.fonts.load(`400 28px ${MONO}`),
  ]);

  await document.fonts.ready;
  fontsLoaded = true;
}

function drawNoise(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() * 18;
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 12;
  }
  ctx.putImageData(imageData, 0, 0);
}

function drawCornerOrnaments(ctx: CanvasRenderingContext2D) {
  const inset = 48;
  const len = 12;
  ctx.strokeStyle = CHAMPAGNE;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.6;

  const corners: [number, number, number, number][] = [
    [inset, inset, 1, 1],
    [CARD_SIZE - inset, inset, -1, 1],
    [inset, CARD_SIZE - inset, 1, -1],
    [CARD_SIZE - inset, CARD_SIZE - inset, -1, -1],
  ];

  for (const [x, y, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len * dx, y);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + len * dy);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function formatDuration(duration: string): string {
  return duration.replace(/\s+/g, " ").trim().toUpperCase();
}

function drawCenteredLines(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  centerY: number,
  lineHeight: number
): number {
  const totalH = lines.length * lineHeight;
  let y = centerY - totalH / 2 + lineHeight * 0.35;
  for (const line of lines) {
    ctx.fillText(line, CARD_SIZE / 2, y);
    y += lineHeight;
  }
  return centerY + totalH / 2;
}

export async function generateServiceCard(
  input: ServiceCardInput
): Promise<HTMLCanvasElement> {
  await loadCanvasFonts();

  const canvas = document.createElement("canvas");
  canvas.width = CARD_SIZE;
  canvas.height = CARD_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE);
  drawNoise(ctx, CARD_SIZE, CARD_SIZE);
  ctx.fillStyle = BG;
  ctx.globalAlpha = 0.92;
  ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE);
  ctx.globalAlpha = 1;

  const contentW = CARD_SIZE - PADDING * 2;
  let y = PADDING + 20;

  ctx.fillStyle = CHAMPAGNE;
  ctx.font = `400 28px ${SERIF}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "0.18em";
  ctx.fillText("LUXE STUDIO NB", CARD_SIZE / 2, y);
  ctx.letterSpacing = "0px";
  y += 56;

  let nameSize = 72;
  ctx.font = `400 ${nameSize}px ${SERIF}`;
  let nameLines = wrapText(ctx, input.name, contentW * 0.9);
  while (nameLines.length > 2 && nameSize > 48) {
    nameSize -= 4;
    ctx.font = `400 ${nameSize}px ${SERIF}`;
    nameLines = wrapText(ctx, input.name, contentW * 0.9);
  }
  const nameLineH = nameSize * 1.1;
  y = drawCenteredLines(
    ctx,
    nameLines,
    y + (nameLines.length * nameLineH) / 2,
    nameLineH
  );
  y += 20;

  const dividerW = contentW * 0.6;
  ctx.fillStyle = CHAMPAGNE;
  ctx.fillRect(
    (CARD_SIZE - dividerW) / 2,
    y,
    dividerW,
    2
  );
  y += 24 + 2;

  ctx.fillStyle = BONE;
  ctx.font = `italic 400 32px ${SERIF}`;
  const taglineLines = wrapText(ctx, input.tagline, contentW * 0.8);
  const tagLineH = 40;
  y = drawCenteredLines(
    ctx,
    taglineLines,
    y + (taglineLines.length * tagLineH) / 2,
    tagLineH
  );
  y += 32;

  ctx.fillStyle = CHAMPAGNE;
  ctx.font = `400 28px ${MONO}`;
  ctx.letterSpacing = "0.12em";
  const priceLine = `$${input.price} · ${formatDuration(input.duration)}`;
  ctx.fillText(priceLine, CARD_SIZE / 2, y);
  ctx.letterSpacing = "0px";
  y += 56;

  const qrUrl = getRitualDeepLinkUrl(input.serviceId);
  const qrCanvas = document.createElement("canvas");
  await QRCode.toCanvas(qrCanvas, qrUrl, {
    width: 200,
    margin: 2,
    errorCorrectionLevel: "H",
    color: { dark: BONE, light: BG },
  });
  const qrY = Math.min(y + 24, CARD_SIZE - PADDING - 200);
  ctx.drawImage(
    qrCanvas,
    (CARD_SIZE - 200) / 2,
    qrY,
    200,
    200
  );

  drawCornerOrnaments(ctx);

  return canvas;
}
