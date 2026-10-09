"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@/components/marketing/google-analytics";
import { MetaPixel } from "@/components/marketing/meta-pixel";
import {
  CONSENT_OPEN_EVENT,
  CONSENT_SERVER_SNAPSHOT,
  clearTrackingCookies,
  migrateLegacyConsent,
  parseConsent,
  readConsentRaw,
  saveConsent,
  subscribeConsent,
  type Consent,
} from "@/lib/consent";

/**
 * Aviso de cookies e porteiro das tags: GA4 só com o aceite de "medição", Meta Pixel só com o de "publicidade".
 * "Aceitar" e "Rejeitar" têm o mesmo destaque (sem dark pattern). O rodapé reabre o aviso.
 */
export function CookieConsent({ nonce }: { nonce?: string }) {
  const raw = useSyncExternalStore(subscribeConsent, readConsentRaw, () => CONSENT_SERVER_SNAPSHOT);
  const consent = parseConsent(raw);
  const ready = raw !== CONSENT_SERVER_SNAPSHOT;
  const [reopened, setReopened] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [draft, setDraft] = useState<Consent>({ analytics: false, marketing: false });
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    migrateLegacyConsent();
  }, []);

  useEffect(() => {
    const open = () => {
      setDraft(parseConsent(readConsentRaw()) ?? { analytics: false, marketing: false });
      setConfiguring(true);
      setReopened(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  const visible = ready && (consent === null || reopened);
  useEffect(() => {
    if (visible && reopened) titleRef.current?.focus();
  }, [visible, reopened]);

  const choose = (next: Consent) => {
    const loadedBefore = parseConsent(readConsentRaw());
    const withdrew = Boolean(loadedBefore && ((loadedBefore.analytics && !next.analytics) || (loadedBefore.marketing && !next.marketing)));
    saveConsent(next);
    setReopened(false);
    setConfiguring(false);
    if (withdrew) {
      clearTrackingCookies();
      window.location.reload(); // descarrega os scripts já carregados
    }
  };

  return (
    <>
      {consent?.analytics ? <GoogleAnalytics nonce={nonce} /> : null}
      {consent?.marketing ? <MetaPixel nonce={nonce} /> : null}
      {visible ? (
        <section className="cookie-banner" aria-labelledby="cookie-title">
          <div className="cookie-banner__text">
            <p>
              <strong id="cookie-title" ref={titleRef} tabIndex={-1}>Cookies e&nbsp;privacidade.</strong> Usamos cookies de medição e, com o seu aceite, de publicidade. Veja a <Link href="/privacidade">Política de&nbsp;Privacidade</Link>.
              {configuring ? null : <> <button type="button" className="cookie-banner__link" onClick={() => setConfiguring(true)}>Configurar</button></>}
            </p>
          </div>
          {configuring ? (
            <div className="cookie-banner__options">
              <label>
                <input type="checkbox" checked disabled /> <span><strong>Necessários</strong> Guardam esta escolha. Sempre&nbsp;ativos.</span>
              </label>
              <label>
                <input type="checkbox" checked={draft.analytics} onChange={(e) => setDraft({ ...draft, analytics: e.target.checked })} />{" "}
                <span><strong>Medição</strong> Google Analytics: páginas mais vistas e origem das&nbsp;visitas.</span>
              </label>
              <label>
                <input type="checkbox" checked={draft.marketing} onChange={(e) => setDraft({ ...draft, marketing: e.target.checked })} />{" "}
                <span><strong>Publicidade</strong> Meta Pixel: mede o resultado dos anúncios no Facebook e&nbsp;Instagram.</span>
              </label>
            </div>
          ) : null}
          <div className="cookie-banner__actions">
            <button type="button" className="cookie-banner__btn cookie-banner__btn--solid" onClick={() => choose({ analytics: true, marketing: true })}>Aceitar todos</button>
            <button type="button" className="cookie-banner__btn cookie-banner__btn--solid" onClick={() => choose({ analytics: false, marketing: false })}>Rejeitar não necessários</button>
            {configuring ? (
              <button type="button" className="cookie-banner__btn" onClick={() => choose(draft)}>Salvar preferências</button>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}
