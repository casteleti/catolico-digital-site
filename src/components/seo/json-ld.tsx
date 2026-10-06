import { SITE_NAME, SITE_URL } from "@/lib/site";

/** Dados estruturados (schema.org). `<` é escapado para o JSON nunca fechar a tag `<script>`. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Texto de conteúdo sem o ` ` da regra de tipografia: nos dados estruturados vira espaço comum. */
export const plain = (text: string) => text.replace(/ /g, " ");

export function breadcrumbLd(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: SITE_NAME, path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: plain(item.name),
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
