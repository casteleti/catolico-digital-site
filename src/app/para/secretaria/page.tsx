import type { Metadata } from "next";
import { PersonaPage } from "@/components/site/persona-page";
import { SECRETARIA } from "@/content/personas";

export const metadata: Metadata = { title: "Para a Secretária", description: SECRETARIA.lead };

export default function Page() {
  return <PersonaPage persona={SECRETARIA} />;
}
