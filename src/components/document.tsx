import type { ReactNode } from "react";
import "@fontsource-variable/inter";
import "../app/globals.css";
import "../app/construction.css";
import { siteUrl, type Locale } from "../lib/content";

export function Document({ children, locale }: { children: ReactNode; locale: Locale }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Fausto Santos",
    url: siteUrl,
    sameAs: ["https://www.linkedin.com/in/faustosanto"],
    knowsAbout: ["Public education", "Artificial intelligence", "Economics", "Software development"],
  };
  return <html lang={locale === "pt" ? "pt-BR" : "en"}><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
    {children}
  </body></html>;
}
