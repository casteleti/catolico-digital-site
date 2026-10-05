import Link from "next/link";
import { BrandMark } from "@/components/brand/brand-mark";
import { FooterSkyline } from "@/components/marketing/footer-skyline";
import { InstagramIcon } from "@/components/site/instagram-icon";
import { Container } from "@/components/ui/container";
import { AREAS, areaHref } from "@/content/areas";
import { INSTAGRAM } from "@/content/links";
import { NAVIGATION } from "@/content/navigation";

const AUDIENCE = NAVIGATION.flatMap((item) => (item.kind === "menu" && item.label === "Para quem" ? item.groups.flatMap((g) => g.links) : []));

/** Rodapé enxuto: marca + Instagram, três colunas curtas (áreas, públicos, institucional) e a linha final. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <FooterSkyline />
      <Container>
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link href="/" aria-label="Católico Digital — início">
              <BrandMark lazy on="azul" slogan={false} width={190} />
            </Link>
            <p className="site-footer__note">A paróquia cuida das pessoas. O&nbsp;Católico Digital ajuda a&nbsp;aproximá-las.</p>
            <a className="site-footer__social" href={INSTAGRAM.url} rel="noopener noreferrer" target="_blank">
              <InstagramIcon /> {INSTAGRAM.handle}
            </a>
          </div>
          <nav className="site-footer__map" aria-label="Mapa do site">
            <div>
              <p className="site-footer__title">Plataforma</p>
              {AREAS.map((area) => <Link href={areaHref(area.key)} key={area.key}>{area.label}</Link>)}
            </div>
            <div>
              <p className="site-footer__title">Para quem</p>
              {AUDIENCE.map((link) => <Link href={link.href} key={link.href}>{link.label.replace(/^Para (o |a |os |as )?/, "")}</Link>)}
            </div>
            <div>
              <p className="site-footer__title">Católico Digital</p>
              <Link href="/#como-e-diferente">Como funciona</Link>
              <Link href="/#duvidas">Dúvidas</Link>
              <Link href="/contato">Contato</Link>
              <Link href="/privacidade">Privacidade</Link>
            </div>
          </nav>
        </div>
        <p className="site-footer__legal">© {new Date().getFullYear()} Católico Digital · Feito no Brasil, para as paróquias do Brasil.</p>
      </Container>
    </footer>
  );
}
