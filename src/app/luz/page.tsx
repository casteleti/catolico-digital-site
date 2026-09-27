import type { Metadata } from "next";
import { LandingLuz } from "@/components/landing-luz/landing-luz";
import "@/styles/landing-luz.css";

/**
 * /luz — prévia da opção B da landing ("Luz"), para comparação com a opção A
 * (que segue em /). Fica fora do índice dos buscadores até a escolha.
 */
export const metadata: Metadata = {
  title: "Prévia — opção B",
  description: "O site da paróquia que a secretaria consegue manter. Horários, sacramentos, pastorais e avisos em um só lugar.",
  robots: { index: false, follow: false },
};

export default function LuzPage() {
  return <LandingLuz />;
}
