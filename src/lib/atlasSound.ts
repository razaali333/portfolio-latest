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

function noiseBurst(audio: AudioContext, when: number, duration: number, gain: number, hipass: number, lopass: number) {
  const buffer = audio.createBuffer(1, Math.max(1, Math.floor(audio.sampleRate * duration)), audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  const src = audio.createBufferSource();
  const high = audio.createBiquadFilter();
  const low = audio.createBiquadFilter();
  const amp = audio.createGain();
  src.buffer = buffer;
  high.type = "highpass";
  high.frequency.setValueAtTime(hipass, when);
  low.type = "lowpass";
  low.frequency.setValueAtTime(lopass, when);
  amp.gain.setValueAtTime(0.0001, when);
  amp.gain.exponentialRampToValueAtTime(gain, when + 0.008);
  amp.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  src.connect(high);
  high.connect(low);
  low.connect(amp);
  amp.connect(audio.destination);
  src.start(when);
  src.stop(when + duration + 0.02);
}

export function playHop() {
  const audio = ctx();
  if (!audio || !enabled) return;
  if (audio.state === "suspended") void audio.resume();
  const now = audio.currentTime;
  ping(196, now, 0.07, 0.012);
  noiseBurst(audio, now, 0.07, 0.016, 280, 1400);
}

export function playLand() {
  const audio = ctx();
  if (!audio || !enabled) return;
  if (audio.state === "suspended") void audio.resume();
  const now = audio.currentTime;
  ping(110, now, 0.1, 0.016);
  noiseBurst(audio, now, 0.09, 0.02, 90, 520);
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

let chalkDust: AudioBuffer | null = null;
let chalkWrite: {
  scrape: AudioBufferSourceNode;
  body: AudioBufferSourceNode;
  gain: GainNode;
} | null = null;

function chalkBuffer(audio: AudioContext) {
  const seconds = 2.8;
  const length = Math.max(1, Math.floor(audio.sampleRate * seconds));
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;
  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    b6 = white * 0.115926;
    let sample = pink * 0.11;
    if (Math.random() < 0.006) sample += (Math.random() * 2 - 1) * 0.22;
    const fade = Math.min(1, i / 2400, (length - i) / 2400);
    data[i] = Math.max(-1, Math.min(1, sample * fade));
  }
  return buffer;
}

function chalkChain(audio: AudioContext, source: AudioBufferSourceNode, hipass: number, band: number, q: number) {
  const high = audio.createBiquadFilter();
  const mid = audio.createBiquadFilter();
  const low = audio.createBiquadFilter();
  high.type = "highpass";
  high.frequency.value = hipass;
  high.Q.value = 0.7;
  mid.type = "bandpass";
  mid.frequency.value = band;
  mid.Q.value = q;
  low.type = "lowpass";
  low.frequency.value = 4200;
  source.connect(high);
  high.connect(mid);
  mid.connect(low);
  return low;
}

export function startChalkWrite() {
  const audio = ctx();
  if (!audio || !enabled) return;
  if (audio.state === "suspended") void audio.resume();
  if (chalkWrite) return;
  if (!chalkDust) chalkDust = chalkBuffer(audio);

  const scrape = audio.createBufferSource();
  const body = audio.createBufferSource();
  scrape.buffer = chalkDust;
  body.buffer = chalkDust;
  scrape.loop = true;
  body.loop = true;
  scrape.playbackRate.value = 0.92;
  body.playbackRate.value = 0.58;

  const gain = audio.createGain();
  const now = audio.currentTime;
  gain.gain.setValueAtTime(0.0001, now);

  chalkChain(audio, scrape, 900, 2400, 0.85).connect(gain);
  chalkChain(audio, body, 420, 1400, 0.55).connect(gain);
  gain.connect(audio.destination);
  scrape.start();
  body.start();
  chalkWrite = { scrape, body, gain };
}

export function updateChalkWrite(intensity: number) {
  if (!chalkWrite) return;
  const audio = context;
  if (!audio) return;
  const level = Math.max(0.0001, Math.min(0.055, intensity * 0.046));
  chalkWrite.gain.gain.setTargetAtTime(level, audio.currentTime, 0.045);
}

export function playChalkTick() {
  const audio = ctx();
  if (!audio || !enabled) return;
  if (audio.state === "suspended") void audio.resume();
  noiseBurst(audio, audio.currentTime, 0.045, 0.028, 1200, 3600);
}

export function stopChalkWrite(immediate = false) {
  if (!chalkWrite) return;
  const audio = context;
  const nodes = chalkWrite;
  chalkWrite = null;
  const halt = () => {
    try {
      nodes.scrape.stop();
      nodes.body.stop();
    } catch {
      /* already stopped */
    }
    nodes.scrape.disconnect();
    nodes.body.disconnect();
    nodes.gain.disconnect();
  };
  if (!audio || immediate) {
    halt();
    return;
  }
  const now = audio.currentTime;
  nodes.gain.gain.cancelScheduledValues(now);
  nodes.gain.gain.setValueAtTime(Math.max(0.0001, nodes.gain.gain.value), now);
  nodes.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  window.setTimeout(halt, 200);
}
