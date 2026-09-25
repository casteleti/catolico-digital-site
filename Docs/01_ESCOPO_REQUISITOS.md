# 01 — Escopo, objetivos e requisitos do site

## 1. Objetivo de negócio
O site deve apresentar o Católico Digital e levar visitantes a uma ação mensurável.

A ação primária deve ser configurável conforme a fase de lançamento:
- entrar na lista de espera;
- solicitar demonstração;
- iniciar teste;
- criar conta;
- contratar um plano.

A ação secundária pode ser:
- conhecer funcionalidades;
- ver exemplos;
- comparar planos;
- baixar material;
- falar com atendimento.

Nunca manter múltiplos CTAs concorrentes com o mesmo peso visual.

## 2. Públicos
A estrutura deve suportar diferentes contextos sem presumir que todos conheçam o produto.

Possíveis segmentos:
- paróquias;
- comunidades;
- dioceses;
- pastorais;
- movimentos;
- responsáveis por comunicação;
- secretaria/gestão;
- lideranças religiosas;
- fornecedores/parceiros.

Os segmentos reais devem ser validados antes da produção final da copy.

## 3. Funil
### Descoberta
Origem:
- Google;
- Bing;
- respostas de IA;
- redes sociais;
- mídia paga;
- indicação;
- conteúdo;
- prospecção.

### Consideração
Páginas:
- home;
- produto;
- soluções;
- recursos;
- exemplos;
- benefícios;
- como funciona;
- segurança;
- FAQ;
- preços;
- conteúdos.

### Conversão
Eventos:
- CTA principal;
- formulário;
- demo;
- trial;
- checkout;
- contato.

### Ativação
Após conversão:
- e-mail transacional;
- confirmação;
- integração CRM;
- criação de lead;
- atribuição de origem;
- eventual criação de conta no SaaS.

## 4. Requisitos funcionais mínimos
- Navegação principal.
- Home.
- Página de produto.
- Página de funcionalidades.
- Página de soluções/segmentos.
- Página de preços.
- FAQ.
- Sobre.
- Contato.
- Política de Privacidade.
- Política de Cookies.
- Termos de Uso.
- Formulários de conversão.
- Página de confirmação pós-formulário.
- Blog/central de conteúdo, mesmo que inicialmente vazio ou oculto.
- Sitemap XML.
- robots.txt.
- metadata social.
- dados estruturados.
- gestão de consentimento.
- camada de tracking.
- integração de leads.
- proteção antispam.

## 5. Requisitos não funcionais
- Disponibilidade alvo: >= 99,9% para a camada pública.
- HTTPS obrigatório.
- HTTP -> HTTPS.
- `www` ou raiz: escolher um canônico e redirecionar o outro.
- Sem conteúdo crítico dependente de JavaScript client-side.
- Compatível com últimos navegadores modernos.
- Testar Chrome Android e Safari iOS.
- Sem rolagem horizontal a partir de 320 px.
- Navegação por teclado.
- Contraste compatível com WCAG 2.2 AA.
- Cabeçalhos semânticos.
- Lighthouse como ferramenta de diagnóstico, não como KPI isolado.

## 6. Fora do escopo inicial
A menos que haja requisito explícito:
- fórum;
- rede social;
- e-commerce complexo;
- marketplace;
- multi-idioma;
- app nativo;
- sistema próprio de pagamentos;
- CRM próprio;
- builder visual completo;
- chatbot generativo público.

## 7. Decisões que devem ficar configuráveis
- CTA principal.
- texto de pricing.
- disponibilidade de trial.
- planos visíveis.
- banners promocionais.
- integrações de marketing.
- IDs de analytics.
- meios de pagamento.
- campos de formulário.
- conteúdo de FAQ.
- navegação.
