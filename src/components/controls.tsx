"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { Content, Locale } from "../lib/content";
import { href } from "../lib/content";
import { BrandMark } from "./brand-mark";
import { ConstructionSound } from "./construction-sound";

export function Header({ locale, path, text, sound }: { locale: Locale; path: string; text: Content["nav"]; sound: Content["construction"]["sound"] }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const home = href(locale);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !navigation.current?.contains(event.target) && !toggle.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);

  const links = [
    { label: text.work, url: href(locale, "work"), active: path === "work" || path.startsWith("projects/") },
    { label: text.story, url: href(locale, "story"), active: path === "story" },
    { label: text.experience, url: `${home}#experience`, active: false },
    { label: text.olympiads, url: `${home}#olympiads`, active: false },
    { label: text.recognition, url: `${home}#recognition`, active: false },
  ];

  return (
    <header className="site-header" id="top">
      <noscript><style>{"@media(max-width:1150px){.header-inner{flex-wrap:wrap;padding-top:20px}.menu-toggle{display:none}.navigation{display:block;position:static;padding:15px 0 25px;border:0;box-shadow:none;flex-basis:100%}}"}</style></noscript>
      <a className="skip-link" href="#main">{text.skip}</a>
      <div className="container header-inner">
        <a className="brand" href={home} aria-label={locale === "en" ? "Fausto Santos — Home" : "Fausto Santos — Início"}>
          <BrandMark /><span>Fausto Santos<span className="brand-subtitle">{text.subtitle} ↗</span></span>
        </a>
        <ConstructionSound text={sound} />
        <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? text.close : text.open} onClick={() => setOpen(!open)}>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav ref={navigation} id="primary-navigation" className={`navigation${open ? " is-open" : ""}`} aria-label={locale === "en" ? "Main navigation" : "Navegação principal"} onClick={() => setOpen(false)}>
          <div className="nav-links">
            {links.map((link) => <a key={link.label} href={link.url} aria-current={link.active ? "page" : undefined}>{link.label}</a>)}
          </div>
          <div className="nav-actions">
            <div className="language-switch" role="group" aria-label={text.language}>
              {(["en", "pt"] as const).map((language) => <a key={language} href={href(language, path)} lang={language === "pt" ? "pt-BR" : "en"} hrefLang={language === "pt" ? "pt-BR" : "en"} aria-current={language === locale ? "true" : undefined} aria-label={language === "en" ? "English" : "Português"}>{language.toUpperCase()}</a>)}
            </div>
            <a className="button button-small button-white" href={href(locale, "resume")} aria-current={path === "resume" ? "page" : undefined}>{text.resume}</a>
            <a className="button button-small button-blue" href={`${home}#contact`}>{text.contact}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function PrintButton({ label }: { label: string }) {
  return <button className="button button-blue print-button" type="button" onClick={() => window.print()}>{label}<span aria-hidden="true">↗</span></button>;
}

export function ExperienceRail({ children, text }: { children: ReactNode; text: Pick<Content["experience"], "browse" | "previous" | "next"> }) {
  const track = useRef<HTMLDivElement>(null);
  const id = useId();
  const [ready, setReady] = useState(false);
  const [position, setPosition] = useState({ start: true, end: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => setPosition({
      start: element.scrollLeft < 2,
      end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
    });
    update();
    setReady(true);
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  const move = (direction: number) => {
    const element = track.current;
    if (!element) return;
    const distance = element.firstElementChild?.getBoundingClientRect().width ?? element.clientWidth;
    element.scrollBy({ left: direction * (distance + 24), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return <div className="experience-carousel">
    <div className="rail-toolbar"><p id={`${id}-label`}>{text.browse}</p><div hidden={!ready} className="rail-controls">
      <button type="button" aria-label={text.previous} aria-controls={id} disabled={position.start} onClick={() => move(-1)}>←</button>
      <button type="button" aria-label={text.next} aria-controls={id} disabled={position.end} onClick={() => move(1)}>→</button>
    </div></div>
    <div ref={track} id={id} className="experience-track" role="region" aria-labelledby={`${id}-label`} tabIndex={0}>{children}</div>
  </div>;
}

export function Motion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.removeAttribute("data-pending");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight * 0.9) element.setAttribute("data-pending", "");
      observer.observe(element);
    });

    const line = document.querySelector<HTMLElement>("[data-story-line]");
    let frame = 0;
    const updateLine = () => {
      frame = 0;
      const length = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--reading-progress", String(length > 0 ? Math.min(1, Math.max(0, window.scrollY / length)) : 0));
      if (!line) return;
      const bounds = line.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.65 - bounds.top) / bounds.height));
      line.style.setProperty("--progress", `${progress}`);
      line.querySelectorAll<HTMLElement>(".chapter").forEach((chapter) => {
        chapter.toggleAttribute("data-reached", chapter.getBoundingClientRect().top <= window.innerHeight * 0.65);
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateLine); };
    const disable = () => {
      if (preference.matches) {
        root.removeAttribute("data-motion");
        root.style.removeProperty("--reading-progress");
        elements.forEach((element) => element.removeAttribute("data-pending"));
      }
    };
    updateLine();
    root.setAttribute("data-motion", "");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    preference.addEventListener("change", disable);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      preference.removeEventListener("change", disable);
      root.removeAttribute("data-motion");
      root.style.removeProperty("--reading-progress");
      elements.forEach((element) => element.removeAttribute("data-pending"));
    };
  }, []);
  return null;
}
