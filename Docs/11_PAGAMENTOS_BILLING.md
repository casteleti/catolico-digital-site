# 11 — Pagamentos, billing e segurança transacional

## 1. Princípio
O site não deve processar nem armazenar números de cartão.

Preferir checkout hospedado pelo provedor.

## 2. Abstração
Criar:
```ts
interface PaymentProvider {
  createCheckout(input: CheckoutInput): Promise<CheckoutSession>
  createPortal?(customerId: string): Promise<string>
  verifyWebhook(request: Request): Promise<VerifiedPaymentEvent>
}
```

Isso permite trocar gateway sem reescrever o domínio.

## 3. Provedores
Selecionar conforme:
- recorrência;
- Pix;
- cartão;
- boleto;
- split, se algum dia necessário;
- antifraude;
- conciliação;
- custo;
- suporte;
- disponibilidade no Brasil.

Não implementar múltiplos gateways no MVP sem necessidade.

## 4. Checkout
Servidor cria sessão.
Cliente recebe apenas URL/session public ID.

Nunca confiar em:
- preço enviado pelo browser;
- plano enviado pelo browser sem validação;
- status informado pelo redirect.

O servidor deve buscar plano/preço em configuração interna.

## 5. Confirmação
Compra só é considerada confirmada por webhook válido do provedor.

Redirect de sucesso é experiência de interface, não fonte de verdade.

## 6. Webhook
Obrigatório:
- validar assinatura;
- registrar provider event ID;
- garantir unique;
- processar idempotentemente;
- atualizar transaction;
- disparar eventos internos;
- responder rapidamente;
- processamento pesado fora do request.

## 7. Estados
```text
pending
authorized
paid
failed
refunded
canceled
chargeback
past_due
```

Adaptar aos estados do gateway.

## 8. Recorrência
Registrar:
- provider subscription ID;
- plan;
- status;
- current period;
- cancel at period end;
- trial end.

## 9. Página de preço
Não codificar valores em dezenas de componentes.
Ter uma fonte de configuração.

## 10. Segurança
- secrets apenas no servidor;
- webhook secrets separados por ambiente;
- idempotency key;
- TLS;
- logs sem dados financeiros;
- alertas para falhas;
- reconciliação periódica.

## 11. Métricas
Eventos:
- select_plan;
- begin_checkout;
- checkout_error;
- purchase;
- subscription_started;
- subscription_canceled.

## 12. PCI
Reduzir escopo usando checkout hospedado/tokenização do provedor.
A equipe ainda deve validar suas obrigações aplicáveis com o gateway e os requisitos PCI correspondentes ao modelo adotado.
