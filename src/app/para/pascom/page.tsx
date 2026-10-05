import type { Metadata } from "next";
import { PersonaPage } from "@/components/site/persona-page";
import { PASCOM } from "@/content/personas";

export const metadata: Metadata = { title: "Para a PASCOM", description: PASCOM.lead };

export default function Page() {
  return <PersonaPage persona={PASCOM} />;
}
