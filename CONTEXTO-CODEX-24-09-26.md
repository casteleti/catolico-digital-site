# Contexto do projeto — Católico Digital

Arquivo de continuidade para o Codex. Este documento registra o que foi criado e configurado no projeto até o momento, as decisões tomadas, o estado atual da aplicação, as validações executadas e o que ainda precisa ser feito.

## 1. Identificação

- Projeto: `catolico-digital-site`
- Produto: site público do Católico Digital
- Finalidade: apresentação institucional, aquisição de tráfego, captação de leads, conversão e futura venda do produto
- Diretório de trabalho: `/srv/projects/catolico-digital-site`
- Stack escolhida: Next.js + React + TypeScript + Tailwind CSS + PostgreSQL/Prisma planejados
- Estado atual: fundação técnica criada; ainda não existe o site completo nem integrações de produção

O diretório começou apenas com a documentação em `Docs/`. Não havia `package.json`, código de aplicação, banco, migrations ou integrações. A aplicação foi inicializada diretamente neste diretório, preservando os documentos existentes.

## 2. Base de conhecimento existente

O diretório `Docs/` contém a especificação completa do produto e deve continuar sendo a referência principal para decisões de implementação.

Documentos mais importantes para a continuidade:

- `00_README.md`: princípios gerais, stack recomendada e definição de pronto.
- `01_ESCOPO_REQUISITOS.md`: objetivos, públicos, funil, páginas e requisitos funcionais.
- `02_ARQUITETURA_STACK.md`: arquitetura Next.js, server-first, PostgreSQL, adapters e limites entre site e SaaS.
- `03_ARQUITETURA_INFORMACAO_ROTAS.md`: navegação, rotas e estrutura das páginas.
- `04_BANCO_DADOS_MODELAGEM.md`: entidades de lead, atribuição, consentimento, webhook e transação.
- `05_COPY_CONTEUDO_CONVERSAO.md`: hierarquia de mensagem, CTAs, formulários e tom editorial.
- `06_UI_UX_RESPONSIVIDADE.md`: design system, acessibilidade, breakpoints e estados.
- `07_SEO.md` e `08_AEO_GEO_IA_SEARCH.md`: SEO técnico, conteúdo citável, JSON-LD e descoberta por mecanismos de IA.
- `09_TRACKING_ANALYTICS_ATRIBUICAO.md`: eventos, consentimento, dataLayer e atribuição.
- `10_LEADS_CRM_AUTOMACOES.md`: fluxo de leads, CRM, retries e idempotência.
- `11_PAGAMENTOS_BILLING.md`: checkout hospedado, webhooks assinados e estados de transação.
- `12_LGPD_PRIVACIDADE_COOKIES.md` e `13_SEGURANCA.md`: minimização de dados, consentimento, headers, autenticação e proteção de entradas.
- `14_PERFORMANCE_ACESSIBILIDADE.md`, `15_DEVOPS_DEPLOY_OBSERVABILIDADE.md` e `16_TESTES_QA_CRITERIOS.md`: metas de qualidade e operação.
- `17_ROADMAP_EXECUCAO_CODEX.md`: ordem geral de implementação.
- `18_ENV_SECRETS.md`: variáveis e segredos previstos.
- `19_PROTOCOLO_CODEX.md`: regras de trabalho para alterações futuras.
- `20_CONTEUDO_SCHEMA_TEMPLATES.md`: modelos de páginas, artigos, metadata e dados estruturados.
- `21_REFERENCIAS_OFICIAIS.md`: fontes oficiais para revisão antes da implementação e do go-live.
- `22_CHECKLIST_GO_LIVE.md`: checklist de publicação.
- `23_PLANO_STACK_IDEAL.md`: consolidação do stack, arquitetura, fases e critérios para adicionar complexidade.

O `Docs/manifest.json` lista esses documentos e a ordem de implementação.

## 3. Stack efetivamente criada

### Runtime e aplicação

- Node.js disponível no ambiente: versão 24.19.0.
- Next.js `16.3.6`.
- React e React DOM `19.2.8`.
- App Router ativado.
- Diretório de código em `src/` ativado.
- TypeScript ativado.
- Alias de importação `@/*` apontando para `src/*`.

### Estilo e qualidade

- Tailwind CSS `4.x`.
- Integração via `@tailwindcss/postcss` em `postcss.config.mjs`.
- ESLint `9.x` com `eslint-config-next` e regras Core Web Vitals/TypeScript.
- `tsconfig.json` com `strict: true` e `noUncheckedIndexedAccess: true`.

### Validação

- Zod `4.x` adicionado como dependência.
- Primeiro schema criado em `src/lib/env.ts` para validar `NODE_ENV` e `APP_URL`.

### Gerenciamento de pacotes

- Gerenciador oficial do projeto: pnpm `11.22.0`.
- Lockfile: `pnpm-lock.yaml`.
- O `package.json` possui `packageManager: "pnpm@11.22.0"`.
- A instalação inicial teve erro no banco SQLite do store padrão do pnpm. A instalação foi concluída usando um store temporário isolado em `/tmp/catolico-pnpm-store`.
- `package-lock.json` foi removido para manter pnpm como gerenciador único.

## 4. Arquivos criados ou alterados

### Arquivos de configuração na raiz

#### `package.json`

Define o nome `catolico-digital-site`, versão inicial `0.1.0`, scripts básicos e dependências.

Scripts atuais:

```text
pnpm dev
pnpm build
pnpm start
pnpm lint
```

Dependências de produção: `next`, `react`, `react-dom` e `zod`.

Dependências de desenvolvimento: TypeScript, tipos do Node/React, Tailwind, PostCSS, ESLint e configuração do Next.

#### `pnpm-lock.yaml`

Lockfile gerado após a instalação bem-sucedida com pnpm. Deve ser atualizado junto com qualquer alteração de dependências.

#### `pnpm-workspace.yaml`

Arquivo gerado pelo setup do pnpm. Atualmente contém a configuração de scripts permitidos para dependências nativas. Não há monorepo ou outros pacotes ainda.

#### `tsconfig.json`

Configuração TypeScript estrita, resolução de módulos `bundler`, JSX React, plugin do Next e alias `@/*`.

#### `next.config.ts`

Configura `output: "standalone"`, permitindo gerar uma imagem Docker menor e executável com o servidor standalone do Next.

#### `postcss.config.mjs`

Conecta o Tailwind CSS 4 ao PostCSS.

#### `eslint.config.mjs`

Usa as configurações oficiais do Next para Core Web Vitals e TypeScript. As pastas de build são ignoradas.

#### `.env.example`

Variáveis iniciais documentadas:

```bash
NODE_ENV=development
APP_URL=http://localhost:3000
```

Ainda não há segredos, banco ou serviços externos configurados.

#### `Dockerfile`

Dockerfile multi-stage:

1. instala dependências com pnpm e lockfile congelado;
2. compila a aplicação;
3. cria runtime Node 22 Alpine;
4. executa com usuário não-root `nextjs`;
5. expõe a porta 3000;
6. inicia o servidor standalone gerado pelo Next.

O build do Docker usa `npm run build` dentro do estágio builder porque o script é independente do gerenciador de pacotes. A instalação usa pnpm para respeitar o lockfile do projeto.

### Código da aplicação

#### `src/app/layout.tsx`

Layout raiz com:

- idioma `pt-BR`;
- metadata base em português;
- título padrão `Católico Digital`;
- template de título `%s | Católico Digital`;
- descrição inicial institucional;
- importação dos estilos globais.

A URL em `metadataBase` ainda é provisória: `https://catolico-digital.example`. Deve ser substituída pelo domínio real antes do lançamento.

#### `src/app/page.tsx`

Home inicial de fundação. Contém:

- marca textual Católico Digital;
- H1 provisório;
- texto explicando que a fundação está pronta;
- CTA para `/contato`.

Não é a home final de marketing. É uma página mínima para validar o shell visual e a execução do app.

#### `src/app/contato/page.tsx`

Página provisória de contato com metadata própria. Informa que o formulário de leads será implementado na próxima etapa e possui link de retorno para a home.

#### `src/app/globals.css`

Define os primeiros tokens visuais:

- fundo claro;
- texto principal;
- texto secundário;
- cor de destaque e variação escura;
- superfície branca.

Também contém o layout provisório da home/contato, foco em viewport mínima de 320 px, botão com alvo mínimo de 44 px e estados hover/focus visíveis.

O design system final ainda precisa ser extraído para componentes e tokens mais completos.

#### `src/app/api/health/live/route.ts`

Endpoint GET mínimo em `/api/health/live` que responde:

```json
{"status":"ok"}
```

É um health check de vida. Ainda falta criar `/api/health/ready` para validar dependências como banco e serviços necessários.

#### `src/lib/env.ts`

Schema Zod server-side para validar as variáveis básicas de ambiente. O módulo ainda não é importado pelo layout ou por um bootstrap global; ele será usado pelos serviços e rotas à medida que forem implementados.

### Imagens públicas

O gerador do Next deixou assets de demonstração em `public/`: `next.svg`, `vercel.svg`, `file.svg`, `globe.svg` e `window.svg`. Eles são resíduos do template inicial e devem ser removidos ou substituídos quando o design visual real for criado.

## 5. Validações já executadas

Foram executados com sucesso:

```bash
pnpm exec eslint
pnpm run build
```

O build gerou as seguintes rotas válidas no estado atual:

```text
○ /
○ /contato
○ /_not-found
ƒ /api/health/live
```

`○` indica página estática; `ƒ` indica rota renderizada sob demanda.

Não foram criados nem executados testes unitários, de integração ou E2E nesta etapa. Eles fazem parte da fase de QA prevista na documentação.

## 6. O que ainda não existe

As seguintes partes do plano ainda não foram implementadas:

- design system completo e componentes reutilizáveis;
- Navbar, Footer, Container, Section, cards e campos de formulário;
- páginas públicas de produto, funcionalidades, soluções, preços, como funciona, segurança, sobre, FAQ e páginas legais;
- blog/central de conteúdo;
- PostgreSQL;
- Prisma e migrations;
- entidades de Lead, LeadAttribution, ConsentRecord, FormSubmission, WebhookEvent e Transaction;
- formulário real com validação server-side;
- Cloudflare Turnstile ou outro antispam;
- e-mail transacional;
- CRM e adapter com retry/idempotência;
- consent manager e registro de consentimento;
- GTM, GA4, Google Ads, Meta Pixel/CAPI e eventos server-side;
- atribuição first-touch/last-touch;
- checkout e webhooks de pagamento;
- sitemap, robots, JSON-LD, Open Graph final e redirects;
- headers de segurança, CSP, HSTS e rate limiting;
- `/api/health/ready`;
- Sentry, logs estruturados, request ID e monitoramento externo;
- CI/CD;
- staging e produção;
- backups e teste de restauração;
- testes unitários, integração, acessibilidade, E2E e performance;
- domínio real e definição de canonical;
- copy final e prova social autorizada.

## 7. Decisões pendentes antes da próxima fase

Antes de construir as páginas comerciais, confirmar ou registrar:

1. domínio canônico e URL oficial da marca;
2. CTA primário do lançamento: lista de espera, demonstração, teste, cadastro ou contratação;
3. segmentos prioritários: paróquias, comunidades, dioceses, pastorais, movimentos ou outros;
4. modelo de venda: consultivo/manual ou checkout direto;
5. existência de identidade visual, logo, cores e fontes oficiais;
6. provedor de e-mail transacional;
7. CRM escolhido;
8. gateway de pagamento, caso venda direta seja ativada;
9. política de conteúdo e responsável editorial;
10. provedor e estratégia de hospedagem de produção.

Enquanto essas decisões não forem fechadas, os valores devem permanecer configuráveis e nenhum dado fictício deve ser apresentado como prova real.

## 8. Próxima sequência recomendada

### Passo 1 — Design system

Criar tokens definitivos e componentes base em `src/components/ui` e `src/components/marketing`, preservando server-first e acessibilidade.

### Passo 2 — Shell público

Criar Navbar, Footer, Container, navegação principal, estados de página e layout compartilhado para as rotas de marketing.

### Passo 3 — Rotas institucionais

Implementar home, produto, funcionalidades, soluções, como funciona, segurança, sobre, preços e FAQ com conteúdo provisório claramente marcado até a aprovação da copy.

### Passo 4 — SEO base

Criar metadata por rota, canonical real, sitemap, robots, Open Graph e JSON-LD somente para dados que existam visivelmente na página.

### Passo 5 — Banco e conversão

Adicionar PostgreSQL/Prisma, migrations, schema de Lead, formulário, antispam, deduplicação, página de obrigado e e-mail transacional.

### Passo 6 — Tracking e CRM

Adicionar consentimento, dataLayer sem PII, atribuição, eventos documentados, adapter de CRM, retries e alertas.

### Passo 7 — Operação e QA

Adicionar headers, rate limit, health ready, logs, Sentry, CI, testes e checklist de go-live.

## 9. Regras para continuidade

- Ler o documento específico da feature antes de implementá-la.
- Conferir arquitetura, segurança, LGPD e QA antes de criar endpoints ou tabelas.
- Preferir a menor alteração que atenda ao requisito.
- Não introduzir Redis, CMS, filas ou múltiplos gateways sem necessidade comprovada.
- Não coletar crença religiosa individual; o contexto religioso pode caracterizar dado sensível pela LGPD.
- Não colocar PII no `dataLayer` ou em logs.
- Não importar módulos server-only em Client Components.
- Toda integração externa deve ter timeout, tratamento de erro, correlation/request ID e retry seguro quando aplicável.
- Toda mudança de dependência deve atualizar `package.json` e `pnpm-lock.yaml`.
- Antes do go-live, substituir domínio provisório, remover assets do template e revisar todo conteúdo placeholder.

## 10. Comandos úteis

```bash
# instalar dependências
pnpm install --frozen-lockfile

# desenvolvimento
pnpm dev

# lint
pnpm lint

# build de produção
pnpm build

# iniciar build
pnpm start

# verificar health check depois de iniciar a aplicação
curl http://localhost:3000/api/health/live
```

Se o store padrão do pnpm voltar a apresentar erro de SQLite no ambiente atual, usar temporariamente:

```bash
pnpm install --store-dir /tmp/catolico-pnpm-store
```

## 11. Resumo do ponto de retomada

O projeto já possui um app Next.js compilável e validado, uma home provisória, uma rota de contato provisória, metadata inicial, um health check, validação básica de ambiente, configuração Tailwind/ESLint/TypeScript e Docker standalone. A próxima entrega de produto deve ser o design system e o shell público; a próxima entrega de infraestrutura deve ser PostgreSQL/Prisma somente quando o primeiro formulário real exigir persistência.

## 12. Atualização visual implementada depois deste registro

Após a fundação inicial, a direção visual fornecida para a marca foi incorporada ao código.

### Identidade aplicada

- Azul profundo e azul noite como cores estruturais.
- Marfim e branco quente como superfícies principais.
- Dourado suave restrito a detalhes, foco, marca e CTA principal.
- Grafite azulado para texto, evitando preto puro.
- Tipografia com pilha editorial `Fraunces`/serif para títulos e `Inter`/sans-serif para UI, com fallbacks locais para não depender de download de fonte durante o build.
- Motivo geométrico inspirado em rosácea criado em CSS para marca, hero e seção institucional.
- Interface do produto representada com branco, azul-gelo e azul funcional, mantendo a estética SaaS separada dos elementos institucionais.

### Componentes adicionados

- `src/components/ui/container.tsx`: container responsivo com largura máxima centralizada.
- `src/components/brand/brand-mark.tsx`: marca textual e símbolo geométrico proprietário provisório.
- `src/components/marketing/site-header.tsx`: header com navegação principal e CTA.
- `src/components/marketing/site-footer.tsx`: footer institucional com marca e links.

### Estilos adicionados

- `src/styles/tokens.css`: tokens de cor, tipografia, escala de texto, espaçamento, raios, sombras, container e foco.
- `src/app/globals.css`: reset básico, acessibilidade, header, marca, hero, preview de produto, cards, seções, roseta, footer, responsividade e `prefers-reduced-motion`.

### Home atualizada

`src/app/page.tsx` agora contém:

- hero azul profundo com padrão geométrico sutil;
- CTA dourado e link secundário;
- preview visual da interface do produto sem dependência de imagem externa;
- seção em marfim para benefícios;
- três cards de recursos;
- seção azul-gelo sobre tradição e futuro;
- roseta geométrica como motivo visual.

### Ajuste na rota de contato

`src/app/contato/page.tsx` recebeu uma superfície azul profunda para manter contraste com o header global e continua sendo uma página provisória até a implementação do formulário real.

### Validação após a atualização visual

Executados novamente com sucesso:

```bash
pnpm exec eslint
pnpm run build
```

Rotas geradas no build:

```text
○ /
○ /contato
○ /_not-found
ƒ /api/health/live
```

### Próximas decisões visuais

- Confirmar logo oficial ou aprovar o símbolo geométrico provisório.
- Confirmar se Fraunces e Inter serão carregadas localmente como assets de produção.
- Substituir o preview CSS por captura real do produto quando a interface existir.
- Definir fotografia real e licenças antes de adicionar imagens institucionais.
- Revisar contraste e aparência em Safari iOS, Chrome Android e larguras de 320, 375, 768, 1024 e 1440 px.

## 13. Estrutura da landing page de lançamento

O blueprint de landing page foi implementado em `src/components/landing/landing-page.tsx` e passou a ser renderizado por `src/app/page.tsx`.

Seções presentes:

- hero de lançamento com CTA, microcopy e mockup composto de desktop/cards;
- faixa de contexto sobre a informação paroquial no digital;
- dores em seis cards;
- apresentação do produto;
- recursos paroquiais em dez cards;
- fluxo “como funciona” em quatro etapas;
- benefícios em seção azul profunda;
- demonstração com tabs controladas pelo usuário: Site, Agenda, Conteúdo e Administração;
- checklist “para quem é”;
- tecnologia com propósito;
- segurança e privacidade;
- diferencial comparativo de abordagem;
- oferta de lançamento;
- formulário visual de interesse;
- FAQ em accordion;
- CTA final;
- footer institucional existente.

Componentes interativos adicionados:

- `src/components/landing/faq-accordion.tsx`: accordion acessível, controlado por botão e `aria-expanded`.
- `src/components/landing/product-tabs.tsx`: tabs controladas manualmente, sem carousel automático.
- `src/components/landing/lead-form.tsx`: formulário com loading e sucesso demonstrativos; ainda não persiste dados nem dispara `generate_lead` real.

`lucide-react` foi adicionado ao `package.json` e ao `pnpm-lock.yaml` como sistema único de iconografia.

Rotas legais mínimas adicionadas:

- `src/app/privacidade/page.tsx`: placeholder explícito para a política final revisada juridicamente.

A navegação do header foi atualizada para `Como funciona`, `Recursos`, `Para quem é`, `Segurança`, `Dúvidas`, `Entrar` e `Quero conhecer`. Em mobile, existe menu hamburger com navegação expandida.

O conteúdo da landing ainda é conteúdo de lançamento/produto a validar. Não foram inventados clientes, números, depoimentos, preços ou provas sociais.

Após a implementação da landing, foram executados `pnpm exec eslint` e `pnpm run build` com sucesso. A página depende dos próximos passos de backend para transformar o formulário demonstrativo em captação real.

## 14. Auditoria e refinamento premium de UI/UX

Foi executada uma camada adicional de acabamento visual e interação sem alterar a arquitetura ou a estratégia da landing.

### Design system e motion

`src/styles/tokens.css` agora centraliza também:

- container de até `75rem`;
- durações `fast`, `normal` e `slow`;
- curvas de easing de entrada e padrão;
- escala de z-index para base, dropdown, sticky, overlay, modal e toast.

`src/app/globals.css` recebeu:

- entrada sequencial do hero;
- entrada suave do mockup;
- movimento vertical discreto dos cards flutuantes;
- transição de troca das tabs;
- seleção de texto com cores da marca;
- focus ring global;
- ajustes de borda, sombra e radius;
- tratamento de `prefers-reduced-motion` para interromper movimentos decorativos;
- página 404 com rosácea incompleta;
- estados refinados de header, formulário, FAQ e componentes.

### Header e navegação

`src/components/marketing/site-header.tsx` agora observa scroll e alterna entre:

- estado transparente no hero;
- estado fixo com fundo branco translúcido, blur moderado, borda sutil e sombra leve após rolagem.

O menu mobile bloqueia o scroll do body enquanto aberto e mantém alvo mínimo de toque. A navegação desktop recebeu underline animado discreto e estados de foco.

### Interações

- FAQ usa `Plus`/`Minus`, `aria-expanded` e estado único aberto.
- Tabs de produto têm troca com fade/scale curto e continuam controladas manualmente.
- Hero usa sequência de aproximadamente 40–360 ms para eyebrow, título, texto, ações e microcopy.
- Formulário mantém loading com loader pequeno, feedback de sucesso transparente e foco consistente.
- Foi criado `src/app/not-found.tsx` com rota 404 personalizada.

### Validação

Depois do refinamento foram executados com sucesso:

```bash
pnpm exec eslint
pnpm run build
```

Rotas confirmadas no build: `/`, `/contato`, `/privacidade`, `/_not-found` e `/api/health/live`.

## 15. Fundação de motion proprietária

Para evoluir a experiência em direção a uma linguagem “Sacred Digital Experience”, foram adicionados primitives de motion em `src/components/motion`:

- `scroll-progress.tsx`: progresso narrativo fixo com cinco estágios, atualizado com `requestAnimationFrame` e oculto no mobile.
- `hero-experience.tsx`: rosácea digital com pontos, halo, grid, reação a ponteiro/scroll e suporte a reduced motion.
- `scroll-reveal.tsx`: reveal progressivo via `IntersectionObserver`, com fallback imediato quando reduced motion está ativo.
- `product-scroll-story.tsx`: base para narrativa sticky que alterna homepage, agenda, notícias e administração conforme o scroll.

O `ScrollProgress` já foi integrado ao layout global. Os demais primitives estão preparados para serem conectados às cenas específicas da landing na próxima rodada de direção de arte, sem impor dependência de GSAP ou outra biblioteca pesada.

Também foram adicionados ao CSS:

- noise/grain em baixa opacidade para superfícies escuras;
- halo e grid para profundidade visual;
- animação de pulsação da rosácea;
- tokens de motion e easing;
- progressão visual de scroll;
- animações reduzidas para `prefers-reduced-motion`.

O build continua passando após essa camada:

```bash
pnpm exec eslint
pnpm run build
```

## 16. Integração da camada premium

A etapa seguinte foi executada e os primitives passaram a ser conectados à landing:

- `src/components/motion/premium-layers.tsx` usa portals progressivos para inserir a rosácea/motion layer dentro de `.landing-hero` e a narrativa sticky dentro de `#produto` quando esses elementos existem.
- `HeroExperience` reage a ponteiro e scroll com `requestAnimationFrame`; não executa a animação quando `prefers-reduced-motion` está ativo.
- `ProductScrollStory` alterna visualmente entre informação inicial, agenda, notícias e administração conforme os passos entram na viewport.
- O conteúdo principal continua renderizado no servidor; as camadas interativas são adicionadas no cliente como enhancement.

O build foi validado novamente com `pnpm exec eslint` e `pnpm run build` após a integração.
