# 04 — Banco de dados e modelagem

## 1. Escopo do banco do site
O banco do site público deve guardar apenas dados necessários para aquisição, conversão, auditoria e integrações.

Não duplicar dados do SaaS principal sem motivo.

## 2. Entidades principais

### Lead
```text
id UUID
created_at
updated_at
name
email
phone nullable
organization_name nullable
organization_type nullable
city nullable
state nullable
message nullable
source
status
consent_marketing boolean
consent_marketing_at nullable
privacy_version
```

### LeadAttribution
```text
id
lead_id
first_source
first_medium
first_campaign
first_content
first_term
first_referrer
first_landing_page
first_click_id
last_source
last_medium
last_campaign
last_content
last_term
last_referrer
last_landing_page
last_click_id
created_at
updated_at
```

Campos adicionais possíveis:
- gclid
- gbraid
- wbraid
- fbclid
- msclkid

Não armazenar identificadores que não serão utilizados.

### ConsentRecord
```text
id
subject_reference
consent_type
status
policy_version
timestamp
source
proof_hash nullable
```

### FormSubmission
Pode registrar metadados técnicos mínimos:
```text
id
form_key
lead_id nullable
created_at
result
request_id
```

Evitar armazenar IP completo indefinidamente.
Se necessário para segurança, definir prazo curto e finalidade.

### WebhookEvent
```text
id
provider
provider_event_id unique
type
status
received_at
processed_at
payload_redacted jsonb
error nullable
```

Nunca salvar payload bruto contendo dados de cartão.

### Transaction
Se o site registrar compras:
```text
id
customer_reference
provider
provider_customer_id
provider_checkout_id
provider_payment_id
plan_key
amount
currency
status
created_at
updated_at
```

## 3. Identificadores
- UUID/ULID.
- IDs internos nunca devem substituir IDs oficiais do provedor.
- IDs externos com unique index.

## 4. Índices
Criar índices para:
- email normalizado;
- created_at;
- status;
- provider_event_id;
- campaign/source quando relatórios exigirem.

## 5. Normalização
Normalizar:
- e-mail lowercase/trim;
- telefone em E.164 quando possível;
- UF em código de 2 letras;
- UTM preservando valor original sanitizado.

## 6. PII
Classificar cada campo:
- público;
- interno;
- pessoal;
- sensível;
- segredo.

Não logar:
- senha;
- token;
- segredo;
- dados de pagamento;
- conteúdo sensível desnecessário.

## 7. Dados religiosos
O contexto Católico pode tornar determinadas informações reveladoras de convicção religiosa ou filiação a organização religiosa.

Princípio de implementação:
**não coletar explicitamente informação sobre crença individual quando ela não for necessária para a finalidade.**

Exemplo: em um formulário B2B, perguntar “Tipo de organização” pode ser necessário; perguntar sobre convicção religiosa individual normalmente não é.

## 8. Retenção
Definir política por entidade:
- leads sem relação ativa;
- logs;
- eventos de segurança;
- consentimentos;
- transações;
- webhooks.

A regra deve existir antes do go-live.
