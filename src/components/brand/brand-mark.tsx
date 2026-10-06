/**
 * Marca oficial Católico.digital (arquivos em `public/brand/`, os mesmos da plataforma). Regra da marca: com
 * espaço (≥ 260 px), a versão COM slogan "Sua paróquia online"; menor, SEM slogan; bem pequena (< 110 px), só o ícone.
 * `on` = fundo onde ela está (claro ou azul).
 */
type Props = {
  /** Largura em px com que a marca aparece. */
  width?: number;
  on?: "claro" | "azul";
  /** `false` = nunca usa o slogan (ex.: cabeçalho compacto). */
  slogan?: boolean;
  /** Só o símbolo. */
  compact?: boolean;
  className?: string;
  /** Marca fora da primeira tela (ex.: rodapé): não é pré-carregada nem disputa banda com o conteúdo inicial. */
  lazy?: boolean;
};

const RATIO = { slogan: 192 / 900, plain: 163 / 800, icon: 1 } as const;

export function BrandMark({ width = 168, on = "claro", slogan = true, compact = false, className = "", lazy = false }: Props) {
  const asset = compact || width < 110 ? "icone" : slogan && width >= 260 ? "horizontal-slogan" : "horizontal";
  const ratio = asset === "icone" ? RATIO.icon : asset === "horizontal-slogan" ? RATIO.slogan : RATIO.plain;
  const size = compact ? Math.min(width, 48) : width;
  return (
    <span className={`brand-mark ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element -- arquivo estático já otimizado (WebP no tamanho útil) */}
      <img
        alt="Católico.digital — Sua paróquia online"
        className="brand-mark__logo"
        decoding="async"
        height={Math.round(size * ratio)}
        loading={lazy ? "lazy" : undefined}
        sizes={asset === "horizontal" ? `${size}px` : undefined}
        src={`/brand/${asset}-${on}.webp`}
        srcSet={asset === "horizontal" ? `/brand/${asset}-${on}-400.webp 400w, /brand/${asset}-${on}.webp 800w` : undefined}
        style={{ width: size }}
        width={size}
      />
    </span>
  );
}
