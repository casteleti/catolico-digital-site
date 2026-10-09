import { ImageResponse } from "next/og";

/** Imagem de compartilhamento (WhatsApp, Instagram, LinkedIn): aparece quando alguém cola o endereço do site. */
export const alt = "Católico Digital: o site e a organização da sua paróquia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#0a1f5c",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 4, color: "#f2639f", textTransform: "uppercase" }}>
          Plataforma para paróquias
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>Católico Digital</div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 40, lineHeight: 1.3, color: "#dbe2f5", maxWidth: 940 }}>
          Horários de missa, sacramentos, catequese e dízimo num site que a própria paróquia atualiza.
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 30, color: "#f2639f" }}>catolico.digital</div>
      </div>
    ),
    size,
  );
}
