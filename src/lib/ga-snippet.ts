/**
 * Código de inicialização do GA4, igual no site comercial e na plataforma (`catolico-digital`, `src/lib/ga-snippet.ts`).
 *
 * Consent Mode: este código só chega ao navegador DEPOIS do aceite de "Medição" (o porteiro é o `CookieConsent`), então o
 * estado inicial já nasce coerente com a escolha: `analytics_storage` concedido; `ad_storage`, `ad_user_data` e
 * `ad_personalization` negados (não usamos publicidade do Google). Retirar o aceite apaga os cookies e recarrega a
 * página sem a tag. Quando houver Google Ads, a categoria "Publicidade" passa a decidir os três `ad_*`.
 *
 * O `config` roda uma única vez por página (`__cdGaStarted`) e mede a visita inicial. As trocas de página sem recarregar
 * ficam por conta da medição otimizada do GA4 ("Mudanças de página com base em eventos do histórico do navegador"), por isso
 * NÃO enviamos `page_view` à mão: seria contado em dobro.
 */
export function gaInitScript(id: string) {
  return `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
if (!window.__cdGaStarted) {
window.__cdGaStarted = true;
gtag('consent', 'default', {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted'});
gtag('js', new Date());
gtag('config', '${id}');
}`;
}
