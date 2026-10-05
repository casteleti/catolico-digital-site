import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Informações sobre privacidade e tratamento de dados do Católico\u00A0Digital.",
};

export default function PrivacidadePage() {
  return <main className="section section--white legal-page" id="main-content"><div className="container"><p className="eyebrow">Informações legais</p><h1>Política de Privacidade</h1><p>Esta página receberá a política final revisada juridicamente antes do lançamento. O&nbsp;formulário e os serviços do Católico Digital devem coletar somente os dados necessários para cada&nbsp;finalidade.</p><Link className="text-link" href="/">Voltar para o início <span aria-hidden="true">→</span></Link></div></main>;
}
