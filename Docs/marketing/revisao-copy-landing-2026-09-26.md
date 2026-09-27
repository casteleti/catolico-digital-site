# Revisão de copy — Landing catolico.digital

**Data:** 2026-09-26 · **Escopo:** todo texto visível em `src/components/landing/landing-page.tsx`, `lead-form.tsx`, `site-header.tsx`, `site-footer.tsx`, `product-scroll-story.tsx`, `src/app/layout.tsx` (metadata), `/contato`, `/privacidade`, `not-found`.
**Critérios:** os próprios documentos do projeto — `Docs/05_COPY_CONTEUDO_CONVERSAO.md` (hierarquia de mensagem, CTA, prova, tom) e o pacote da plataforma (`catolico-plataforma/docs/01` e `02`: posicionamento "a paróquia administra informação, não páginas", quatro pilares, diferenciais).

---

## 0. Veredito em um parágrafo

O tom está certo: sóbrio, humano, sem exagero, sem promessa inventada — cumpre o `Docs/05` à risca. O problema não é o que a página diz, é **o que ela deixa de dizer**. A landing vende "um site bonito e fácil de manter", que é exatamente o que o pacote de análise afirma **não** ser o diferencial defensável. As três ideias que distinguem o produto (informação cadastrada uma vez e refletida em tudo; horários com exceções de Natal e Semana Santa; avisos que expiram sozinhos) e o recurso que "vende o produto" (o assistente por conversa, com confirmação) **não aparecem em lugar nenhum**. Além disso, há quatro pontos que quebram a confiança de quem chega por anúncio e precisam ser resolvidos antes de investir um real em mídia (seção 1).

---

## 1. Bloqueios — corrigir antes de veicular qualquer anúncio

| # | Onde | Problema | Por que bloqueia |
|---|---|---|---|
| B1 | `lead-form.tsx` | O formulário **não grava nada**: `setTimeout(450ms)` e mensagem de sucesso. O texto público diz "Seu interesse foi registrado **nesta demonstração**. O envio real será conectado ao fluxo de leads assim que o backend e o CRM forem configurados." e, abaixo do botão, "Esta é a estrutura visual do formulário. O processamento será conectado ao backend na próxima etapa." | Anúncio pago levando a um formulário que descarta o lead e ainda avisa isso ao visitante. Custo puro e dano de credibilidade. |
| B2 | `/contato` | Página diz "Esta página será conectada ao formulário de leads na próxima etapa." O CTA final da landing ("Ainda tenho uma dúvida") aponta para ela. | Beco sem saída no último passo do funil. |
| B3 | `/privacidade` | Placeholder: "Esta página receberá a política final revisada juridicamente antes do lançamento." O link está justamente na seção **Segurança e privacidade**, e o checkbox de consentimento do formulário remete a ela. | Meta e Google exigem política de privacidade válida em página de captação; e a página de confiança aponta para um texto que admite não existir. |
| B4 | `site-header.tsx` | Item de menu **"Entrar"** aponta para `/contato`. Não existe login nem produto acessível. | Promete um produto pronto que não existe; frustra quem clica. Remover até haver painel. |
| B5 | `layout.tsx` | `metadataBase: https://catolico-digital.example`; título só "Católico Digital"; descrição "Presença digital organizada para comunidades católicas." | Preview de link (WhatsApp, Facebook, Instagram) sai com URL/imagem erradas — e o link de anúncio será compartilhado. Título sem proposta de valor. |

---

## 2. Achados transversais (valem para a página inteira)

**2.1 A frase-mãe não está na página.** "A paróquia administra informação, não páginas" governa toda a arquitetura do produto e é o argumento mais forte contra Wix/WordPress. Não aparece. O exemplo canônico dos docs (mudar a missa de 19h para 18h30 e o site inteiro se atualizar) também não aparece. Sem isso, o visitante não entende por que isto é diferente de um template.

**2.2 Os diferenciais técnicos estão ausentes dos 10 cards de Recursos.** Faltam: **exceções de horário** ("24/12 às 20h, sem apagar o horário de sempre"), **avisos com validade** (somem sozinhos), **busca**, **histórico e desfazer** e o **assistente por conversa**. Os que estão (horários, agenda, notícias, pastorais, sacramentos, comunidades, documentos, contato, transmissões, contribuições) são o que **qualquer** site paroquial promete.

**2.3 O assistente (IA) é decisão pendente.** Os docs o chamam de "a cereja que vende o produto"; a landing não o menciona. Pode ser prudência (não vender o que não existe). Recomendo mencionar de forma honesta ("em desenvolvimento"), porque é o recurso com maior potencial de compartilhamento e responde à objeção "não sei mexer em site". **Decisão do Renato.**

**2.4 Repetição que vira ruído.** "presença digital" aparece 12 vezes; "fácil de manter / atualizar / administrar" 6 vezes, sem nunca mostrar **como** (nenhum verbo concreto: "altere um horário em um campo", "desfaça em um clique", "confirme antes de publicar"). "A tecnologia cuida da complexidade / fica nos bastidores" aparece em 3 seções (Produto, Propósito, Segurança). Consolidar num lugar só.

**2.5 Três nomes para o mesmo público.** "paróquias" (corpo todo), "comunidades católicas" (meta description e "primeiras comunidades" na seção de lançamento) e "organizações católicas" (rodapé). Como "comunidade" tem significado técnico no produto (capela/comunidade dentro da paróquia), padronizar em **paróquia**.

**2.6 Dois CTAs primários com verbos diferentes.** "Quero conhecer o Católico Digital" (hero, final, botão do form) e "Quero conversar sobre minha paróquia" (seção Para quem é). O segundo é melhor: específico, humano, sem nome de produto. Escolher um. `Docs/05 §7` pede CTA que descreva a ação; "conversar sobre minha paróquia" descreve exatamente o que vai acontecer.

**2.7 Nenhuma razão para agir agora além de "primeiras paróquias".** É honesto e suficiente, desde que seja verdade que há um número limitado de vagas nesta fase. Se houver, dizer ("estamos recebendo poucas paróquias nesta fase de apresentação"). Se não houver, manter como está. Não inventar.

**2.8 O único dado real disponível não é usado.** O levantamento das 310 paróquias da Arquidiocese de SP (set/2026: menos da metade com site; 131 sem nenhum canal digital) é a única "prova" legítima que existe hoje. Cabe na faixa de contexto ("A comunidade já está no digital") com fonte explícita. É argumento de "por que agora" sem inventar cliente ou depoimento.

---

## 3. Seção por seção

### 3.1 Metadata (`layout.tsx`)
- **Hoje:** title "Católico Digital" · description "Presença digital organizada para comunidades católicas."
- **Problema:** título sem proposta; descrição genérica e com "comunidades".
- **Sugestão:** title `Católico Digital — O site da paróquia que a secretaria consegue manter` · description `Horários, sacramentos, pastorais e avisos da paróquia em um só lugar, sempre atualizados. Simples para quem administra, claro para quem procura.` Corrigir `metadataBase` para `https://catolico.digital` e definir imagem OG 1200×630.

### 3.2 Header
- **Hoje:** Como funciona · Recursos · Para quem é · Segurança · Dúvidas · **Entrar** · Quero conhecer.
- **Sugestão:** remover "Entrar" (B4). Manter 5 âncoras + 1 CTA. CTA do header = o mesmo verbo escolhido em 2.6.

### 3.3 Hero
- **Hoje:** eyebrow "Tecnologia pensada para paróquias" · H1 "Uma presença digital à altura da sua paróquia." · sub "Tenha site, informações, agenda, notícias e comunicação organizados em um só lugar — de forma simples, atual e fácil de manter." · CTA "Quero conhecer o Católico Digital" · secundário "▶ Veja como funciona" · microcopy "Pensado para paróquias que querem cuidar melhor da sua presença no digital."
- **Problemas:** o H1 é elegante mas não responde "o que é / o que resolve" em 3 segundos ("à altura" é adjetivo, não benefício). O sub lista substantivos genéricos ("informações", "comunicação"). Eyebrow e microcopy dizem a mesma coisa ("pensado para paróquias"). O ícone ▶ promete vídeo e leva a uma seção de texto — afordance enganosa. A promessa central dos docs (mude uma vez, tudo atualiza) não está aqui.
- **Sugestão (opção A, benefício):**
  - eyebrow: `Para paróquias`
  - H1: `O site da paróquia que a secretaria consegue manter.`
  - sub: `Horários, sacramentos, pastorais e avisos em um só lugar. Mudou a missa? Altere uma vez e o site inteiro se atualiza — sem depender de quem entende de tecnologia.`
  - CTA: `Quero conversar sobre minha paróquia`
  - secundário: `Ver como funciona` (sem ▶)
  - microcopy: `Estamos apresentando às primeiras paróquias. Sem compromisso.`
- **Sugestão (opção B, mais institucional):** H1 `Horários certos, avisos em dia, comunidade bem informada.` sub igual à A.

### 3.4 Faixa de contexto
- **Hoje:** "A comunidade já está no digital" / "A informação da paróquia também precisa estar." / parágrafo sobre informação espalhada.
- **Avaliação:** bom. Forte e coerente.
- **Sugestão:** acrescentar o dado real (2.8): `Na Arquidiocese de São Paulo, menos da metade das paróquias tem site próprio.*` com nota de fonte discreta (levantamento próprio, set/2026, páginas da arquisp.org.br).

### 3.5 Dores (6 cards)
- **Avaliação:** bom; dores operacionais verificáveis, como o `Docs/05 §4` pede. "Dependência de poucas pessoas" toca a rotatividade — acertado.
- **Ajustes:** (a) H2 e parágrafo usam "deveria" em sequência; trocar o parágrafo por algo assertivo: `A tecnologia tem de facilitar a comunicação da comunidade — não criar tarefas, dependências e dificuldades.` (b) Card "Horários desatualizados" é a dor nº 1 dos docs (horário errado no público é o pior erro possível) e está diluído; título mais vívido: `A missa mudou. O site ficou no horário antigo.`

### 3.6 Produto (#produto)
- **Hoje:** H2 "Tudo o que a paróquia precisa para cuidar melhor da sua presença digital." · parágrafo · citação "A tecnologia cuida da complexidade..." · mini-lista "Um site profissional / Fácil de atualizar / Adaptado à realidade da paróquia".
- **Problemas:** "Tudo o que a paróquia precisa" é a promessa "completa" que o `Docs/05 §1` manda evitar — e contradiz o escopo negativo (não faz financeiro, catequese, dízimo processado). A seção não explica o mecanismo.
- **Sugestão:**
  - H2: `Um site que nasce da informação da paróquia — e se mantém com ela.`
  - parágrafo: `No Católico Digital, cada informação existe uma única vez: a missa de domingo, a Pastoral Familiar, a festa do padroeiro. O site, a agenda, a busca e a página de horários leem essa mesma informação. Você cuida do conteúdo; o sistema cuida de onde ele aparece.`
  - manter a citação (e retirá-la das outras duas seções).
  - mini-lista: `Cadastre uma vez, apareça em todo lugar` / `Atualize em minutos, sem saber de sites` / `Ligue e desligue o que a sua paróquia usa`.

### 3.7 Recursos (#recursos, 10 cards)
- **Avaliação:** coerente com o sistema de módulos (liga/desliga). Falta o que diferencia (2.2).
- **Ajustes por card:**
  - "Horários de celebrações" → acrescentar a exceção: `Missas, confissões e adoração — inclusive os horários especiais de Natal, Semana Santa e festas, sem apagar o horário de sempre.`
  - "Notícias e comunicados" → `Avisos com data de validade: saem do site sozinhos quando deixam de valer.`
  - "Transmissões e conteúdos" → o MVP incorpora vídeo (não hospeda): `Vídeos do YouTube e transmissões incorporados às páginas.`
  - "Contribuições e doações" → o MVP não processa pagamento: `Dados bancários e PIX com QR Code para quem quer contribuir, sem intermediários.` ("caminhos seguros para contribuições" sugere pagamento integrado.)
  - "Documentos e informações" → vago; especificar ou remover.
  - **Adicionar** (substituindo "Documentos" se precisar manter 10): `Busca` — "Quem procura 'batismo' encontra o sacramento, os documentos e o contato." e, se aprovado em 2.3, `Assistente por conversa` — "Diga o que mudou. Ele mostra o que vai alterar e pede sua confirmação."
- Callout "Use apenas o que fizer sentido" — bom, manter.

### 3.8 Como funciona (#como-funciona, 4 passos)
- **Hoje:** Conhecemos a paróquia → Preparamos → Publicamos → A paróquia continua no controle.
- **Problema:** descreve o processo de **implantação/venda**, não como o produto funciona. Quem clicou "Veja como funciona" no hero espera ver o produto. Passo 4 é fraco ("podem ser atualizadas conforme a necessidade").
- **Sugestão:** renomear a seção para `Como começa` (ela é boa para isso) e mover a explicação do produto para 3.6. Passo 4: `A secretaria atualiza pelo painel, em linguagem simples — e o que mudar pode ser desfeito.` Não inventar prazo ("em X dias") a menos que exista compromisso real.

### 3.9 Benefícios (6 cards, fundo azul)
- **Avaliação:** bom; recurso → tarefa → resultado, como o `Docs/05 §5` pede.
- **Ajustes:** "no dispositivo usado diariamente" → `no celular, onde a comunidade realmente acessa`. "Mais controle" → nomear o controle: `Acesso por pessoa e por função — e a conta é da paróquia, não de quem a criou.` (é o RN-31 virando benefício).

### 3.10 Demonstração (tabs)
- **Hoje:** H2 "Bonito para quem visita. Simples para quem administra." — **a melhor frase da página**, manter e considerar promovê-la.
- **Problema:** os mockups são retângulos vazios em CSS. Numa seção chamada "demonstração", isso lê como "não há produto".
- **Sugestão:** preencher os mockups com conteúdo de exemplo claramente fictício e plausível ("Paróquia São José · Domingo 08h e 19h · Matriz"), marcado como ilustrativo. Nunca apresentar como captura real.

### 3.11 Para quem é (checklist)
- **Avaliação:** bom; espelha as dores. CTA "Quero conversar sobre minha paróquia" é o melhor CTA da página.
- **Ajuste:** unificar com 2.6.

### 3.12 Propósito ("Digitalizar não significa perder proximidade.")
- **Avaliação:** bonito e no tom. Redundante com 3.6 e 3.13 (a citação "tecnologia nos bastidores").
- **Sugestão:** manter a seção, retirar a repetição de "bastidores" das outras duas.

### 3.13 Segurança e privacidade
- **Avaliação:** honesta, sem overclaim ("considera princípios e requisitos aplicáveis da LGPD") — correto.
- **Faltas:** o argumento específico do domínio — inscrição em sacramento e "quero participar" de pastoral são dados sensíveis (convicção religiosa) e o sistema só os coleta com consentimento explícito. É diferencial de venda e resposta a uma objeção real de párocos. Sugestão de card: `Consentimento explícito — Inscrições em sacramentos e pastorais só com autorização registrada de quem se inscreve.`
- Link "Conheça nossa política de privacidade" → B3.

### 3.14 Diferencial (comparação "Site genérico × Católico Digital")
- **Hoje:** "Estrutura criada do zero / Recursos precisam ser adaptados / Manutenção fragmentada" vs "Estrutura preparada / Recursos paroquiais / Gestão simplificada".
- **Problema:** abstrato, sem paralelismo e sem contraste real ("estrutura criada do zero" não soa ruim). É a seção mais fraca da página.
- **Sugestão (contrastes concretos):**

| Site genérico | Católico Digital |
|---|---|
| O horário da missa digitado em quatro páginas — e dessincronizado em uma | O horário cadastrado uma vez, mostrado em todas |
| Uma página "Missas" que alguém precisa lembrar de editar no Natal | Horários especiais por data, sem mexer no horário de sempre |
| Aviso de "secretaria fechada" que fica meses no ar | Aviso com validade, some sozinho |
| A senha do site na conta pessoal de quem saiu | A conta é da paróquia; o acesso se transfere |
| Quem atualiza precisa entender de site | Quem atualiza precisa entender de paróquia |

- Acrescentar a segunda fronteira do posicionamento: `Também não é um sistema pesado de gestão paroquial: não substitui financeiro, cadastro de famílias ou catequese. Faz a parte da informação pública — e faz bem.`

### 3.15 Lançamento e formulário (#quero-conhecer)
- **Avaliação:** honesto e bem montado. Campos certos para uma primeira conversão (nome, e-mail, WhatsApp opcional, paróquia, cidade/UF, situação atual). Consentimento separado de marketing — correto pelo `Docs/12`.
- **Ajustes:** (a) "primeiras **comunidades**" → "primeiras **paróquias**" (2.5). (b) Remover os dois textos de demonstração (B1). (c) Considerar um campo opcional "Seu papel na paróquia" (pároco / secretaria / pastoral ou comunicação / outro) — ajuda a qualificar e a conduzir a conversa; se o `Docs/05 §8` (menos campos) pesar mais, colocar no lugar do "Existe algo que gostaria de nos contar?". (d) O checkbox de consentimento referencia uma política que não existe (B3).

### 3.16 FAQ (8 perguntas)
- **Avaliação:** as perguntas são as certas. Três respostas são evasivas onde poderiam ser claras **sem inventar nada**:
  - "Quanto custa?" — hoje: "serão apresentadas diretamente às paróquias interessadas". É a objeção nº 1 e o `Docs/03 §6` pede "mensagem clara quando houver venda consultiva". Sugestão fiel ao modelo dos docs (implantação + mensalidade): `Trabalhamos com uma implantação assistida e uma mensalidade de custo baixo por paróquia. Os valores dependem do tamanho da paróquia e do número de comunidades, e são apresentados na conversa inicial.`
  - "Podemos utilizar nosso próprio domínio?" — hoje hedge ("a estrutura prevê a possibilidade"). A decisão técnica está tomada: `Sim. A paróquia pode usar seu endereço próprio (por exemplo, paroquiasaojose.com.br) ou um endereço em catolico.digital. Nós cuidamos do certificado de segurança.`
  - "Existe suporte?" — hoje vago. Dizer o que existe de fato (canal e horário) ou, se ainda não estiver definido, `Sim — o suporte faz parte da mensalidade. Detalhes do canal e do horário são combinados na implantação.`
- **Perguntas a acrescentar** (todas do `Docs/05 §9` ou do domínio):
  - `Quem fica com o acesso quando o pároco ou a secretária mudam?` → `A conta é da paróquia. A administração é transferida para a nova pessoa; nada se perde com a saída de alguém.` (RN-31 — é diferencial real e responde ao medo mais comum.)
  - `O conteúdo é nosso?` → `Sim. Textos, fotos e informações são da paróquia.`
  - `E se quisermos cancelar?` → responder só com a regra real quando existir; até lá, não incluir.

### 3.17 CTA final
- **Hoje:** "Uma presença digital mais simples para quem cuida da comunidade." + "Ainda tenho uma dúvida" → `/contato` (B2).
- **Sugestão:** manter o H2 (é bom). "Ainda tenho uma dúvida" → apontar para `#duvidas` ou para o formulário com o campo de mensagem, até `/contato` existir de verdade.

### 3.18 Rodapé, 404, scroll story
- Rodapé "Tecnologia humana para organizações católicas." → `Tecnologia humana para paróquias.` (2.5).
- 404: bom.
- `product-scroll-story.tsx` (narrativa sticky): "Tudo começa com uma informação" é exatamente a frase-mãe em outras palavras — está no lugar certo, mas só aparece para quem rola até `#produto` com JS ativo. Vale trazer a ideia para o texto principal (3.6).

---

## 4. Ordem de execução sugerida

1. **B1 a B5** (bloqueios). Sem isso, nenhum anúncio.
2. Hero (3.3) + Produto (3.6): é onde a promessa nasce.
3. Recursos (3.7) + Comparação (3.14): é onde o diferencial aparece.
4. FAQ (3.16): preço, domínio, acesso na troca de pároco, propriedade do conteúdo.
5. Padronizações (2.5, 2.6) e cortes de repetição (2.4).
6. Metadata/OG (3.1) — junto com B5.
7. Decisão sobre o assistente (2.3) — do Renato.

Tudo acima preserva o tom atual. Nenhuma sugestão introduz número, cliente, depoimento ou prazo que não exista.
