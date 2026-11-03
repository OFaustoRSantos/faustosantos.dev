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
      assert.ok(html.includes('hrefLang="en"'), `${url}: English alternate`);
      assert.ok(html.includes('hrefLang="pt-BR"'), `${url}: Portuguese alternate`);
      assert.ok(html.includes('id="main"'), `${url}: skip-link target`);
      assert.ok(!html.includes("data-pending"), `${url}: content is not hidden in initial HTML`);
      for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
        const target = match[1];
        if (!target.startsWith("/") && !target.startsWith("#")) continue;
        const [targetPath, fragment] = target.split("#");
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
