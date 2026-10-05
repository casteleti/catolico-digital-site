/**
 * Ilustração da marca em WebP (public/ilustracoes/<nome>-600.webp e -1200.webp). O navegador escolhe o tamanho
 * pela largura de exibição; carregamento preguiçoso fora do topo.
 */
export function Illustration({ name, alt, width, height, priority = false, className = "" }: { name: string; alt: string; width: number; height: number; priority?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- WebP estático já otimizado em dois tamanhos
    <img
      alt={alt}
      className={`illustration ${className}`.trim()}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      height={height}
      loading={priority ? "eager" : "lazy"}
      sizes="(max-width: 900px) 92vw, 560px"
      src={`/ilustracoes/${name}-1200.webp`}
      srcSet={`/ilustracoes/${name}-600.webp 600w, /ilustracoes/${name}-1200.webp 1200w`}
      width={width}
    />
  );
}
