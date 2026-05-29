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

const enOnlyRegex = /<span className="en-only">([\s\S]*?)<\/span>/g;

let total = 0;
for (const page of pages) {
  const content = fs.readFileSync(path.resolve(process.cwd(), page), "utf-8");
  let n = 0;
  let m: RegExpExecArray | null;
  const regex = new RegExp(enOnlyRegex.source, enOnlyRegex.flags);
  while ((m = regex.exec(content)) !== null) {
    const end = m.index + m[0].length;
    const after = content.slice(end, end + 200);
    if (!/className="fr(?:-block)?"/.test(after)) n++;
  }
  console.log(`${page}: ${n} need translation`);
  total += n;
}
console.log(`Total: ${total}`);
