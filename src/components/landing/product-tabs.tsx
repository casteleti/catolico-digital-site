"use client";

import { CalendarDays, ChevronLeft, ChevronRight, Church, Check, FileText } from "lucide-react";
import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

const visitorScreens = [
  { label: "Início", icon: Church, kind: "site" },
  { label: "Agenda", icon: CalendarDays, kind: "agenda" },
  { label: "Conteúdo", icon: FileText, kind: "content" },
];

export function ProductTabs() {
  const [activeProfile, setActiveProfile] = useState<"visitor" | "admin">("visitor");
  const [activeScreen, setActiveScreen] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const profiles = ["visitor", "admin"] as const;

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % profiles.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + profiles.length) % profiles.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = profiles.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveProfile(profiles[nextIndex] ?? "visitor");
    tabRefs.current[nextIndex]?.focus();
  }

  const screen = visitorScreens[activeScreen] ?? visitorScreens[0]!;
  return (
    <div className="product-tabs">
      <div className="product-tabs__nav" role="tablist" aria-label="Demonstração por perfil">
        {(["visitor", "admin"] as const).map((profile, index) => (
          <button
            ref={(element) => { tabRefs.current[index] = element; }}
            className={activeProfile === profile ? "is-active" : ""}
            key={profile}
            id={`profile-tab-${profile}`}
            type="button"
            role="tab"
            aria-selected={activeProfile === profile}
            aria-controls="profile-panel"
            tabIndex={activeProfile === profile ? 0 : -1}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            onClick={() => setActiveProfile(profile)}
          >
            {profile === "visitor" ? "Quem visita" : "Quem administra"}
          </button>
        ))}
      </div>

      <div className="product-tabs__panel profile-panel" id="profile-panel" role="tabpanel" aria-labelledby={`profile-tab-${activeProfile}`} tabIndex={0}>
        {activeProfile === "visitor" ? (
          <>
            <div className="profile-gallery">
              <div className={`product-tabs__mockup product-tabs__mockup--${screen.kind}`} aria-hidden="true">
                <div className="mockup-toolbar"><span /><span /><span /></div>
                <div className={`parish-screen parish-screen--${screen.kind}`}>
                  <div className="parish-screen__brand"><Church aria-hidden="true" size={16} /><i /></div>
                  {screen.kind === "site" && <><div className="parish-screen__hero" /><div className="parish-screen__columns"><i /><i /><i /></div></>}
                  {screen.kind === "agenda" && <div className="parish-screen__schedule"><i /><i /><i /></div>}
                  {screen.kind === "content" && <><div className="parish-screen__article-image" /><div className="parish-screen__text-lines"><i /><i /><i /></div></>}
                </div>
              </div>
              <div className="profile-gallery__controls" aria-label="Telas para quem visita">
                <button type="button" aria-label="Tela anterior" onClick={() => setActiveScreen((activeScreen + visitorScreens.length - 1) % visitorScreens.length)}><ChevronLeft aria-hidden="true" size={18} /></button>
                <span aria-live="polite">{screen.label} · {activeScreen + 1} de {visitorScreens.length}</span>
                <button type="button" aria-label="Próxima tela" onClick={() => setActiveScreen((activeScreen + 1) % visitorScreens.length)}><ChevronRight aria-hidden="true" size={18} /></button>
              </div>
              <div className="profile-gallery__pagination" aria-label="Escolher tela">
                {visitorScreens.map((item, index) => <button type="button" key={item.kind} className={activeScreen === index ? "is-active" : ""} aria-label={`Mostrar tela: ${item.label}`} aria-current={activeScreen === index ? "true" : undefined} onClick={() => setActiveScreen(index)} />)}
              </div>
            </div>
            <div className="product-tabs__copy profile-copy">
              <h3>Quem abre o site da paróquia quase sempre procura uma resposta rápida.</h3>
              <ul className="profile-check-list"><li><Check aria-hidden="true" size={18} /> A próxima missa logo na primeira tela</li><li><Check aria-hidden="true" size={18} /> Como chegar à igreja ou à capela</li><li><Check aria-hidden="true" size={18} /> Falar com a secretaria pelo WhatsApp</li><li><Check aria-hidden="true" size={18} /> O que levar para o batismo</li></ul>
              <p className="profile-copy__note">E quem procura &quot;missa domingo&quot; com o nome da cidade no Google encontra páginas organizadas, com horários e endereço fáceis de entender.</p>
            </div>
          </>
        ) : (
          <>
            <div className="product-tabs__mockup product-tabs__mockup--admin admin-preview" aria-hidden="true"><div className="mockup-toolbar"><span /><span /><span /></div><div className="admin-preview__content"><span /><span /><span /><span /></div></div>
            <div className="product-tabs__copy profile-copy">
              <h3>Feito para quem cuida da paróquia, não para quem entende de tecnologia.</h3>
              <ul className="admin-feature-list"><li><strong>Palavras do dia a dia.</strong> Missa, aviso, pastoral. Nada&nbsp;de termos técnicos.</li><li><strong>Tudo em um só painel.</strong> Horários, avisos, pastorais e eventos organizados no mesmo lugar.</li></ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
