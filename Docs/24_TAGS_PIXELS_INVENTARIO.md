# 24 — Inventário de tags, pixels e analytics

Registro único de todas as tags e pixels instalados no site. Cada ferramenta nova entra numa seção própria, seguindo o modelo da seção 1. Complementa `09_TRACKING_ANALYTICS_ATRIBUICAO.md` (estratégia) e `12_LGPD_PRIVACIDADE_COOKIES.md` (consentimento).

## Resumo

| Ferramenta | ID | Status | Consentimento | Seção |
|---|---|---|---|---|
| Google Analytics 4 | `G-Y7FQ36B3FV` | Ativo no site desde 2026-10-05 e, a partir do Passo 2, na plataforma (`/comecar`) | Só após aceite de "Medição" | 1 |
| Meta Pixel | `1062699391956918` | Ativo em produção | Só após aceite de "Publicidade" | 2 |

## Consentimento (vale para todas as tags)
- **Componente:** `src/components/marketing/cookie-consent.tsx` (aviso e porteiro das tags), `src/lib/consent.ts` (leitura, gravação e versão) e `cookie-preferences-button.tsx` (link "Preferências de cookies" no rodapé).
- **Como funciona:** a escolha fica no cookie `cd_consent` (`Domain=.catolico.digital; Path=/; Secure; SameSite=Lax`, 180 dias), de primeira parte e sem servidor. O site e `app.catolico.digital` leem a MESMA decisão. Decisões antigas, em `localStorage` (`cd-consent`), continuam valendo e migram para o cookie (`migrateLegacyConsent`). Se o navegador bloquear cookies, a escolha cai para `localStorage` e vale só neste host. O aviso relê a escolha quando a aba volta a ter foco, para pegar uma mudança feita no outro subdomínio. Nenhuma tag de medição ou publicidade é carregada antes do aceite da categoria: GA4 em "Medição", Meta Pixel em "Publicidade". "Aceitar todos" e "Rejeitar não necessários" têm o mesmo destaque. Retirar o aceite apaga os cookies `_ga*`, `_gid`, `_gat*`, `_fbp`, `_fbc` e recarrega a página.
- **CSP:** os domínios liberados para GA4 e Meta estão em `src/proxy.ts`. Tag nova precisa de domínio novo lá, senão o navegador bloqueia (ver `Docs/25`, seção Segurança).
- **Tag nova?** Entra no `CookieConsent` dentro da categoria certa e ganha uma linha em `/privacidade#cookies`. Se mudar o texto ou as categorias, subir `CONSENT_VERSION` em `src/lib/consent.ts`, o que faz todos verem o aviso de novo.
- **Plataforma:** o mesmo formato é lido e gravado por `catolico-digital` (`src/lib/tracking-consent.ts`, aviso em `src/ui/tracking/cookie-banner.tsx`). Mudou o formato ou `CONSENT_VERSION` aqui? Mude lá também.
- **Efeito no analytics:** quem rejeita ou ignora o aviso não é contado no GA4 nem no Meta. É o custo do consentimento prévio.
- **Texto jurídico:** a seção de cookies em `/privacidade` é provisória e precisa de revisão jurídica, como o resto da página.

## 1. Google Analytics 4 (GA4)

### Dados da propriedade
- **Fluxo de dados:** Site - Católico Digital
- **Código do fluxo:** `11320254595`
- **ID da métrica (ID de medição):** `G-Y7FQ36B3FV`
- **URL do fluxo no GA4:** `https://catolicodigital.org`
- **Domínio real do site:** `https://catolico.digital`

### Pontos de atenção
- **Desempenho:** as tags carregam com `lazyOnload` desde 2026-10-05, para reduzir o impacto no PageSpeed. Medição e motivo em `Docs/25` (seção Performance).
- **Divergência de URL (só no painel do GA4, não existe no código):** o fluxo está cadastrado com `catolicodigital.org`, mas o site responde em `catolico.digital`. O `.org` não responde (sem HTTP nem redirect). O ideal é trocar a URL do fluxo em Admin > Fluxos de dados. Enquanto isso, a ferramenta de detecção do Google não encontra a tag se for testada no `.org`. A coleta de dados em si não depende dessa URL.
- **Divergência de ID:** ao copiar os dados do fluxo, o ID apareceu como `G-Y7FQ36B3F`, sem o `V` final. O ID correto é `G-Y7FQ36B3FV`, o mesmo do snippet do Google e do código. Confirmar no GA4 se houver dúvida.

### Implementação
- **Componente:** `src/components/marketing/google-analytics.tsx`
- **Onde é renderizado:** `src/app/layout.tsx`, no fim do `<body>`, valendo para todas as páginas.
- **Método:** `next/script` com `strategy="lazyOnload"` no site (na plataforma, `afterInteractive`; a diferença não afeta a medição). São dois scripts: o `gtag.js` do Google e um inline (`src/lib/ga-snippet.ts`) com `dataLayer`, `gtag('consent', ...)`, `gtag('js', ...)` e `gtag('config', ID)`.
- **Só em produção:** o componente retorna `null` quando `NODE_ENV !== "production"`, então `next dev` não gera dados.
- **Variável de ambiente:** `NEXT_PUBLIC_GA_ID` (opcional). Se não existir, usa `G-Y7FQ36B3FV`. Por ser `NEXT_PUBLIC_`, precisa estar definida no momento do build (no Coolify, marcar como variável de build).
- **Commit:** `9b4104e` (`feat(site): adiciona tag do Google Analytics (GA4) em produção`).
- **Deploy:** automático pelo webhook do GitHub no Coolify a cada push no `main`.

### Como verificar
1. Abrir `https://catolico.digital`, ver o código-fonte e procurar `googletagmanager.com/gtag/js?id=G-Y7FQ36B3FV`.
2. Na aba Network, filtrar por `collect` e conferir as requisições ao navegar.
3. No GA4, abrir Relatórios > Tempo real com o site aberto em outra aba.
4. Alternativa: extensão Tag Assistant ou a ferramenta de detecção de tag do Google, usando a URL `https://catolico.digital`.

### Eventos
Só existe a medição padrão (`page_view` e demais eventos de medição otimizada, conforme o fluxo). Os eventos do plano (`generate_lead`, cliques de CTA etc., descritos em `09`) ainda não foram implementados.

### Consentimento e LGPD
- **Situação atual (desde 2026-10-05):** a tag só carrega depois do aceite de "Medição". Ao carregar, declara `ad_storage`, `ad_user_data` e `ad_personalization` como `denied` (não usamos publicidade do Google) e `analytics_storage` como `granted`.
- **Pendências:**
  - [ ] Revisar retenção de dados e Google Signals no GA4.
  - [ ] Revisão jurídica do texto de cookies em `/privacidade`.

### GA4 na plataforma (`app.catolico.digital`, Passo 2)
- **Mesma propriedade** (`G-Y7FQ36B3FV`) e mesmo código de inicialização (`src/lib/ga-snippet.ts` nos dois repositórios). O cookie `_ga` é gravado em `.catolico.digital` (domínio automático do GA4), então o visitante é UM só do site até a plataforma, com o mesmo `client_id`, e a sessão continua ao trocar de subdomínio.
- **Onde carrega na plataforma:** só em `/comecar` (quiz e prévia), por `src/app/comecar/layout.tsx`. Não carrega no painel (`/admin`, há dados pessoais) nem nos sites das paróquias (`<slug>.catolico.digital`, cada paróquia é a controladora dos dados).
- **Sem `page_view` duplicado:** o `config` roda uma vez por página (`window.__cdGaStarted`) e as trocas de página sem recarregar ficam com a medição otimizada do GA4 ("Mudanças de página com base em eventos do histórico do navegador", que precisa continuar ligada no fluxo). Não enviar `page_view` manual. O quiz troca de etapa sem mudar a URL, então não gera `page_view` por etapa.
- **Referências indesejadas (GA4 > Admin > Fluxos de dados > Configurar definições da tag):** conferir que `catolico.digital` está na lista, para a passagem do site para a plataforma não aparecer como tráfego de referência.

### Consent Mode (site e plataforma)
- **Antes da escolha:** nada é carregado (nem `gtag.js`, nem `dataLayer`). Não há "modo avançado" com pings sem cookies.
- **Depois de aceitar "Medição":** a tag carrega e declara `analytics_storage: granted`; `ad_storage`, `ad_user_data` e `ad_personalization` ficam `denied` (ainda não há Google Ads).
- **Depois de rejeitar:** a tag nunca carrega.
- **Ao mudar de preferência:** aceitar a Medição passa a carregar a tag; retirar o aceite apaga `_ga*`, `_fbp`, `cd_ft`, `cd_lt` (em todo `.catolico.digital`) e recarrega a página sem a tag. A categoria "Publicidade" ainda não controla nenhum sinal do Google; quando houver Google Ads, ela passa a decidir os três `ad_*`.

### Histórico
| Data | Mudança |
|---|---|
| 2026-10-05 | Tag instalada e publicada (`9b4104e`). |
| 2026-10-05 | Carregamento condicionado ao aceite de cookies, com Consent Mode. |
| 2026-10-06 | Consentimento passa a ser o cookie `cd_consent` em `.catolico.digital` (compartilhado com a plataforma); GA4 também em `/comecar` na plataforma; código de inicialização com guarda contra dupla execução. |

## 2. Meta Pixel (Facebook/Instagram Ads)

### Dados da conta
- **ID do pixel:** `1062699391956918`
- **Gerenciador de Eventos:** Meta Business Suite > Gerenciador de Eventos (conferir o domínio verificado, que deve ser `catolico.digital`).

### Implementação
- **Componente:** `src/components/marketing/meta-pixel.tsx`
- **Onde é renderizado:** `src/app/layout.tsx`, depois do `GoogleAnalytics`, valendo para todas as páginas.
- **Método:** `next/script` com `strategy="afterInteractive"`, com o código oficial do Meta (`fbq('init', ID)` e `fbq('track', 'PageView')`). O fallback `<noscript>` com a imagem de 1x1 está incluído.
- **Só em produção:** retorna `null` quando `NODE_ENV !== "production"`.
- **Variável de ambiente:** `NEXT_PUBLIC_META_PIXEL_ID` (opcional). Se não existir, usa `1062699391956918`. Precisa estar disponível no build.
- **Deploy:** automático pelo webhook do GitHub no Coolify a cada push no `main`.

### Como verificar
1. Instalar a extensão Meta Pixel Helper e abrir `https://catolico.digital`. Deve aparecer o pixel `1062699391956918` com o evento `PageView`.
2. No Gerenciador de Eventos, abrir Testar eventos, informar a URL do site e conferir o `PageView` chegando.
3. Na aba Network, filtrar por `facebook.com/tr`.

### Eventos
- **Implementado:** apenas `PageView`.
- **Não implementado:** `Lead` (envio do formulário de lançamento), `ViewContent`, `Contact` e demais eventos de conversão. O formulário de lançamento ainda é demonstrativo. Quando houver envio real, disparar `fbq('track', 'Lead')` só depois da confirmação do servidor. Nunca enviar e-mail, telefone, nome ou mensagem nos parâmetros do evento.

### Consentimento e LGPD
- **Situação atual (desde 2026-10-05):** o script só é carregado depois do aceite de "Publicidade". O fallback `<noscript>` foi removido, porque não dá para pedir consentimento sem JavaScript.
- **Pendências:**
  - [ ] Revisão jurídica do texto de cookies em `/privacidade`.

### Histórico
| Data | Mudança |
|---|---|
| 2026-10-05 | Pixel adicionado ao código (PageView) e publicado. |
| 2026-10-05 | Carregamento condicionado ao aceite de cookies. |

## Modelo para novas ferramentas

```text
## N. Nome da ferramenta
### Dados da conta (IDs, propriedade, responsável)
### Implementação (arquivo, método, variável de ambiente, commit)
### Como verificar
### Eventos
### Consentimento e LGPD
### Histórico
```

## 3. Origem do tráfego (UTMs e identificadores de clique)

Primeira etapa da mensuração para Google Ads: preservar de onde a visita veio até o cadastro em `app.catolico.digital`. Não é uma tag de terceiros e não envia nada a ninguém; só grava cookies de primeira parte.

### Implementação
- **Código:** `src/lib/attribution.ts` (captura, gravação e leitura) e `src/components/marketing/attribution-capture.tsx` (liga ao consentimento), renderizado em `src/app/layout.tsx`.
- **Cookies:** `cd_ft` (first touch: a primeira visita, nunca sobrescrito) e `cd_lt` (last touch: a última visita com parâmetro de campanha; começa igual ao first touch e visita direta não o troca).
- **Escopo:** `Domain=.catolico.digital; Path=/; SameSite=Lax; Secure`, 90 dias. Não é `HttpOnly` (o JavaScript do site grava e o do app pode ler). Fora de `*.catolico.digital` (localhost, prévia) vale só para o host atual. Como o `Domain` cobre o subdomínio, o navegador também envia o cookie nas requisições ao servidor de `app.catolico.digital`.
- **Consentimento:** só grava com o aceite de "Medição". Sem resposta ainda, a visita fica na `sessionStorage` da aba (`cd-attr-pending`) e vira cookie se o aceite vier; com rejeição, é descartada. Retirar o aceite apaga `cd_ft` e `cd_lt` (`clearTrackingCookies` em `src/lib/consent.ts`).
- **Quem não aceita não tem origem registrada.** Quem clica no CTA antes de responder ao aviso, e depois aceita só na plataforma, também perde a origem (o consentimento é por origem de navegador: `catolico.digital` e `app.catolico.digital` não o compartilham).

### Formato
Valor = JSON com `encodeURIComponent`. Campos (todos opcionais, exceto `ts`):

| Campo | Conteúdo | Limite |
|---|---|---|
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` | parâmetros da URL de entrada | 100 caracteres |
| `gclid`, `gbraid`, `wbraid` | identificadores de clique do Google Ads | 200 |
| `lp` | caminho da página de entrada, sem query | 120 |
| `ref` | origem + caminho do referrer, sem query, só de fora de `catolico.digital` | 200 |
| `ts` | data e hora da visita (ISO 8601, UTC) | |

Sem e-mail, nome, telefone ou qualquer dado pessoal. Nenhum banco de dados é usado nesta etapa.

### Como ler (console do navegador, em qualquer host de `*.catolico.digital`)
```js
Object.fromEntries(["cd_ft", "cd_lt"].map((n) => [n, JSON.parse(decodeURIComponent((document.cookie.split("; ").find((c) => c.startsWith(n + "=")) ?? "=%22null%22").split("=")[1]))]))
```
No código do site, `readAttribution()` devolve `{ first, last }`. A plataforma precisa ler o cookie `cd_ft`/`cd_lt` com o mesmo formato quando for gravar a origem no cadastro (etapa seguinte).

### Histórico
| Data | Mudança |
|---|---|
| 2026-10-06 | Captura e persistência de UTMs e `gclid`/`gbraid`/`wbraid`; correção do apagamento de cookies em `.catolico.digital` ao retirar o consentimento. |

## 4. Evento `generate_lead` (formulário de contato)

Primeira conversão real do site, enquanto não existe cadastro de paróquia nem pagamento.

- **Código:** `src/app/api/contato/route.ts` (decide e confirma), `src/lib/lead.ts` (regras, evento e deduplicação), `src/lib/track.ts` (envio ao GA4 no navegador), `src/components/site/contact-form.tsx`, tipos de assunto em `src/content/contact.ts`.
- **Quando conta:** só depois de o servidor validar os dados, descartar robô e o canal da equipe (webhook ou e-mail) aceitar a mensagem. A resposta traz `lead_created: true` e, nos contatos comerciais, `ga_event`. Clique e submit na página não disparam nada.
- **Só contato comercial vira `generate_lead`:** "Quero conversar sobre a Plataforma", "Quero ver uma demonstração" e "Valores e planos" (`lead_type: commercial`). "Já uso e preciso de ajuda" (`support`), "Parcerias com dioceses e movimentos" (`partnership`) e "Outro assunto" (`other`) enviam a mensagem normalmente, mas não geram evento. Assunto novo precisa de tipo em `CONTACT_LEAD_TYPES` (senão não compila).
- **Robô (campo-isca):** a resposta parece sucesso (200 `{ ok: true, lead_created: false }`), mas sem `ga_event` e sem enviar nada ao canal.
- **Duplicidade:** a página manda um `submission_id` por formulário; o servidor devolve o mesmo `lead_id` sem reenviar (duplo clique, nova tentativa, resposta perdida; memória do servidor, 10 minutos). No navegador, `trackLeadOnce` envia o evento uma vez por `lead_id` (memória e `sessionStorage`). Falha de envio não gasta o id: a nova tentativa funciona.
- **Parâmetros do evento (GA4):** `lead_id`, `form_name` (`contato`), `lead_type`, `utm_source`, `utm_medium`, `utm_campaign` (do last touch, se houver). Nada de nome, e-mail, telefone, paróquia, mensagem nem `gclid`. A página só repassa essa lista.
- **Só com o aceite de "Medição":** sem ele, o evento não é enviado (o lead segue normal).
- **Atribuição para a equipe:** o servidor lê `cd_ft` e `cd_lt` do cabeçalho `Cookie` da própria requisição e inclui no webhook (`attribution.first` e `attribution.last`: UTMs, `gclid`/`gbraid`/`wbraid`, `lp`, `ref`, `ts`) ou no corpo do e-mail. Quem não aceitou "Medição" chega sem atribuição. O `lead_id` também vai ao canal, para ligar o lead ao GA4 e, no futuro, à importação de conversão offline.
- **No GA4 (manual):** Admin > Eventos (ou Principais eventos), marcar `generate_lead` como evento principal depois que o primeiro aparecer.
- **Limites:** a deduplicação do servidor é em memória (reinício ou várias instâncias a perdem; a do navegador continua). O evento sai do navegador, então bloqueadores de anúncio e quem não aceita cookies não são contados. Medição pelo servidor (Measurement Protocol) fica para uma etapa futura.

| Data | Mudança |
|---|---|
| 2026-10-06 | `generate_lead` confirmado pelo servidor, com atribuição, deduplicação e tipos de contato. |
