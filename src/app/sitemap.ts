import type { MetadataRoute } from "next";
import { href, siteUrl, staticRoutes } from "../lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes().flatMap(({ segments }) => (["en", "pt"] as const).map((locale) => ({
    url: `${siteUrl}${href(locale, segments.join("/"))}`,
    alternates: { languages: { en: `${siteUrl}${href("en", segments.join("/"))}`, "pt-BR": `${siteUrl}${href("pt", segments.join("/"))}` } },
  })));
}
