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
APP_URL=https://catolicodigital.com.br

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
