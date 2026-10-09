import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

/**
 * Regressão da auditoria de 08/10/2026: âncoras da Home, honestidade comercial (preço, tempo, dados) e CTA.
 * Lê o código-fonte como texto; não sobe o site. Para o posicionamento do aviso de cookies, veja a verificação de
 * larguras (320 a 1440 px) descrita no relatório da auditoria.
 */
const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const landing = read("src/components/landing/landing-page.tsx");
const { faq } = await import("../src/content/faq.ts");
const { CTA, ONBOARDING_URL } = await import("../src/content/links.ts");

const ids = new Set([...landing.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
const withoutComments = (code: string) => code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
const publicCopy = [withoutComments(landing), JSON.stringify(faq), CTA.note, read("src/app/contato/page.tsx")].join("\n");

describe("âncoras da Home", () => {
  it("todo link do menu e do rodapé para /#âncora tem um id na Home", () => {
    const hrefs = [
      ...[...read("src/content/navigation.ts").matchAll(/kind: "link", label: "[^"]+", href: "([^"]+)"/g)].map((m) => m[1]!),
      ...[...read("src/components/marketing/site-footer.tsx").matchAll(/href="(\/#[^"]+)"/g)].map((m) => m[1]!),
    ].filter((href) => href.startsWith("/#"));
    assert.ok(hrefs.length >= 3);
    for (const href of hrefs) assert.ok(ids.has(href.slice(2)), `sem id para ${href}`);
  });

  it("mantém as âncoras antigas e as novas seções", () => {
    for (const id of ["como-e-diferente", "como-comecar", "verbos", "modulos", "para-quem", "condicoes", "comecar", "duvidas"]) assert.ok(ids.has(id), `falta #${id}`);
  });
});

describe("honestidade comercial", () => {
  it("o tempo do teste é estimativa, não garantia", () => {
    const flat = publicCopy.replace(/\\u00A0|&nbsp;| /g, " ");
    for (const m of flat.matchAll(/(.{0,12})\b5 minutos/g)) assert.match(m[1]!, /cerca de |uns /, `promessa de tempo sem "cerca de": "${m[0]}"`);
  });

  it("não afirma que publicar é gratuito, nem promessas de exclusão sem agendamento no código", () => {
    for (const forbidden of [/publicar (é|sai) (grátis|gratuito)/i, /publicação gratuita/i, /remoção definitiva/i, /para sempre/i]) assert.doesNotMatch(publicCopy, forbidden);
  });

  it("o FAQ responde preço, domínio e dados, sem inventar valores", () => {
    const text = JSON.stringify(faq);
    for (const topic of [/Quanto/, /domínio/, /dados/]) assert.match(text, topic);
    assert.doesNotMatch(text, /R\$\s?\d/);
  });
});

describe("CTAs", () => {
  it("o botão principal leva ao onboarding e há uma ação secundária de conversa", () => {
    assert.match(ONBOARDING_URL, /\/comecar$/);
    assert.ok(landing.includes("href={ONBOARDING_URL}"));
    assert.ok(landing.includes("href=\"/contato\""));
  });
});

describe("animações automáticas", () => {
  it("o palco do herói tem controle de pausa", () => {
    const hero = read("src/components/site/hero-showcase.tsx");
    assert.match(hero, /Pausar a animação/);
    assert.match(hero, /aria-pressed=\{paused\}/);
  });
});
