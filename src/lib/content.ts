import en from "../../docs/content/en.json";
import pt from "../../docs/content/pt.json";

export type Locale = "en" | "pt";
export type Content = typeof en;
export type Project = Content["projects"][number];
export type Route = { page: "home" | "work" | "story" | "resume" } | { page: "project"; slug: string };

const translations: Record<Locale, Content> = { en, pt };
export const getContent = (locale: Locale): Content => translations[locale];
export const siteUrl = "https://faustosantos.dev";

export function href(locale: Locale, path = ""): string {
  return `${locale === "pt" ? "/pt" : ""}/${path ? `${path}/` : ""}`;
}

export function resolveRoute(segments: string[] = []): Route | null {
  if (segments.length === 0) return { page: "home" };
  if (segments.length === 1 && ["work", "story", "resume"].includes(segments[0])) {
    const page = segments[0];
    if (page === "work" || page === "story" || page === "resume") return { page };
  }
  if (segments.length === 2 && segments[0] === "projects" && en.projects.some((p) => p.slug === segments[1])) {
    return { page: "project", slug: segments[1] };
  }
  return null;
}

export function routePath(route: Route): string {
  return route.page === "home" ? "" : route.page === "project" ? `projects/${route.slug}` : route.page;
}

export function staticRoutes(): { segments: string[] }[] {
  return [
    { segments: [] },
    ...["work", "story", "resume"].map((page) => ({ segments: [page] })),
    ...en.projects.map((project) => ({ segments: ["projects", project.slug] })),
  ];
}
