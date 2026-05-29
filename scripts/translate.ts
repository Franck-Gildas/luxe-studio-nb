import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const pages = [
  "src/app/page.tsx",
  "src/app/work/page.tsx",
  "src/app/services/page.tsx",
  "src/app/about/page.tsx",
  "src/app/experiences/page.tsx",
  "src/app/contact/page.tsx",
];

const dryRun = process.argv.includes("--dry-run");
const BLOCK_LENGTH = 120;

const enOnlyRegex = /<span className="en-only">([\s\S]*?)<\/span>/g;

function stripTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeForJsxText(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&apos;")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;");
}

function twinClass(plainText: string, innerHtml: string, contextBefore: string): string {
  const blockParent =
    /<(?:p|blockquote)[^>]*>\s*$/i.test(contextBefore.slice(-80)) ||
    /className="(?:lede|body|desc)"/.test(contextBefore.slice(-200));

  if (plainText.length > BLOCK_LENGTH || blockParent) {
    return "fr-block";
  }
  return "fr";
}

function hasTwinAfter(content: string, endIndex: number): boolean {
  const after = content.slice(endIndex, endIndex + 200);
  return /className="fr(?:-block)?"/.test(after);
}

let translationCache: Record<string, string> = {};
const cachePath = path.resolve(process.cwd(), "scripts/translations-cache.json");
if (fs.existsSync(cachePath)) {
  translationCache = JSON.parse(fs.readFileSync(cachePath, "utf-8")) as Record<string, string>;
}

async function translateContent(text: string): Promise<string> {
  if (translationCache[text]) {
    return translationCache[text];
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(`No cache entry and no API key for: ${text.slice(0, 60)}…`);
  }

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: `You are a professional French translator specializing in luxury beauty and wellness brands in New Brunswick, Canada. Translate this English text to French. Keep the same tone — sensual, elegant, cinematic. Use proper Canadian French with Acadian warmth. Return ONLY the French translation, nothing else:

${text}`,
      },
    ],
  });

  const block = response.content[0];
  return block.type === "text" ? block.text.trim() : "";
}

async function processFile(filePath: string) {
  console.log(`Processing ${filePath}...`);
  let content = fs.readFileSync(filePath, "utf-8");

  const matches: { full: string; inner: string; index: number }[] = [];
  let m: RegExpExecArray | null;
  const regex = new RegExp(enOnlyRegex.source, enOnlyRegex.flags);
  while ((m = regex.exec(content)) !== null) {
    matches.push({ full: m[0], inner: m[1], index: m.index });
  }

  if (matches.length === 0) {
    console.log(`  No en-only spans found.`);
    return;
  }

  let translated = 0;
  let skipped = 0;

  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    const endIndex = match.index + match.full.length;

    if (hasTwinAfter(content, endIndex)) {
      skipped++;
      continue;
    }

    const plainText = stripTags(match.inner);
    if (!plainText) {
      skipped++;
      continue;
    }

    const contextBefore = content.slice(0, match.index);
    const frClass = twinClass(plainText, match.inner, contextBefore);

    console.log(`  Translating (${frClass}): ${plainText.slice(0, 50)}...`);

    let frenchText: string;
    if (dryRun) {
      frenchText = `[DRY-RUN: ${plainText.slice(0, 30)}…]`;
    } else {
      frenchText = await translateContent(plainText);
      if (!translationCache[plainText] && process.env.ANTHROPIC_API_KEY) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    const escaped = escapeForJsxText(frenchText);
    const twin = `\n<span className="${frClass}">${escaped}</span>`;
    const replacement = `${match.full}${twin}`;
    content = content.slice(0, match.index) + replacement + content.slice(endIndex);
    translated++;
  }

  if (!dryRun) {
    fs.writeFileSync(filePath, content, "utf-8");
  }

  console.log(`  ✓ ${filePath}: ${translated} translated, ${skipped} skipped`);
}

async function main() {
  const useCacheOnly =
    process.argv.includes("--cache-only") || !process.env.ANTHROPIC_API_KEY;

  if (useCacheOnly) {
    if (Object.keys(translationCache).length === 0) {
      console.error(
        "No ANTHROPIC_API_KEY and no scripts/translations-cache.json. Add one or the other."
      );
      process.exit(1);
    }
    console.log(`Using translations cache (${Object.keys(translationCache).length} entries)\n`);
  }

  if (dryRun) {
    console.log("DRY RUN — no files will be written\n");
  }

  for (const page of pages) {
    const filePath = path.resolve(process.cwd(), page);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skipping missing file: ${page}`);
      continue;
    }
    await processFile(filePath);
  }

  console.log(dryRun ? "\n✓ Dry run complete!" : "\n✓ All pages translated!");
}

main().catch(console.error);
