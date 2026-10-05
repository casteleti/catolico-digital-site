import type { Metadata } from "next";
import { PersonaPage } from "@/components/site/persona-page";
import { COORDENADORES } from "@/content/personas";

export const metadata: Metadata = { title: "Para os Coordenadores", description: COORDENADORES.lead };

export default function Page() {
  return <PersonaPage persona={COORDENADORES} />;
}
