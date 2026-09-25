# 10 — Leads, CRM, automações e integrações

## 1. Fluxo base
```text
Formulário
 -> validação
 -> antispam
 -> gravação local
 -> criação/atualização no CRM
 -> evento analytics
 -> e-mail de confirmação
 -> notificação interna
 -> automação de follow-up
```

A gravação local deve ocorrer antes de depender de serviço externo, quando possível.

## 2. Idempotência
Evitar lead duplicado por:
- retry;
- duplo clique;
- timeout;
- webhook repetido.

Chave:
- request ID;
- e-mail + janela temporal;
- idempotency key.

## 3. CRM
Criar adapter:
```ts
interface CRMProvider {
  upsertLead(input: CRMLeadInput): Promise<CRMLeadResult>
  createActivity(input: CRMActivityInput): Promise<void>
}
```

## 4. Campos mínimos
- nome;
- email;
- telefone;
- organização;
- tipo;
- origem;
- campanha;
- página;
- interesse;
- data;
- consentimento;
- status.

## 5. Status
Sugestão:
```text
new
contacted
qualified
demo_scheduled
trial
proposal
won
lost
nurture
```

## 6. E-mail
Transacional:
- confirmação de envio;
- demo;
- criação de conta;
- cobrança.

Marketing:
- apenas conforme consentimento/base aplicável;
- descadastro simples;
- registro de opt-out.

## 7. Automação
Pode usar n8n.
Não colocar lógica de negócio crítica exclusivamente no n8n.

O sistema principal deve saber:
- se lead foi registrado;
- se integração falhou;
- se deve reenviar.

## 8. Webhooks
- assinatura validada;
- replay protection quando possível;
- idempotência;
- retries;
- dead-letter/log de falhas;
- payload redacted.

## 9. Chat/WhatsApp
Se houver botão:
- evento de clique;
- origem/campanha na mensagem apenas se necessário;
- não inserir PII em URL;
- informar que o atendimento ocorrerá em canal externo.

## 10. SLA de falha
Se CRM cair:
- formulário continua;
- lead fica salvo;
- job de retry tenta integração;
- erro gera alerta.
