<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Tipografia: frase nova nunca começa no fim da linha

Regra do Renato (05/10/2026), vale para todo o site: quando uma segunda frase começa no meio de um título ou
parágrafo, a primeira palavra dela não pode ficar sozinha no fim da linha ("Que horas é a missa? A / resposta").
A primeira palavra de cada frase nova fica colada à segunda por espaço que não quebra (`\u00A0` em string,
`&nbsp;` em texto de JSX). Escreveu texto novo? Rode `pnpm tipografia`; `pnpm lint` falha se faltar.
