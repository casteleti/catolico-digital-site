import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://catolico-digital.example"),
  title: {
    default: "Católico Digital",
    template: "%s | Católico Digital",
  },
  description: "Presença digital organizada para comunidades católicas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
