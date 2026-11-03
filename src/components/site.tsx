import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { getContent, href, routePath, type Content, type Locale, type Project, type Route } from "../lib/content";
import { Header, Motion, PrintButton } from "./controls";
import { BrandMark } from "./brand-mark";
import { MotionToggle, Opening } from "./construction-motion";

function Reveal({ children, className = "", index = 0 }: { children: ReactNode; className?: string; index?: number }) {
  return <div data-reveal className={className} style={{ "--delay": `${Math.min(index * 90, 450)}ms` } as CSSProperties}>{children}</div>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Metrics({ items, className = "" }: { items: { value: string; label: string }[]; className?: string }) {
  return <dl className={`metrics ${className}`}>{items.map((item) => <div key={item.label}><dt>{item.value}</dt><dd>{item.label}</dd></div>)}</dl>;
}

function Trajectory({ text }: { text: Content["hero"] }) {
  return (
    <div className="trajectory" role="group" aria-label={text.trajectory}>
      <ol className="trajectory-nodes">
        {text.milestones.map((milestone, index) => <li key={milestone.title} className={`milestone milestone-${index}`}>
          <span className="milestone-copy"><span className="micro">{milestone.date}</span><span>{milestone.title}</span></span>
          <span className="milestone-dot" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </li>)}
      </ol>
    </div>
  );
}

function BuildingScene({ text, locale }: { text: Content["construction"]; locale: Locale }) {
  return <div className="build-scene">
    <p className="micro scene-caption">{text.drawing}</p>
    <div className="construction-drawing" aria-hidden="true">
      <span className="dimension dimension-top">F / 01</span>
      <BrandMark className="sculpture" />
      <span className="drawing-spark spark-one">✳</span><span className="drawing-spark spark-two">+</span>
      <span className="drawing-note preserve-lines">{text.sketch}</span>
      <span className="dimension dimension-bottom">{text.process}</span>
    </div>
    <div className="build-courses">{text.blocks.map((block, index) => <a className={`build-brick build-brick-${index}`} key={block.name} href={block.path.startsWith("#") ? block.path : href(locale, block.path)}>
      <span className="micro">0{index + 1}</span><span><strong>{block.name}</strong><span className="brick-label">{block.label}</span></span><span className="brick-arrow" aria-hidden="true">↗</span>
    </a>)}</div>
    <p className="micro scene-foundation"><span aria-hidden="true">↳</span> {text.foundation}</p>
  </div>;
}

function Hero({ text, construction, locale }: { text: Content["hero"]; construction: Content["construction"]; locale: Locale }) {
  return <section className="home-hero">
    <div className="container hero-layout"><div className="hero-copy">
      <p className="construction-label"><span aria-hidden="true">🧱</span>{construction.label}</p>
      <p className="hero-pill"><span aria-hidden="true" />{text.eyebrow}</p>
      <h1>{text.title.map((line, index) => <span className={index === 2 ? "muted-line" : ""} key={line}>{line}</span>)}</h1>
      <p className="hero-description">{text.description}</p>
      <div className="button-row">
        <a className="button button-white button-pill" href="#work">{text.primary}<span aria-hidden="true">↓</span></a>
        <a className="button button-outline button-pill" href={href(locale, "story")}>{text.secondary}<span aria-hidden="true">→</span></a>
      </div>
    </div><BuildingScene text={construction} locale={locale} /></div>
    <div className="container"><Trajectory text={text} /></div>
  </section>;
}

function StoryInvitation({ content, locale }: { content: Content; locale: Locale }) {
  const text = content.storyInvite;
  return <section className="story-invitation" aria-labelledby="story-invitation-title">
    <div className="ribbon-shell">
      <a className="story-ribbon" href={href(locale, "story")}>
        <span className="sr-only">{text.cta}</span>
        <span className="marquee-window" aria-hidden="true"><span className="marquee-track">{[0, 1].map((repeat) => <span className="marquee-group" key={repeat}>{text.marquee.map((phrase, index) => <span key={phrase}><span className="ribbon-symbol">{index === 0 ? "🧱" : "↗"}</span>{phrase}</span>)}</span>)}</span></span>
      </a>
    </div>
    <div className="container">
      <div className="invitation-toolbar"><p className="micro">{text.notes}</p><MotionToggle pause={content.construction.pause} play={content.construction.play} /></div>
      <div className="invitation-layout">
        <Reveal className="invitation-copy"><Eyebrow>{text.eyebrow}</Eyebrow><h2 className="preserve-lines" id="story-invitation-title">{text.title}</h2><p>{text.description}</p><a className="button button-blue" href={href(locale, "story")}>{text.cta}<span aria-hidden="true">↗</span></a></Reveal>
        <div className="field-photos">{text.photos.map((photo, index) => <Reveal className={`field-photo field-photo-${index}`} key={photo.caption} index={index}>
          <figure>{photo.src
            ? <Image src={photo.src} alt={photo.alt} width={600} height={750} sizes="(max-width: 760px) 42vw, 230px" />
            : <div className="photo-sketch" role="img" aria-label={photo.prompt}><span className="sketch-symbol" aria-hidden="true">{["↗", "✳", "⌁"][index]}</span><p>{photo.prompt}</p><span className="micro">PHOTO / {String(index + 1).padStart(2, "0")}</span></div>}
            <figcaption>{photo.caption}</figcaption>
          </figure>
        </Reveal>)}</div>
      </div>
      {text.photos.some((photo) => !photo.src) && <p className="photo-editorial-note micro">{text.photoNote}</p>}
    </div>
  </section>;
}

function Experience({ content, locale, expanded = false }: { content: Content; locale: Locale; expanded?: boolean }) {
  return <section id="experience" className="section experience-section">
    <div className="container split-layout">
      <Reveal className="section-intro">
        <Eyebrow>{content.experience.eyebrow}</Eyebrow>
        <h2>{content.experience.title}</h2>
        <p>{content.experience.description}</p>
        {expanded && <a className="text-link intro-link" href={href(locale, "story")}>{content.nav.story}<span aria-hidden="true">→</span></a>}
      </Reveal>
      <div className="experience-list">{content.experience.items.map((item, index) => <Reveal className="experience-item" key={item.name} index={index}>
        <p className="micro experience-date">{item.date}</p>
        <div><h3>{item.name}</h3><p className="role">{item.role}</p><p>{item.description}</p></div>
      </Reveal>)}</div>
    </div>
  </section>;
}

function ProjectCard({ project, index, locale, text }: { project: Project; index: number; locale: Locale; text: Content["work"] }) {
  return <Reveal index={index} className="project-card">
    <div className="card-top"><span className="micro">{String(index + 1).padStart(2, "0")}</span><span className="badge">{project.badge}</span></div>
    <h3><a href={href(locale, `projects/${project.slug}`)}>{project.name}<span className="card-arrow" aria-hidden="true">↗</span></a></h3>
    <p className="card-summary">{project.summary}</p>
    <Metrics items={project.metrics} />
    <ul className="tags" aria-label={locale === "en" ? "Technologies & methods" : "Tecnologias e métodos"}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    <a className="card-case-link" href={href(locale, `projects/${project.slug}`)}>{text.case}<span aria-hidden="true"> →</span><span className="sr-only"> — {project.name}</span></a>
  </Reveal>;
}

function Work({ content, locale }: { content: Content; locale: Locale }) {
  return <section id="work" className="section work-section">
    <div className="container">
      <Reveal className="section-heading">
        <div><Eyebrow>{content.work.eyebrow}</Eyebrow><h2>{content.work.title}</h2></div>
        <a className="text-link" href={href(locale, "work")}>{content.work.all}<span aria-hidden="true">→</span></a>
      </Reveal>
      <div className="project-grid">{content.projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} locale={locale} text={content.work} />)}</div>
    </div>
  </section>;
}

function Olympiads({ content }: { content: Content }) {
  return <section id="olympiads" className="section olympiads-section">
    <div className="container">
      <Reveal><h2 className="eyebrow">{content.olympiads.eyebrow}</h2></Reveal>
      <div className="olympiads-grid">{content.olympiads.items.map((item, index) => <Reveal key={item.name} index={index} className="olympiad">
        <p className="micro">{item.date}</p><h3>{item.name}</h3><p>{item.description}</p>
      </Reveal>)}</div>
    </div>
  </section>;
}

function Recognition({ content }: { content: Content }) {
  return <section id="recognition" className="section recognition-section"><div className="container">
    <Reveal><Eyebrow>{content.recognition.eyebrow}</Eyebrow><h2>{content.recognition.title}</h2></Reveal>
    <div className="recognition-grid">{content.recognition.items.map((item, index) => <Reveal className="recognition-card" key={item.name} index={index}>
      <p className="eyebrow">{item.label}</p><h3>{item.name}</h3><p>{item.description}</p>
    </Reveal>)}</div>
  </div></section>;
}

function Contact({ content }: { content: Content }) {
  return <section id="contact" className="contact-section"><div className="container"><Reveal className="contact-card">
    <Eyebrow>{content.contact.eyebrow}</Eyebrow><h2 className="preserve-lines">{content.contact.title}</h2><p>{content.contact.description}</p>
    <div className="button-row">
      <a className="button button-white" href={`mailto:${content.contact.email}`}>{content.contact.email}<span aria-hidden="true">↗</span></a>
      <a className="button button-outline" href={`https://${content.contact.linkedin}`} target="_blank" rel="noopener noreferrer">{content.contact.linkedin}<span aria-hidden="true">↗</span></a>
    </div>
  </Reveal></div></section>;
}

function Footer({ content }: { content: Content }) {
  return <footer className="site-footer"><div className="container footer-inner"><BrandMark /><p>{content.footer.credit}</p><p>{content.footer.study}</p><a href="#top" aria-label={content.footer.top}>↑</a></div></footer>;
}

function PageHero({ eyebrow, title, description, steps, children }: { eyebrow: string; title: string; description: string; steps?: string[]; children?: ReactNode }) {
  return <section className="page-hero dark"><div className="container">
    <div className="page-construction-mark" aria-hidden="true"><BrandMark /></div>
    <Eyebrow>{eyebrow}</Eyebrow><h1 className="preserve-lines">{title}</h1><p className="page-description">{description}</p>
    {children}
    {steps && <ol className="steps">{steps.map((step, index) => <li key={step}><span className="micro">{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol>}
  </div></section>;
}

function WorkPage({ content, locale }: { content: Content; locale: Locale }) {
  return <>
    <PageHero eyebrow={content.work.pageEyebrow} title={content.work.pageTitle} description={content.work.pageDescription} steps={content.work.steps} />
    <Experience content={content} locale={locale} expanded />
    <section className="section project-index"><div className="container">
      <Reveal><Eyebrow>{content.work.eyebrow}</Eyebrow><h2>{content.work.listTitle}</h2></Reveal>
      {content.projects.map((project, index) => <Reveal className="project-index-item" key={project.slug} index={index}>
        <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        <div><p className="micro">{project.role}</p><h3><a href={href(locale, `projects/${project.slug}`)}>{project.name}</a></h3><p className="role">{project.period}</p></div>
        <div><p>{project.summary}</p><a className="text-link" href={href(locale, `projects/${project.slug}`)}>{content.work.case}<span aria-hidden="true">→</span></a></div>
      </Reveal>)}
    </div></section>
    <Contact content={content} />
  </>;
}

function StoryPage({ content }: { content: Content }) {
  const { story } = content;
  return <>
    <PageHero eyebrow={story.eyebrow} title={story.title} description={story.description} steps={story.steps} />
    <section className="section story-section"><div className="container">
      {story.portrait.src && <figure className="story-portrait"><Image src={story.portrait.src} alt={story.portrait.alt} width={1200} height={800} /><figcaption>{story.portrait.caption}</figcaption></figure>}
      <div className="story-timeline" data-story-line>
        {story.chapters.map((chapter, index) => <article className="chapter" key={chapter.date}>
          <div className="chapter-date"><span className="micro">{chapter.date}</span><span className="timeline-marker" aria-hidden="true" /></div>
          <Reveal index={0} className="chapter-body"><Eyebrow>{chapter.label}</Eyebrow><h2>{chapter.title}</h2><p>{chapter.text}</p>{chapter.note && <p className={`chapter-note${index === 0 ? " editorial-note" : ""}`}>{chapter.note}</p>}</Reveal>
        </article>)}
      </div>
    </div></section>
    <Contact content={content} />
  </>;
}

function ProjectMedia({ project, text }: { project: Project; text: Content["work"] }) {
  return <section className="project-media-section"><div className="container"><Reveal>
    <figure className={project.media.src ? "project-media" : "project-media media-pending"}>
      {project.media.src
        ? <Image src={project.media.src} alt={project.media.alt} width={1600} height={1000} sizes="(max-width: 760px) 90vw, 1200px" />
        : <div className="media-placeholder"><span className="viewfinder" aria-hidden="true">⌜⌝<br />⌞⌟</span><Eyebrow>{text.mediaLabel}</Eyebrow><h3>{text.mediaPending}</h3><p>{text.mediaNote}</p></div>}
      <figcaption>{project.media.caption}</figcaption>
    </figure>
  </Reveal></div></section>;
}

function ProjectPage({ project, content, locale }: { project: Project; content: Content; locale: Locale }) {
  const { work } = content;
  const index = content.projects.findIndex((p) => p.slug === project.slug);
  const next = content.projects[(index + 1) % content.projects.length];
  return <>
    <section className="page-hero project-hero dark"><div className="container">
      <div className="page-construction-mark" aria-hidden="true"><BrandMark /></div>
      <div className="case-top"><a href={href(locale, "work")} className="back-link">← {work.back}</a><span className="micro">CASE {String(index + 1).padStart(2, "0")} / 04</span></div>
      <h1>{project.name}</h1><p className="page-description">{project.subtitle}</p>
      <dl className="project-facts">{[{ label: work.role, value: project.role }, { label: work.period, value: project.period }, { label: work.status, value: project.status }].map((fact) => <div key={fact.label}><dt className="micro">{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
      <ol className="steps">{project.steps.map((step, i) => <li key={step}><span className="micro">{String(i + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
    </div></section>
    <section className="section problem-section"><div className="container split-layout"><Reveal><Eyebrow>{work.problem}</Eyebrow><h2 className="preserve-lines">{project.problemTitle}</h2></Reveal><Reveal><p className="lead-text">{project.problem}</p><p className="context-note">{project.caveat}</p></Reveal></div></section>
    <section className="section contribution-section"><div className="container">
      <Reveal><Eyebrow>{work.contribution}</Eyebrow><h2>{project.contributionTitle}</h2></Reveal>
      <div className="contribution-list">{project.contributions.map((item, i) => <Reveal className="contribution-item" key={item.title} index={i}><span className="micro blue">{String(i + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></Reveal>)}</div>
    </div></section>
    <ProjectMedia project={project} text={work} />
    <section className="section project-numbers dark"><div className="container"><Reveal><Eyebrow>{work.numbers}</Eyebrow><Metrics items={project.metrics} /><p className="numbers-note">{project.caveat}</p></Reveal></div></section>
    <section className="section stack-section"><div className="container split-layout"><Reveal><Eyebrow>{work.stack}</Eyebrow><h2>{work.stackTitle}</h2></Reveal><div>{project.stack.map((item, i) => <Reveal className="stack-item" key={item.title} index={i}><h3>{item.title}</h3><p>{item.text}</p></Reveal>)}</div></div></section>
    <section className="section evolution-section"><div className="container"><Reveal><Eyebrow>{work.evolution}</Eyebrow><h2>{work.evolutionTitle}</h2></Reveal>
      <div className="evolution-list">{project.timeline.map((item, i) => <Reveal className="evolution-item" key={item.title} index={i}><p className="micro blue">{item.date}</p><h3>{item.title}</h3><p>{item.text}</p></Reveal>)}</div>
    </div></section>
    <section className="next-project dark"><div className="container"><Eyebrow>{work.next}</Eyebrow><a href={href(locale, `projects/${next.slug}`)}><span>{next.name}</span><span aria-hidden="true">↗</span></a><p>{next.subtitle}</p></div></section>
  </>;
}

function ResumePage({ content, locale }: { content: Content; locale: Locale }) {
  return <div className="resume-page">
    <PageHero eyebrow={content.resume.eyebrow} title={content.resume.title} description={content.resume.description}>
      <div className="button-row"><PrintButton label={content.resume.print} /><a className="text-link" href={`mailto:${content.contact.email}`}>{content.contact.email}</a></div>
      <p className="resume-note">{content.resume.note}</p>
    </PageHero>
    <Experience content={content} locale={locale} />
    <Olympiads content={content} /><Recognition content={content} />
    <section className="section"><div className="container"><h2>{content.resume.skillsTitle}</h2><p className="skills-text">{content.resume.skills}</p><a className="text-link" href={`https://${content.contact.linkedin}`}>{content.contact.linkedin} ↗</a></div></section>
  </div>;
}

export function Site({ locale, route }: { locale: Locale; route: Route }) {
  const content = getContent(locale);
  return <>
    <Header locale={locale} path={routePath(route)} text={content.nav} />
    <div className="reading-course" aria-hidden="true" />
    <main id="main" tabIndex={-1}>
      {route.page === "home" && <><Opening text={content.construction.intro} /><Hero text={content.hero} construction={content.construction} locale={locale} /><section className="stats-strip"><div className="container"><Metrics items={content.stats} /></div></section><StoryInvitation content={content} locale={locale} /><Experience content={content} locale={locale} /><Work content={content} locale={locale} /><Olympiads content={content} /><Recognition content={content} /><Contact content={content} /></>}
      {route.page === "work" && <WorkPage content={content} locale={locale} />}
      {route.page === "story" && <StoryPage content={content} />}
      {route.page === "resume" && <ResumePage content={content} locale={locale} />}
      {route.page === "project" && <ProjectPage project={content.projects.find((p) => p.slug === route.slug)!} content={content} locale={locale} />}
    </main>
    <Footer content={content} />
    <Motion key={`${locale}:${routePath(route)}`} />
  </>;
}
