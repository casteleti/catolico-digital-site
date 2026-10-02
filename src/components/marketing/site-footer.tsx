import Link from "next/link";
import { BrandMark } from "@/components/brand/brand-mark";
import { Container } from "@/components/ui/container";
import { MODULE_GROUPS, modulesOf } from "@/content/modules";
import { ROLES } from "@/content/roles";

/** Rodapé com o mapa do site: módulos por grupo, páginas por papel e o institucional. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__top">
          <div>
            <Link href="/" aria-label="Católico Digital — início">
              <BrandMark on="azul" width={280} />
            </Link>
            <p className="site-footer__note">A paróquia cuida das pessoas. O Católico Digital ajuda a aproximá-las.</p>
          </div>
          <nav className="site-footer__map" aria-label="Mapa do site">
            {MODULE_GROUPS.map((group) => (
              <div key={group.key}>
                <p className="site-footer__title">{group.label}</p>
                {modulesOf(group.key).map((m) => <Link href={`/modulos/${m.slug}`} key={m.slug}>{m.short}</Link>)}
              </div>
            ))}
            <div>
              <p className="site-footer__title">Para quem</p>
              {ROLES.map((r) => <Link href={`/para/${r.slug}`} key={r.slug}>{r.menu.replace(/^Para /, "")}</Link>)}
            </div>
            <div>
              <p className="site-footer__title">Católico Digital</p>
              <Link href="/#como-funciona">Como funciona</Link>
              <Link href="/#seguranca">Segurança e LGPD</Link>
              <Link href="/#duvidas">Dúvidas</Link>
              <Link href="/contato">Contato</Link>
              <Link href="/privacidade">Privacidade</Link>
            </div>
          </nav>
        </div>
        <div className="site-footer__links" aria-label="Links institucionais">
          <span>© {new Date().getFullYear()} Católico Digital · Feito no Brasil, para as paróquias do Brasil.</span>
        </div>
      </Container>
    </footer>
  );
}
