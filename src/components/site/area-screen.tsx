import { Check } from "lucide-react";
import { ModuleIcon } from "@/components/site/module-icon";
import type { AreaScreen as Screen } from "@/content/areas";

/** Tela de exemplo de uma dobra (dados fictícios de uma paróquia de exemplo), desenhada em CSS. */
export function AreaScreen({ screen }: { screen: Screen }) {
  const body = (
    <>
      <p className="vscreen__kicker">{screen.kicker}</p>
      {screen.title ? <p className="vscreen__title">{screen.title}</p> : null}
      {screen.rows?.map((row) => (
        <div className="vscreen__row" key={row.text}><ModuleIcon name={row.icon} size={16} /><span>{row.text}</span>{row.tag ? <b>{row.tag}</b> : <b />}</div>
      ))}
      {screen.lines?.map((line) => (
        <div className={`vscreen__line ${line.ok ? "is-ok" : ""}`.trim()} key={line.text}>
          {line.ok ? <Check aria-hidden="true" size={14} /> : <ModuleIcon name="clock" size={14} />} {line.text}
        </div>
      ))}
      {screen.chips?.length ? (
        <div className="vscreen__chips">{screen.chips.map((chip, i) => <span className={i === 0 ? "is-on" : undefined} key={chip}>{chip}</span>)}</div>
      ) : null}
    </>
  );
  if (screen.pix) {
    return (
      <div className="vscreen vscreen--pix">
        <div className="vscreen__qr"><i /><i /><i /><i /></div>
        <div>{body}</div>
      </div>
    );
  }
  return <div className="vscreen">{body}</div>;
}
