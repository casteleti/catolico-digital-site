# 09 — Tracking avançado, analytics e atribuição

## 1. Objetivo
Responder:
- de onde o visitante veio;
- qual página iniciou a jornada;
- quais conteúdos consumiu;
- qual CTA acionou;
- se virou lead;
- se virou cliente;
- quanto gerou;
- qual campanha contribuiu.

## 2. Camadas
### Client-side
- GTM;
- GA4;
- Google Ads;
- Meta Pixel;
- outros apenas se houver uso real.

### Server-side
Para eventos críticos:
- lead validado;
- agendamento;
- trial criado;
- checkout iniciado;
- compra;
- assinatura ativada;
- assinatura cancelada.

## 3. Consentimento
Antes de consentimento:
- apenas tecnologia necessária;
- não disparar tags analíticas/publicitárias quando a base aplicável exigir consentimento.

Implementar atualização de consent state no GTM.

## 4. Data Layer
Padrão:
```js
window.dataLayer.push({
  event: "generate_lead",
  form_id: "demo",
  lead_type: "parish",
  page_type: "pricing"
})
```

Nunca enviar para dataLayer:
- e-mail;
- telefone;
- nome;
- mensagem;
- dados sensíveis.

## 5. Taxonomia de eventos
Eventos mínimos:
```text
page_view
cta_click
navigation_click
form_start
form_error
form_submit
generate_lead
demo_request
trial_start
sign_up
login_click
view_pricing
select_plan
begin_checkout
purchase
newsletter_signup
outbound_click
download
video_start
video_complete
faq_open
```

## 6. Nomes
- snake_case;
- estáveis;
- sem versão no nome;
- significado documentado;
- parâmetros consistentes.

## 7. Atribuição
Persistir:
- first touch;
- last touch;
- UTMs;
- referrer;
- landing page;
- click IDs relevantes.

Usar cookie/local storage first-party apenas conforme política de privacidade/consentimento.

## 8. Lead
No momento da conversão, o backend deve associar atribuição ao lead.

## 9. GA4 Measurement Protocol
Usar para eventos server-side quando necessário.
- segredo somente no servidor;
- HTTPS POST;
- client_id/session_id coerentes quando a correlação com sessão for necessária;
- validar payload em ambiente de desenvolvimento.

## 10. Meta CAPI
Para conversões relevantes:
- enviar evento server-side;
- gerar `event_id`;
- usar mesmo `event_id` no Pixel e CAPI para deduplicação;
- normalizar/hash de dados apenas conforme documentação e base legal;
- não enviar dado sensível.

## 11. Google Ads
Implementar conforme campanha:
- conversões via tag;
- enhanced conversions quando juridicamente e tecnicamente apropriado;
- importação de conversões offline quando houver CRM.

## 12. Qualidade
Criar página `/debug/tracking` somente em ambiente não produtivo ou protegida.

Validar:
- GTM Preview;
- GA4 DebugView;
- Meta Test Events;
- Google Tag Assistant;
- eventos server-side;
- deduplicação.

## 13. Dashboard
KPIs:
- sessões;
- usuários;
- sessões engajadas;
- taxa de conversão;
- leads;
- CPL;
- demo;
- trial;
- venda;
- CAC;
- receita;
- conversão por landing;
- conversão por canal;
- first-touch e last-touch;
- funil.
