"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links: Array<[string, string]> = [["Como funciona", "#como-funciona"], ["Recursos", "#recursos"], ["Para quem é", "#para-quem"], ["Segurança", "#seguranca"], ["Dúvidas", "#duvidas"]];
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("menu-is-open", open);
    return () => document.body.classList.remove("menu-is-open");
  }, [open]);
  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`.trim()}>
      <Container className="site-header__inner">
        <Link href="/" aria-label="Católico Digital — início">
          <BrandMark />
        </Link>
        <nav className="site-nav" aria-label="Navegação principal">
          {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          <Link href="/contato">Entrar</Link>
          <Link href="#quero-conhecer" className="nav-cta">Quero conhecer</Link>
        </nav>
        <button className="mobile-menu-trigger" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </Container>
      {open && <nav className="mobile-navigation" id="mobile-navigation" aria-label="Navegação mobile">{links.map(([label, href]) => <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/contato" onClick={() => setOpen(false)}>Entrar</Link><Link className="button button--gold" href="#quero-conhecer" onClick={() => setOpen(false)}>Quero conhecer</Link></nav>}
    </header>
  );
}
