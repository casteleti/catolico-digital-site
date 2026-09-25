# 23 — Plano do stack ideal para o site

## 1. Decisão executiva

O stack recomendado para o site público do Católico Digital é:

| Camada | Escolha | Motivo |
|---|---|---|
| Runtime | Node.js LTS | suporte longo e compatibilidade com o ecossistema Next.js |
| Aplicação | Next.js App Router + React + TypeScript estrito | SSR, geração estática, metadata, sitemap e route handlers no mesmo projeto |
| Estilo | Tailwind CSS + tokens próprios | velocidade de implementação sem prender a identidade ao visual padrão de uma biblioteca |
| Componentes | shadcn/ui, somente como base | componentes acessíveis e editáveis no código |
| Validação | Zod | validação compartilhada e segura no servidor |
| Formulários | Server Actions por padrão; React Hook Form quando houver complexidade | menos JavaScript e fronteiras claras entre cliente e servidor |
| Banco | PostgreSQL | fonte relacional adequada para leads, consentimentos, webhooks e transações |
| ORM | Prisma | migrations, tipos e consultas explícitas |
| Conteúdo inicial | MDX ou TypeScript tipado | conteúdo versionado, rápido e sem dependência de CMS no MVP |
| Conteúdo editável | Payload CMS, somente quando houver necessidade operacional | evolução para edição por equipe sem acoplar o site a um CMS desde o primeiro dia |
| E-mail | adapter para provedor transacional | troca de provedor sem espalhar integração pela aplicação |
| CRM | adapter de CRM | preserva o lead local se o CRM estiver indisponível |
| Pagamento | checkout hospedado do gateway escolhido | reduz escopo PCI e evita armazenar cartão |
| Antibot | Cloudflare Turnstile | baixo atrito em formulários públicos |
| Borda | Cloudflare | DNS, TLS, WAF, rate limit e cache de assets |
| Deploy | Docker multi-stage em VPS/Coolify | controle de custo, portabilidade e rollback simples |
| Observabilidade | Sentry + logs estruturados + monitor externo | erros de frontend/backend, correlação e disponibilidade |
| Analytics | camada de consentimento + GTM/GA4; Ads/Meta somente quando usados | rastreamento controlado por finalidade e consentimento |

## 2. Arquitetura alvo

```text
Usuário
  -> Cloudflare (DNS, TLS, WAF, cache)
  -> Reverse proxy/Coolify
  -> Next.js (páginas públicas, formulários, APIs e webhooks)
       -> PostgreSQL
       -> adapters de e-mail, CRM e pagamento
       -> analytics server-side para eventos críticos
       -> storage S3-compatible para mídia, se necessário
```

O site público deve permanecer desacoplado do core do SaaS. Contratos de API e eventos são a fronteira entre os dois sistemas. A landing page não pode depender da disponibilidade do dashboard interno.

## 3. Estrutura inicial do projeto

```text
src/
  app/
    (marketing)/
    api/
    sitemap.ts
    robots.ts
  components/
    ui/
    marketing/
    forms/
  content/
  lib/
    analytics/
    db/
    env/
    security/
    validation/
  services/
    crm/
    email/
    payments/
  server/
  styles/
  types/
prisma/
  schema.prisma
  migrations/
tests/
  unit/
  integration/
  e2e/
public/
Dockerfile
docker-compose.yml
```

## 4. Regras técnicas obrigatórias

- TypeScript com `strict: true` e `noUncheckedIndexedAccess: true`.
- Server Components por padrão; `use client` somente para interação real.
- Segredos apenas em módulos server-only e variáveis sem prefixo público.
- Toda entrada validada no servidor com Zod.
- Toda mutação pública com rate limit, antispam, timeout e request ID.
- Integrações externas isoladas em `services/*`, com retry apenas quando idempotente.
- Migrations versionadas; nunca usar `db push` em produção.
- Nenhum dado de cartão no banco ou nos logs.
- Não enviar nome, e-mail, telefone ou mensagem para `dataLayer`.
- Conteúdo indexável renderizado no HTML inicial.
- Headers de segurança, CSP, HSTS e cookies seguros configurados antes do lançamento.

## 5. Dependências de aplicação

### Base

- `next`, `react`, `react-dom`
- `typescript`
- `tailwindcss`
- `zod`
- `@prisma/client` e `prisma`

### UI e formulários

- componentes selecionados de shadcn/ui
- `lucide-react` para ícones
- `react-hook-form` somente nos formulários que exigirem estado complexo

### Qualidade e segurança

- ESLint e Prettier
- Vitest e Testing Library para unit/integration
- Playwright para fluxos críticos
- `@sentry/nextjs` para observabilidade

Cada pacote deve justificar seu custo de bundle e sua necessidade. Redis, filas e CMS ficam fora do primeiro incremento até existir uma necessidade comprovada.

## 6. Ambientes e operação

### Ambientes

1. `local`: PostgreSQL local ou container, serviços externos mockados.
2. `preview`: build isolado por PR quando a infraestrutura suportar.
3. `staging`: domínio e credenciais de teste, banco separado.
4. `production`: credenciais próprias, backups e monitoramento.

### Pipeline CI/CD

1. instalar com lockfile congelado;
2. lint;
3. typecheck;
4. testes unitários e de integração;
5. build Next.js;
6. auditoria de dependências e secrets;
7. E2E das rotas críticas;
8. deploy da imagem Docker;
9. migration controlada;
10. smoke test e monitoramento.

O container deve usar build multi-stage, imagem mínima e usuário não-root. Health checks: `/api/health/live` e `/api/health/ready`.

## 7. Sequência de implementação

### Fase 0 — Fundação

Criar o app Next.js, TypeScript, lint, formatter, Tailwind, tokens, Docker, validação de ambiente e CI.

### Fase 1 — Design system

Implementar Container, Section, Heading, Text, Button, cards, campos de formulário, Navbar, Footer e estados de loading/erro/sucesso.

### Fase 2 — Site público

Construir home, produto, funcionalidades, soluções, preços, como funciona, segurança, sobre, contato e páginas legais, seguindo as rotas da documentação.

### Fase 3 — SEO e conteúdo

Adicionar metadata por rota, canonical, Open Graph, sitemap, robots, JSON-LD e conteúdo institucional em MDX/TypeScript.

### Fase 4 — Conversão

Adicionar formulários com Zod, PostgreSQL/Prisma, Turnstile, deduplicação, página de obrigado e e-mail transacional.

### Fase 5 — Medição e CRM

Adicionar consent manager, dataLayer, GA4/GTM, atribuição first/last touch, adapter de CRM e retry de integração.

### Fase 6 — Pagamentos opcionais

Somente se o lançamento vender diretamente: configuração de planos, checkout hospedado, webhook assinado, idempotência e tabela de transações.

### Fase 7 — Go-live

Executar QA de mobile, teclado, acessibilidade, SEO, performance, segurança, consentimento, integrações, backup, domínio, DNS, Search Console, Bing e rollback.

## 8. Critérios para adicionar complexidade

- Redis: somente para rate limit distribuído, filas, locks ou cache compartilhado.
- CMS: somente quando editores precisarem publicar sem deploy frequente.
- Storage de objetos: somente quando houver mídia que não deva ficar no repositório.
- Worker separado: quando webhooks ou integrações ultrapassarem o tempo seguro de uma requisição.
- Gateway múltiplo: somente após requisito real de cobertura, redundância ou método de pagamento.

## 9. Ordem imediata de execução

1. Confirmar domínio canônico, CTA principal, segmentos e política de conteúdo.
2. Criar o esqueleto Next.js com a estrutura de pastas acima.
3. Definir tokens visuais e componentes base.
4. Configurar PostgreSQL/Prisma e validação de ambiente sem ainda coletar dados desnecessários.
5. Construir as rotas públicas e metadata.
6. Implementar primeiro o fluxo de lead; CRM, analytics e pagamento entram por adapters.
7. Rodar o checklist de QA e go-live da documentação antes de publicar.
