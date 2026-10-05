import Link from "next/link";
import { BrandMark } from "@/components/brand/brand-mark";
import { Container } from "@/components/ui/container";
import { AREAS, areaHref } from "@/content/areas";
import { NAVIGATION } from "@/content/navigation";

const AUDIENCE = NAVIGATION.find((item) => item.kind === "menu" && item.label === "Para quem");

/** Rodapé com o mapa do site: as quatro áreas (como no menu), os públicos e o institucional. */
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
            {AREAS.map((area) => (
              <div key={area.key}>
                <p className="site-footer__title"><Link href={areaHref(area.key)}>{area.label}</Link></p>
                {area.items.map((item) => <Link href={areaHref(area.key, item.id)} key={item.id}>{item.label}</Link>)}
              </div>
            ))}
            {AUDIENCE && AUDIENCE.kind === "menu" ? (
              <div>
                <p className="site-footer__title">Para quem</p>
                {AUDIENCE.groups.flatMap((g) => g.links).map((link) => <Link href={link.href} key={link.href}>{link.label.replace(/^Para (o |a |os |as )?/, "")}</Link>)}
              </div>
            ) : null}
            <div>
              <p className="site-footer__title">Católico Digital</p>
              <Link href="/modulos">Todos os módulos</Link>
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
