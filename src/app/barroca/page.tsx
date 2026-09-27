import type { Metadata } from "next";
import { LandingBarroca } from "@/components/landing-barroca/landing-barroca";
import "@/styles/landing-barroca.css";

/**
 * /barroca — opção D da landing ("Barroca"), para comparação com a opção A
 * (/) e a B (/luz). Fica fora do índice dos buscadores até a escolha.
 *
 * As fontes vêm do Google Fonts em tempo de execução (link no <head>), e não
 * de next/font: a decisão registrada no CONTEXTO-CODEX foi não depender de
 * download de fonte durante o build. Se a D for a escolhida, vale migrar
 * para next/font/google e servir os arquivos localmente.
 */
export const metadata: Metadata = {
  title: "Prévia — opção D",
  description: "O site da paróquia que a secretaria consegue manter. Horários, sacramentos, pastorais e avisos em um só lugar.",
  robots: { index: false, follow: false },
};

const GOOGLE_FONTS = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Poppins:wght@400;500;600&family=Cinzel:wght@400;600&display=swap";

export default function BarrocaPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={GOOGLE_FONTS} precedence="default" />
      <LandingBarroca />
    </>
  );
}
