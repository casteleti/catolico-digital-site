"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand/brand-mark";
import { ModuleIcon } from "@/components/site/module-icon";
import { Container } from "@/components/ui/container";
import { NAVIGATION, PRIMARY_CTA, type NavItem, type NavLink } from "@/content/navigation";

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
                className={`site-nav__item ${item.groups.length > 1 || item.variant === "cards" ? "site-nav__item--wide" : ""} ${panel === item.label ? "is-open" : ""}`.trim()}
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
                        <p className="mobile-group__label">{group.href ? <Link href={group.href} onClick={() => setOpen(false)}>{group.label}</Link> : group.label}</p>
                        {group.links.map((link) => (
                          <Link href={link.href} key={link.label} onClick={() => setOpen(false)}>
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

/**
 * Painéis largos ficam centrados no cabeçalho, não no botão. Ao abrir, este gancho os põe sempre à mesma distância
 * do botão e aponta o "biquinho" para o centro dele (variável --caret-x).
 */
function usePanelPlacement(open: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const panel = ref.current;
    const trigger = panel?.parentElement?.querySelector<HTMLElement>(".site-nav__trigger");
    if (!open || !panel || !trigger) return;
    const place = () => {
      const host = panel.offsetParent as HTMLElement | null;
      if (!host) return;
      const t = trigger.getBoundingClientRect();
      panel.style.top = `${t.bottom - host.getBoundingClientRect().top + 6}px`;
      panel.style.setProperty("--caret-x", `${t.left + t.width / 2 - panel.getBoundingClientRect().left}px`);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open]);
  return ref;
}

/** Cor de cada área no painel (mesma ordem de AREAS; a mesma das páginas das áreas). */
const GROUP_ACCENTS = ["var(--color-purple)", "var(--color-rose)", "var(--color-brand-700)", "var(--color-wine)"];

function MegaPanel({ item, open, onNavigate }: { item: Extract<NavItem, { kind: "menu" }>; open: boolean; onNavigate: () => void }) {
  const wide = item.groups.length > 1;
  const [hovered, setHovered] = useState<{ link: NavLink; accent: string } | null>(null);
  const ref = usePanelPlacement(open);
  if (item.variant === "cards") {
    const links = item.groups.flatMap((g) => g.links);
    return (
      <div className={`mega mega--cards ${open ? "is-open" : ""}`.trim()} id={`panel-${item.label}`} hidden={!open} ref={ref}>
        <span className="mega__caret" aria-hidden="true" />
        <ul className="mega__cards">
          {links.map((link, i) => (
            <li key={link.href} style={{ "--col-accent": GROUP_ACCENTS[i % GROUP_ACCENTS.length] ?? "var(--color-brand-700)" } as React.CSSProperties}>
              <Link className="mega__card" href={link.href} onClick={onNavigate}>
                {link.icon ? <span className="mega__card-icon"><ModuleIcon name={link.icon} size={20} /></span> : null}
                <span className="mega__card-title">{link.label}</span>
                {link.description ? <span className="mega__card-text">{link.description}</span> : null}
                <span className="mega__card-go" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={`mega ${wide ? "mega--wide" : "mega--narrow"} ${open ? "is-open" : ""}`.trim()} id={`panel-${item.label}`} hidden={!open} ref={ref}>
      <span className="mega__caret" aria-hidden="true" />
      {wide ? (
        <>
          <div className="mega__cols" onMouseLeave={() => setHovered(null)}>
            {item.groups.map((group, i) => {
              const accent = GROUP_ACCENTS[i % GROUP_ACCENTS.length] ?? "var(--color-brand-700)";
              return (
                <div className="mega__col" key={group.label} style={{ "--col-accent": accent } as React.CSSProperties}>
                  <p className="mega__col-head"><span className="mega__col-num">0{i + 1}</span>{group.href ? <Link href={group.href} onClick={onNavigate}>{group.label}</Link> : group.label}</p>
                  {group.lead ? <p className="mega__col-lead">{group.lead}</p> : null}
                  <ul>
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          className="mega__item"
                          href={link.href}
                          onClick={onNavigate}
                          onFocus={() => setHovered({ link, accent })}
                          onMouseEnter={() => setHovered({ link, accent })}
                        >
                          {link.icon ? <span className="mega__item-icon"><ModuleIcon name={link.icon} size={16} /></span> : null}
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="mega__preview" aria-live="polite" style={hovered ? ({ "--col-accent": hovered.accent } as React.CSSProperties) : undefined}>
            {hovered ? (
              <p className="mega__preview-text" key={hovered.link.label}><strong>{hovered.link.label}</strong>{hovered.link.description}</p>
            ) : (
              <p className="mega__preview-text mega__preview-text--idle">Passe o mouse num recurso para ver o que ele resolve. Cada&nbsp;área tem uma página com os&nbsp;detalhes.</p>
            )}
            {item.footer ? (
              <Link className="mega__preview-all" href={item.footer.href} onClick={onNavigate}>{item.footer.label} <span aria-hidden="true">→</span></Link>
            ) : null}
          </div>
        </>
      ) : (
        <div className="mega__body">
          <div className="mega__groups" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
            {item.groups.map((group) => (
              <div className="mega__group" key={group.label}>
                <p className="mega__label">{group.label}</p>
                {group.lead ? <p className="mega__lead">{group.lead}</p> : null}
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link className="mega__link" href={link.href} onClick={onNavigate}>
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
      )}
    </div>
  );
}
