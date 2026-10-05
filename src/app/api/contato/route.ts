import { NextResponse } from "next/server";
import { CONTACT_ROLES, CONTACT_SUBJECTS } from "@/content/contact";

/**
 * Recebe o formulário de contato e repassa para o canal da equipe.
 *
 * O canal é um webhook (CONTACT_WEBHOOK_URL: n8n, Make, Zapier, Slack…) definido no ambiente. Sem ele, a rota
 * responde 503 e a página diz, com honestidade, que o envio pelo site ainda não está ativo — nada é guardado aqui.
 */
const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalido" }, { status: 400 });
  }
  if (text(body.website, 200)) return NextResponse.json({ ok: true }); // campo-isca: robô

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
  if (!webhook) return NextResponse.json({ error: "canal-inativo" }, { status: 503 });

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data, source: "site", receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`webhook ${response.status}`);
  } catch {
    return NextResponse.json({ error: "falha" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
