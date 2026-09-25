# 13 — Segurança de aplicação, infraestrutura e dados

## 1. Referencial
Usar OWASP ASVS 5.0 como referência de verificação, com nível proporcional ao risco. Para o site público com autenticação administrativa, pagamentos e dados pessoais, mirar controles equivalentes a ASVS L2 nas áreas aplicáveis.

## 2. Headers
Configurar:
- Strict-Transport-Security;
- Content-Security-Policy;
- X-Content-Type-Options: nosniff;
- Referrer-Policy;
- Permissions-Policy;
- frame-ancestors via CSP.

Evitar `unsafe-inline` em CSP quando viável.

## 3. HTTPS
- TLS moderno;
- redirect 301 HTTP -> HTTPS;
- HSTS após validar domínio/subdomínios.

## 4. Autenticação administrativa
- senha forte;
- 2FA;
- rate limit;
- sessão segura;
- cookies HttpOnly;
- Secure;
- SameSite adequado;
- logout/invalidação.

## 5. Autorização
Toda ação administrativa deve validar permissão no servidor.
Esconder botão não é autorização.

## 6. Entrada
Validar no servidor:
- tipo;
- tamanho;
- formato;
- enum;
- limites.

Sanitização não substitui validação.

## 7. SQL
Usar ORM/query parametrizada.
Proibir concatenação manual de entrada em SQL.

## 8. XSS
- renderização escapada por padrão;
- HTML rico somente com sanitização;
- evitar `dangerouslySetInnerHTML`;
- CSP.

## 9. CSRF
Proteger mutações baseadas em cookies.
Server Actions/rotas devem ser avaliadas conforme mecanismo de sessão usado.

## 10. SSRF
Qualquer recurso que aceite URL deve:
- allowlist quando possível;
- bloquear redes privadas;
- validar protocolo;
- limitar redirects;
- limitar tamanho/tempo.

## 11. Upload
Se existir:
- MIME real;
- extensão;
- tamanho;
- nome gerado;
- armazenamento fora do diretório executável;
- antivírus quando risco justificar;
- imagem reprocessada quando possível.

## 12. Rate limit
Aplicar em:
- login;
- reset;
- formulário;
- newsletter;
- API;
- webhooks quando apropriado.

## 13. Antibot
Preferir Cloudflare Turnstile ou equivalente.
Usar após sinais de abuso ou desde o início em formulários expostos.

## 14. Secrets
- `.env` nunca versionado;
- segredos distintos por ambiente;
- rotação;
- acesso mínimo;
- não expor variáveis server-only com prefixo público.

## 15. Logs
Não registrar:
- tokens;
- cookies;
- Authorization;
- dados de cartão;
- payload sensível bruto;
- senha.

## 16. Dependências
CI:
- lockfile;
- atualização regular;
- auditoria;
- Dependabot/Renovate;
- scanner de secrets.

## 17. Backups
- automatizados;
- criptografados;
- retenção definida;
- teste de restore;
- cópia fora do host principal.

## 18. Cloudflare
- proxy;
- WAF;
- bot protection conforme plano;
- rate limiting;
- regras de cache;
- proteção de origem.

Não bloquear webhooks do gateway por regras genéricas.

## 19. Ambiente
Produção e homologação:
- bancos distintos;
- chaves distintas;
- webhooks distintos;
- analytics distintos ou filtrados.

## 20. Segurança de pagamento
- hosted checkout;
- assinatura de webhook;
- idempotência;
- valor validado no servidor;
- reconciliação.

## 21. Checklist de release
- secret scan;
- dependency scan;
- security headers;
- CSP;
- rate limit;
- auth;
- authorization;
- webhook validation;
- logging;
- backup;
- restore test;
- error tracking.
