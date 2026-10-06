/** Assuntos do formulário de contato. O primeiro vem selecionado (pedido do Renato, 05/10/2026). */
export const CONTACT_SUBJECTS = [
  "Quero conversar sobre a Plataforma",
  "Quero ver uma demonstração",
  "Valores e planos",
  "Já uso e preciso de ajuda",
  "Parcerias com dioceses e movimentos",
  "Outro assunto",
] as const;

export type LeadType = "commercial" | "support" | "partnership" | "other";

/**
 * O tipo de cada assunto. Só `commercial` conta como lead (evento `generate_lead` no GA4): quem quer conhecer, ver uma
 * demonstração ou saber os valores. Suporte a quem já usa, parcerias e "outro assunto" são contatos reais, mas não são
 * oportunidade comercial: nunca viram conversão. Assunto novo em CONTACT_SUBJECTS sem tipo aqui não compila.
 */
export const CONTACT_LEAD_TYPES = {
  "Quero conversar sobre a Plataforma": "commercial",
  "Quero ver uma demonstração": "commercial",
  "Valores e planos": "commercial",
  "Já uso e preciso de ajuda": "support",
  "Parcerias com dioceses e movimentos": "partnership",
  "Outro assunto": "other",
} as const satisfies Record<(typeof CONTACT_SUBJECTS)[number], LeadType>;

export const CONTACT_ROLES = ["Pároco", "Secretaria", "Coordenação de pastoral ou catequese", "Comunicação (PASCOM)", "Voluntário", "Outra"] as const;
