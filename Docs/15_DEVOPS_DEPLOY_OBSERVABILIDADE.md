# 15 — DevOps, ambientes, deploy e observabilidade

## 1. Ambientes
- local;
- preview/PR quando disponível;
- staging;
- production.

## 2. Git
Branches:
- `main` produção;
- feature branches;
- PR obrigatório para mudanças relevantes.

Commits pequenos e descritivos.

## 3. CI
Pipeline:
1. install frozen lockfile;
2. lint;
3. typecheck;
4. unit tests;
5. build;
6. security/dependency scan;
7. e2e em rotas críticas quando possível;
8. deploy.

## 4. Docker
Build multi-stage.
Executar como usuário não-root.
Imagem mínima.
Não copiar `.env` para imagem.

## 5. Next.js
Usar output standalone se adequado ao deploy Docker.

## 6. Banco
Migration executada de forma controlada.
Backup antes de migration destrutiva.
Não permitir `db push` indiscriminado em produção.

## 7. Cloudflare
- DNS;
- SSL strict;
- cache de assets;
- bypass para rotas dinâmicas;
- WAF;
- Turnstile;
- regras de redirecionamento quando adequado.

## 8. Health checks
Criar:
- `/api/health/live`
- `/api/health/ready`

Não retornar segredos ou detalhes internos.

## 9. Logs
Estruturados:
```json
{
  "level": "error",
  "request_id": "...",
  "route": "/api/leads",
  "event": "crm_sync_failed"
}
```

## 10. Request ID
Gerar/capturar correlation ID para:
- requests;
- integrações;
- webhooks;
- logs.

## 11. Error tracking
Sentry/equivalente:
- frontend;
- backend;
- release;
- source maps protegidos;
- redaction de PII.

## 12. Uptime
Monitorar externamente:
- home;
- health;
- checkout start;
- API crítica.

## 13. Alertas
- 5xx;
- webhook falhando;
- integração CRM;
- banco;
- disco;
- CPU/RAM;
- certificado;
- indisponibilidade.

## 14. Backup
- banco diário;
- retenção;
- armazenamento secundário;
- restauração testada.

## 15. Rollback
Cada deploy deve possuir procedimento de rollback.
Mudança de schema deve ser backward-compatible sempre que possível.
