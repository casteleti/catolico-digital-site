import {
  LOGO_VIEWBOX,
  SYMBOL_BLUE,
  SYMBOL_BROWN,
  SYMBOL_IN_LOGO,
  SYMBOL_VIEWBOX,
  WORDMARK_GLYPHS,
  WORDMARK_ORIGIN,
} from "./logo-data";

type BrandMarkProps = {
  /** Só o símbolo (ex.: favicon-like, espaços apertados). */
  compact?: boolean;
};

/**
 * Logotipo oficial (fonte: catolico-digital/Docs/design/logo-catolico-digital.svg — o nome vem dos caminhos
 * vetoriais originais; o símbolo foi refeito em vetor a partir das mesmas formas, porque o arquivo só trazia
 * bitmap para ele). Sempre em `currentColor`: branco no cabeçalho/rodapé escuros, azul quando o cabeçalho
 * clareia ao rolar — sem JavaScript, só a cor do texto ao redor decide.
 */
export function BrandMark({ compact = false }: BrandMarkProps) {
  const symbol = (
    <>
      <path d={SYMBOL_BROWN} fill="currentColor" opacity={0.72} />
      <path d={SYMBOL_BLUE} fill="currentColor" />
    </>
  );
  if (compact) {
    return (
      <span className="brand-mark brand-mark--compact">
        <svg aria-hidden="true" className="brand-mark__symbol" focusable="false" viewBox={SYMBOL_VIEWBOX}>
          {symbol}
        </svg>
      </span>
    );
  }
  return (
    <span className="brand-mark">
      <svg aria-label="Católico Digital" className="brand-mark__logo" focusable="false" role="img" viewBox={LOGO_VIEWBOX}>
        <title>Católico Digital</title>
        <g transform={SYMBOL_IN_LOGO}>{symbol}</g>
        <g fill="currentColor" transform={WORDMARK_ORIGIN}>
          {WORDMARK_GLYPHS.map((glyph) => (
            <path d={glyph.d} key={`${glyph.x}-${glyph.y}`} transform={`translate(${glyph.x},${glyph.y})`} />
          ))}
        </g>
      </svg>
    </span>
  );
}
