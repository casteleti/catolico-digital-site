"use client";

import { useEffect, useSyncExternalStore } from "react";
import { syncAttribution } from "@/lib/attribution";
import { CONSENT_SERVER_SNAPSHOT, parseConsent, readConsentRaw, subscribeConsent } from "@/lib/consent";

/** Guarda a origem do tráfego (UTMs, gclid…) conforme o consentimento. Não renderiza nada. */
export function AttributionCapture() {
  const raw = useSyncExternalStore(subscribeConsent, readConsentRaw, () => CONSENT_SERVER_SNAPSHOT);
  useEffect(() => {
    if (raw !== CONSENT_SERVER_SNAPSHOT) syncAttribution(parseConsent(raw));
  }, [raw]);
  return null;
}
