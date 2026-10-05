# 24 — Inventário de tags, pixels e analytics

Registro único de todas as tags e pixels instalados no site. Cada ferramenta nova entra numa seção própria, seguindo o modelo da seção 1. Complementa `09_TRACKING_ANALYTICS_ATRIBUICAO.md` (estratégia) e `12_LGPD_PRIVACIDADE_COOKIES.md` (consentimento).

## Resumo

| Ferramenta | ID | Status | Consentimento | Seção |
|---|---|---|---|---|
| Google Analytics 4 | `G-Y7FQ36B3FV` | Ativo em produção desde 2026-10-05 | Só após aceite de "Medição" | 1 |
| Meta Pixel | `1062699391956918` | Ativo em produção | Só após aceite de "Publicidade" | 2 |

## Consentimento (vale para todas as tags)
- **Componente:** `src/components/marketing/cookie-consent.tsx` (aviso e porteiro das tags), `src/lib/consent.ts` (leitura, gravação e versão) e `cookie-preferences-button.tsx` (link "Preferências de cookies" no rodapé).
- **Como funciona:** a escolha fica no `localStorage` (`cd-consent`), sem cookie e sem servidor. Nenhuma tag de medição ou publicidade é carregada antes do aceite da categoria: GA4 em "Medição", Meta Pixel em "Publicidade". "Aceitar todos" e "Rejeitar não necessários" têm o mesmo destaque. Retirar o aceite apaga os cookies `_ga*`, `_gid`, `_gat*`, `_fbp`, `_fbc` e recarrega a página.
- **CSP:** os domínios liberados para GA4 e Meta estão em `src/proxy.ts`. Tag nova precisa de domínio novo lá, senão o navegador bloqueia (ver `Docs/25`, seção Segurança).
- **Tag nova?** Entra no `CookieConsent` dentro da categoria certa e ganha uma linha em `/privacidade#cookies`. Se mudar o texto ou as categorias, subir `CONSENT_VERSION` em `src/lib/consent.ts`, o que faz todos verem o aviso de novo.
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
- **Divergência de URL:** o fluxo está cadastrado com `catolicodigital.org`, mas o site responde em `catolico.digital`. O `.org` não responde (sem HTTP nem redirect). O ideal é trocar a URL do fluxo em Admin > Fluxos de dados. Enquanto isso, a ferramenta de detecção do Google não encontra a tag se for testada no `.org`. A coleta de dados em si não depende dessa URL.
- **Divergência de ID:** ao copiar os dados do fluxo, o ID apareceu como `G-Y7FQ36B3F`, sem o `V` final. O ID correto é `G-Y7FQ36B3FV`, o mesmo do snippet do Google e do código. Confirmar no GA4 se houver dúvida.

### Implementação
- **Componente:** `src/components/marketing/google-analytics.tsx`
- **Onde é renderizado:** `src/app/layout.tsx`, no fim do `<body>`, valendo para todas as páginas.
- **Método:** `next/script` com `strategy="afterInteractive"`. São dois scripts: o `gtag.js` do Google e um inline com `dataLayer`, `gtag('js', ...)` e `gtag('config', ID)`.
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

### Histórico
| Data | Mudança |
|---|---|
| 2026-10-05 | Tag instalada e publicada (`9b4104e`). |
| 2026-10-05 | Carregamento condicionado ao aceite de cookies, com Consent Mode. |

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
