# Católico Digital — Direção Visual, UI/UX, Motion e Homepage Comercial

> **Documento de referência para o site comercial e de lançamento do Católico Digital**
>
> Objetivo: definir uma linguagem visual premium, contemporânea, acolhedora e altamente desejável, com efeitos e movimento suficientes para aumentar percepção de valor e memorabilidade, sem comprometer clareza, acessibilidade, performance ou conversão.

---

# 1. Princípio central

O site comercial do Católico Digital deve ser **mais expressivo, emocional e visualmente sofisticado** do que o painel administrativo.

A lógica é:

- **Site comercial** → atrair, encantar, explicar, gerar desejo e converter.
- **Login** → transmitir confiança, clareza e acolhimento.
- **Painel** → maximizar produtividade, previsibilidade e facilidade de uso.

A marca deve permanecer coerente entre os três contextos, mas o nível de expressão visual muda de acordo com o objetivo.

## Regra-mãe

> **Encantamento controlado.**
>
> O site pode ter profundidade, movimento, efeitos, mockups, transições e composições mais ousadas, desde que cada recurso ajude a contar a história do produto, evidenciar valor ou conduzir à ação.

Evitar efeitos decorativos sem função.

---

# 2. Personalidade visual

A linguagem visual do site comercial deve transmitir:

- acolhimento;
- confiança;
- serenidade;
- tecnologia;
- contemporaneidade;
- sofisticação;
- humanidade;
- organização;
- credibilidade;
- desejo de uso.

## Não deve parecer

- portal paroquial antigo;
- template genérico de igreja;
- SaaS americano genérico;
- landing page agressiva de infoproduto;
- produto excessivamente corporativo;
- interface futurista/neon;
- site minimalista demais e sem personalidade;
- produto infantil;
- site visualmente pesado.

## Palavras-chave de direção

**acolhedor · confiável · sereno · contemporâneo · humano · premium**

---

# 3. Paleta oficial

## 3.1 Cores da marca

| Token | Cor | Papel |
|---|---:|---|
| `brand-blue` | `#0A1F5C` | Primária institucional e funcional |
| `brand-purple` | `#735290` | Acento secundário / espiritualidade |
| `brand-rose` | `#A35069` | Acolhimento / comunidade / pessoas |
| `brand-wine` | `#762A43` | Profundidade / solenidade / premium |
| `brand-brown` | `#733F30` | Tradição / patrimônio / história |
| `white` | `#FFFFFF` | Superfícies |
| `gray-50` | `#F5F5F5` | Fundo principal claro |
| `graphite` | `#222222` | Texto principal |

## 3.2 Distribuição visual

Usar como referência:

- **70–80%** neutros;
- **15–25%** azul;
- **5–10%** cores secundárias.

As cores roxo, rosa, vinho e marrom não devem competir entre si na mesma seção.

## 3.3 Regra de uso

### Azul `#0A1F5C`
Usar em:

- CTA principal;
- links importantes;
- navegação ativa;
- destaques;
- títulos estratégicos;
- mockups;
- superfícies de impacto;
- foco;
- elementos institucionais.

### Roxo `#735290`
Usar em:

- detalhes editoriais;
- espiritualidade;
- sacramentos;
- destaques delicados;
- gráficos;
- pequenas áreas de apoio.

### Rosa queimado `#A35069`
Usar em:

- comunidade;
- relacionamento;
- pessoas;
- pastorais;
- detalhes humanos;
- elementos de proximidade.

### Vinho `#762A43`
Usar em:

- seções mais solenes;
- frases editoriais;
- detalhes premium;
- destaques institucionais.

### Marrom `#733F30`
Usar em:

- história;
- tradição;
- patrimônio;
- elementos editoriais pontuais.

## 3.4 Neutros derivados

Evitar cinzas aleatórios.

```css
:root {
  --brand-primary: #0A1F5C;
  --brand-purple: #735290;
  --brand-rose: #A35069;
  --brand-wine: #762A43;
  --brand-brown: #733F30;

  --bg-page: #F5F5F5;
  --bg-surface: #FFFFFF;
  --bg-elevated: #FFFFFF;

  --text-primary: #222222;
  --text-secondary: color-mix(in oklch, #222222 70%, #ffffff);
  --text-tertiary: color-mix(in oklch, #222222 54%, #ffffff);

  --border-default: color-mix(in oklch, #222222 14%, #ffffff);
  --border-subtle: color-mix(in oklch, #222222 8%, #ffffff);

  --action-primary: #0A1F5C;
  --action-primary-text: #FFFFFF;
  --focus: #0A1F5C;
}
```

## 3.5 Semântica

Não usar as cores da marca como substitutas da semântica.

- Sucesso → verde
- Atenção → âmbar
- Erro → vermelho
- Informação → azul informativo

Marca e semântica devem permanecer separadas.

---

# 4. Tipografia

## 4.1 Fonte principal

### Inter

**Inter será a fonte principal e funcional do site.**

Usar em:

- navegação;
- corpo de texto;
- botões;
- formulários;
- cards;
- benefícios;
- preços;
- FAQ;
- depoimentos;
- labels;
- CTAs;
- textos de interface;
- mockups do produto.

Pesos recomendados:

- 400 — regular
- 500 — medium
- 600 — semibold
- 700 — bold apenas quando realmente necessário

## 4.2 Fonte editorial

### Fraunces

Fraunces deve ser utilizada apenas como **serifada editorial da marca**.

Usar em:

- palavra ou trecho especial de headline;
- manifesto;
- citação;
- frase conceitual;
- detalhes de marca;
- seção editorial de impacto.

Não usar em:

- menu;
- botões;
- labels;
- formulários;
- FAQ;
- tabelas;
- preços;
- componentes operacionais;
- textos longos.

## 4.3 Proporção de uso

- **Inter:** 90–95%
- **Fraunces:** 5–10%

A Fraunces ganha valor justamente por aparecer pouco.

---

# 5. Escala tipográfica

## Desktop

```css
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-md: 18px;
--text-lg: 20px;
--text-xl: 24px;
--text-2xl: 32px;
--text-3xl: 40px;
--text-4xl: 52px;
--text-5xl: 64px;
--text-hero: clamp(52px, 6vw, 84px);
```

## Recomendações

### Hero
- 56–84 px
- 600–700
- line-height entre 0.98 e 1.08
- largura máxima de 10–13 palavras por linha

### H2
- 40–56 px
- 600
- line-height 1.05–1.15

### H3
- 24–32 px
- 600

### Corpo
- 16–18 px
- line-height 1.55–1.7

### Texto auxiliar
- 14–16 px

### CTA
- 15–17 px
- 600

---

# 6. Nível de sofisticação desejado

O nível de sofisticação deve ser **alto**, mas não ostensivo.

## 6.1 Sofisticação visual

Usar:

- composição editorial;
- grid assimétrico;
- muito espaço negativo;
- sobreposição controlada;
- mockups em perspectiva suave;
- iluminação ambiental;
- blur discreto;
- profundidade por camadas;
- fundos tonais;
- formas inspiradas discretamente em arquitetura;
- transições de seção bem construídas;
- detalhes de borda;
- microinterações;
- ritmo visual consistente.

## 6.2 Sofisticação não é excesso

Evitar:

- glassmorphism exagerado;
- cards em excesso;
- sombras pesadas;
- gradients fortes;
- partículas;
- brilhos constantes;
- neon;
- rotação exagerada;
- animação em todos os elementos;
- excesso de curvas;
- layouts que sacrificam leitura.

## 6.3 Princípio

> O usuário deve perceber que o site é sofisticado antes de perceber quais efeitos foram utilizados.

---

# 7. Formas, radius e superfícies

## Radius

```css
--radius-xs: 6px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-2xl: 28px;
--radius-pill: 999px;
```

## Aplicação

| Elemento | Radius |
|---|---:|
| Inputs | 10–12 px |
| Botões | 10–12 px |
| Cards pequenos | 12–16 px |
| Cards principais | 16–20 px |
| Mockups | 20–28 px |
| Blocos premium | 24–28 px |

## Sombras

```css
--shadow-xs:
  0 1px 2px rgb(34 34 34 / .04);

--shadow-sm:
  0 2px 8px rgb(34 34 34 / .05);

--shadow-md:
  0 8px 30px rgb(34 34 34 / .07);

--shadow-lg:
  0 20px 60px rgb(34 34 34 / .10);

--shadow-xl:
  0 40px 100px rgb(10 31 92 / .12);
```

Usar sombras fortes apenas em mockups e elementos hero.

---

# 8. Espaçamento

Base de 4 px.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-28: 112px;
--space-32: 128px;
```

## Seções

Desktop:

- padding vertical: 96–160 px

Mobile:

- padding vertical: 64–96 px

---

# 9. Motion design

## 9.1 Tempos

```css
--motion-fast: 120ms;
--motion-base: 180ms;
--motion-medium: 280ms;
--motion-slow: 450ms;
--motion-hero: 700ms;

--ease-standard:
  cubic-bezier(.2, .8, .2, 1);

--ease-emphasized:
  cubic-bezier(.16, 1, .3, 1);
```

## 9.2 Uso

### Fast
- hover;
- botão;
- link;
- foco.

### Base
- cards;
- inputs;
- pequenas transições.

### Medium
- reveal;
- tabs;
- troca de estado.

### Slow
- entrada de seções;
- mockups;
- transições editoriais.

### Hero
- apenas no primeiro carregamento e com extrema moderação.

## 9.3 Movimento permitido

- fade-up;
- scale de 0.98 → 1;
- translate de 8–24 px;
- parallax leve;
- mockups flutuantes;
- reveal de máscara;
- mudança tonal no background;
- progressão por scroll;
- crossfade entre templates;
- transição de cards;
- pequenas rotações de 1–3°.

## 9.4 Movimento proibido

- bounce excessivo;
- loops permanentes;
- efeitos que seguem o mouse em excesso;
- rotação contínua;
- partículas;
- scroll hijacking;
- parallax forte;
- movimento que prejudique leitura.

## 9.5 Acessibilidade

Respeitar sempre:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

# 10. Estrutura ideal da homepage

A homepage deve contar uma história progressiva:

> **Entender → visualizar → acreditar → desejar → confiar → agir**

Estrutura recomendada:

1. Header
2. Hero
3. Prova imediata / benefício principal
4. Demonstração visual do produto
5. Problema atual das paróquias
6. Como funciona
7. Benefícios principais
8. Templates / personalização
9. Módulos e recursos
10. Segurança / simplicidade / confiança
11. Depoimentos ou prova social
12. Planos / chamada comercial
13. FAQ
14. CTA final
15. Footer

---

# 11. Efeitos por seção

## 11.1 Header

### Objetivo
Transmitir organização e confiança.

### Visual
- fundo transparente sobre o hero;
- torna-se sólido ao scroll;
- leve blur somente depois da rolagem;
- borda inferior sutil;
- logo sempre legível.

### Efeitos
- transição suave entre transparente e sólido;
- CTA com hover refinado;
- underline animado nos links.

### Evitar
- menu chamativo;
- grandes sombras;
- efeitos de hover excessivos.

---

## 11.2 Hero

### Objetivo
Criar impacto imediato e desejo de conhecer o produto.

### Conteúdo
- eyebrow curto;
- headline forte;
- subheadline clara;
- CTA principal;
- CTA secundário;
- mockup principal do sistema.

### Direção visual
Composição assimétrica.

Uma opção forte:

- texto à esquerda;
- produto à direita;
- fundo claro com luz azul suave;
- elementos de interface em profundidade.

### Efeitos
- mockup com entrada progressiva;
- cards secundários com stagger suave;
- radial glow;
- parallax leve em profundidade;
- pequenas camadas flutuantes;
- highlight animado discreto no CTA.

### Limite
O usuário precisa conseguir compreender a proposta antes de perceber a animação.

---

## 11.3 Benefício principal / prova imediata

### Objetivo
Responder:

**“Por que isso existe?”**

### Visual
- seção curta;
- mensagem muito clara;
- 3 benefícios;
- números ou indicadores quando houver dados reais.

### Efeitos
- reveal de cards;
- contadores somente se existirem métricas verdadeiras;
- ícones com microinteração.

### Evitar
- dados inventados;
- carrossel automático.

---

## 11.4 Demonstração do produto

### Objetivo
Fazer o visitante pensar:

**“Eu quero usar isso.”**

### Visual
Grande mockup do dashboard.

Pode apresentar:

- dashboard;
- agenda;
- missas;
- avisos;
- eventos;
- aparência;
- publicação.

### Efeitos
- sticky section;
- troca do mockup conforme o scroll;
- hotspot discreto;
- transição de módulos;
- zoom suave.

### Regra
Não transformar a seção em tutorial.

Mostrar o suficiente para gerar compreensão e desejo.

---

## 11.5 Problema atual

### Objetivo
Criar identificação sem dramatização.

Exemplos:

- informação espalhada;
- site desatualizado;
- dificuldade de publicar;
- dependência de terceiros;
- horários incorretos;
- comunicação fragmentada.

### Visual
Composição editorial limpa.

### Efeitos
- texto entrando em sequência;
- comparação leve entre “antes” e “depois”;
- motion mínimo.

---

## 11.6 Como funciona

### Estrutura
3 ou 4 etapas no máximo.

Exemplo:

1. Cadastre sua paróquia
2. Escolha sua identidade
3. Organize os conteúdos
4. Publique

### Efeitos
- linha progressiva;
- cards conectados;
- scroll reveal;
- mudança de foco conforme etapa.

### Mobile
Empilhado verticalmente.

---

## 11.7 Benefícios

Agrupar benefícios por resultado, não por recurso técnico.

Exemplos:

### Para quem administra
- atualizar sem medo;
- publicar rapidamente;
- visualizar antes de salvar.

### Para os fiéis
- encontrar horários;
- descobrir eventos;
- acessar pelo celular.

### Para a paróquia
- presença digital profissional;
- autonomia;
- identidade própria.

### Efeitos
- grid elegante;
- hover discreto;
- ícones animados uma única vez.

---

# 12. Templates e personalização

Esta é uma das seções mais importantes comercialmente.

Mostrar os templates:

- Clássico
- Contemporâneo
- Minimal

## Interação ideal

- tabs ou selector;
- preview grande;
- troca instantânea;
- transição crossfade;
- pequenas mudanças de layout e tipografia.

## Efeito recomendado

O frame do site permanece estável enquanto a identidade muda.

Isso comunica visualmente:

> **mesmo conteúdo, diferentes apresentações.**

É uma demonstração direta do valor da plataforma.

---

# 13. Seção de módulos

Não criar uma grade enorme com 20 cards iguais.

Agrupar por necessidades.

### Comunicação
- avisos;
- notícias;
- eventos.

### Vida paroquial
- missas;
- sacramentos;
- pastorais;
- comunidades.

### Gestão
- usuários;
- imagens;
- histórico;
- aparência.

### Presença digital
- domínio;
- SEO;
- compartilhamento;
- mobile.

## Efeito
- accordion;
- tabs;
- navegação lateral;
- mockup contextual.

---

# 14. Confiança, segurança e simplicidade

Seção mais calma visualmente.

Objetivos:

- diminuir objeções;
- transmitir estabilidade;
- demonstrar cuidado.

Pode abordar:

- acessibilidade;
- privacidade;
- LGPD;
- responsividade;
- backups;
- segurança;
- facilidade de atualização.

## Visual
- fundo claro;
- muito espaço;
- ícones simples;
- poucas animações.

---

# 15. Prova social

Quando houver material real:

- depoimentos;
- paróquias piloto;
- logos;
- números;
- avaliações.

Nunca usar depoimentos fictícios.

## Efeito
- slider manual opcional;
- cards com profundidade mínima;
- sem rotação automática agressiva.

---

# 16. Planos / pricing

Precisa ser extremamente claro.

## Prioridades
- o que está incluído;
- diferenças reais entre planos;
- CTA;
- teste grátis, se aplicável;
- cancelamento;
- suporte;
- domínio.

## Visual
- 2–3 opções no máximo;
- um plano destacado apenas se houver motivo comercial real;
- fundo neutro;
- contraste forte.

## Efeitos
Quase nenhum.

Conversão aqui depende de clareza.

---

# 17. FAQ

FAQ é funcional.

Usar:

- accordion;
- tipografia confortável;
- abertura suave;
- deep links se necessário.

Evitar:

- efeitos decorativos;
- colunas demais;
- textos muito longos.

---

# 18. CTA final

Deve fechar a história.

## Visual
Pode ser uma das áreas mais fortes da página.

Usar:

- fundo azul profundo;
- luz radial;
- detalhe roxo/vinho;
- headline forte;
- CTA branco ou de alto contraste;
- mockup ou elemento arquitetônico sutil.

## Efeito
- entrada suave;
- brilho quase imperceptível;
- deslocamento mínimo de elementos.

---

# 19. Footer

Simples e confiável.

Incluir:

- marca;
- produto;
- termos;
- privacidade;
- contato;
- redes;
- informações institucionais.

Poucos efeitos.

---

# 20. Equilíbrio entre beleza, performance e conversão

## 20.1 Regra 1 — beleza nunca pode esconder a mensagem

Cada seção precisa responder uma pergunta.

Exemplo:

- Hero → o que é?
- Demonstração → como parece?
- Benefícios → o que ganho?
- Templates → posso personalizar?
- Segurança → posso confiar?
- Pricing → quanto custa?
- CTA → como começo?

Se uma animação atrapalhar essa resposta, remover.

## 20.2 Regra 2 — efeitos precisam ter função

Cada efeito precisa cumprir pelo menos uma destas funções:

1. orientar atenção;
2. explicar uma relação;
3. mostrar estado;
4. aumentar percepção de profundidade;
5. demonstrar o produto;
6. reforçar marca.

Se não cumprir nenhuma, é decoração dispensável.

## 20.3 Regra 3 — performance é parte da estética

Uma página premium não pode parecer lenta.

## Orçamentos recomendados

### Core Web Vitals

- LCP ≤ 2,0 s
- CLS ≤ 0,05
- INP ≤ 200 ms

### JavaScript

Hero e homepage:

- evitar frameworks de animação pesados quando CSS resolver;
- carregar animações sob demanda;
- evitar scripts globais desnecessários.

### Imagens

- AVIF / WebP;
- responsive images;
- preload apenas do hero necessário;
- lazy load abaixo da dobra;
- dimensões sempre declaradas.

### Vídeos

Evitar autoplay pesado.

Se houver vídeo:

- poster otimizado;
- carregar sob interação;
- usar versão curta e comprimida.

---

# 21. Estratégia de efeitos técnicos

Prioridade:

1. CSS transitions
2. CSS animations
3. Intersection Observer
4. Web Animations API
5. biblioteca externa apenas quando realmente necessário

Evitar dependência de bibliotecas grandes apenas para:

- fade;
- slide;
- hover;
- reveal simples.

---

# 22. Conversão

## CTA principal

Deve permanecer consistente.

Sugestões:

- “Começar teste gratuito”
- “Criar meu site”
- “Conhecer o Católico Digital”

Escolher uma ação principal e repetir com consistência.

## CTA secundário

Pode ser:

- “Ver como funciona”
- “Conhecer os templates”
- “Ver demonstração”

Não apresentar 3 ou 4 ações concorrentes no hero.

---

# 23. Hierarquia de conversão

## Primeira dobra

Deve conter:

- o que é;
- para quem é;
- principal benefício;
- CTA;
- visual do produto.

O visitante não deve precisar rolar para entender a proposta.

---

# 24. Mobile-first comercial

O mobile não deve ser uma versão reduzida do desktop.

## Ajustes

- hero mais simples;
- mockup menor;
- remover efeitos decorativos excessivos;
- reduzir parallax;
- manter CTA visível;
- tipografia responsiva;
- cards empilhados;
- animações menores;
- evitar sticky complexo.

## Prioridade

**clareza > efeito**

---

# 25. Acessibilidade

Aplicar:

- WCAG 2.2 AA;
- contraste mínimo 4.5:1 para texto comum;
- foco visível;
- navegação por teclado;
- alvos de toque ≥ 48 px;
- `prefers-reduced-motion`;
- sem informação transmitida somente por cor;
- labels em formulários;
- headings em ordem;
- links descritivos;
- zoom 200% sem perda funcional.

---

# 26. Mockups do produto

Os mockups são fundamentais para o lançamento.

## Direção

Usar telas reais do produto sempre que possível.

Apresentar:

- dashboard;
- horários;
- eventos;
- aparência;
- publicação;
- site da paróquia.

## Tratamento visual

- perspective muito leve;
- sombra suave;
- borda clara;
- frame do navegador discreto;
- profundidade moderada;
- sem reflexos exagerados.

---

# 27. Ilustrações e elementos visuais

Preferir:

- elementos abstratos;
- arquitetura sutil;
- geometrias derivadas da marca;
- linhas;
- arcos;
- portais;
- luz;
- composições editoriais.

Evitar:

- ilustração religiosa genérica;
- clipart;
- banco de imagens óbvio;
- excesso de cruzes;
- vitrais literais;
- dourado decorativo em excesso.

---

# 28. Fotografia

Quando houver fotografia:

- pessoas reais;
- comunidades;
- igrejas reais;
- luz natural;
- cenas humanas;
- enquadramento documental/editorial.

Evitar:

- stock artificial;
- poses corporativas;
- mãos em oração genéricas;
- excesso de dramatização.

---

# 29. Ícones

Usar um único sistema de ícones.

Recomendação:

- Lucide ou equivalente;
- outline;
- 16 / 20 / 24 px;
- stroke consistente.

Ícones próprios somente para elementos de domínio muito específicos.

---

# 30. Grid

## Desktop

- 12 colunas
- max-width 1280–1440 px
- gutters 24–32 px

## Tablet

- 8 colunas

## Mobile

- 4 colunas
- margem lateral 20–24 px

---

# 31. Breakpoints

```css
--bp-xs: 360px;
--bp-sm: 480px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
--bp-2xl: 1536px;
```

---

# 32. Transições entre seções

Evitar “uma caixa por seção”.

Criar continuidade visual usando:

- mudança tonal;
- interseção de backgrounds;
- curvas discretas;
- overlap;
- mockups atravessando limites;
- shapes leves;
- gradientes.

O site deve parecer uma narrativa contínua.

---

# 33. Ritmo visual

Alternar:

1. seção de impacto;
2. seção calma;
3. seção de produto;
4. seção editorial;
5. seção funcional;
6. CTA.

Isso evita fadiga.

---

# 34. Regra de densidade

Nunca colocar muitas seções densas em sequência.

Depois de:

- mockup grande;
- grid;
- comparação;

inserir uma seção com:

- mais branco;
- menos elementos;
- texto maior;
- leitura simples.

---

# 35. Padrão de cards

Cards devem existir quando agrupam informação.

Não usar card para tudo.

## Tipos

### Card funcional
- fundo branco;
- borda sutil;
- radius 16 px.

### Card premium
- leve sombra;
- background tonal;
- radius 20–24 px.

### Card editorial
- sem borda;
- foco em tipografia.

---

# 36. Hover

Hover deve indicar resposta, não espetáculo.

Permitido:

- translateY(-2px);
- shadow um nível acima;
- border mais visível;
- mudança sutil de background;
- ícone deslocar 2–4 px.

Evitar:

- scale grande;
- rotate;
- glow forte;
- animação longa.

---

# 37. Loader e skeleton

Não usar spinner quando skeleton fizer mais sentido.

Site comercial deve carregar o conteúdo essencial sem depender de skeleton.

Skeletons são prioritários para áreas demonstrativas interativas, se existirem.

---

# 38. Performance visual

Evitar:

- blur em grandes áreas;
- filtros CSS pesados;
- 15 layers de box-shadow;
- vídeos de background;
- animações com propriedades de layout;
- scroll event manual constante.

Preferir animar:

- transform;
- opacity.

---

# 39. SEO e conversão

O design não pode prejudicar:

- conteúdo indexável;
- headings semânticos;
- texto real;
- links reais;
- SSR;
- performance;
- structured data;
- legibilidade.

Não esconder conteúdo importante atrás de animações ou canvas.

---

# 40. Conteúdo da homepage

A copy deve seguir esta ordem:

### 1. Clareza
O que é.

### 2. Relevância
Por que isso importa.

### 3. Benefício
O que melhora.

### 4. Demonstração
Como funciona.

### 5. Confiança
Por que acreditar.

### 6. Ação
Como começar.

---

# 41. Proposta de anatomia final

```text
HEADER

HERO
├── Eyebrow
├── Headline
├── Subheadline
├── CTA principal
├── CTA secundário
└── Mockup principal

PROVA / BENEFÍCIO IMEDIATO

DEMONSTRAÇÃO DO PRODUTO

PROBLEMA ATUAL

COMO FUNCIONA

BENEFÍCIOS
├── Administração
├── Fiéis
└── Paróquia

TEMPLATES / PERSONALIZAÇÃO

MÓDULOS E RECURSOS

SEGURANÇA / PRIVACIDADE / ACESSIBILIDADE

PROVA SOCIAL

PLANOS / CONVERSÃO

FAQ

CTA FINAL

FOOTER
```

---

# 42. Prioridade visual por seção

| Seção | Impacto visual | Motion | Conversão |
|---|---:|---:|---:|
| Header | Médio | Baixo | Alto |
| Hero | Muito alto | Alto controlado | Muito alto |
| Benefício inicial | Médio | Baixo | Alto |
| Demo produto | Muito alto | Médio/alto | Muito alto |
| Problema | Médio | Baixo | Médio |
| Como funciona | Alto | Médio | Alto |
| Benefícios | Alto | Médio | Alto |
| Templates | Muito alto | Médio/alto | Muito alto |
| Recursos | Médio | Médio | Alto |
| Segurança | Baixo | Baixo | Alto |
| Prova social | Médio | Baixo | Muito alto |
| Pricing | Médio | Baixo | Muito alto |
| FAQ | Baixo | Baixo | Alto |
| CTA final | Alto | Médio | Muito alto |
| Footer | Baixo | Baixo | Médio |

---

# 43. O que não fazer

- usar todas as cores em cada seção;
- criar dezenas de cards coloridos;
- usar Fraunces no painel ou em componentes operacionais;
- carregar animações pesadas antes do conteúdo;
- usar carrossel automático para conteúdo essencial;
- esconder informações importantes;
- aplicar glassmorphism em todo o site;
- depender de vídeos pesados;
- criar hero genérico de SaaS;
- usar ícones sem consistência;
- exagerar em gradients;
- reduzir contraste por estética;
- sacrificar mobile em favor do desktop.

---

# 44. Checklist de aceite visual

Antes de considerar uma seção pronta:

- [ ] A mensagem é compreendida em poucos segundos.
- [ ] Existe uma hierarquia clara.
- [ ] O CTA principal é evidente.
- [ ] A paleta respeita a hierarquia definida.
- [ ] A tipografia está consistente.
- [ ] O efeito tem função.
- [ ] Não há animação desnecessária.
- [ ] O conteúdo funciona sem animação.
- [ ] O mobile foi pensado separadamente.
- [ ] O contraste atende acessibilidade.
- [ ] O efeito respeita `prefers-reduced-motion`.
- [ ] Não há layout shift.
- [ ] Imagens estão otimizadas.
- [ ] O componente funciona por teclado.
- [ ] A seção não parece um template genérico.
- [ ] A seção reforça confiança ou conversão.

---

# 45. Critério final de qualidade

O site comercial do Católico Digital deve produzir esta sequência de percepção:

> **“Entendi o que é.”**
>
> **“Parece muito bem feito.”**
>
> **“Isso resolveria um problema real.”**
>
> **“Parece fácil de usar.”**
>
> **“Confio nisso.”**
>
> **“Quero experimentar.”**

Se o design alcançar essa sequência sem sacrificar velocidade, clareza e acessibilidade, a direção está correta.

---

# 46. Resumo executivo

## Visual
Premium, acolhedor, contemporâneo e humano.

## Cores
Neutros + azul como base; roxo, rosa, vinho e marrom como acentos.

## Fontes
**Inter** como fonte principal.  
**Fraunces** apenas como detalhe editorial.

## Motion
Sutil, orientado à narrativa e ao produto.

## Hero
Alto impacto visual com mockup real e profundidade.

## Produto
Mostrar o sistema em uso, não apenas falar sobre ele.

## Conversão
Uma ação principal clara em cada momento.

## Performance
Efeitos leves, lazy loading, CSS primeiro, imagens otimizadas.

## Acessibilidade
WCAG 2.2 AA como requisito.

## Princípio central
**Encantamento controlado: beleza para aumentar valor percebido, nunca para competir com a mensagem.**
