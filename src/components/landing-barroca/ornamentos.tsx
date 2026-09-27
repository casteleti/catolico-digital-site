/**
 * Elementos gráficos da opção D, versão limpa: o símbolo da marca, um arco
 * fino atrás do celular no herói do desktop e o ícone de check. Cantoneiras,
 * florões e losangos da primeira versão foram removidos em 27/09.
 */

export function ArcoMarca() {
  return (
    <svg aria-hidden="true" viewBox="0 0 30 34" className="bq-brand__symbol" fill="none" stroke="#e6c98a" strokeWidth="1.3">
      <path d="M3 33V16C3 8 8.5 2 15 1c6.5 1 12 7 12 15v17" />
      <path d="M8 33V18c0-4.5 3-8 7-8.5 4 .5 7 4 7 8.5v15" />
      <path d="M15 6v6M12 9h6" stroke="#c8a35d" />
    </svg>
  );
}

/** Um único arco fino atrás do celular no herói do desktop. */
export function ArcoHeroi() {
  return (
    <svg aria-hidden="true" viewBox="0 0 560 600" className="bq-arco" fill="none" stroke="#c8a35d" strokeWidth="1">
      <path d="M60 600V260c0-120 100-200 220-200s220 80 220 200v340" opacity="0.55" />
    </svg>
  );
}

export function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="bq-check-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}
