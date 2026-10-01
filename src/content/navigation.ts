/** O menu do site, derivado dos módulos e dos papéis (uma fonte só). */
import { MODULE_GROUPS, MODULES, modulesOf } from "./modules";
import { CTA, ONBOARDING_URL } from "./links";
import { ROLES } from "./roles";

export type NavLink = { label: string; href: string; description?: string; featured?: boolean; icon?: string };
export type NavGroup = { label: string; lead?: string; links: NavLink[] };
export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "menu"; label: string; href: string; groups: NavGroup[]; footer?: NavLink };

export const NAVIGATION: NavItem[] = [
  {
    kind: "menu",
    label: "Módulos",
    href: "/modulos",
    groups: MODULE_GROUPS.map((group) => ({
      label: group.label,
      lead: group.lead,
      links: modulesOf(group.key).map((m) => ({
        label: m.short,
        href: `/modulos/${m.slug}`,
        description: m.promise,
        featured: m.featured,
        icon: m.icon,
      })),
    })),
    footer: { label: `Ver os ${MODULES.length} módulos lado a lado`, href: "/modulos" },
  },
  {
    kind: "menu",
    label: "Para quem",
    href: "/#para-quem",
    groups: [
      {
        label: "Cada pessoa da paróquia",
        lead: "A mesma plataforma, contada para quem lê.",
        links: ROLES.map((r) => ({ label: r.menu, href: `/para/${r.slug}`, description: r.quote, icon: r.icon })),
      },
    ],
  },
  { kind: "link", label: "Como funciona", href: "/#como-funciona" },
  { kind: "link", label: "Segurança", href: "/#seguranca" },
  { kind: "link", label: "Dúvidas", href: "/#duvidas" },
];

export const PRIMARY_CTA: NavLink = { label: CTA.nav, href: ONBOARDING_URL };
