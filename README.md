# Católico Digital

Site público de lançamento, captação e vendas do Católico Digital.

## Stack

- Next.js App Router
- React + TypeScript estrito
- Tailwind CSS
- PostgreSQL/Prisma planejados para a camada de leads
- pnpm

## Desenvolvimento

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Abra `http://localhost:3000`.

Para acessar pela rede local, inicie com:

```bash
pnpm dev --hostname 0.0.0.0
```

## Qualidade

```bash
pnpm exec eslint
pnpm run build
```

## SEO e medição

- `src/app/robots.ts` e `src/app/sitemap.ts` geram `/robots.txt` e `/sitemap.xml`. Página pública nova (rota estática) entra na lista do `sitemap.ts`; módulos e papéis entram sozinhos por `src/content`.
- JSON-LD: Organization, WebSite e SoftwareApplication no `layout.tsx`; FAQPage na Home (perguntas em `src/content/faq.ts`, as mesmas do acordeão); BreadcrumbList nas páginas internas (`src/components/seo/json-ld.tsx`).
- Google Analytics 4: defina `NEXT_PUBLIC_GA_ID` (ex.: `G-XXXXXXXXXX`) no ambiente **de build** (Coolify). Sem a variável vale o ID padrão de `google-analytics.tsx`. A tag só carrega em produção e depois do aceite de "medição" no aviso de cookies.

## Estrutura

- `src/app`: rotas Next.js e endpoint de health check
- `src/components`: componentes de marca, marketing e motion
- `src/lib`: validação de ambiente e serviços compartilhados
- `Docs`: base de conhecimento, blueprint e plano técnico
- `CONTEXTO-CODEX-24-09-26.md`: contexto detalhado para continuidade do projeto

O formulário de lançamento ainda é demonstrativo. Persistência, CRM, analytics com consentimento e integrações de produção entram nas próximas fases descritas em `Docs/`.
