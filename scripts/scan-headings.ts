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

const headingRegex = /<h([1-4])([^>]*)>([\s\S]*?)<\/h\1>/g;

function stripTags(s: string) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function isMetadata(text: string) {
  return /^[§◇\d\s/·—\-–N°]+$/.test(text) || text.length < 3;
}

for (const page of pages) {
  const content = fs.readFileSync(path.resolve(process.cwd(), page), "utf-8");
  let m: RegExpExecArray | null;
  const regex = new RegExp(headingRegex.source, headingRegex.flags);
  const issues: string[] = [];
  while ((m = regex.exec(content)) !== null) {
    const inner = m[3];
    if (/className="en-only"/.test(inner) && /className="fr(?:-block)?"/.test(inner)) continue;
    if (/className="fr(?:-block)?"/.test(inner)) continue;
    const text = stripTags(inner);
    if (!text || isMetadata(text)) continue;
    if (/·/.test(text) && /[àâäéèêëïîôùûüç]/i.test(text)) continue; // bilingual inline
    if (text === "LUXE STUDIO" || /^[A-Z][a-z]+ [A-Z]/.test(text) && !/\b(the|and|of|your)\b/i.test(text) && m[1] === "4" && !text.includes("more")) {
      // likely person name only
      if (/^(Émilie|Marc|Sophie|Camille|Jean-Luc|Renée)/.test(text)) continue;
    }
    issues.push(`h${m[1]}: ${text.slice(0, 70)}`);
  }
  console.log(`\n${page}: ${issues.length} missing twins`);
  issues.forEach((i) => console.log(`  - ${i}`));
}
