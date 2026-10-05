import Link from "next/link";
import { MODULE_GROUPS, modulesOf, ROLE_LABELS } from "@/content/modules";
import { ModuleIcon } from "./module-icon";

/**
 * A tabela dos módulos: um grupo por bloco, uma linha por módulo, com o que resolve, quem usa e a página.
 * No celular, cada linha vira um cartão (CSS).
 */
export function ModulesTable({ compact = false }: { compact?: boolean }) {
  return (
    <div className="modules-table-wrap">
      <table className="modules-table">
        <thead>
          <tr>
            <th scope="col">Módulo</th>
            <th scope="col">O que resolve</th>
            <th scope="col">Quem usa</th>
            <th scope="col"><span className="visually-hidden">Página</span></th>
          </tr>
        </thead>
        {MODULE_GROUPS.map((group) => (
          <tbody key={group.key}>
            <tr className="modules-table__group">
              <th colSpan={4} scope="rowgroup"><span>{group.label}</span><em>{group.lead}</em></th>
            </tr>
            {modulesOf(group.key).map((m) => (
              <tr key={m.slug}>
                <th scope="row">
                  <Link href={`/modulos/${m.slug}`} className="modules-table__name">
                    <span className="modules-table__icon"><ModuleIcon name={m.icon} size={20} /></span>
                    <span>{m.name}</span>
                  </Link>
                </th>
                <td data-label="O que resolve">
                  <p>{m.promise}</p>
                  {!compact ? <p className="modules-table__pain">{m.pain}</p> : null}
                </td>
                <td data-label="Quem usa">
                  <span className="modules-table__roles">{m.roles.map((r) => <i key={r}>{ROLE_LABELS[r]}</i>)}</span>
                </td>
                <td className="modules-table__go">
                  <Link className="text-link" href={`/modulos/${m.slug}`}>Ver <span aria-hidden="true">→</span></Link>
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
