import assert from "node:assert/strict";
import test from "node:test";
import { BRICK_SOUND_COOLDOWN_MS, BRICK_SOUND_SECONDS, brickSoundSamples } from "../src/lib/brick-sound";

test("brick accent is short, quiet, deterministic and fades to silence", () => {
  assert.equal(BRICK_SOUND_SECONDS, 0.14);
  assert.ok(BRICK_SOUND_COOLDOWN_MS >= 700);
  for (const sampleRate of [8000, 44100, 48000, 96000, 192000]) {
    const samples = brickSoundSamples(sampleRate);
    assert.equal(samples.length, Math.ceil(sampleRate * 0.14));
    assert.equal(Math.abs(samples[0]), 0);
    assert.equal(Math.abs(samples[samples.length - 1]), 0);
    assert.deepEqual(samples, brickSoundSamples(sampleRate));
    let peak = 0, energy = 0;
    for (const sample of samples) {
      assert.ok(Number.isFinite(sample));
      peak = Math.max(peak, Math.abs(sample));
      energy += sample * sample;
    }
    assert.ok(peak > 0.01 && peak < 0.08, `peak ${peak}`);
    assert.ok(Math.sqrt(energy / samples.length) < 0.015, "low signal RMS; perceived volume also depends on device settings");
    assert.ok(samples.slice(-Math.floor(sampleRate * 0.01)).every(sample => Math.abs(sample) < 0.001));
  }
});

test("unsupported sample rates fail explicitly", () => {
  for (const rate of [0, -1, 7999, 192001, Infinity, NaN]) assert.throws(() => brickSoundSamples(rate), RangeError);
});
