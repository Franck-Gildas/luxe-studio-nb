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

function stripTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const enOnlyRegex = /<span className="en-only">([\s\S]*?)<\/span>/g;
const needed: string[] = [];

for (const page of pages) {
  const content = fs.readFileSync(path.resolve(process.cwd(), page), "utf-8");
  let m: RegExpExecArray | null;
  const regex = new RegExp(enOnlyRegex.source, enOnlyRegex.flags);
  while ((m = regex.exec(content)) !== null) {
    const end = m.index + m[0].length;
    if (/className="fr(?:-block)?"/.test(content.slice(end, end + 200))) continue;
    const plain = stripTags(m[1]);
    if (plain && !needed.includes(plain)) needed.push(plain);
  }
}

fs.writeFileSync(
  path.resolve(process.cwd(), "scripts/strings-to-translate.json"),
  JSON.stringify(needed, null, 2),
  "utf-8"
);
console.log(`Extracted ${needed.length} unique strings`);
