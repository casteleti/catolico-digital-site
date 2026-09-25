# 20 — Templates de conteúdo, metadata e schema

## 1. Modelo de página comercial
```yaml
slug:
title:
meta_title:
meta_description:
h1:
lead:
primary_cta:
secondary_cta:
problem:
solution:
benefits:
features:
proof:
faq:
final_cta:
```

## 2. Modelo de artigo
```yaml
title:
slug:
excerpt:
author:
published_at:
updated_at:
category:
tags:
primary_query:
search_intent:
answer_summary:
sources:
related_pages:
```

## 3. Metadata
Gerar por rota com:
- title;
- description;
- alternates.canonical;
- openGraph;
- robots.

Não criar metadata duplicada automaticamente sem revisão.

## 4. Organization JSON-LD
Campos possíveis:
- `@type`
- name
- url
- logo
- contactPoint
- sameAs

Não adicionar perfis que não existam.

## 5. WebSite
- name;
- url;
- publisher.

SearchAction apenas se houver busca funcional e compatível.

## 6. Produto/SaaS
Avaliar `SoftwareApplication`:
- name;
- applicationCategory;
- operatingSystem;
- description;
- offers.

Informar rating somente com avaliações reais.

## 7. BreadcrumbList
Gerar a partir da hierarquia real, não apenas da URL.

## 8. BlogPosting
- headline;
- datePublished;
- dateModified;
- author;
- publisher;
- image;
- mainEntityOfPage.

## 9. FAQ
O conteúdo do JSON-LD deve corresponder exatamente ao FAQ visível.

## 10. Social cards
Padrão:
- 1200x630;
- marca;
- título curto;
- alto contraste;
- sem texto minúsculo.

## 11. Conteúdo para mecanismos de resposta
Blocos recomendados:
- resposta direta;
- “como funciona”;
- “para quem é”;
- “quando usar”;
- “limitações”;
- “perguntas frequentes”.

## 12. Governança
Toda página estratégica precisa de:
- owner;
- data de revisão;
- status;
- intenção;
- CTA;
- métrica primária.
