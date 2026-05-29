/**
 * One-time helper: wrap plain English in <span className="en-only"> for translation script.
 * Skips nodes that already contain en-only, fr, or fr-block.
 */
import fs from "fs";
import path from "path";

const pages = [
  "src/app/page.tsx",
  "src/app/work/page.tsx",
  "src/app/services/page.tsx",
  "src/app/about/page.tsx",
  "src/app/experiences/page.tsx",
  "src/app/contact/page.tsx",
];

function wrapInner(html: string): string {
  if (/className="en-only"/.test(html)) return html;
  if (/className="fr(?:-block)?"/.test(html)) return html;
  const trimmed = html.trim();
  if (!trimmed) return html;
  return `<span className="en-only">${trimmed}</span>`;
}

function processContent(content: string): string {
  let out = content;

  // <p className="lede">...</p> (may span lines)
  out = out.replace(
    /<p className="lede">((?:(?!<span className="en-only")[\s\S])*?)<\/p>/g,
    (_, inner) => `<p className="lede">${wrapInner(inner)}</p>`
  );

  // <p className="body">...</p>
  out = out.replace(
    /<p className="body">((?:(?!<span className="en-only")[\s\S])*?)<\/p>/g,
    (_, inner) => `<p className="body">${wrapInner(inner)}</p>`
  );

  // <p className="desc">...</p>
  out = out.replace(
    /<p className="desc">((?:(?!<span className="en-only")[\s\S])*?)<\/p>/g,
    (_, inner) => `<p className="desc">${wrapInner(inner)}</p>`
  );

  // <blockquote>...</blockquote>
  out = out.replace(
    /<blockquote>((?:(?!<span className="en-only")[\s\S])*?)<\/blockquote>/g,
    (_, inner) => `<blockquote>${wrapInner(inner)}</blockquote>`
  );

  // <span className="desc">...</span> (inline in menu rows)
  out = out.replace(
    /<span className="desc">((?:(?!<span className="en-only")[^<])*)<\/span>/g,
    (_, inner) => `<span className="desc">${wrapInner(inner)}</span>`
  );

  // <span className="name">English<span className="fr"> — add en-only before fr
  out = out.replace(
    /<span className="name">([^<]+)(<span className="fr">)/g,
    (_, en, fr) => `<span className="name"><span className="en-only">${en.trim()}</span>${fr}`
  );

  // Plain <p>...</p> (single-line, no nested <p>)
  out = out.replace(
    /<p>((?:(?!<p)[^<]|<(?!\/p>)[\s\S])*?)<\/p>/g,
    (match, inner) => {
      if (/className="en-only"/.test(match)) return match;
      if (/className="fr(?:-block)?"/.test(match)) return match;
      if (/className="(lede|body|desc)"/.test(match)) return match;
      return `<p>${wrapInner(inner)}</p>`;
    }
  );

  return out;
}

for (const page of pages) {
  const filePath = path.resolve(process.cwd(), page);
  const before = fs.readFileSync(filePath, "utf-8");
  const after = processContent(before);
  if (after !== before) {
    fs.writeFileSync(filePath, after, "utf-8");
    console.log(`Wrapped: ${page}`);
  } else {
    console.log(`No changes: ${page}`);
  }
}

console.log("Done.");
