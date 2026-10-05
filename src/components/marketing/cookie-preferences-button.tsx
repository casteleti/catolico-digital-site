"use client";

import { CONSENT_OPEN_EVENT } from "@/lib/consent";

/** Link do rodapé que reabre o aviso de cookies, para o visitante mudar de ideia quando quiser. */
export function CookiePreferencesButton() {
  return (
    <button type="button" className="footer-link-button" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}>
      Preferências de cookies
    </button>
  );
}
