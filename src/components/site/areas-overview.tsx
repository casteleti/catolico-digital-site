import Link from "next/link";
import { ModuleIcon } from "@/components/site/module-icon";
import { AREAS, areaHref } from "@/content/areas";

/** As quatro áreas lado a lado, cada uma com os seus quatro recursos (Home e /modulos). Mesma ordem do menu. */
export function AreasOverview() {
  return (
    <div className="areas-overview">
      {AREAS.map((area, i) => (
        <article className="area-card" key={area.key} style={{ "--col-accent": AREA_ACCENTS[i] } as React.CSSProperties}>
          <p className="area-card__num">0{i + 1}</p>
          <h3><Link href={areaHref(area.key)}>{area.label}</Link></h3>
          <p className="area-card__lead">{area.lead}</p>
          <ul>
            {area.items.map((item) => (
              <li key={item.id}>
                <Link href={areaHref(area.key, item.id)}><span className="area-card__icon"><ModuleIcon name={item.icon} size={15} /></span>{item.label}</Link>
              </li>
            ))}
          </ul>
          <Link className="area-card__go" href={areaHref(area.key)}>Conhecer {area.label} <span aria-hidden="true">→</span></Link>
        </article>
      ))}
    </div>
  );
}

/** Cor de cada área (a mesma das colunas do menu). */
export const AREA_ACCENTS = ["var(--area-1)", "var(--area-2)", "var(--area-3)", "var(--area-4)"];
