# 14 — Performance, acessibilidade e qualidade

## 1. Metas de campo
- LCP <= 2,5 s
- INP <= 200 ms
- CLS <= 0,1
no p75 quando houver volume suficiente.

## 2. Orçamento de página
Como meta inicial:
- JavaScript client-side mínimo;
- evitar bibliotecas grandes para efeitos simples;
- no máximo uma fonte principal;
- imagens responsivas;
- hero otimizado;
- vídeos lazy-loaded.

## 3. Rendering
- server component por padrão;
- `use client` localizado;
- streaming apenas quando útil;
- loading skeleton sem shift.

## 4. Imagens
- AVIF/WebP quando suportado;
- dimensões;
- `sizes`;
- `priority` somente LCP;
- lazy load abaixo da dobra.

## 5. Fontes
- subset quando viável;
- `next/font`;
- preload apenas necessário;
- evitar 6 pesos.

## 6. Terceiros
Toda tag externa tem custo.
Criar inventário:
```text
script
finalidade
peso
bloqueio
consentimento
dono
```

## 7. Acessibilidade
Meta: WCAG 2.2 AA nas páginas públicas.

Testar:
- teclado;
- VoiceOver/NVDA em fluxos críticos;
- axe;
- contraste;
- zoom 200%;
- reduced motion.

## 8. Formulários
- label;
- hint;
- autocomplete;
- teclado mobile correto;
- mensagem de erro textual;
- foco no primeiro erro;
- `aria-describedby` quando útil.

## 9. Conteúdo
- parágrafos curtos;
- linguagem clara;
- hierarquia;
- links descritivos;
- não depender de cor.

## 10. Testes de dispositivos
- iPhone Safari;
- Android Chrome;
- tablet;
- notebook 1366x768;
- desktop grande.

## 11. Conexão
Testar em rede móvel limitada.
A home deve continuar utilizável sem animações ou vídeos carregados.

## 12. Observação
Lighthouse 100 não é objetivo de negócio.
Métrica de campo, experiência e conversão têm prioridade.
