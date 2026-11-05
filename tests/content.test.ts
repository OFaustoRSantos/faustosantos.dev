import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import en from "../docs/content/en.json";
import pt from "../docs/content/pt.json";
import { getContent, href, resolveRoute, routePath, staticRoutes } from "../src/lib/content";

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, child]) => [key, shape(child)]));
  }
  return typeof value;
}

test("English and Portuguese documents have identical keys and collection lengths", () => {
  assert.deepEqual(shape(pt), shape(en));
});

test("all 16 localized page URLs are unique and resolve to the original route", () => {
  const paths = new Set<string>();
  for (const { segments } of staticRoutes()) {
    const route = resolveRoute(segments);
    assert.ok(route);
    assert.equal(routePath(route), segments.join("/"));
    for (const locale of ["en", "pt"] as const) {
      const path = href(locale, routePath(route));
      assert.equal(paths.has(path), false);
      paths.add(path);
    }
  }
  assert.equal(paths.size, 16);
  assert.equal(href("en"), "/");
  assert.equal(href("pt"), "/pt/");
});

test("unknown and malformed routes do not resolve to a success page", () => {
  for (const segments of [["unknown"], ["projects"], ["projects", "missing"], ["work", "extra"], ["story", "extra"], ["projects", "soel", "extra"]]) {
    assert.equal(resolveRoute(segments), null);
  }
});

test("project identities and metrics remain consistent across languages", () => {
  assert.deepEqual(pt.projects.map((project) => project.slug), en.projects.map((project) => project.slug));
  assert.deepEqual(pt.stats.map((stat) => stat.value), en.stats.map((stat) => stat.value));
  assert.equal(new Set(en.projects.map((p) => p.slug)).size, 4);
  for (const locale of ["en", "pt"] as const) {
    const content = getContent(locale);
    assert.equal(content.hero.milestones.length, 5);
    assert.equal(content.experience.items.length, 5);
    for (const project of content.projects) {
      assert.match(project.slug, /^[a-z0-9-]+$/);
      assert.equal(project.metrics.length, 3);
      assert.equal(project.contributions.length, 3);
      assert.ok(project.built.trim());
      assert.ok(project.status.trim());
      assert.ok(project.evidence.trim());
      assert.ok(project.links);
      for (const link of Object.values(project.links)) {
        assert.ok(!link || link.startsWith("https://"), `${locale}/${project.slug}: public links must use HTTPS`);
      }
      assert.ok(project.media.alt.trim());
      assert.ok(project.caveat.trim());
      if (project.media.src) {
        assert.match(project.media.src, /^\/images\/[a-z0-9._-]+\.(webp|png|jpg|jpeg|avif)$/);
        assert.ok(existsSync(join(process.cwd(), "public", project.media.src)));
      }
    }
    if (content.story.portrait.src) {
      assert.match(content.story.portrait.src, /^\/images\/[a-z0-9._-]+\.(webp|png|jpg|jpeg|avif)$/);
      assert.ok(existsSync(join(process.cwd(), "public", content.story.portrait.src)));
    }
  }
});

test("goals, estimates and ambiguous research rankings are not reported as completed results", () => {
  assert.match(en.projects[2].metrics[2].label, /estimate, not closed revenue/);
  assert.match(pt.projects[2].metrics[2].label, /estimativa.*não receita/);
  assert.match(en.olympiads.items[0].date, /goal/);
  assert.match(pt.olympiads.items[0].date, /objetivo/);
  assert.match(en.projects[2].timeline[3].date, /planned/);
  assert.match(pt.projects[2].timeline[3].date, /previsto/);
  assert.doesNotMatch(JSON.stringify(en.projects[3].metrics), /2 of 8|2nd/);
});

test("contact details are actionable and consistent in both languages", () => {
  assert.equal(en.contact.email, pt.contact.email);
  assert.match(en.contact.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  assert.equal(en.contact.linkedin, pt.contact.linkedin);
  assert.match(en.contact.linkedin, /^linkedin\.com\/in\/[\w-]+$/);
});

test("construction copy, story photos and opening sequence are complete in both languages", () => {
  for (const locale of ["en", "pt"] as const) {
    const content = getContent(locale);
    assert.deepEqual(content.construction.intro.stages.map((stage) => stage.name), ["SOEL", "Sistema San", "OBECON"]);
    assert.equal(content.construction.blocks.length, 3);
    for (const block of content.construction.blocks) {
      if (block.path.startsWith("#")) {
        assert.equal(block.path, "#olympiads");
      } else {
        assert.ok(resolveRoute(block.path.split("/")), `${locale}: ${block.path}`);
      }
    }
    assert.ok(content.construction.pause);
    assert.ok(content.construction.play);
    assert.equal(content.storyInvite.marquee.length, 3);
    assert.equal(content.storyInvite.photos.length, 3);
    for (const photo of content.storyInvite.photos) {
      assert.ok(photo.alt.trim());
      assert.ok(photo.caption.trim());
      assert.ok(photo.prompt.trim());
      if (photo.src) {
        assert.match(photo.src, /^\/images\/[a-z0-9._-]+\.(webp|png|jpg|jpeg|avif)$/);
        assert.ok(existsSync(join(process.cwd(), "public", photo.src)));
      }
    }
  }
});

test("the selected portfolio prioritizes three builds and flags unfinished products", () => {
  for (const locale of ["en", "pt"] as const) {
    const content = getContent(locale);
    assert.equal(content.work.caseLabel.length > 0, true);
    assert.equal(content.work.built.length > 0, true);
    assert.equal(content.work.evidence.length > 0, true);
    assert.equal(content.work.links.length > 0, true);
    assert.deepEqual(content.projects.filter((project) => project.slug !== "research").map((project) => project.slug).sort(), ["sistema-san", "soel", "tsugrowth"].sort());
    assert.ok(content.projects.find((project) => project.slug === "sistema-san")!.status.toLowerCase().includes(locale === "en" ? "work in progress" : "em desenvolvimento"));
    assert.ok(content.projects.find((project) => project.slug === "tsugrowth")!.status.toLowerCase().includes(locale === "en" ? "work in progress" : "em desenvolvimento"));
    assert.match(content.projects.find((project) => project.slug === "tsugrowth")!.caveat, /R\$30M|R\$ 30M/);
  }
});

test("selected photography and public San evidence replace placeholders without repository links", () => {
  for (const locale of ["en", "pt"] as const) {
    const content = getContent(locale);
    for (const photo of [...content.storyInvite.photos, content.story.portrait]) {
      assert.ok(photo.src, `${locale}: every selected photo is available`);
      assert.ok(photo.alt);
      assert.ok(statSync(join(process.cwd(), "public", photo.src)).size < 350_000);
    }
    for (const project of content.projects) {
      assert.deepEqual(Object.keys(project.links), ["demo"]);
      assert.doesNotMatch(JSON.stringify(project.links), /github|gitlab|bitbucket/i);
    }
    assert.equal(content.projects[0].links.demo, "https://www.sistemasan.com.br/a16z-academy");
    assert.equal(content.projects[0].media.src, "/images/sistema-san-diretor.webp");
    assert.match(content.projects[0].media.caption, /demonstration data|dados demonstrativos/);
    assert.match(content.projects[1].evidence, /Cometa Olímpico/);
    assert.equal(content.projects[1].media.src, "");
  }
});
