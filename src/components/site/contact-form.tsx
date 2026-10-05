"use client";

import { CheckCircle2, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { CONTACT_ROLES, CONTACT_SUBJECTS } from "@/content/contact";

type Status = "idle" | "loading" | "success" | "inactive" | "error";

/** Formulário de contato. O assunto começa em "Quero conversar sobre a Plataforma". */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("loading");
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(form), consent: form.get("consent") === "on" }),
      });
      setStatus(response.ok ? "success" : response.status === 503 ? "inactive" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <CheckCircle2 aria-hidden="true" size={30} />
        <h3>Mensagem recebida. Obrigado!</h3>
        <p>A equipe do Católico Digital responde pelo e-mail informado.</p>
      </div>
    );
  }

  return (
    <form className="lead-form contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label className="form-grid__wide">
          Assunto
          <select name="subject" defaultValue={CONTACT_SUBJECTS[0]} required>
            {CONTACT_SUBJECTS.map((subject) => <option key={subject}>{subject}</option>)}
          </select>
        </label>
        <label>Nome<input name="name" autoComplete="name" placeholder="Seu nome" required minLength={2} /></label>
        <label>E-mail<input name="email" type="email" autoComplete="email" placeholder="seuemail@exemplo.com.br" required /></label>
        <label>WhatsApp <span>(opcional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" /></label>
        <label>
          Sua função na paróquia <span>(opcional)</span>
          <select name="role" defaultValue="">
            <option value="">Selecione</option>
            {CONTACT_ROLES.map((role) => <option key={role}>{role}</option>)}
          </select>
        </label>
        <label>Paróquia<input name="parish" autoComplete="organization" placeholder="Nome da paróquia" required minLength={2} /></label>
        <label>Cidade / Estado <span>(opcional)</span><input name="location" autoComplete="address-level2" placeholder="Cidade - UF" /></label>
        <label className="form-grid__wide">Mensagem <span>(opcional)</span><textarea name="message" rows={5} placeholder="Conte um pouco sobre a sua paróquia e o que procura." /></label>
        <label className="contact-form__trap" aria-hidden="true">Site<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="checkbox-label"><input name="consent" type="checkbox" required /> <span>Concordo com o uso destes dados para resposta ao contato, conforme a <Link href="/privacidade">Política de Privacidade</Link>.</span></label>
      <button className="button button--brand form-submit" type="submit" disabled={status === "loading"}>
        {status === "loading" ? <LoaderCircle className="spin" aria-hidden="true" size={18} /> : null} {status === "loading" ? "Enviando…" : "Enviar mensagem"}
      </button>
      {status === "inactive" ? <p className="form-alert" role="alert">O envio pelo site ainda está sendo ativado. Sua&nbsp;mensagem não foi enviada.</p> : null}
      {status === "error" ? <p className="form-alert" role="alert">Não foi possível enviar agora. Confira&nbsp;os campos e tente de novo em instantes.</p> : null}
    </form>
  );
}
