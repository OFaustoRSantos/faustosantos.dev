import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Site } from "../components/site";
import { getContent, href, resolveRoute, routePath, siteUrl, type Locale } from "./content";

export type PageProps = { params: Promise<{ segments?: string[] }> };

export async function pageMetadata(props: PageProps, locale: Locale): Promise<Metadata> {
  const { segments } = await props.params;
  const route = resolveRoute(segments);
  if (!route) return {};
  const content = getContent(locale);
  const project = route.page === "project" ? content.projects.find((p) => p.slug === route.slug) : null;
  const title = route.page === "home" ? content.meta.home : `${project?.name ?? content.meta[route.page === "project" ? "work" : route.page]} — Fausto Santos`;
  const description = project?.subtitle ?? (route.page === "story" ? content.story.description : content.meta.description);
  const path = routePath(route);
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: href(locale, path),
      languages: { en: href("en", path), "pt-BR": href("pt", path), "x-default": href("en", path) },
    },
    openGraph: {
      type: "website", title, description, url: href(locale, path),
      siteName: "Fausto Santos", locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Fausto Santos — Public education, AI & economics" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.svg" },
  };
}

export async function renderPage(props: PageProps, locale: Locale) {
  const { segments } = await props.params;
  const route = resolveRoute(segments);
  if (!route) notFound();
  return <Site locale={locale} route={route} />;
}
