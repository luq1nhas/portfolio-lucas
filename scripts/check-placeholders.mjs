import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = ".next/server/app";
const offenders = [];

for (const entry of readdirSync(root, {
  recursive: true,
  withFileTypes: true,
})) {
  if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
  const file = join(entry.parentPath, entry.name);
  const matches = readFileSync(file, "utf8").match(/\{\{[^}]+\}\}/g);
  if (matches) offenders.push(`${file}: ${[...new Set(matches)].join(", ")}`);
}

if (offenders.length > 0) {
  console.error(
    "Placeholders encontrados no build de produção:\n" + offenders.join("\n"),
  );
  process.exit(1);
}
console.log("Nenhum placeholder no build de produção.");
