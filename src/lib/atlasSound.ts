const STORAGE_KEY = "atlas-sound";
const NOTES = [392, 440, 494, 330, 523, 587];

let context: AudioContext | null = null;
let enabled = true;

function loadPref() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "off") enabled = false;
    if (stored === "on") enabled = true;
  } catch {
    /* ignore */
  }
}

if (typeof window !== "undefined") loadPref();

function ctx() {
  if (typeof window === "undefined") return null;
  if (!context) {
    const AudioCtx =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return null;
    context = new AudioCtx();
  }
  return context;
}

export function isAtlasSoundOn() {
  return enabled;
}

export function setAtlasSound(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    /* ignore */
  }
  if (on) unlockAtlasSound();
}

export function unlockAtlasSound() {
  const audio = ctx();
  if (!audio) return;
  if (audio.state === "suspended") {
    void audio.resume();
  }
}

function ping(frequency: number, when: number, duration: number, gain: number) {
  const audio = ctx();
  if (!audio || !enabled) return;
  const osc = audio.createOscillator();
  const filter = audio.createBiquadFilter();
  const amp = audio.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(frequency, when);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1600, when);
  filter.frequency.exponentialRampToValueAtTime(420, when + duration);
  amp.gain.setValueAtTime(0.0001, when);
  amp.gain.exponentialRampToValueAtTime(gain, when + 0.018);
  amp.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  osc.connect(filter);
  filter.connect(amp);
  amp.connect(audio.destination);
  osc.start(when);
  osc.stop(when + duration + 0.04);
}

export function playDiscovery(worldIndex: number) {
  const audio = ctx();
  if (!audio || !enabled) return;
  if (audio.state === "suspended") void audio.resume();
  const now = audio.currentTime;
  const root = NOTES[Math.max(0, worldIndex) % NOTES.length];
  ping(root, now, 0.32, 0.055);
  ping(root * 1.5, now + 0.07, 0.26, 0.032);
  ping(root * 2, now + 0.14, 0.18, 0.016);
}

export function playLand() {
  const audio = ctx();
  if (!audio || !enabled) return;
  if (audio.state === "suspended") void audio.resume();
  ping(196, audio.currentTime, 0.12, 0.02);
}

export function playPickup() {
  const audio = ctx();
  if (!audio || !enabled) return;
  if (audio.state === "suspended") void audio.resume();
  const now = audio.currentTime;
  ping(523, now, 0.12, 0.03);
  ping(784, now + 0.05, 0.16, 0.022);
}

export function playComplete() {
  const audio = ctx();
  if (!audio || !enabled) return;
  if (audio.state === "suspended") void audio.resume();
  const now = audio.currentTime;
  NOTES.forEach((note, i) => {
    ping(note, now + i * 0.08, 0.3, 0.028);
  });
  ping(NOTES[0] * 2, now + 0.56, 0.42, 0.038);
}

export function playDrop() {
  const audio = ctx();
  if (!audio || !enabled) return;
  if (audio.state === "suspended") void audio.resume();
  const now = audio.currentTime;
  ping(392, now, 0.22, 0.03);
  ping(294, now + 0.12, 0.28, 0.034);
  ping(220, now + 0.28, 0.38, 0.04);
  ping(164, now + 0.5, 0.22, 0.018);
}

let chalkNoise: AudioBuffer | null = null;
let chalkWrite: {
  scrape: AudioBufferSourceNode;
  grit: AudioBufferSourceNode;
  gain: GainNode;
  lfo: OscillatorNode;
} | null = null;

function noiseBuffer(audio: AudioContext, seconds: number, roughness: number) {
  const length = Math.max(1, Math.floor(audio.sampleRate * seconds));
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const data = buffer.getChannelData(0);
  let brown = 0;
  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1;
    brown = Math.max(-1, Math.min(1, brown * 0.97 + white * 0.08));
    data[i] = white * (1 - roughness) + brown * roughness;
  }
  return buffer;
}

export function startChalkWrite() {
  const audio = ctx();
  if (!audio || !enabled) return;
  if (audio.state === "suspended") void audio.resume();
  stopChalkWrite(true);
  if (!chalkNoise) chalkNoise = noiseBuffer(audio, 1.4, 0.55);
  const scrape = audio.createBufferSource();
  const grit = audio.createBufferSource();
  scrape.buffer = chalkNoise;
  grit.buffer = chalkNoise;
  scrape.loop = true;
  grit.loop = true;
  scrape.playbackRate.value = 1.15;
  grit.playbackRate.value = 0.72;

  const high = audio.createBiquadFilter();
  high.type = "highpass";
  high.frequency.value = 1100;
  const band = audio.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 2600;
  band.Q.value = 0.85;
  const low = audio.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.value = 1800;

  const gain = audio.createGain();
  const now = audio.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.042, now + 0.06);

  const lfo = audio.createOscillator();
  const lfoGain = audio.createGain();
  lfo.type = "square";
  lfo.frequency.value = 11;
  lfoGain.gain.value = 0.014;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);

  scrape.connect(high);
  high.connect(band);
  band.connect(gain);
  grit.connect(low);
  low.connect(gain);
  gain.connect(audio.destination);
  scrape.start();
  grit.start();
  lfo.start();
  chalkWrite = { scrape, grit, gain, lfo };
}

export function stopChalkWrite(immediate = false) {
  if (!chalkWrite) return;
  const audio = context;
  const nodes = chalkWrite;
  chalkWrite = null;
  const halt = () => {
    try {
      nodes.scrape.stop();
      nodes.grit.stop();
      nodes.lfo.stop();
    } catch {
      /* already stopped */
    }
    nodes.scrape.disconnect();
    nodes.grit.disconnect();
    nodes.lfo.disconnect();
    nodes.gain.disconnect();
  };
  if (!audio || immediate) {
    halt();
    return;
  }
  const now = audio.currentTime;
  nodes.gain.gain.cancelScheduledValues(now);
  nodes.gain.gain.setValueAtTime(Math.max(0.0001, nodes.gain.gain.value), now);
  nodes.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  window.setTimeout(halt, 220);
}
