import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = path.resolve(import.meta.dirname, "../src");

export async function resolve(specifier, context, next) {
  // O pacote `next` não declara `exports`: no Node puro, "next/server" precisa da extensão.
  if (specifier === "next/server") return next("next/server.js", context);
  if (specifier.startsWith("@/")) {
    const base = path.join(SRC, specifier.slice(2));
    const file = [base, `${base}.ts`, `${base}.tsx`].find((candidate) => existsSync(candidate) && candidate.match(/\.tsx?$/));
    if (file) return next(pathToFileURL(file).href, context);
  }
  return next(specifier, context);
}
