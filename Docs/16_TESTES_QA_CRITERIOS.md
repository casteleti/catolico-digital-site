# 16 — Testes, QA e critérios de aceite

## 1. Pirâmide
### Unit
- schemas;
- helpers;
- attribution parser;
- pricing;
- adapters.

### Integration
- API lead;
- banco;
- CRM mock;
- payment webhook;
- consent.

### E2E
- home -> formulário -> obrigado;
- pricing -> checkout;
- consent banner;
- navegação mobile;
- erro de formulário.

## 2. Ferramentas
Sugestão:
- Vitest;
- Testing Library;
- Playwright.

## 3. Testes obrigatórios de formulário
- vazio;
- e-mail inválido;
- limites;
- caracteres especiais;
- spam;
- duplo clique;
- timeout CRM;
- sucesso;
- retry.

## 4. Pagamento
- sessão inválida;
- plano adulterado no cliente;
- webhook válido;
- webhook inválido;
- evento duplicado;
- evento fora de ordem;
- refund/cancelamento.

## 5. SEO
Em CI ou QA:
- title;
- description;
- canonical;
- robots;
- sitemap;
- H1;
- status;
- structured data.

## 6. Acessibilidade
- axe automático;
- teclado manual;
- foco;
- screen reader em fluxos primários.

## 7. Responsividade
Snapshots/check manual:
- 320;
- 375;
- 768;
- 1024;
- 1366;
- 1440+.

## 8. Performance
Antes do go-live:
- Lighthouse mobile;
- WebPageTest ou equivalente;
- inspeção de bundle;
- imagens;
- scripts de terceiros.

## 9. Segurança
- headers;
- CSP;
- rate limit;
- auth;
- autorização;
- validação;
- secrets;
- webhook signature;
- dependency scan.

## 10. Tracking
Planilha/tabela de QA:
```text
event
trigger
client
server
GA4
Ads
Meta
parameters
PII?
consent?
status
```

## 11. Critério global
Nenhuma página é aprovada apenas porque “está bonita”.
Precisa passar:
- conteúdo;
- UX;
- mobile;
- performance;
- SEO;
- tracking;
- privacidade;
- segurança;
- acessibilidade.
