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
  note: "Leva 5 minutos. Sem\u00A0conta, sem senha, sem cartão. Nada\u00A0vai ao ar sem você\u00A0mandar.",
  talk: "Prefiro conversar antes",
} as const;

/** Instagram oficial do Católico Digital (rodapé e Contato). */
export const INSTAGRAM = { url: "https://www.instagram.com/catolicodigitalorg/", handle: "@catolicodigitalorg" } as const;
