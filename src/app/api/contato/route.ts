import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { CONTACT_LEAD_TYPES, CONTACT_ROLES, CONTACT_SUBJECTS } from "@/content/contact";
import { attributionFromCookieHeader } from "@/lib/attribution";
import { contactMailConfig, sendContactMail } from "@/lib/contact-mail";
import { compactTouch, gaLeadEvent, isDuplicate, runOnce } from "@/lib/lead";
import { rateLimited } from "@/lib/rate-limit";

/**
 * Recebe o formulário de contato e repassa para o canal da equipe.
 *
 * O canal é definido no ambiente (Coolify), nesta ordem: webhook (CONTACT_WEBHOOK_URL: n8n, Make, Zapier, Slack…) ou,
 * sem ele, e-mail por SMTP para a equipe (CONTACT_TO, MAIL_FROM, SMTP_*; ver `src/lib/contact-mail.ts`). Sem nenhum dos
 * dois, a rota responde 503 e a página diz, com honestidade, que o envio pelo site ainda não está ativo.
 * Nada é guardado aqui.
 *
 * Respostas (a página só dispara o `generate_lead` do GA4 quando vier `lead_created: true` e um `ga_event`):
 *   200 { ok, lead_created: true, lead_id, lead_type, ga_event }  o canal aceitou a mensagem (`ga_event` só nos contatos comerciais)
 *   200 { ok, lead_created: false }                                campo-isca preenchido (robô): parece sucesso, mas não é lead
 *   400 inválido · 429 muitos envios · 502 o canal falhou · 503 nenhum canal configurado
 * `submission_id` (enviado pela página, um por formulário) evita enviar duas vezes o mesmo contato.
 * A origem do tráfego vem dos cookies `cd_ft`/`cd_lt` da própria requisição (só existem com o aceite de "Medição").
 */
const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalido" }, { status: 400 });
  }
  if (text(body.website, 200)) return NextResponse.json({ ok: true, lead_created: false }); // campo-isca: robô (parece sucesso, mas não é lead)

  const data = {
    subject: text(body.subject, 80),
    name: text(body.name, 120),
    email: text(body.email, 160),
    phone: text(body.phone, 30),
    parish: text(body.parish, 160),
    location: text(body.location, 120),
    role: text(body.role, 80),
    message: text(body.message, 4000),
    consent: body.consent === true,
  };
  const valid =
    (CONTACT_SUBJECTS as readonly string[]).includes(data.subject) &&
    data.name.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    data.parish.length >= 2 &&
    (!data.role || (CONTACT_ROLES as readonly string[]).includes(data.role)) &&
    data.consent;
  if (!valid) return NextResponse.json({ error: "invalido" }, { status: 400 });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const mail = contactMailConfig();
  if (!webhook && !mail) return NextResponse.json({ error: "canal-inativo" }, { status: 503 });

  const submissionId = /^[A-Za-z0-9-]{8,64}$/.test(text(body.submission_id, 64)) ? text(body.submission_id, 64) : null;
  if (!isDuplicate(submissionId)) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconhecido";
    if (rateLimited(`contato:${ip}`)) return NextResponse.json({ error: "muitos-envios" }, { status: 429 });
  }

  const leadType = CONTACT_LEAD_TYPES[data.subject as keyof typeof CONTACT_LEAD_TYPES];
  const attribution = attributionFromCookieHeader(request.headers.get("cookie"));

  try {
    const lead = await runOnce(submissionId, async () => {
      const leadId = randomUUID();
      const info = { leadId, leadType, attribution };
      if (webhook) {
        const response = await fetch(webhook, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            ...data,
            lead_id: leadId,
            lead_type: leadType,
            attribution: { first: compactTouch(attribution.first), last: compactTouch(attribution.last) },
            source: "site",
            receivedAt: new Date().toISOString(),
          }),
          signal: AbortSignal.timeout(8000),
        });
        if (!response.ok) throw new Error(`webhook ${response.status}`);
      } else if (mail) {
        await sendContactMail(data, mail, info);
      }
      return info;
    });
    return NextResponse.json({ ok: true, lead_created: true, lead_id: lead.leadId, lead_type: lead.leadType, ga_event: gaLeadEvent(lead.leadId, lead.leadType, lead.attribution) });
  } catch {
    return NextResponse.json({ error: "falha" }, { status: 502 });
  }
}
