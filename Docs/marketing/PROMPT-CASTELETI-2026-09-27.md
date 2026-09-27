# Prompt para o casteleti — variações da landing (27/09/2026)

> Casteleti, abaixo está o contexto de tudo que o Renato produziu com o Claude entre 25 e 27/09 sobre a landing do Católico Digital. Cole o bloco "Prompt" no seu agente (Codex ou Claude Code) dentro do repositório `catolico-digital-site`, na branch `feat/lp-variacoes-b-d`.

---

## Prompt

Você está no repositório `catolico-digital-site` (landing de lançamento e captação do Católico Digital, em produção em https://catolico.digital). Faça checkout da branch `feat/lp-variacoes-b-d`. Ela traz **quatro versões visuais da landing** para comparação e escolha, mais material de marketing. Nada foi para `main`. Leia este prompt inteiro antes de mexer em qualquer arquivo.

### 1. As versões

| Versão | Onde ver | Situação | Linguagem visual |
|---|---|---|---|
| **A — atual** | rota `/` | Em produção, conteúdo inalterado | Azul profundo, rosácea, composição de desktop |
| **B — "Luz"** | rota `/luz` | Em código | Fundo claro marfim, produto no celular como imagem de herói, barra de CTA fixa no rodapé do celular, Fraunces + Inter |
| **C — "Gótica"** | só no canvas de design (link abaixo) | Não implementada | Navy + marrom avermelhado + branco, serifas em tudo, arcos ogivais |
| **D — "Barroca" limpa** | rota `/barroca` | Em código. **Favorita atual do Renato** | Navy profundo + marfim, dourado chapado como acento único, Cormorant Garamond nos títulos, Poppins no texto, superfícies lisas, cantos suaves |

Histórico da D: a primeira versão tinha adamascado, grão, cantoneiras rococó, filetes duplos, numerais romanos, capitular e fonte Cinzel. O Renato achou "cafona, parece castelo medieval" e pediu "bonito, elegante, mas prático e limpo". A versão em `/barroca` já é a limpa. **Não reintroduza ornamento, textura ou entalhe** sem pedido explícito.

As rotas `/luz` e `/barroca` são prévias: têm `robots: noindex`. As versões B e D já trazem a copy revisada (ver seção 3) e foram pensadas para quem chega do Instagram pelo celular.

Canvas de design (B, C, rascunho ornamentado da D, variações do anúncio C02 e carrossel de 12 cards): https://claude.ai/artifact/DRA3gqLrW8yXMzhJXdzupi — é privado; o Renato precisa compartilhar com você pelo menu Share.

### 2. O que mudou na estrutura (leia antes de mexer)

- `src/app/page.tsx`, `contato/` e `privacidade/` foram movidos para o grupo de rotas `src/app/(site)/`. O novo `src/app/(site)/layout.tsx` carrega o casco da versão A (header, barra de progresso, camadas de motion, footer). **As URLs não mudaram.**
- `src/app/layout.tsx` ficou só com `<html>`, `<body>` e metadata. Isso permite que `/luz` e `/barroca` tenham casco próprio sem herdar o da A.
- `src/app/not-found.tsx` passou a incluir header e footer explicitamente (antes vinham do layout raiz).
- B: `src/components/landing-luz/*`, `src/styles/landing-luz.css` (classes `lz-*`), `src/app/luz/page.tsx`.
- D: `src/components/landing-barroca/*`, `src/styles/landing-barroca.css` (classes `bq-*`), `src/app/barroca/page.tsx`.
- Cada versão tem CSS isolado por prefixo. Nenhuma toca o CSS da A.
- A D carrega Cormorant Garamond e Poppins por `<link>` do Google Fonts em tempo de execução, porque o `CONTEXTO-CODEX-24-09-26.md` registrou a decisão de não baixar fonte durante o build. Se a D for a escolhida, migre para `next/font/google` com os arquivos servidos localmente.
- `pnpm run build` e `pnpm exec eslint` passam limpos na branch.

### 3. Material de marketing em `Docs/marketing/`

- `plano-criativos-ads-2026-09-26.docx` — 20 criativos para Instagram/Facebook e 2 anúncios de busca do Google, com copy pronta, direção visual, público, UTM, guardrails de política de anúncio e LGPD, funil e calendário de 8 semanas.
- `revisao-copy-landing-2026-09-26.md` — revisão seção por seção da copy da versão A. Achado central: a página vende "site bonito e fácil", mas não diz o diferencial real (a paróquia administra **informação, não páginas**; mude a missa uma vez e tudo se atualiza; horários especiais sem apagar o de sempre; avisos com validade).
- Este arquivo.

### 4. Bloqueios antes de qualquer anúncio pago (valem para todas as versões)

1. **O formulário não grava nada.** Na A ele finge sucesso e diz ao visitante que é demonstração. Na B e na D ele avisa que é prévia. Nenhum lead chega a lugar algum.
2. Não há GTM, pixel da Meta, GA4 nem banner de consentimento.
3. `/privacidade` e `/contato` são placeholders que admitem não estar prontos.
4. O menu "Entrar" da A leva a `/contato`; não existe login.
5. `metadataBase` ainda é `https://catolico-digital.example`, sem imagem Open Graph. O preview do link no WhatsApp e no Instagram sai errado.
6. Não existe página de obrigado, o que enfraquece a medição de conversão.

### 5. Decisões que são do Renato (não decida por ele)

- Qual versão vira a `/`.
- Se o "assistente por conversa" aparece na landing como "em desenvolvimento". Hoje B e D mostram isso com o selo; a A não menciona.
- Logotipo oficial. O símbolo em arco das versões B e D é provisório.
- Merge em `main` e deploy.

### 6. O que eu peço a você agora

1. Rode `pnpm install --frozen-lockfile` e `pnpm dev`. Abra `/`, `/luz` e `/barroca` num celular de verdade ou numa viewport de 375 px. Os anúncios vão rodar no Instagram, então o celular é o critério.
2. Revise a branch como um PR: estrutura das rotas, isolamento do CSS, acessibilidade (contraste do dourado sobre marfim, foco, labels), desempenho no celular.
3. Me devolva uma lista curta: o que você manteria, o que mudaria e o que precisa estar pronto para a escolhida ir para `/`.
4. Não faça merge em `main`, não publique e não mexa na A em produção sem o OK do Renato.

### 7. Regras que valem para qualquer mudança

- Nunca inventar cliente, número, depoimento, preço, prazo ou logotipo de paróquia real. Os nomes nas prévias ("Paróquia São José", "Jaboticabal", "Capela São Pedro") são fictícios e estão marcados como ilustração.
- O único dado de mercado usado ("menos da metade das paróquias da Arquidiocese de São Paulo tem site próprio") vem de levantamento próprio de 24/09/2026 sobre as 310 paróquias listadas em arquisp.org.br. A fonte aparece na página. Não extrapole para o Brasil.
- Convicção religiosa é dado sensível pela LGPD. Os formulários coletam só contato institucional, com consentimento de marketing separado e nunca pré-marcado.
- Anúncios falam com a instituição (secretaria, pároco, pastoral), nunca afirmam nada sobre a fé de quem lê.

### 8. Contexto adicional (não é desta branch)

Em paralelo, o Renato começou o repositório da **plataforma** (o SaaS multi-tenant em si), separado da landing por decisão dele: `catolico-plataforma`. Ele existe só na máquina do Renato por enquanto, sem remoto. Tem Next.js 16, Drizzle, PostgreSQL com Row-Level Security em 21 tabelas de negócio, e um teste de isolamento entre paróquias passando contra Postgres real. Quando for publicado, sugiro `casteleti/catolico-digital-plataforma`.
