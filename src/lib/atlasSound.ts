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
