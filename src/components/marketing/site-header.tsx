"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand/brand-mark";
import { ModuleIcon } from "@/components/site/module-icon";
import { Container } from "@/components/ui/container";
import { MODULES } from "@/content/modules";
import { NAVIGATION, PRIMARY_CTA, type NavItem } from "@/content/navigation";

/**
 * Cabeçalho do site: menu com painéis (Módulos, Para quem) no computador e gaveta com sanfonas no celular.
 * Os painéis abrem ao passar o mouse ou pelo teclado (Enter/Espaço abre, Esc fecha, Tab percorre).
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>("Módulos");
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

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
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      setPanel(null);
    };
    const onClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const show = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPanel(label);
  };
  const hideSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPanel(null), 180);
  };

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${panel ? "site-header--panel" : ""}`.trim()} ref={headerRef}>
      <Container className="site-header__inner">
        <Link className="site-header__brand" href="/" aria-label="Católico Digital — início" onClick={() => setPanel(null)}>
          <BrandMark width={172} />
        </Link>

        <nav className="site-nav" aria-label="Navegação principal">
          {NAVIGATION.map((item) =>
            item.kind === "link" ? (
              <Link href={item.href} key={item.label} className="site-nav__link">{item.label}</Link>
            ) : (
              <div
                className={`site-nav__item ${item.groups.length > 1 ? "site-nav__item--wide" : ""} ${panel === item.label ? "is-open" : ""}`.trim()}
                key={item.label}
                onMouseEnter={() => show(item.label)}
                onMouseLeave={hideSoon}
              >
                <button
                  aria-controls={`panel-${item.label}`}
                  aria-expanded={panel === item.label}
                  className="site-nav__trigger"
                  // mouse: o hover já abriu, o clique mantém aberto; teclado (detail 0): alterna
                  onClick={(event) => setPanel(event.detail === 0 && panel === item.label ? null : item.label)}
                  type="button"
                >
                  {item.label} <ChevronDown aria-hidden="true" size={15} />
                </button>
                <MegaPanel item={item} open={panel === item.label} onNavigate={() => setPanel(null)} />
              </div>
            ),
          )}
          <Link href={PRIMARY_CTA.href} className="nav-cta" onClick={() => setPanel(null)}>{PRIMARY_CTA.label}</Link>
        </nav>

        <button className="mobile-menu-trigger" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>

      {open && (
        <nav className="mobile-navigation" id="mobile-navigation" aria-label="Navegação mobile">
          {NAVIGATION.map((item) =>
            item.kind === "link" ? (
              <Link href={item.href} key={item.label} onClick={() => setOpen(false)}>{item.label}</Link>
            ) : (
              <div className="mobile-group" key={item.label}>
                <button
                  aria-expanded={mobileGroup === item.label}
                  className="mobile-group__trigger"
                  onClick={() => setMobileGroup(mobileGroup === item.label ? null : item.label)}
                  type="button"
                >
                  {item.label} <ChevronDown aria-hidden="true" size={16} />
                </button>
                {mobileGroup === item.label && (
                  <div className="mobile-group__links">
                    {item.groups.map((group) => (
                      <div key={group.label}>
                        <p className="mobile-group__label">{group.label}</p>
                        {group.links.map((link) => (
                          <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
                            {link.icon ? <ModuleIcon name={link.icon} size={16} /> : null}
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                    {item.footer ? <Link className="mobile-group__all" href={item.footer.href} onClick={() => setOpen(false)}>{item.footer.label} →</Link> : null}
                  </div>
                )}
              </div>
            ),
          )}
          <Link className="button button--gold" href={PRIMARY_CTA.href} onClick={() => setOpen(false)}>{PRIMARY_CTA.label}</Link>
        </nav>
      )}
    </header>
  );
}

function MegaPanel({ item, open, onNavigate }: { item: Extract<NavItem, { kind: "menu" }>; open: boolean; onNavigate: () => void }) {
  const wide = item.groups.length > 1;
  const featured = MODULES.filter((m) => m.featured);
  return (
    <div className={`mega ${wide ? "mega--wide" : "mega--narrow"} ${open ? "is-open" : ""}`.trim()} id={`panel-${item.label}`} hidden={!open}>
      <span className="mega__caret" aria-hidden="true" />
      <div className={`mega__body ${wide ? "mega__body--split" : ""}`.trim()}>
        {wide ? (
          <aside className="mega__spot">
            <p className="mega__spot-eyebrow">Páginas-história</p>
            <p className="mega__spot-lead">Os quatro módulos que mudam a rotina da secretaria, contados do começo ao fim.</p>
            <div className="mega__spot-list">
              {featured.map((m) => (
                <Link className="mega__spot-link" href={`/modulos/${m.slug}`} key={m.slug} onClick={onNavigate}>
                  <span className="mega__spot-icon"><ModuleIcon name={m.icon} size={18} /></span>
                  <span><strong>{m.name}</strong><em>{m.promise}</em></span>
                </Link>
              ))}
            </div>
          </aside>
        ) : null}
        <div className="mega__groups" style={{ gridTemplateColumns: `repeat(${item.groups.length > 1 ? 2 : 1}, minmax(0, 1fr))` }}>
          {item.groups.map((group) => (
            <div className="mega__group" key={group.label}>
              <p className="mega__label">{group.label}</p>
              {group.lead ? <p className="mega__lead">{group.lead}</p> : null}
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link className={`mega__link ${link.featured ? "mega__link--featured" : ""}`.trim()} href={link.href} onClick={onNavigate}>
                      {link.icon ? <span className="mega__icon"><ModuleIcon name={link.icon} size={17} /></span> : null}
                      <span className="mega__text">
                        <strong>{link.label}</strong>
                        {link.description ? <span>{link.description}</span> : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {item.footer ? (
        <div className="mega__footer">
          <Link href={item.footer.href} onClick={onNavigate}>{item.footer.label} <span aria-hidden="true">→</span></Link>
          <span className="mega__footer-note">Cada módulo liga e desliga. Nada se apaga.</span>
        </div>
      ) : null}
    </div>
  );
}
