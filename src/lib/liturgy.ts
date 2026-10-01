/**
 * Calendário litúrgico (calendário romano, com as transferências em vigor no Brasil) — só aritmética de
 * datas, sem santoral. Dá nome ao dia: "Quinta-feira da 26ª semana do Tempo Comum", "3º Domingo do Advento",
 * "Corpus Christi". Regras e datas conferidas em 01/10/2026 contra o calendário oficial da USCCB (romano
 * universal) e o calendário do Brasil (CNBB). Datas são `YYYY-MM-DD`.
 */

const DAY = 86_400_000;
const utc = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d);
const parse = (date: string) => {
  const [y = 0, m = 1, d = 1] = date.split("-").map(Number);
  return utc(y, m, d);
};
const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const dow = (ms: number) => new Date(ms).getUTCDay();
const sundayOnOrAfter = (ms: number) => ms + ((7 - dow(ms)) % 7) * DAY;
export const addDays = (date: string, days: number) => iso(parse(date) + days * DAY);

/** Domingo de Páscoa (Meeus/Jones/Butcher, calendário gregoriano). */
export function easterSunday(year: number): string {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return iso(utc(year, month, day));
}

/** 1º Domingo do Advento do ano civil `year` (domingo entre 27/11 e 3/12). */
export const firstAdvent = (year: number) => iso(sundayOnOrAfter(utc(year, 11, 27)));

export type LiturgicalDay = {
  date: string;
  /** Ano litúrgico (o que começa no Advento anterior). */
  year: number;
  sundayCycle: "A" | "B" | "C";
  weekdayCycle: "I" | "II";
  season: "Advento" | "Natal" | "Tempo Comum" | "Quaresma" | "Semana Santa" | "Tríduo Pascal" | "Páscoa";
  /** Nome do dia, pronto para mostrar. */
  name: string;
  /** Solenidade ou festa que toma o dia (quando há). */
  feast?: string;
  color: "roxo" | "branco" | "verde" | "vermelho" | "rosa";
};

const WEEKDAYS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const ord = (n: number) => `${n}ª`;
const ordM = (n: number) => `${n}º`;

/** Ano divisível por 3 = C (2025 → C, 2026 → A, 2027 → B). */
export const sundayCycleOf = (year: number): "A" | "B" | "C" => (["C", "A", "B"] as const)[year % 3] ?? "A";
export const weekdayCycleOf = (year: number) => (year % 2 === 1 ? "I" : "II");

type Fixed = { date: string; name: string; color: LiturgicalDay["color"]; sunday?: boolean };

/** Solenidades e festas com data efetiva no Brasil para o ano litúrgico `y` (Advento de y-1 até Cristo Rei de y). */
function fixedFeasts(y: number): Fixed[] {
  const easter = easterSunday(y);
  const palm = addDays(easter, -7);
  const octaveEnd = addDays(easter, 7);
  const xmas = `${y - 1}-12-25`;
  const holyFamily = dow(parse(xmas)) === 0 ? `${y - 1}-12-30` : iso(sundayOnOrAfter(parse(xmas) + DAY));
  const epiphany = iso(sundayOnOrAfter(utc(y, 1, 2)));
  const baptism = Number(epiphany.slice(8)) >= 7 ? addDays(epiphany, 1) : addDays(epiphany, 7);
  const trinity = addDays(easter, 56);
  const movedToSunday = (date: string) => iso(sundayOnOrAfter(parse(date)));
  const isSun = (d: string) => dow(parse(d)) === 0;
  const joseph = `${y}-03-19`;
  const josephEff = isSun(joseph) ? addDays(joseph, 1) : joseph >= palm && joseph < easter ? addDays(palm, -1) : joseph;
  const annun = `${y}-03-25`;
  const annunEff = annun >= palm && annun <= octaveEnd ? addDays(octaveEnd, 1) : isSun(annun) ? addDays(annun, 1) : annun;
  return [
    { date: `${y - 1}-12-08`, name: "Imaculada Conceição de Nossa Senhora", color: "branco" },
    { date: xmas, name: "Natal do Senhor", color: "branco" },
    { date: holyFamily, name: "Sagrada Família de Jesus, Maria e José", color: "branco" },
    { date: `${y}-01-01`, name: "Santa Maria, Mãe de Deus", color: "branco" },
    { date: epiphany, name: "Epifania do Senhor", color: "branco" },
    { date: baptism, name: "Batismo do Senhor", color: "branco" },
    { date: josephEff, name: "São José, Esposo de Maria", color: "branco" },
    { date: annunEff, name: "Anunciação do Senhor", color: "branco" },
    { date: addDays(easter, 42), name: "Ascensão do Senhor", color: "branco" },
    { date: trinity, name: "Santíssima Trindade", color: "branco" },
    { date: addDays(trinity, 4), name: "Corpus Christi", color: "branco" },
    { date: addDays(trinity, 12), name: "Sagrado Coração de Jesus", color: "branco" },
    { date: `${y}-06-24`, name: "Natividade de São João Batista", color: "branco" },
    { date: movedToSunday(`${y}-06-29`), name: "São Pedro e São Paulo, Apóstolos", color: "vermelho" },
    { date: movedToSunday(`${y}-08-15`), name: "Assunção de Nossa Senhora", color: "branco" },
    { date: `${y}-10-12`, name: "Nossa Senhora Aparecida, Padroeira do Brasil", color: "branco" },
    { date: movedToSunday(`${y}-11-01`), name: "Todos os Santos", color: "branco" },
    { date: `${y}-11-02`, name: "Finados", color: "roxo" },
  ];
}

/** O dia litúrgico de uma data civil. */
export function liturgicalDay(date: string): LiturgicalDay {
  const ms = parse(date);
  const civil = Number(date.slice(0, 4));
  const year = date >= firstAdvent(civil) ? civil + 1 : civil;
  const adv1 = firstAdvent(year - 1);
  const nextAdv1 = firstAdvent(year);
  const easter = easterSunday(year);
  const ash = addDays(easter, -46);
  const palm = addDays(easter, -7);
  const holyThursday = addDays(easter, -3);
  const pentecost = addDays(easter, 49);
  const ctk = addDays(nextAdv1, -7);
  const epiphany = iso(sundayOnOrAfter(utc(year, 1, 2)));
  const baptism = Number(epiphany.slice(8)) >= 7 ? addDays(epiphany, 1) : addDays(epiphany, 7);
  const weekday = dow(ms);
  const weekdayName = WEEKDAYS[weekday]!;
  const base = { date, year, sundayCycle: sundayCycleOf(year), weekdayCycle: weekdayCycleOf(year) } as const;
  const weeksSince = (from: string) => Math.floor((ms - parse(from)) / DAY / 7);

  let season: LiturgicalDay["season"];
  let name: string;
  let color: LiturgicalDay["color"];

  if (date >= holyThursday && date < easter) {
    season = "Tríduo Pascal";
    name = ["Quinta-feira Santa", "Sexta-feira Santa", "Sábado Santo"][weekday - 4]!;
    color = weekday === 5 ? "vermelho" : "branco";
  } else if (date >= palm && date < holyThursday) {
    season = "Semana Santa";
    name = weekday === 0 ? "Domingo de Ramos e da Paixão do Senhor" : `${weekdayName} Santa`;
    color = weekday === 0 ? "vermelho" : "roxo";
  } else if (date >= ash && date < palm) {
    season = "Quaresma";
    const firstSunday = addDays(ash, 4);
    if (date < firstSunday) name = weekday === 3 ? "Quarta-feira de Cinzas" : `${weekdayName} depois das Cinzas`;
    else {
      const w = weeksSince(firstSunday) + 1;
      name = weekday === 0 ? `${ordM(w)} Domingo da Quaresma${w === 4 ? " (Laetare)" : ""}` : `${weekdayName} da ${ord(w)} semana da Quaresma`;
    }
    color = weekday === 0 && weeksSince(firstSunday) + 1 === 4 ? "rosa" : "roxo";
  } else if (date >= easter && date <= pentecost) {
    season = "Páscoa";
    const w = weeksSince(easter) + 1;
    if (date === easter) name = "Domingo de Páscoa, Ressurreição do Senhor";
    else if (date === pentecost) name = "Pentecostes";
    else if (w === 1) name = `${weekdayName} da Oitava da Páscoa`;
    else name = weekday === 0 ? `${ordM(w)} Domingo da Páscoa${w === 2 ? " (Divina Misericórdia)" : ""}` : `${weekdayName} da ${ord(w)} semana da Páscoa`;
    color = date === pentecost ? "vermelho" : "branco";
  } else if (date >= adv1 && date < `${year - 1}-12-25`) {
    season = "Advento";
    const w = weeksSince(adv1) + 1;
    name = weekday === 0 ? `${ordM(w)} Domingo do Advento${w === 3 ? " (Gaudete)" : ""}` : `${weekdayName} da ${ord(w)} semana do Advento`;
    color = weekday === 0 && w === 3 ? "rosa" : "roxo";
  } else if (date >= `${year - 1}-12-25` && date <= baptism) {
    season = "Natal";
    name = date <= `${year}-01-01` ? `${weekdayName} da Oitava do Natal` : `${weekdayName} do Tempo do Natal`;
    color = "branco";
  } else {
    season = "Tempo Comum";
    let w: number;
    if (date < ash) w = weeksSince(baptism) + 1;
    else w = 34 - Math.round((parse(ctk) - (ms - weekday * DAY)) / DAY / 7);
    name = weekday === 0 ? `${ordM(w)} Domingo do Tempo Comum` : `${weekdayName} da ${ord(w)} semana do Tempo Comum`;
    if (date === ctk) name = "Cristo Rei do Universo";
    color = "verde";
  }

  const feast = fixedFeasts(year).find((f) => f.date === date);
  if (feast && !(season === "Tríduo Pascal" || season === "Semana Santa")) {
    return { ...base, season, name: feast.name, feast: feast.name, color: feast.color };
  }
  return { ...base, season, name, color };
}

const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
/** "1º de outubro de 2026". */
export function longDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return `${d === 1 ? "1º" : d} de ${MONTHS[(m ?? 1) - 1]} de ${y}`;
}

/** Hoje em Brasília, como `YYYY-MM-DD`. */
export function todayInBrazil(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(now);
}
