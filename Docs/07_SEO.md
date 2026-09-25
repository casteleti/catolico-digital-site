# 07 — SEO técnico e editorial

## 1. Objetivo
Garantir que mecanismos de busca consigam:
- descobrir;
- renderizar;
- entender;
- indexar;
- relacionar;
- apresentar corretamente o conteúdo.

## 2. Renderização
Páginas de aquisição devem sair com conteúdo significativo no HTML inicial.

Priorizar:
- static generation;
- server rendering;
- revalidation.

Evitar CSR para conteúdo indexável.

## 3. Metadata
Cada página:
- title único;
- meta description única;
- canonical;
- Open Graph;
- Twitter/X cards quando necessário;
- robots;
- locale;
- imagem social.

## 4. Title
- descritivo;
- intenção clara;
- evitar boilerplate excessivo;
- marca no final quando fizer sentido.

## 5. Headings
- um H1 principal;
- H2 para grandes blocos;
- H3 para subseções;
- não escolher heading por tamanho visual.

## 6. Canonical
Canonical absoluto no HTML.
URLs duplicadas devem apontar para a versão preferida.

## 7. Sitemap
Gerar:
- `/sitemap.xml`
ou sitemap index se crescer.

Incluir somente URLs:
- canônicas;
- indexáveis;
- 200;
- relevantes.

## 8. robots.txt
Permitir assets necessários.
Bloquear apenas áreas que não devem ser rastreadas.
Não usar robots.txt para esconder informação sensível.

## 9. Status HTTP
- 200 conteúdo válido;
- 301 mudança permanente;
- 302/307 temporário;
- 404 inexistente;
- 410 removido deliberadamente;
- 5xx erro real.

Nunca devolver 200 para página “não encontrada”.

## 10. Links internos
- âncoras descritivas;
- páginas estratégicas a poucos cliques;
- breadcrumbs em hierarquias profundas;
- artigos linkando para páginas comerciais quando natural.

## 11. Dados estruturados
Aplicar conforme conteúdo real:
- Organization
- WebSite
- SoftwareApplication ou Product quando semanticamente correto
- Offer
- BreadcrumbList
- Article / BlogPosting
- FAQPage quando o formato realmente for FAQ
- ContactPoint quando aplicável

Dados estruturados nunca devem afirmar algo que não esteja na página.

## 12. Conteúdo
Criar páginas baseadas em intenção:
- informacional;
- comparação;
- comercial;
- navegacional.

Não criar dezenas de páginas quase iguais para capturar variações de palavra-chave.

## 13. Core Web Vitals
Metas:
- LCP <= 2,5 s
- INP <= 200 ms
- CLS <= 0,1
avaliados no percentil 75 de visitas quando houver dados de campo.

## 14. Search Console
Configurar:
- domínio;
- sitemap;
- inspeção de URLs;
- Core Web Vitals;
- páginas indexadas;
- melhorias;
- ações manuais;
- segurança.

## 15. Bing
Configurar Bing Webmaster Tools e sitemap.
Avaliar IndexNow se fizer sentido para atualização frequente.

## 16. SEO editorial
Cada conteúdo deve possuir:
- slug estável;
- autor;
- publishedAt;
- updatedAt;
- excerpt;
- heading structure;
- links internos;
- referências;
- imagem social;
- JSON-LD Article.

## 17. Migrações
Se substituir site existente:
- mapear URLs antigas;
- definir 301;
- preservar páginas com autoridade;
- testar redirects;
- não redirecionar tudo para home.
