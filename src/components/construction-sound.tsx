"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "../lib/content";
import { BRICK_SOUND_COOLDOWN_MS, brickSoundSamples } from "../lib/brick-sound";

export function ConstructionSound({ text }: { text: Content["construction"]["sound"] }) {
  const audio = useRef<AudioContext | null>(null);
  const buffer = useRef<AudioBuffer | null>(null);
  const enabled = useRef(false);
  const starting = useRef(false);
  const lastPlayed = useRef(-Infinity);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const play = useRef<() => void>(() => {});

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    const close = () => {
      enabled.current = false;
      const context = audio.current;
      audio.current = null;
      buffer.current = null;
      if (context && context.state !== "closed") {
        void context.close().catch(error => console.error("Could not close construction audio.", error));
      }
    };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest(".build-brick, .card-case-link, .rail-controls button:not(:disabled), .next-project a")) play.current();
    };
    const onVisibility = () => {
      if (document.hidden) {
        close();
        setActive(false);
      }
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting && enabled.current && !document.hidden) {
          play.current();
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.6 });
    document.querySelectorAll(".divider-wall").forEach(element => observer.observe(element));
    document.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
      close();
    };
  }, []);

  const fail = (error: unknown) => {
    console.error("Construction sound could not be enabled.", error);
    enabled.current = false;
    setActive(false);
    setFailed(true);
    const context = audio.current;
    audio.current = null;
    buffer.current = null;
    if (context && context.state !== "closed") {
      void context.close().catch(closeError => console.error("Could not close construction audio.", closeError));
    }
  };

  const playImpact = () => {
    const context = audio.current;
    const sound = buffer.current;
    const now = performance.now();
    if (!enabled.current || document.hidden || !context || !sound || context.state !== "running" || now - lastPlayed.current < BRICK_SOUND_COOLDOWN_MS) return;
    const source = context.createBufferSource();
    source.buffer = sound;
    source.connect(context.destination);
    source.onended = () => source.disconnect();
    source.start();
    lastPlayed.current = now;
  };

  const toggle = async () => {
    if (starting.current) return;
    starting.current = true;
    try {
      if (enabled.current) {
        enabled.current = false;
        setActive(false);
        const context = audio.current;
        audio.current = null;
        buffer.current = null;
        if (context && context.state !== "closed") await context.close();
        return;
      }
      if (!("AudioContext" in window)) throw new Error("Web Audio is unsupported.");
      const context = new AudioContext();
      audio.current = context;
      const samples = brickSoundSamples(context.sampleRate);
      const sound = context.createBuffer(1, samples.length, context.sampleRate);
      sound.getChannelData(0).set(samples);
      buffer.current = sound;
      await context.resume();
      if (audio.current !== context || context.state !== "running") return;
      enabled.current = true;
      setActive(true);
      setFailed(false);
      play.current = playImpact;
      playImpact();
    } catch (error) { fail(error); }
    finally { starting.current = false; }
  };

  return <div className="sound-control" hidden={!ready}>
    <button type="button" className="sound-toggle" aria-pressed={active} title={`${active ? text.disable : text.enable}. ${text.description}`} onClick={() => void toggle()}><span aria-hidden="true">{active ? "♪" : "♩"}</span><span className="sr-only">{active ? text.disable : text.enable}</span></button>
    <span role="status">{failed ? text.error : ""}</span>
  </div>;
}
