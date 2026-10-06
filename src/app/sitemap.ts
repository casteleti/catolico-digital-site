import type { MetadataRoute } from "next";
import { MODULES } from "@/content/modules";
import { ROLES } from "@/content/roles";
import { SITE_URL } from "@/lib/site";

// Sem `lastModified`: não há data real de edição por página, e uma data inventada (new Date()) é pior que nenhuma.
const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly"): MetadataRoute.Sitemap[number] => ({
  url: `${SITE_URL}${path}`,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("/", 1, "weekly"),
    page("/modulos", 0.9, "monthly"),
    ...MODULES.map((m) => page(`/modulos/${m.slug}`, 0.7, "monthly")),
    ...ROLES.map((r) => page(`/para/${r.slug}`, 0.8, "monthly")),
    page("/celebracoes", 0.8, "monthly"),
    page("/vida-paroquial", 0.8, "monthly"),
    page("/comunicacao", 0.8, "monthly"),
    page("/administracao", 0.8, "monthly"),
    page("/contato", 0.6, "yearly"),
    page("/privacidade", 0.3, "yearly"),
  ];
}
