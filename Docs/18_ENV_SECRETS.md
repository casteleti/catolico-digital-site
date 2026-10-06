# 18 — Variáveis de ambiente e segredos

## 1. Regra
Toda variável deve ser classificada:
- pública;
- server-only;
- segredo;
- ambiente.

## 2. Exemplo
```bash
NODE_ENV=production
APP_URL=https://catolico.digital
CONTACT_WEBHOOK_URL=   # canal da equipe do formulário /api/contato (n8n, Make, Zapier, Slack). Secreto, runtime. Vazio = rota responde 503.
# Alternativa ao webhook: e-mail por SMTP para a equipe (mesmas credenciais Mailgun da plataforma, domínio mail.catolico.digital).
# Todas só no Coolify (runtime). Sem webhook e sem e-mail completo, /api/contato responde 503. Detalhes: src/lib/contact-mail.ts
CONTACT_TO=ricardo@daksa.com.br,renato@daksa.com.br
MAIL_FROM=Católico.digital <no-reply@mail.catolico.digital>
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=

DATABASE_URL=

NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=

GA4_MEASUREMENT_ID=
GA4_API_SECRET=

META_PIXEL_ID=
META_CAPI_ACCESS_TOKEN=

CRM_PROVIDER=
CRM_API_URL=
CRM_API_TOKEN=

MAIL_PROVIDER=
MAIL_API_KEY=
MAIL_FROM=

PAYMENTS_PROVIDER=
PAYMENTS_SECRET_KEY=
PAYMENTS_WEBHOOK_SECRET=
NEXT_PUBLIC_PAYMENTS_PUBLIC_KEY=

TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

SENTRY_DSN=
SENTRY_AUTH_TOKEN=

ENCRYPTION_KEY=
```

## 3. Validação
Validar env no boot via Zod.
Falhar rápido se segredo obrigatório estiver ausente.

## 4. Prefixo NEXT_PUBLIC
Somente valores seguros para exposição ao navegador.

Nunca:
- DB URL;
- token CRM;
- secret GA;
- token Meta;
- payment secret;
- encryption key.

## 5. Rotação
Documentar dono e procedimento de rotação de:
- banco;
- pagamento;
- e-mail;
- CRM;
- Meta;
- analytics;
- storage.

## 6. Staging
Nunca reutilizar chaves de produção quando o provedor suportar ambiente de teste.
