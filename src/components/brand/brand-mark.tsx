type BrandMarkProps = {
  /** Só o símbolo (ex.: favicon-like, espaços apertados). */
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  if (compact) {
    return <span aria-hidden="true" className="brand-mark brand-mark--compact"><span className="brand-mark__crop"><img className="brand-mark__symbol" src="/catolico-digital-logo.svg" alt="" /></span></span>;
  }
  return (
    <span className="brand-mark">
      <img alt="Católico Digital" className="brand-mark__logo" src="/catolico-digital-logo.svg" />
    </span>
  );
}
