/**
 * Os destinos das chamadas do site. O onboarding ("Monte o site da sua paróquia em 5 minutos") mora na plataforma,
 * não neste site: é a melhor porta de entrada para experimentar o produto, então toda chamada principal leva para lá.
 * Em desenvolvimento, aponte `NEXT_PUBLIC_ONBOARDING_URL` para `http://localhost:3100/comecar`.
 */
export const ONBOARDING_URL = process.env.NEXT_PUBLIC_ONBOARDING_URL ?? "https://app.catolico.digital/comecar";

export const CTA = {
  /** Botão de destaque do menu. */
  nav: "Monte seu site",
  /** Botão principal do herói e das páginas internas. */
  primary: "Montar o site da minha paróquia",
  /** A promessa curta que acompanha o botão. */
  note: "Leva cerca de 5 minutos. Para\u00A0experimentar, não precisa de conta nem de cartão. Nada\u00A0vai ao ar sem você\u00A0mandar.",
  talk: "Prefiro conversar antes",
  /** Leva a um site de paróquia fictícia, já pronto (nasce da mesma plataforma). */
  demo: "Ver um site de exemplo",
} as const;

/** Site de exemplo (paróquia fictícia, sem indexação): mostra o resultado antes de a pessoa montar o dela. */
export const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL ?? "https://rosario.catolico.digital";

/** Instagram oficial do Católico Digital (rodapé e Contato). */
export const INSTAGRAM = { url: "https://www.instagram.com/catolicodigitalorg/", handle: "@catolicodigitalorg" } as const;
