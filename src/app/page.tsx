import { LandingPage } from "@/components/landing/landing-page";
import { JsonLd, plain } from "@/components/seo/json-ld";
import { faq } from "@/content/faq";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([question, answer]) => ({
    "@type": "Question",
    name: plain(question),
    acceptedAnswer: { "@type": "Answer", text: plain(answer) },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd} />
      <LandingPage />
    </>
  );
}
