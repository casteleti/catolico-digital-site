#!/usr/bin/env node
/**
 * Regra de tipografia do site (Renato, 05/10/2026): quando uma frase começa no meio de um título ou parágrafo, a
 * primeira palavra dela nunca fica sozinha no fim da linha ("Que horas é a missa? A / resposta…"). Para isso, a
 * primeira palavra de cada frase nova é colada à segunda por um espaço que não quebra (U+00A0).
 *
 * O script percorre src/ e aplica a regra no texto que aparece na tela:
 *   - texto de JSX entre tags (>…<): usa &nbsp;
 *   - strings entre aspas duplas em .ts/.tsx que não são atributo JSX (sem "=" antes): usa
 * É idempotente. Uso: `node scripts/colar-inicio-de-frase.mjs` (aplica) ou `--check` (falha se faltar algo).
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const CHECK = process.argv.includes("--check");
const ROOT = fileURLToPath(new URL("../src/", import.meta.url));

// Fim de frase + espaço + 1ª palavra da frase seguinte + espaço comum (o que vamos trocar).
const SENTENCE = /([.?!…])( |&nbsp;)([^\s<>{}"\\&]+) (?=[^\s])/g;

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return files(path);
    return /\.(tsx?|mjs)$/.test(name) ? [path] : [];
  });
}

function glue(text, nbsp) {
  return text.replace(SENTENCE, (_, end, space, word) => `${end}${space}${word}${nbsp}`);
}

/** Troca o conteúdo das strings em aspas duplas (fora de comentário, template e atributo JSX). */
function glueStrings(source) {
  let out = "";
  let i = 0;
  while (i < source.length) {
    const c = source[i];
    const next = source[i + 1];
    if (c === "/" && next === "/") { const end = source.indexOf("\n", i); const j = end === -1 ? source.length : end; out += source.slice(i, j); i = j; continue; }
    if (c === "/" && next === "*") { const j = source.indexOf("*/", i + 2) + 2; out += source.slice(i, j); i = j; continue; }
    if (c === "`" || c === "'") {
      let j = i + 1;
      while (j < source.length && source[j] !== c) j += source[j] === "\\" ? 2 : 1;
      out += source.slice(i, j + 1); i = j + 1; continue;
    }
    if (c === '"') {
      let j = i + 1;
      while (j < source.length && source[j] !== '"' && source[j] !== "\n") j += source[j] === "\\" ? 2 : 1;
      const text = source.slice(i + 1, j);
      const isAttribute = /=\s*$/.test(out);
      out += '"' + (isAttribute ? text : glue(text, "\\u00A0")) + '"';
      i = j + 1; continue;
    }
    out += c; i += 1;
  }
  return out;
}

let changed = 0;
const pending = [];
for (const path of files(ROOT)) {
  const source = readFileSync(path, "utf8");
  let out = source;
  if (path.endsWith(".tsx")) {
    // Texto de JSX entre duas tags, sem expressões no meio.
    // Só depois de uma tag de verdade (<p>, </strong>, <>…), para não pegar ternário ou "=>" do código.
    out = out.replace(/(<\/?[A-Za-z][\w.:-]*(?:\s[^<>]*)?>|<>)([^<>{}]*[.?!…] [^<>{}]*)(?=<)/g, (m, tag, text) => `${tag}${glue(text, "&nbsp;")}`);
  }
  out = glueStrings(out);
  if (out !== source) {
    changed += 1;
    pending.push(path.replace(ROOT, "src/"));
    if (!CHECK) writeFileSync(path, out);
  }
}

if (CHECK && pending.length) {
  console.error(`Primeira palavra de frase solta no fim da linha em:\n  ${pending.join("\n  ")}\nRode: node scripts/colar-inicio-de-frase.mjs`);
  process.exit(1);
}
console.log(CHECK ? "Tipografia ok." : `${changed} arquivo(s) ajustado(s).`);
