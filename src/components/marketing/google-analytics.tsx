import Script from "next/script";
import { gaInitScript } from "@/lib/ga-snippet";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-Y7FQ36B3FV";

export function GoogleAnalytics({ nonce }: { nonce?: string }) {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script nonce={nonce} src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script nonce={nonce} id="google-analytics" strategy="lazyOnload">
        {gaInitScript(GA_ID)}
      </Script>
    </>
  );
}
