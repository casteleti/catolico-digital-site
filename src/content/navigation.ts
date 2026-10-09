/** O menu do site: "Módulos" vem das quatro áreas (areas.ts); "Para quem", dos quatro públicos. */
import { AREAS, areaHref } from "./areas";
import { CTA, ONBOARDING_URL } from "./links";

export type NavLink = { label: string; href: string; description?: string; featured?: boolean; icon?: string };
export type NavGroup = { label: string; lead?: string; href?: string; links: NavLink[] };
export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "menu"; label: string; href: string; groups: NavGroup[]; footer?: NavLink; variant?: "cards" };

export const NAVIGATION: NavItem[] = [
  {
    kind: "menu",
    label: "Módulos",
    href: "/modulos",
    groups: AREAS.map((area) => ({
      label: area.label,
      lead: area.lead,
      href: areaHref(area.key),
      links: area.items.map((item) => ({
        label: item.label,
        href: areaHref(area.key, item.id),
        description: item.menu,
        icon: item.icon,
      })),
    })),
    footer: { label: "Ver as quatro áreas lado a lado", href: "/modulos" },
  },
  {
    kind: "menu",
    label: "Para quem",
    href: "/para/paroco",
    variant: "cards",
    groups: [
      {
        label: "Cada pessoa da paróquia",
        // Título + uma linha curta (pedido de 05/10/2026). "Coordenadores" leva à página de quem coordena uma pastoral;
        // a página da coordenação da catequese continua no ar em /para/catequese.
        links: [
          { label: "Para o Pároco", href: "/para/paroco", icon: "church", description: "A paróquia inteira à vista, com cada acesso\u00A0registrado." },
          { label: "Para a Secretária", href: "/para/secretaria", icon: "inbox", description: "Inscrições e pedidos chegam prontos, sem caçar documento no\u00A0WhatsApp." },
          { label: "Para os Coordenadores", href: "/para/pastorais", icon: "users", description: "A sua equipe e as suas turmas, com o seu próprio\u00A0login." },
          { label: "Para a PASCOM", href: "/para/pascom", icon: "megaphone", description: "Horários, avisos e notícias certos em todo\u00A0lugar." },
        ],
      },
    ],
  },
  { kind: "link", label: "Como funciona", href: "/#como-comecar" },
  { kind: "link", label: "Dúvidas", href: "/#duvidas" },
  { kind: "link", label: "Contato", href: "/contato" },
];

export const PRIMARY_CTA: NavLink = { label: CTA.nav, href: ONBOARDING_URL };
