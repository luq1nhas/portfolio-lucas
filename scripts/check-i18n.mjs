// Garante que pt.json e en.json têm as mesmas chaves e as mesmas variáveis/tags
// em cada texto ({count}, <em>…). O TypeScript já cobre o conteúdo em content/.
import { readFileSync } from "node:fs";

const locales = ["pt", "en"];
const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object"
      ? flatten(value, `${prefix}${key}.`)
      : [[`${prefix}${key}`, value]],
  );
const tokens = (text) =>
  [...text.matchAll(/\{(\w+)[,}]|<(\w+)>/g)]
    .map((m) => m[1] ?? `<${m[2]}>`)
    .sort()
    .join(" ");

const messages = Object.fromEntries(
  locales.map((l) => [
    l,
    new Map(flatten(JSON.parse(readFileSync(`messages/${l}.json`, "utf8")))),
  ]),
);

const problems = [];
const [base, ...others] = locales;
for (const other of others) {
  for (const key of messages[base].keys())
    if (!messages[other].has(key))
      problems.push(`${other}: falta a chave ${key}`);
  for (const key of messages[other].keys())
    if (!messages[base].has(key))
      problems.push(`${base}: falta a chave ${key}`);
  for (const [key, text] of messages[base]) {
    const translated = messages[other].get(key);
    if (translated !== undefined && tokens(text) !== tokens(translated))
      problems.push(
        `${key}: variáveis/tags diferentes entre ${base} e ${other}`,
      );
  }
}

if (problems.length > 0) {
  console.error("Traduções inconsistentes:\n" + problems.join("\n"));
  process.exit(1);
}
console.log(
  `Traduções consistentes (${messages[base].size} chaves em ${locales.join(", ")}).`,
);
