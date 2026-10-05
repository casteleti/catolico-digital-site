# 25 — Regras de trabalho e erros evitáveis

Registro de regras e armadilhas já encontradas. Cada item importante descoberto nas correções e otimizações entra aqui, com a data e o motivo, para não se repetir. Complementa `AGENTS.md` (regras para agentes) e `19_PROTOCOLO_CODEX.md`.

## Publicação
- **Push no `main` publica em produção.** O Coolify faz o deploy automático pelo webhook do GitHub. Só dar push com autorização explícita.
- **Sempre `git fetch` antes do push.** Há mais de uma pessoa enviando ao `main`. Em 2026-10-05 o push foi rejeitado porque o Renato tinha enviado 3 commits no meio do trabalho. Solução: `git rebase origin/main`, resolver conflitos, rodar `pnpm lint` e o build, e só então dar push.
- **Conflito comum:** `src/app/globals.css` e `src/app/layout.tsx`, porque todos acrescentam no fim do arquivo ou no mesmo ponto. Manter os dois lados.
- **Domínio de produção:** `https://catolico.digital`. O `catolicodigital.org` não responde. Testes e ferramentas de verificação devem usar o `.digital`.
- **Conferir no ar depois do deploy:** `curl -s https://catolico.digital | grep <trecho novo>`. O deploy leva cerca de 1 minuto.
- **Rota de missas:** `/modulos/missas-e-horarios`, não `/modulos/missas`.

## Antes de commitar
- Rodar `pnpm lint`. Ele inclui `scripts/colar-inicio-de-frase.mjs --check`.
- Rodar `npm run build`.
- **Tipografia (regra do Renato, 2026-10-05):** em título ou parágrafo com mais de uma frase, a primeira palavra da frase nova não pode ficar sozinha no fim da linha. Colar com ` ` em strings ou `&nbsp;` em JSX. Texto novo: rodar `pnpm tipografia`.
- Next.js deste projeto (16.3) tem diferenças em relação ao que se conhece. Ler `node_modules/next/dist/docs/` antes de escrever código novo.

## Tags, pixels e analytics
- Inventário e IDs em `Docs/24_TAGS_PIXELS_INVENTARIO.md`. Toda ferramenta nova entra lá no mesmo commit.
- Tags só carregam em produção (`NODE_ENV === "production"`).
- Variáveis `NEXT_PUBLIC_*` precisam existir **na hora do build** no Coolify.
- Nunca enviar e-mail, telefone, nome ou mensagem em eventos ou parâmetros de tags.
- **Consentimento:** toda tag de medição ou publicidade passa pelo `CookieConsent` (`src/components/marketing/cookie-consent.tsx`) e só carrega após o aceite. Nunca renderizar uma tag direto no `layout.tsx`. Detalhes em `Docs/24`.

## Performance (PageSpeed / Lighthouse)
- **Tags de terceiros são o maior custo de desempenho.** Medição local em 2026-10-05 (Lighthouse mobile, mesma máquina): sem GA4 e Meta Pixel a Home fazia 82; com os dois, 43. TBT foi de ~400 ms para ~1.800 ms. A auditoria do PageSpeed que mostrava 88 provavelmente foi feita antes de o Meta Pixel entrar. **Toda tag nova precisa de uma medição antes e depois.**
- Mitigação aplicada: `strategy="lazyOnload"` nas duas tags (Home 43 → 64). Resolvido pelo consentimento prévio: sem aceite as tags não carregam, e a Home mede 79 no mesmo ambiente.
- **Como medir:** `npm run build`, `npm run start` e Lighthouse mobile na porta local. Comparar sempre na mesma máquina, porque a nota local é mais baixa que a do PSI. Para isolar tags: `--blocked-url-patterns="*googletagmanager*" --blocked-url-patterns="*facebook*"`. A nota "Práticas recomendadas" cai para 77 só em `localhost` com as tags ligadas (HTTP e cookies de terceiros) e volta a 100 em produção.
- **Imagem fora da primeira tela:** usar `loading="lazy"`. O React 19 gera `<link rel="preload" as="image">` para toda `<img>` sem `lazy`. O logo do rodapé estava sendo pré-carregado junto com o do cabeçalho (`BrandMark` agora tem a prop `lazy`).
- **Cache:** `/_next/static` já vem com `immutable`. Arquivos de `public/` não têm hash: `next.config.ts` aplica 30 dias em `/brand`, favicon e logo. **Ao trocar um arquivo de `public/brand`, renomear o arquivo**, senão o navegador mantém o antigo por até 30 dias.
- **Contraste:** texto branco com alfa baixo sobre o azul escuro falha. O mínimo é 4,5:1. O texto legal do rodapé estava a 45% (4,3:1) e foi para 58%. Cuidado com novos `rgb(255 255 255 / N%)` abaixo de 55% em texto pequeno.
- JavaScript do próprio site é pequeno. Os blocos grandes são do framework (`react-dom` e o roteador do Next). Não há JS legado nem CSS não usado relevante.

## Segurança (headers HTTP e CSP)
- **Onde está:** headers fixos (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) em `next.config.ts`; `X-Powered-By` desligado com `poweredByHeader: false`; Content-Security-Policy com nonce por requisição em `src/proxy.ts` (no Next 16 o antigo `middleware.ts` se chama `proxy.ts`).
- **A CSP torna todas as páginas dinâmicas.** O nonce só existe por requisição, então o `layout.tsx` lê `headers()` e nenhuma página é mais HTML estático. Medido localmente: nota e TTFB iguais (cerca de 45 ms), mas as páginas saem com `Cache-Control: no-store` e não podem ser servidas por cache de CDN. Alternativa se isso virar problema: SRI experimental do Next (`experimental.sri`) com CSP por hash, que mantém o site estático.
- **Tag ou domínio externo novo quebra se não estiver na CSP.** O navegador bloqueia em silêncio. Acrescentar o domínio na diretiva certa em `src/proxy.ts` (`script-src` usa `'strict-dynamic'`, então scripts de terceiros só carregam se a tag for inserida por um script com nonce; `img-src` e `connect-src` exigem o domínio) e registrar em `Docs/24`. Testar com a tag ativa e olhar o console por `Content Security Policy`.
- **Estilos:** `style-src` usa nonce, mas atributos `style="..."` (largura do logo, cor por área, barras de progresso) não aceitam nonce, por isso existe `style-src-attr 'unsafe-inline'`. Não é risco de script. Evitar `<style>` inline novo sem passar pelo Next.
- **HSTS com `includeSubDomains; preload`:** vale por 1 ano para **todos** os subdomínios de `catolico.digital`, incluindo `app.catolico.digital`. Todos precisam servir HTTPS válido sempre. O header sozinho não coloca o domínio na lista de preload do navegador. Isso só acontece se alguém submeter o domínio em hstspreload.org, e desfazer leva meses. Não submeter sem decisão explícita.
- **`upgrade-insecure-requests`** é omitido em `localhost` para o `next start` local continuar funcionando.
- **Verificar no ar:** `curl -sI https://catolico.digital` (cinco headers fixos, CSP e sem `x-powered-by`) e depois securityheaders.com. Se Cloudflare ou Traefik/Coolify também definirem headers, conferir se não há duplicidade.

## Texto e conteúdo
- Antes de trocar um texto, buscar todas as ocorrências (`grep`). O mesmo termo pode aparecer na Home, nos módulos e nas páginas por papel, e nem sempre deve mudar junto.
- Conferir os IDs e números copiados de painéis. Em 2026-10-05 o ID do GA4 veio sem o último caractere (`G-Y7FQ36B3F` em vez de `G-Y7FQ36B3FV`).

## Como registrar um erro novo
Acrescentar um item na seção certa, com a data, o que aconteceu e a regra para evitar. Se a regra puder ser checada por script ou lint, preferir automatizar em vez de só documentar.

## Layout
- **Home tem rolagem horizontal no celular (aberto, 2026-10-05):** a 390 px, `scrollWidth` é 417. Os culpados são elementos decorativos do herói (`.hero-pattern`, `.hero-glow`, `.marquee__track`). Isso faz elementos `position: fixed` (aviso de cookies, botão do WhatsApp) saírem alinhados à largura errada. Corrigir com `overflow-x: clip` na seção do herói ou no `body`.
