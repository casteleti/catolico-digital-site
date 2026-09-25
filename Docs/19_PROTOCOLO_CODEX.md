# 19 — Protocolo de trabalho para o Codex

## 1. Antes de codificar
Ler:
- README;
- documento da feature;
- arquitetura;
- segurança;
- LGPD;
- QA.

## 2. Para cada tarefa
Responder internamente:
- qual objetivo?
- qual rota?
- quais dados?
- há PII?
- há dado sensível?
- precisa client component?
- precisa banco?
- precisa evento?
- precisa consentimento?
- precisa schema?
- como testa?
- como falha?

## 3. Mudança mínima
Não:
- refatorar módulos não relacionados;
- trocar biblioteca;
- criar abstração prematura;
- adicionar pacote para 10 linhas de código;
- criar endpoint público sem rate limit/validação;
- criar tabela sem migration.

## 4. Definição de done por PR
- typecheck;
- lint;
- tests;
- build;
- responsividade;
- accessibility;
- SEO;
- tracking;
- security;
- docs atualizadas.

## 5. Padrão de pastas sugerido
```text
src/
  app/
  components/
    ui/
    marketing/
    forms/
  content/
  lib/
    analytics/
    auth/
    db/
    env/
    security/
    validation/
  services/
    crm/
    email/
    payments/
  server/
  styles/
  types/
prisma/
tests/
docs/
```

## 6. Server boundaries
Marcar módulos server-only quando contiverem segredos.
Nunca importar adapter de servidor em Client Component.

## 7. Erros
Criar erros de domínio.
Não devolver stack trace ao usuário.
Mapear:
- validation -> 400/422;
- unauthorized -> 401;
- forbidden -> 403;
- not found -> 404;
- conflict -> 409;
- rate limited -> 429;
- internal -> 500.

## 8. Observabilidade
Toda integração externa deve ter:
- timeout;
- tratamento de erro;
- logging;
- correlation ID;
- retry quando seguro.

## 9. Comentários
Comentar “por quê”, não descrever linha óbvia.

## 10. TODO
Não deixar TODO crítico sem issue/registro explícito.
