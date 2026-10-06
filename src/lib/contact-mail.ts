import nodemailer, { type Transporter } from "nodemailer";
import type { LeadType } from "@/content/contact";
import type { Touch } from "@/lib/attribution";

/**
 * Envio do formulário de contato por e-mail (SMTP), para a caixa da equipe. As variáveis são as mesmas da plataforma
 * (`catolico-digital`, `.env.example`): o Mailgun do domínio `mail.catolico.digital`. Todas só no Coolify (runtime), nunca no git:
 *   CONTACT_TO      destinatários, separados por vírgula (obrigatória)
 *   MAIL_FROM       remetente no domínio verificado, ex.: Católico.digital <no-reply@mail.catolico.digital> (obrigatória)
 *   SMTP_HOST       ex.: smtp.mailgun.org (obrigatória)
 *   SMTP_PORT       587 (STARTTLS, padrão) ou 465 (TLS direto, com SMTP_SECURE=true)
 *   SMTP_SECURE     "true" só na porta 465
 *   SMTP_USER / SMTP_PASSWORD   credencial SMTP do Mailgun (juntas, ou nenhuma das duas)
 */
export type ContactData = { subject: string; name: string; email: string; phone: string; parish: string; location: string; role: string; message: string };

/** Dados do envio que não vêm do formulário: o identificador do lead, o tipo e a origem do tráfego (quando houver). */
export type LeadInfo = { leadId: string; leadType: LeadType; attribution: { first: Touch | null; last: Touch | null } };

export type MailConfig = { to: string[]; from: string; host: string; port: number; secure: boolean; user?: string; password?: string };

export function contactMailConfig(env: Record<string, string | undefined> = process.env): MailConfig | null {
  const to = (env.CONTACT_TO ?? "").split(",").map((address) => address.trim()).filter((address) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address));
  const from = env.MAIL_FROM?.trim();
  const host = env.SMTP_HOST?.trim();
  if (!to.length || !from || !host) return null;
  const user = env.SMTP_USER?.trim() || undefined;
  const password = env.SMTP_PASSWORD || undefined;
  if (Boolean(user) !== Boolean(password)) return null; // credencial pela metade: melhor "inativo" do que falhar a cada envio
  const secure = env.SMTP_SECURE === "true";
  const port = Number(env.SMTP_PORT) || (secure ? 465 : 587);
  return { to, from, host, port, secure, user, password };
}

/** Tira quebras de linha e controles: o texto vai para cabeçalhos do e-mail. */
const oneLine = (value: string) => value.replace(/[\u0000-\u001F\u007F]+/g, " ").trim();

const touchLine = (label: string, touch: Touch | null) =>
  touch ? `${label}: ${Object.entries(touch).filter(([, value]) => value).map(([key, value]) => `${key}=${value}`).join(" | ")}` : `${label}: —`;

export function buildContactMessage(data: ContactData, config: Pick<MailConfig, "to" | "from">, lead?: LeadInfo) {
  const lines = [
    `Assunto: ${data.subject}`,
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    `WhatsApp: ${data.phone || "—"}`,
    `Paróquia: ${data.parish}`,
    `Cidade/UF: ${data.location || "—"}`,
    `Função: ${data.role || "—"}`,
    "",
    "Mensagem:",
    data.message || "(sem mensagem)",
    ...(lead ? ["", `Lead: ${lead.leadId} (${lead.leadType})`, touchLine("Primeira visita", lead.attribution.first), touchLine("Última campanha", lead.attribution.last)] : []),
    "",
    "—",
    "Enviado pelo formulário de contato de catolico.digital. Para\u00A0responder, use \"Responder\": o e-mail vai direto para quem\u00A0escreveu.",
  ];
  return {
    from: config.from,
    to: config.to,
    replyTo: data.email, // só o endereço (já validado), sem nome livre em cabeçalho
    subject: `[Site] ${oneLine(data.subject)} · ${oneLine(data.parish)}`.slice(0, 200),
    text: lines.join("\n"),
  };
}

export function createContactTransport(config: MailConfig): Transporter {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure, // porta 587: nunca enviar login ou mensagem sem subir para TLS
    auth: config.user ? { user: config.user, pass: config.password } : undefined,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 15000,
  });
}

export async function sendContactMail(data: ContactData, config: MailConfig, lead?: LeadInfo, transport: Pick<Transporter, "sendMail"> = createContactTransport(config)) {
  await transport.sendMail(buildContactMessage(data, config, lead));
}
