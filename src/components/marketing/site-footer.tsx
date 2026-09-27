import Link from "next/link";
import { BrandMark } from "@/components/brand/brand-mark";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <div>
          <Link href="/" aria-label="Católico Digital — início">
            <BrandMark />
          </Link>
          <p className="site-footer__note">Tecnologia humana para organizações católicas.</p>
        </div>
        <div className="site-footer__links" aria-label="Links institucionais">
          <Link href="/contato">Contato</Link>
          <Link href="/privacidade">Privacidade</Link>
          <span>© {new Date().getFullYear()} Católico Digital</span>
        </div>
      </Container>
    </footer>
  );
}
