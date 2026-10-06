import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Informações sobre privacidade e tratamento de dados do Católico\u00A0Digital.",
};

export default function PrivacidadePage() {
  return (
    <main className="section section--white legal-page" id="main-content">
      <div className="container">
        <p className="eyebrow">Informações legais</p>
        <h1>Política de Privacidade</h1>
        <p>Esta página receberá a política final revisada juridicamente antes do lançamento. O&nbsp;formulário e os serviços do Católico Digital devem coletar somente os dados necessários para cada&nbsp;finalidade.</p>
        <h2 id="cookies">Cookies e medição</h2>
        <p>O site só carrega ferramentas de medição e publicidade depois do seu&nbsp;aceite. Você&nbsp;escolhe no aviso que aparece na primeira visita e pode mudar quando quiser, em &ldquo;Preferências de cookies&rdquo; no&nbsp;rodapé.</p>
        <ul>
          <li><strong>Necessários:</strong> guardam a sua escolha sobre cookies neste navegador. Estão&nbsp;sempre&nbsp;ativos.</li>
          <li><strong>Medição (Google Analytics&nbsp;4):</strong> mostra quais páginas são mais vistas e de onde vêm as visitas, para melhorarmos o&nbsp;site.</li>
          <li><strong>Publicidade (Meta&nbsp;Pixel):</strong> mede o resultado dos nossos anúncios no Facebook e no&nbsp;Instagram.</li>
        </ul>
        <p>Se você rejeitar, ou retirar o aceite depois, essas ferramentas deixam de ser carregadas e os cookies delas são&nbsp;apagados.</p>
        <Link className="text-link" href="/">Voltar para o início <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}
