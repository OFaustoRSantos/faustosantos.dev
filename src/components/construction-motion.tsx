"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Content } from "../lib/content";
import { BrandMark } from "./brand-mark";
import { MaterialCarrier } from "./material-carrier";

export function Opening({ text }: { text: Content["construction"]["intro"] }) {
  const panel = useRef<HTMLDivElement>(null);
  const dismissOpening = useRef<() => void>(() => {});

  useEffect(() => {
    const element = panel.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || window.location.hash) return;

    try {
      if (sessionStorage.getItem("fausto:opening-seen") === "1") return;
    } catch (error) {
      console.warn("Opening animation cannot remember this visit; session storage is unavailable.", error);
    }

    const root = document.documentElement;
    let completed = false;
    element.hidden = false;
    root.setAttribute("data-opening", "");
    const dismiss = () => {
      if (completed) return;
      completed = true;
      element.hidden = true;
      root.removeAttribute("data-opening");
      try {
        sessionStorage.setItem("fausto:opening-seen", "1");
      } catch (error) {
        console.warn("Opening animation cannot remember its completion; session storage is unavailable.", error);
      }
    };
    const onKey = () => dismiss();
    dismissOpening.current = dismiss;
    const timer = window.setTimeout(dismiss, 2600);
    const onPreference = () => { if (preference.matches) dismiss(); };
    document.addEventListener("keydown", onKey, { once: true });
    document.addEventListener("pointerdown", dismiss, { once: true });
    preference.addEventListener("change", onPreference);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", dismiss);
      preference.removeEventListener("change", onPreference);
      element.hidden = true;
      root.removeAttribute("data-opening");
      dismissOpening.current = () => {};
    };
  }, []);

  return (
    <div ref={panel} className="opening" hidden>
      <div className="opening-sheet" aria-hidden="true">
        <div className="opening-top"><BrandMark /><span className="micro">FAUSTO SANTOS / 001</span></div>
        <p className="eyebrow">{text.label}</p>
        <MaterialCarrier />
        <div className="opening-courses">
          {text.stages.map((stage, index) => <div className="opening-brick" key={stage.name} style={{ "--course": index } as CSSProperties}>
            <span className="micro">0{index + 1}</span><strong>{stage.name}</strong><span>{stage.detail}</span><span className="opening-check">↗</span>
          </div>)}
        </div>
        <div className="opening-bottom"><span>{text.complete}</span><span>{text.stages.map((stage) => stage.name).join(" / ")}</span></div>
        <span className="opening-rule" />
      </div>
      <button className="opening-skip" type="button" onClick={() => dismissOpening.current()}>{text.skip}<span aria-hidden="true"> ↗</span></button>
    </div>
  );
}

export function MotionToggle({ pause, play }: { pause: string; play: string }) {
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return <button hidden={!ready} type="button" className="motion-toggle" aria-pressed={paused} onClick={() => {
    const next = !paused;
    document.documentElement.toggleAttribute("data-motion-paused", next);
    setPaused(next);
  }}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{paused ? play : pause}</button>;
}
