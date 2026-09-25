# 02 — Arquitetura e stack técnica

## 1. Arquitetura recomendada

```text
Browser
  |
Cloudflare
  |
Reverse proxy / Coolify
  |
Next.js App
  |-- páginas públicas
  |-- API/route handlers
  |-- formulários
  |-- webhooks
  |-- tracking server-side
  |
PostgreSQL
  |
Serviços externos
  |-- e-mail
  |-- CRM
  |-- pagamento
  |-- analytics
  |-- armazenamento de mídia
```

## 2. Frontend / full-stack
### Next.js App Router
Motivos:
- renderização server-side e estática;
- metadata API;
- geração de sitemap/robots;
- React Server Components;
- excelente aderência a conteúdo e landing pages;
- fácil criação de route handlers e webhooks;
- deploy em Node/Docker.

### TypeScript
Obrigatório com:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

Evitar `any` salvo integração externa claramente justificada.

### React
Priorizar Server Components.
Usar Client Components apenas em:
- formulário;
- menu mobile;
- modal;
- tabs;
- accordion;
- slider;
- componentes que realmente dependam de estado/interação.

## 3. UI
- Tailwind CSS.
- shadcn/ui apenas como base.
- Não usar aparência padrão do shadcn como identidade final.
- tokens de cor, tipografia, spacing, radius e shadow centralizados.
- ícones via pacote único.

## 4. Formulários
- Zod no servidor.
- Zod opcionalmente compartilhado com o cliente.
- React Hook Form apenas quando a complexidade justificar.
- Server Actions ou route handlers.
- Não confiar em validação client-side.

## 5. Dados
- PostgreSQL como fonte principal.
- Prisma ORM.
- migrations versionadas.
- nenhuma alteração manual em produção sem migration.
- índices definidos por padrão de consulta.
- soft delete apenas quando existir requisito real.

## 6. Cache
Começar sem Redis.
Adicionar Redis somente para:
- rate limit distribuído;
- filas;
- cache compartilhado;
- locks;
- sessão distribuída;
- processamento assíncrono.

## 7. Conteúdo
### MVP recomendado
Conteúdo institucional em código/MDX com dados claramente separados dos componentes.

### Evolução
Se a equipe precisar editar frequentemente:
- Payload CMS conectado ao mesmo PostgreSQL; ou
- CMS headless equivalente.

Não acoplar toda a aplicação ao CMS.

## 8. Imagens
- `next/image`.
- formatos modernos.
- dimensões conhecidas.
- `sizes` correto.
- hero com prioridade apenas quando realmente for o LCP.
- evitar imagens decorativas gigantes.
- CDN/Cloudflare para assets.

## 9. E-mail
Separar:
- transacional;
- marketing.

Criar interface:
```ts
interface Mailer {
  sendTransactional(input: TransactionalMessage): Promise<void>
}
```

Nunca enviar diretamente do componente da página.

## 10. Integrações
Todas as integrações externas devem passar por adapters/services:
```text
services/
  crm/
  email/
  payments/
  analytics/
  captcha/
```

## 11. Observação importante
Não acoplar o site público ao core do SaaS.
Compartilhar apenas APIs/contratos necessários.
Uma falha do dashboard do produto não deve derrubar a landing page.
