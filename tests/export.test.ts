import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { href, siteUrl, staticRoutes } from "../src/lib/content";

const exported = existsSync(join(process.cwd(), "out", "index.html"));
const htmlFor = (path: string) => readFileSync(join(process.cwd(), "out", path, "index.html"), "utf8");

test("production export contains every localized page, metadata and working internal anchors", { skip: !exported }, () => {
  for (const { segments } of staticRoutes()) {
    const path = segments.join("/");
    for (const locale of ["en", "pt"] as const) {
      const url = href(locale, path);
      const html = htmlFor(url);
      assert.match(html, new RegExp(`<html lang="${locale === "pt" ? "pt-BR" : "en"}"`));
      assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${url}: single h1`);
      assert.ok(html.includes(`rel="canonical" href="${siteUrl}${url}"`), `${url}: canonical`);
      assert.equal(new URL(siteUrl).hostname, "faustosantos.dev");
      assert.doesNotMatch(html, /faustosantos\.vercel\.app/, `${url}: use canonical domain only`);
      assert.ok(html.includes('hrefLang="en"'), `${url}: English alternate`);
      assert.ok(html.includes('hrefLang="pt-BR"'), `${url}: Portuguese alternate`);
      assert.ok(html.includes('id="main"'), `${url}: skip-link target`);
      assert.ok(!html.includes("data-pending"), `${url}: content is not hidden in initial HTML`);
      for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
        const target = match[1];
        if (!target.startsWith("/") && !target.startsWith("#")) continue;
        const [targetPath, fragment] = target.split("#");
        if (targetPath.startsWith("/images/")) {
          assert.ok(existsSync(join(process.cwd(), "out", targetPath)), `${url}: missing image ${targetPath}`);
          assert.equal(fragment, undefined);
          continue;
        }
        const targetHtml = targetPath ? htmlFor(targetPath) : html;
        if (fragment) assert.ok(targetHtml.includes(`id="${fragment}"`), `${url}: missing target ${target}`);
      }
    }
  }
});

test("production export includes social image, crawler files and a real 404 page", { skip: !exported }, () => {
  for (const name of ["og.png", "favicon.svg", "robots.txt", "sitemap.xml", "404.html"]) {
    assert.ok(existsSync(join(process.cwd(), "out", name)), name);
  }
  const png = readFileSync(join(process.cwd(), "out", "og.png"));
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  const sitemap = readFileSync(join(process.cwd(), "out", "sitemap.xml"), "utf8");
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, 16);
});

test("construction home includes nonblocking opening, story invitation and original F branding", { skip: !exported }, () => {
  for (const locale of ["en", "pt"] as const) {
    const html = htmlFor(href(locale));
    assert.match(html, /class="opening" hidden=""/);
    assert.match(html, /class="opening-skip" type="button"/);
    assert.match(html, /class="opening-brick"/);
    assert.match(html, /class="story-invitation"/);
    assert.match(html, /id="story-invitation-title"/);
    assert.match(html, /class="marquee-track"/);
    assert.match(html, /class="build-brick build-brick-2"/);
    assert.equal((html.match(/class="field-photo field-photo-/g) ?? []).length, 3);
    assert.match(html, /class="brand-mark/);
    assert.doesNotMatch(html, />FS</);
    assert.doesNotMatch(readFileSync(join(process.cwd(), "public", "favicon.svg"), "utf8"), />FS</);
  }
});

test("masonry appears once per editorial page and never on the resume", { skip: !exported }, () => {
  const expected = [
    { path: "", count: 1 },
    { path: "work", count: 1 },
    { path: "story", count: 1 },
    { path: "projects/sistema-san", count: 1 },
    { path: "projects/soel", count: 1 },
    { path: "projects/tsugrowth", count: 1 },
    { path: "projects/research", count: 1 },
    { path: "resume", count: 0 },
  ];
  for (const locale of ["en", "pt"] as const) {
    for (const { path, count } of expected) {
      const html = htmlFor(href(locale, path));
      assert.equal((html.match(/class="brick-divider(?: brick-divider-story)?"/g) ?? []).length, count, `${locale}/${path}`);
      assert.equal((html.match(/class="divider-course"/g) ?? []).length, count * 2);
      assert.equal((html.match(/class="divider-brick"/g) ?? []).length, count * 24);
    }
  }
});

test("the home connects the construction story to projects and includes the material carrier", { skip: !exported }, () => {
  for (const locale of ["en", "pt"] as const) {
    const html = htmlFor(href(locale));
    assert.match(html, /class="material-carrier"/);
    assert.match(html, /class="carrier-load"/);
    assert.match(html, /aria-labelledby="construction-origin-title"/);
    assert.match(html, /id="construction-origin-title"/);
    assert.ok(html.indexOf('id="construction-origin-title"') < html.indexOf('id="work"'));
    assert.doesNotMatch(html, /class="brick-divider-story"[^>]*aria-hidden/);
  }
});

test("the English root and Portuguese /pt export the three featured projects", { skip: !exported }, () => {
  const english = htmlFor(href("en"));
  const portuguese = htmlFor(href("pt"));
  assert.match(english, /<html lang="en"/);
  assert.match(portuguese, /<html lang="pt-BR"/);
  assert.equal((english.match(/class="project-card"/g) ?? []).length, 3);
  assert.equal((portuguese.match(/class="project-card"/g) ?? []).length, 3);
  assert.ok(english.includes("Supporting research"));
  assert.ok(portuguese.includes("Pesquisa de apoio"));
});

test("every case opens with a build summary, role, status, evidence and links", { skip: !exported }, () => {
  for (const locale of ["en", "pt"] as const) {
    for (const project of ["soel", "sistema-san", "tsugrowth", "research"]) {
      const html = htmlFor(href(locale, `projects/${project}`));
      const overview = html.indexOf('class="case-overview"');
      const problem = html.indexOf('class="section problem-section"');
      assert.ok(overview >= 0 && overview < problem, `${locale}/${project}: facts are at the top`);
      for (const field of ["case-built", "project-facts", "case-proof", "case-links"]) {
        assert.ok(html.includes(`class="${field}`), `${locale}/${project}: ${field}`);
      }
      assert.match(html, /class="project-media(?: media-pending)?"/);
      if (project === "sistema-san" || project === "tsugrowth") assert.match(html, /class="case-status is-progress"/);
      else assert.doesNotMatch(html, /class="case-status is-progress"/);
    }
  }
});

test("export publishes real photos and no repository navigation or unavailable SOEL screenshot promises", { skip: !exported }, () => {
  for (const locale of ["en", "pt"] as const) {
    const home = htmlFor(href(locale));
    assert.doesNotMatch(home, /class="photo-sketch"/);
    assert.equal((home.match(/src="\/images\/fausto-/g) ?? []).length, 3);
    for (const { segments } of staticRoutes()) {
      const html = htmlFor(href(locale, segments.join("/")));
      assert.doesNotMatch(html, /href="[^"]*(?:github\.com|gitlab\.com|bitbucket\.org)/i);
      assert.doesNotMatch(html, /repository|repositório|GitHub/);
    }
    const san = htmlFor(href(locale, "projects/sistema-san"));
    assert.ok(san.includes('href="https://www.sistemasan.com.br/a16z-academy"'));
    assert.ok(san.includes('src="/images/sistema-san-diretor.webp"'));
    assert.ok(htmlFor(href(locale, "projects/soel")).includes("Cometa Olímpico"));
  }
});
