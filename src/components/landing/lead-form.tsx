"use client";

import { CheckCircle2, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 450);
  }

  if (status === "success") {
    return <div className="form-success"><CheckCircle2 aria-hidden="true" size={30} /><h3>Seu interesse foi registrado nesta demonstração.</h3><p>O envio real será conectado ao fluxo de leads assim que o backend e o CRM forem configurados.</p></div>;
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Nome<input name="name" placeholder="Seu nome" required /></label>
        <label>E-mail<input name="email" type="email" placeholder="seuemail@exemplo.com.br" required /></label>
        <label>WhatsApp <span>(opcional)</span><input name="phone" placeholder="(00) 00000-0000" /></label>
        <label>Nome da paróquia<input name="organization" placeholder="Nome da paróquia" required /></label>
        <label>Cidade / Estado<input name="location" placeholder="Cidade - UF" required /></label>
        <label>Situação atual<select name="presence" defaultValue="" required><option value="" disabled>Como é hoje?</option><option>Ainda não temos site</option><option>Temos um site antigo</option><option>Temos um site atualizado</option><option>Utilizamos principalmente redes sociais</option><option>Não sei informar</option></select></label>
        <label className="form-grid__wide">Existe algo que gostaria de nos contar? <span>(opcional)</span><textarea name="message" rows={4} /></label>
      </div>
      <label className="checkbox-label"><input type="checkbox" required /> <span>Concordo com o uso destes dados para resposta ao contato, conforme a Política de Privacidade.</span></label>
      <label className="checkbox-label"><input type="checkbox" name="marketing" /> <span>Quero receber novidades sobre o Católico Digital.</span></label>
      <button className="button button--brand form-submit" type="submit" disabled={status === "loading"}>{status === "loading" && <LoaderCircle className="spin" aria-hidden="true" size={18} />} {status === "loading" ? "Enviando..." : "Quero conhecer o Católico Digital"}</button>
      <p className="form-note">Esta é a estrutura visual do formulário. O processamento será conectado ao backend na próxima etapa.</p>
    </form>
  );
}
