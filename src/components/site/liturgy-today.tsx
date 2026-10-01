"use client";

import { useSyncExternalStore } from "react";
import { liturgicalDay, longDate, todayInBrazil } from "@/lib/liturgy";

/**
 * "Hoje na Igreja": o dia litúrgico de hoje (Brasília), calculado no navegador pelo calendário romano com as
 * transferências do Brasil. Sem santoral: memórias de santos não entram, só tempos, domingos e solenidades.
 */
const subscribeNever = () => () => {};

export function LiturgyToday() {
  // no servidor não há "hoje" do visitante: renderiza o espaço e preenche no navegador (sem divergir na hidratação)
  const today = useSyncExternalStore(subscribeNever, () => todayInBrazil(), () => null);
  const day = today ? liturgicalDay(today) : null;
  if (!day) return <p className="liturgy-chip liturgy-chip--placeholder" aria-hidden="true"><span /><span /></p>;
  return (
    <p className="liturgy-chip" data-color={day.color}>
      <span className="liturgy-chip__dot" aria-hidden="true" />
      <span className="liturgy-chip__date">Hoje, {longDate(day.date)}</span>
      <strong className="liturgy-chip__name">{day.name}</strong>
      <span className="liturgy-chip__cycle">Leituras do Ano {day.sundayCycle} · semana {day.weekdayCycle}{day.feast ? ` · ${day.season}` : ""}</span>
    </p>
  );
}
