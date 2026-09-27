"use client";

import { FormEvent, useState } from "react";

/**
 * Formulário da opção D. Mesma limitação das opções A e B: ainda não grava
 * lead (não há backend). A prévia diz isso em vez de fingir sucesso.
 * Conectar ao fluxo real é o bloqueio A1 do plano de criativos.
 */
export function LeadFormBarroca() {
  const [status, setStatus] = useState<"idle" | "preview">("idle");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("preview");
  }

  if (status === "preview") {
    return (
      <div className="bq-form__notice" role="status">
        <strong>Esta é uma prévia de design.</strong>
        <p>O envio do formulário será ativado antes da veiculação dos anúncios. Nenhum dado foi enviado agora.</p>
        <button className="bq-btn bq-btn--outline" type="button" onClick={() => setStatus("idle")}>Voltar ao formulário</button>
      </div>
    );
  }

  return (
    <form className="bq-form" onSubmit={submit}>
      <label className="bq-field">Seu nome<input name="nome" autoComplete="name" required /></label>
      <label className="bq-field">WhatsApp<input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" required /></label>
      <label className="bq-field">Nome da paróquia<input name="paroquia" required /></label>
      <label className="bq-field">Cidade e estado<input name="cidade" placeholder="Cidade – UF" autoComplete="address-level2" required /></label>
      <label className="bq-field">Seu papel na paróquia
        <select name="papel" defaultValue="" required>
          <option value="" disabled>Escolha</option>
          <option>Pároco ou administrador</option>
          <option>Secretaria</option>
          <option>Pastoral ou comunicação</option>
          <option>Outro</option>
        </select>
      </label>
      <label className="bq-check"><input type="checkbox" name="consentimento" required /><span>Concordo com o uso destes dados para resposta ao contato, conforme a Política de Privacidade.</span></label>
      <label className="bq-check"><input type="checkbox" name="marketing" /><span>Quero receber novidades sobre o Católico Digital.</span></label>
      <button className="bq-btn bq-btn--gold bq-btn--full" type="submit">Quero conversar sobre minha paróquia</button>
      <p className="bq-form__micro">Sem compromisso. Respondemos em horário comercial.</p>
    </form>
  );
}
