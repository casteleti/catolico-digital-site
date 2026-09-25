type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${compact ? "brand-mark--compact" : ""}`.trim()}>
      <span className="brand-mark__symbol" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="brand-mark__name">
        <strong>Católico</strong>
        {!compact && <em>Digital</em>}
      </span>
    </span>
  );
}
