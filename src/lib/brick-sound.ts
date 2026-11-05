export const BRICK_SOUND_SECONDS = 0.14;
export const BRICK_SOUND_COOLDOWN_MS = 700;

export function brickSoundSamples(sampleRate: number): Float32Array {
  if (!Number.isFinite(sampleRate) || sampleRate < 8000 || sampleRate > 192000) {
    throw new RangeError("Brick sound requires a sample rate between 8,000 and 192,000 Hz.");
  }
  const samples = new Float32Array(Math.ceil(sampleRate * BRICK_SOUND_SECONDS));
  let seed = 37;
  let texture = 0;
  for (let i = 0; i < samples.length; i++) {
    const time = i / sampleRate;
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    texture += 0.18 * ((seed / 0xffffffff) * 2 - 1 - texture);
    const envelope = Math.min(1, time / 0.003) * Math.exp(-time * 48) * (1 - i / (samples.length - 1));
    samples[i] = envelope * (0.65 * texture + 0.35 * Math.sin(2 * Math.PI * 185 * time)) * 0.12;
  }
  return samples;
}
