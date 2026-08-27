"use client";

import { useEffect, useRef, useState } from "react";
import WorldCursor from "@/components/WorldCursor";
import {
  careerSkills,
  careerYears,
  site,
  walkWorlds,
  WORLD_LENGTH,
} from "@/lib/content";
import {
  playComplete,
  playDiscovery,
  playDrop,
  playLand,
  startChalkWrite,
  stopChalkWrite,
  unlockAtlasSound,
} from "@/lib/atlasSound";
import { downloadCareerConstellation } from "@/lib/constellation";

const WALK = [
  "/assets/character/character_walk_01.svg",
  "/assets/character/character_walk_02.svg",
  "/assets/character/character_walk_03.svg",
  "/assets/character/character_walk_04.svg",
  "/assets/character/character_walk_05.svg",
  "/assets/character/character_walk_06.svg",
];
const IDLE = WALK[0];
const SIT = "/assets/character/character_sit.svg";
const SIT_CHILL = "/assets/character/character_sit_chill.svg";
const END_X = WORLD_LENGTH - 280;
const LOOK_MS = 2400;
const DROP_MS = 1560;
const INK: readonly number[] = [68, 68, 66];
const CHALK: readonly number[] = [232, 222, 188];
const BOARD: [number, number, number] = [24, 32, 28];
const THANKS_SCENE = {
  key: "thanks",
  name: "Thanks",
  verb: "rest",
  label: "walk complete",
  role: "Visitor",
  description: "Thank you for walking this far.",
  rgb: CHALK,
  start: walkWorlds[walkWorlds.length - 1].end,
  end: WORLD_LENGTH,
  href: "/contact",
} as const;

type World = (typeof walkWorlds)[number];
type Scene = World | typeof THANKS_SCENE;

type Dot = {
  homeX: number;
  homeY: number;
  ox: number;
  oy: number;
  size: number;
  rgb: readonly number[];
  parallax: number;
  shape: "dot" | "dash" | "square";
  phase: number;
};

function rand(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function worldAt(x: number): Scene | undefined {
  if (x >= THANKS_SCENE.start) return THANKS_SCENE;
  return walkWorlds.find((w) => x >= w.start && x < w.end);
}

function isThanks(scene: Scene | null | undefined): scene is typeof THANKS_SCENE {
  return scene?.key === "thanks";
}

function isDarkScene(scene: Scene | null | undefined) {
  return scene?.key === "ojicra" || scene?.key === "thanks";
}

function terrain(x: number) {
  return Math.sin(x * 0.0017) * 18 + Math.sin(x * 0.0048 + 1.3) * 8;
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

function paperOf(world: Scene | null | undefined): [number, number, number] {
  if (world?.key === "thanks") return BOARD;
  if (world?.key === "ojicra") return [16, 17, 20];
  if (world) return mix([253, 253, 252], world.rgb, 0.08);
  return [253, 253, 252];
}

function mix(
  a: readonly number[],
  b: readonly number[],
  t: number,
): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function addDot(
  dots: Dot[],
  homeX: number,
  homeY: number,
  rgb: readonly number[],
  size: number,
  parallax: number,
  shape: Dot["shape"] = "dot",
  phase = 0,
) {
  dots.push({
    homeX,
    homeY,
    ox: 0,
    oy: 0,
    size,
    rgb,
    parallax,
    shape,
    phase,
  });
}

function addCluster(
  dots: Dot[],
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  count: number,
  rgb: readonly number[],
  seed: number,
  parallax: number,
  shape: Dot["shape"] = "dot",
) {
  for (let i = 0; i < count; i += 1) {
    const a = rand(seed + i) * Math.PI * 2;
    const r = Math.sqrt(rand(seed + i + 19));
    addDot(
      dots,
      cx + Math.cos(a) * rx * r,
      cy + Math.sin(a) * ry * r,
      mix(rgb, INK, rand(seed + i + 3) * 0.28),
      1.05 + rand(seed + i + 7) * 2.1,
      parallax,
      shape,
      rand(seed + i + 11) * Math.PI * 2,
    );
  }
}

function buildWorld(): Dot[] {
  const dots: Dot[] = [];

  for (let x = 40; x < WORLD_LENGTH; x += 7) {
    const world = worldAt(x);
    const rgb = world ? mix(world.rgb, INK, 0.35) : INK;
    addDot(
      dots,
      x + rand(x) * 6,
      terrain(x) + rand(x + 4) * 3,
      rgb,
      1.15 + rand(x + 8) * 1.5,
      1,
    );
    if (rand(x + 21) > 0.72) {
      addDot(
        dots,
        x + rand(x + 30) * 18,
        terrain(x) - 8 - rand(x + 33) * 26,
        rgb,
        0.8 + rand(x + 41) * 1.1,
        0.55 + rand(x + 44) * 0.25,
      );
    }
  }

  const moss = walkWorlds[0];
  [
    [1880, 70, 210, 80],
    [2140, 92, 260, 110],
    [2460, 110, 310, 130],
    [2780, 86, 240, 96],
    [3020, 124, 340, 150],
  ].forEach(([cx, rx, h, count], i) => {
    addCluster(dots, cx, -h * 0.42, rx, h * 0.55, count, moss.rgb, 800 + i * 17, 0.78);
    addCluster(dots, cx, 4, 10, 18, 18, mix(moss.rgb, INK, 0.45), 900 + i, 1);
  });
  for (let x = 1960; x < 3100; x += 14) {
    addDot(dots, x, 10 + Math.sin(x * 0.04) * 6, [84, 164, 180], 1.4, 1);
  }

  const taupe = walkWorlds[1];
  for (let i = 0; i < 90; i += 1) {
    const x = taupe.start + 80 + (i % 18) * 72;
    const y = -40 - Math.floor(i / 18) * 36;
    addDot(dots, x, y, taupe.rgb, 1.2, 0.86, "dash", i);
  }
  addCluster(dots, 4100, -120, 160, 70, 90, taupe.rgb, 1200, 0.7);

  const islog = walkWorlds[2];
  addCluster(dots, 5480, -90, 210, 90, 140, islog.rgb, 1400, 0.74);
  addCluster(dots, 5980, -70, 150, 70, 90, mix(islog.rgb, [200, 140, 90], 0.3), 1500, 0.8);

  const ojicra = walkWorlds[3];
  for (let i = 0; i < 64; i += 1) {
    const col = i % 8;
    const row = Math.floor(i / 8);
    addDot(
      dots,
      ojicra.start + 220 + col * 28 + (row % 2) * 8,
      -18 - row * 22,
      mix(ojicra.rgb, [180, 180, 190], (row % 3) * 0.12),
      3.2,
      0.92,
      "square",
    );
  }
  addCluster(dots, 7420, -110, 180, 90, 80, ojicra.rgb, 1700, 0.64);

  const monoomoi = walkWorlds[4];
  addCluster(dots, 8780, -100, 90, 90, 110, monoomoi.rgb, 1900, 0.76);
  addCluster(dots, 9020, -40, 70, 50, 50, mix(monoomoi.rgb, [220, 180, 160], 0.4), 2000, 0.9);

  const monoerabi = walkWorlds[5];
  for (let i = 0; i < 48; i += 1) {
    addDot(
      dots,
      monoerabi.start + 140 + (i % 8) * 34,
      -24 - Math.floor(i / 8) * 28,
      mix(monoerabi.rgb, INK, 0.2),
      1.6,
      0.88,
      "square",
    );
  }
  addCluster(dots, 10180, -80, 140, 70, 70, monoerabi.rgb, 2200, 0.72);

  for (let i = 0; i < 90; i += 1) {
    addDot(
      dots,
      THANKS_SCENE.start + 60 + rand(i + 9) * 980,
      -30 - rand(i + 21) * 220,
      mix(CHALK, [255, 255, 255], rand(i + 4) * 0.35),
      0.7 + rand(i + 13) * 1.4,
      0.55 + rand(i + 17) * 0.35,
      i % 5 === 0 ? "dash" : "dot",
      rand(i + 29) * Math.PI * 2,
    );
  }

  return dots;
}

function chalkFont(size: number, weight = 500) {
  return `${weight} ${size}px "Segoe Script", "Bradley Hand", "Apple Chancery", Palatino, Georgia, cursive`;
}

function drawChalkGlyph(
  ctx: CanvasRenderingContext2D,
  glyph: string,
  x: number,
  y: number,
  seed: number,
  size: number,
) {
  for (let pass = 0; pass < 8; pass += 1) {
    ctx.globalAlpha = 0.14 + rand(seed + pass) * 0.2;
    ctx.fillStyle = `rgb(${CHALK[0]},${CHALK[1]},${CHALK[2]})`;
    ctx.fillText(
      glyph,
      x + (rand(seed + pass + 11) - 0.5) * 1.9,
      y + (rand(seed + pass + 19) - 0.5) * 1.5,
    );
  }
  const glyphWidth = ctx.measureText(glyph).width;
  for (let speck = 0; speck < 16; speck += 1) {
    ctx.globalAlpha = 0.1 + rand(seed + speck + 40) * 0.28;
    ctx.fillRect(
      x + rand(seed + speck) * glyphWidth,
      y - 6 - rand(seed + speck + 8) * size * 0.72,
      1.15 + rand(seed + speck + 21),
      1.05,
    );
  }
  ctx.globalAlpha = 1;
}

function writeChalkLine(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font: string,
  size: number,
  progress: number,
  seed: number,
) {
  ctx.font = font;
  ctx.textBaseline = "alphabetic";
  const glyphs = Array.from(text);
  const shown = progress * glyphs.length;
  let cursor = x;
  let tipX = x;
  let tipY = y;
  glyphs.forEach((glyph, index) => {
    const glyphWidth = Math.max(ctx.measureText(glyph).width, 4);
    const local = Math.max(0, Math.min(1, shown - index));
    if (local > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(cursor - 2, y - size * 1.15, glyphWidth * local + 3, size * 1.45);
      ctx.clip();
      ctx.translate(0, Math.sin(seed + index) * 0.8);
      drawChalkGlyph(ctx, glyph, cursor, y, seed * 17 + index * 13, size);
      ctx.restore();
      tipX = cursor + glyphWidth * local;
      tipY = y - size * 0.35;
    }
    cursor += glyphWidth;
  });
  return { tipX, tipY };
}

function paintBlackboard(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  ground: number,
  clock: number,
  write: number,
) {
  const wood = [118, 78, 44];
  const rail = 20;
  for (let i = 0; i < 240; i += 1) {
    ctx.fillStyle = `rgba(232, 222, 188,${(0.03 + rand(i + 3) * 0.05).toFixed(3)})`;
    ctx.fillRect(
      rail + rand(i + 8) * (width - rail * 2),
      rail + rand(i + 14) * (height - 80),
      1 + rand(i + 21) * 1.6,
      1,
    );
  }

  ctx.fillStyle = `rgb(${wood[0]},${wood[1]},${wood[2]})`;
  ctx.fillRect(0, 0, width, rail);
  ctx.fillRect(0, 0, rail, height);
  ctx.fillRect(width - rail, 0, rail, height);
  ctx.fillStyle = "rgba(10, 14, 12, 0.62)";
  ctx.fillRect(rail, height - 60, width - rail * 2, 40);
  ctx.fillStyle = `rgb(${wood[0] - 14},${wood[1] - 10},${wood[2] - 8})`;
  ctx.fillRect(0, height - 24, width, 24);
  ctx.fillStyle = "#efe4c4";
  ctx.fillRect(rail + 22, height - 52, 92, 9);
  ctx.fillStyle = "#d7c48a";
  ctx.fillRect(rail + 22, height - 52, 10, 9);
  ctx.fillStyle = "#f3ead0";
  ctx.fillRect(rail + 128, height - 50, 38, 7);

  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = `rgb(${CHALK[0]},${CHALK[1]},${CHALK[2]})`;
  ctx.lineWidth = 1.4;
  ctx.setLineDash([3, 7]);
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    const y0 = 86 + i * 52 + Math.sin(clock * 0.4 + i) * 3;
    ctx.moveTo(width * 0.44, y0);
    ctx.bezierCurveTo(width * 0.6, y0 + 16, width * 0.74, y0 - 10, width * 0.9, y0 + 6);
    ctx.stroke();
  }
  ctx.restore();

  const originX = Math.min(width * 0.5, width - 380);
  const lines = [
    { text: "Thank you", size: 58, weight: 600, y: ground - 176, delay: 0.04, span: 0.42 },
    { text: "for walking with me.", size: 26, weight: 500, y: ground - 118, delay: 0.46, span: 0.32 },
    { text: `— ${site.person}`, size: 18, weight: 500, y: ground - 74, delay: 0.78, span: 0.2 },
  ];
  let tip = { x: originX, y: ground - 176, writing: false };
  lines.forEach((line, index) => {
    const local = Math.max(0, Math.min(1, (write - line.delay) / line.span));
    if (local <= 0) return;
    const drawn = writeChalkLine(
      ctx,
      line.text,
      originX,
      line.y,
      chalkFont(line.size, line.weight),
      line.size,
      local,
      41 + index * 9,
    );
    if (local < 1) tip = { x: drawn.tipX, y: drawn.tipY, writing: true };
  });

  if (tip.writing) {
    ctx.save();
    ctx.translate(tip.x + 8, tip.y);
    ctx.rotate(-0.72 + Math.sin(clock * 18) * 0.04);
    ctx.fillStyle = "#f4ead0";
    ctx.fillRect(0, 0, 34, 8);
    ctx.fillStyle = "#c9b57a";
    ctx.fillRect(26, 0, 8, 8);
    ctx.fillStyle = "rgba(232, 222, 188, 0.55)";
    ctx.fillRect(-4, 2, 6, 4);
    ctx.restore();
    for (let dust = 0; dust < 10; dust += 1) {
      ctx.globalAlpha = 0.18 + (dust % 3) * 0.08;
      ctx.fillStyle = `rgb(${CHALK[0]},${CHALK[1]},${CHALK[2]})`;
      ctx.fillRect(
        tip.x + Math.sin(clock * 9 + dust) * 10,
        tip.y + 6 + ((clock * 40 + dust * 13) % 28),
        1.3,
        1.3,
      );
    }
    ctx.globalAlpha = 1;
  } else if (write >= 1) {
    ctx.save();
    ctx.strokeStyle = `rgba(${CHALK[0]},${CHALK[1]},${CHALK[2]},0.55)`;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(originX, ground - 58);
    ctx.bezierCurveTo(originX + 40, ground - 50, originX + 90, ground - 62, originX + 128, ground - 54);
    ctx.stroke();
    ctx.restore();
  }
}

function burst(
  motes: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    max: number;
    size: number;
    rgb: readonly number[];
  }[],
  x: number,
  y: number,
  rgb: readonly number[],
  count: number,
) {
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.6 + Math.random() * 2.4;
    motes.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.2,
      life: 0,
      max: 420 + Math.random() * 280,
      size: 1.2 + Math.random() * 2.2,
      rgb,
    });
  }
}

export default function WalkableWorld({
  soundOn = true,
}: {
  soundOn?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const soundRef = useRef(soundOn);
  const keys = useRef({ left: false, right: false });
  const mouse = useRef({ x: -1000, y: -1000 });
  const jumpRef = useRef<string | null>(null);
  const [hint, setHint] = useState(true);
  const [ready, setReady] = useState(false);
  const [area, setArea] = useState<(typeof walkWorlds)[number] | null>(null);
  const [progress, setProgress] = useState(0);
  const [cursorRgb, setCursorRgb] = useState<readonly number[]>([88, 132, 104]);
  const [dark, setDark] = useState(false);
  const [hopping, setHopping] = useState(false);
  const [looking, setLooking] = useState(false);
  const [dropping, setDropping] = useState(false);
  const [found, setFound] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);
  const [thanks, setThanks] = useState(false);

  soundRef.current = soundOn;

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dots = buildWorld();
    let width = 0;
    let height = 0;
    let frame = 0;
    let characterX = 520;
    let cameraX = 0;
    let walkFrame = 0;
    let lastStep = 0;
    let lastMove = performance.now();
    let lastProgress = 0;
    let lastKey = "";
    let facing = 1;
    let currentSrc = IDLE;
    let hintCleared = false;
    let lastMouseX = -1000;
    let lastMouseY = -1000;
    let hopY = 0;
    let hopVy = 0;
    let hoppingNow = false;
    let flash = 0;
    let paper: [number, number, number] = [253, 253, 252];
    const ripples: {
      x: number;
      y: number;
      r: number;
      max: number;
      rgb: readonly number[];
    }[] = [];
    const weather: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      max: number;
      size: number;
      rgb: readonly number[];
      kind: "drop" | "spark" | "dash";
    }[] = [];
    const foundKeys = new Set<string>();
    const looked = new Set<string>();
    const motes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      max: number;
      size: number;
      rgb: readonly number[];
    }[] = [];
    let lookingNow = false;
    let lookUntil = 0;
    let cameraSnap = 0;
    let celebrated = false;
    let thanksAt = 0;
    let chalkAudio = false;
    let dropActive: {
      fromCam: number;
      toCam: number;
      fromX: number;
      toX: number;
      fromWorld: Scene | null;
      toWorld: Scene;
      started: number;
    } | null = null;
    let dropHudSwitched = false;

    const setPose = (src: string) => {
      if (currentSrc === src) return;
      currentSrc = src;
      img.src = src;
    };

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const applySceneHud = (scene: Scene | null) => {
      const board = isThanks(scene);
      setArea(board ? null : (scene as World | null));
      setCursorRgb(scene?.rgb || [88, 132, 104]);
      setDark(isDarkScene(scene));
      setThanks(board);
    };

    const markFound = (world: World) => {
      if (foundKeys.has(world.key)) return;
      foundKeys.add(world.key);
      setFound([...foundKeys]);
      if (foundKeys.size === walkWorlds.length && !celebrated) {
        celebrated = true;
        setComplete(true);
        if (soundRef.current) playComplete();
      }
    };

    const startDrop = (toWorld: Scene, fromWorld: Scene | null, now: number) => {
      lookingNow = false;
      lookUntil = 0;
      hoppingNow = false;
      hopY = 0;
      setLooking(false);
      setHopping(false);
      const fromX = characterX;
      const fromCam = cameraX;
      const goingBack = !!fromWorld && toWorld.start < fromWorld.start;
      const screenX = fromX - fromCam;
      characterX = goingBack ? toWorld.end - 150 : toWorld.start + 150;
      lastKey = toWorld.key;
      dropActive = {
        fromCam,
        toCam: characterX - screenX,
        fromX,
        toX: characterX,
        fromWorld,
        toWorld,
        started: reducedMotion ? now - DROP_MS : now,
      };
      if (!isThanks(toWorld)) {
        markFound(toWorld);
      }
      dropHudSwitched = false;
      setDropping(true);
      if (soundRef.current) {
        playDrop();
        if (!isThanks(toWorld)) {
          playDiscovery(walkWorlds.findIndex((item) => item.key === toWorld.key));
        }
      }
    };

    const hopDiscover = (
      world: World,
      worldX: number,
      screenX: number,
      screenY: number,
    ) => {
      hoppingNow = true;
      hopY = 0;
      hopVy = -10.4;
      flash = 1;
      setHopping(true);
      burst(motes, screenX, screenY, world.rgb, 22);
      ripples.push({ x: worldX, y: 0, r: 12, max: 340, rgb: world.rgb });
      ripples.push({ x: worldX, y: 0, r: 4, max: 210, rgb: mix(world.rgb, INK, 0.35) });
      for (let i = 0; i < dots.length; i += 1) {
        const d = dots[i];
        const dx = d.homeX - worldX;
        const dist = Math.hypot(dx, d.homeY) || 1;
        if (dist < 460) {
          const force = (1 - dist / 460) * 22;
          d.ox += (dx / dist) * force;
          d.oy -= force * 0.55;
        }
      }
      if (soundRef.current) {
        playDiscovery(walkWorlds.findIndex((item) => item.key === world.key));
      }
    };

    const paintWorld = (
      camX: number,
      theme: Scene | null,
      walkerX: number,
      ground: number,
      clock: number,
      interactive: boolean,
    ) => {
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const ink =
        theme?.key === "ojicra"
          ? "236,236,232"
          : theme?.key === "thanks"
            ? "232,222,188"
            : "47,48,45";

      if (!isThanks(theme)) {
        for (let i = 0; i < careerYears.length; i += 1) {
          const year = careerYears[i];
          const sx = year.x - camX * 0.28;
          if (sx < -220 || sx > width + 220) continue;
          const seen = Math.max(0, Math.min(1, (walkerX - year.x + 420) / 520));
          if (seen <= 0) continue;
          ctx.save();
          ctx.globalAlpha = seen * (theme?.key === "ojicra" ? 0.12 : 0.07);
          ctx.fillStyle = `rgb(${ink})`;
          ctx.font = "600 132px Inter, Avenir Next, sans-serif";
          ctx.fillText(year.year, sx, ground - 168);
          ctx.globalAlpha = seen * 0.28;
          ctx.font = "500 13px JetBrains Mono, SF Mono, monospace";
          ctx.fillText(year.label, sx + 8, ground - 132);
          ctx.restore();
        }
      }

      ctx.beginPath();
      ctx.strokeStyle =
        theme?.key === "ojicra"
          ? "rgba(236,236,232,0.22)"
          : theme?.key === "thanks"
            ? "rgba(232,222,188,0.22)"
            : "rgba(47,48,45,0.18)";
      ctx.lineWidth = 1.15;
      const g0 = camX - 20;
      ctx.moveTo(-20, ground + terrain(g0));
      for (let gx = 0; gx <= width + 40; gx += 10) {
        ctx.lineTo(gx, ground + terrain(camX + gx));
      }
      ctx.stroke();

      if (!isThanks(theme)) {
      for (let i = 0; i < walkWorlds.length; i += 1) {
        const world = walkWorlds[i];
        const sx = world.start - camX;
        if (sx < -80 || sx > width + 160) continue;
        const gy = ground + terrain(world.start);
        const reached = walkerX >= world.start;
        ctx.fillStyle = `rgba(${world.rgb[0]},${world.rgb[1]},${world.rgb[2]},${reached ? 0.95 : 0.45})`;
        ctx.fillRect(sx, gy - 42, 2, 42);
        ctx.beginPath();
        ctx.arc(sx + 1, gy - 46, 4.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgb(${ink})`;
        ctx.globalAlpha = reached ? 0.7 : 0.38;
        ctx.font = "500 10px JetBrains Mono, SF Mono, monospace";
        ctx.fillText(world.verb.toUpperCase(), sx + 10, gy - 34);
        ctx.font = "600 13px Inter, Avenir Next, sans-serif";
        ctx.fillText(world.name, sx + 10, gy - 18);
        ctx.globalAlpha = 1;
      }
      }

      for (let i = 0; i < dots.length; i += 1) {
        const d = dots[i];
        let sx = d.homeX - camX * d.parallax;
        if (sx < -40 || sx > width + 40) continue;
        let sy =
          ground +
          d.homeY +
          terrain(d.homeX) * (d.parallax === 1 ? 1 : 0.35) +
          Math.sin(clock * 0.7 + d.phase) * (d.parallax < 0.95 ? 2.2 : 0.4);
        const zone = worldAt(d.homeX)?.key;
        if (zone === "moss" && d.parallax < 0.95) {
          sy += ((clock * 26 + d.phase * 18) % 70) - 10;
        } else if (zone === "taupe") {
          sx += Math.sin(clock * 1.1 + d.phase) * 7;
        } else if (zone === "islog") {
          sy -= Math.abs(Math.sin(clock * 2.2 + d.phase)) * 8;
        } else if (zone === "ojicra") {
          sx += (clock * 14 + d.homeX) % 1 > 0.5 ? 1.6 : -1.6;
        } else if (zone === "monoomoi") {
          sx += Math.cos(clock * 0.9 + d.phase) * 6;
          sy += Math.sin(clock * 0.9 + d.phase) * 6;
        } else if (zone === "monoerabi" && interactive) {
          d.size = 1.1 + Math.abs(Math.sin(clock * 1.6 + d.phase)) * 1.4;
        } else if (zone === "thanks") {
          sy += Math.sin(clock * 1.3 + d.phase) * 5;
          sx += Math.cos(clock * 0.7 + d.phase) * 3;
        }

        if (interactive) {
          const dx = sx - mx;
          const dy = sy - my;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 150) {
            const force = (1 - dist / 150) * 3.4;
            d.ox += (dx / dist) * force;
            d.oy += (dy / dist) * force * 0.72;
          }
          d.ox *= 0.86;
          d.oy *= 0.86;
        }
        sx += d.ox;
        sy += d.oy;

        const lift = Math.hypot(d.ox, d.oy);
        const alpha = theme?.key === "ojicra" ? 0.42 + lift * 0.01 : 0.22 + d.parallax * 0.16 + lift * 0.008;
        ctx.fillStyle = `rgba(${d.rgb[0]},${d.rgb[1]},${d.rgb[2]},${Math.min(0.85, alpha).toFixed(3)})`;
        if (d.shape === "dash") {
          ctx.fillRect(sx - 3.2, sy - 0.55, 6.4, 1.15);
        } else if (d.shape === "square") {
          ctx.fillRect(sx - d.size, sy - d.size, d.size * 1.7, d.size * 1.7);
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, d.size + lift * 0.03, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.textBaseline = "middle";
      if (!isThanks(theme)) {
      for (let i = 0; i < careerSkills.length; i += 1) {
        const skill = careerSkills[i];
        const rise = Math.max(0, Math.min(1, (walkerX - skill.x + 160) / 340));
        if (rise <= 0) continue;
        const sx = skill.x - camX * 0.62;
        if (sx < -160 || sx > width + 160) continue;
        const bob = Math.sin(clock * 1.4 + i * 0.7) * 10;
        const sy = ground - 78 - rise * 86 - bob;
        const tone = theme?.rgb || [88, 132, 104];
        ctx.save();
        ctx.globalAlpha = rise * (theme?.key === "ojicra" ? 0.72 : 0.58);
        ctx.translate(sx, sy);
        ctx.rotate(Math.sin(clock * 0.6 + i) * 0.04);
        ctx.fillStyle = `rgba(${tone[0]},${tone[1]},${tone[2]},0.14)`;
        const label = `${skill.year}  ${skill.skill}`;
        ctx.font = "500 13px JetBrains Mono, SF Mono, monospace";
        const tw = ctx.measureText(label).width;
        ctx.fillRect(-12, -14, tw + 24, 28);
        ctx.fillStyle = `rgb(${ink})`;
        ctx.fillText(label, 0, 0);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${tone[0]},${tone[1]},${tone[2]},0.9)`;
        ctx.arc(-18, 0, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      }
    };

    const draw = (now: number) => {
      const jumpTo = jumpRef.current;
      if (jumpTo && !dropActive) {
        jumpRef.current = null;
        const world = walkWorlds.find((item) => item.key === jumpTo);
        if (world) {
          startDrop(world, worldAt(characterX) || null, now);
        }
      } else if (jumpTo) {
        jumpRef.current = null;
      }

      const compact = width < 900;
      const reserved = compact ? Math.min(height * 0.36, 248) : 0;
      const ground = compact
        ? Math.min(height * 0.5, height - reserved - 8)
        : height * 0.68;
      const stageH = Math.max(280, height - reserved);

      if (dropActive) {
        if (chalkAudio) {
          stopChalkWrite();
          chalkAudio = false;
        }
        const raw = (now - dropActive.started) / DROP_MS;
        if (raw >= 1) {
          cameraX = dropActive.toCam;
          characterX = dropActive.toX;
          lastKey = dropActive.toWorld.key;
          paper = paperOf(dropActive.toWorld);
          applySceneHud(dropActive.toWorld);
          if (isThanks(dropActive.toWorld) && !thanksAt) {
            thanksAt = reducedMotion ? now - 4000 : now;
          }
          burst(
            motes,
            width * 0.38,
            ground + terrain(characterX),
            dropActive.toWorld.rgb,
            16,
          );
          ripples.push({ x: characterX, y: 0, r: 8, max: 240, rgb: dropActive.toWorld.rgb });
          dropActive = null;
          setDropping(false);
          if (soundRef.current) playLand();
        }
      }

      const locked = lookingNow || !!dropActive;
      if (lookingNow && !dropActive) {
        if (keys.current.left) {
          lookingNow = false;
          lookUntil = 0;
          setLooking(false);
        } else if (now >= lookUntil) {
          lookingNow = false;
          setLooking(false);
          const here = worldAt(characterX);
          const idx = here && !isThanks(here) ? walkWorlds.findIndex((item) => item.key === here.key) : -1;
          const next = idx >= 0 ? walkWorlds[idx + 1] : undefined;
          if (here && !isThanks(here) && idx === walkWorlds.length - 1) {
            startDrop(THANKS_SCENE, here, now);
          } else if (next && !foundKeys.has(next.key)) {
            startDrop(next, here || null, now);
          } else {
            hoppingNow = true;
            hopY = 0;
            hopVy = -9.2;
            facing = 1;
            characterX = Math.min(WORLD_LENGTH - 80, characterX + 56);
            flash = 0.45;
            setHopping(true);
          }
        }
      }

      const moving = !locked && (keys.current.left || keys.current.right);
      const speed = hoppingNow ? 3.15 : 4.05;
      if (!locked && keys.current.left) {
        characterX = Math.max(80, characterX - speed);
        facing = -1;
        lastMove = now;
      }
      if (!locked && keys.current.right) {
        characterX = Math.min(WORLD_LENGTH - 80, characterX + speed);
        facing = 1;
        lastMove = now;
      }

      if (!dropActive) {
        cameraX +=
          (characterX - width * 0.38 - (lookingNow ? 88 : 0) - cameraX) *
          (cameraSnap > 0 ? 0.32 : hoppingNow ? 0.12 : 0.085);
      }
      if (cameraSnap > 0) cameraSnap -= 1;
      const current = dropActive?.toWorld || worldAt(characterX);
      const nextProgress = Math.min(1, characterX / END_X);
      if (Math.abs(nextProgress - lastProgress) > 0.008) {
        lastProgress = nextProgress;
        setProgress(nextProgress);
      }
      const key = current?.key || "";
      if (!dropActive && key !== lastKey) {
        lastKey = key;
        applySceneHud(current || null);
        if (isThanks(current) && !thanksAt) {
          thanksAt = reducedMotion ? now - 4000 : now;
        }
        if (current && !isThanks(current) && !foundKeys.has(current.key)) {
          const idx = walkWorlds.findIndex((item) => item.key === current.key);
          const prev = idx > 0 ? walkWorlds[idx - 1] : null;
          const screenX = characterX - cameraX;
          const screenY = ground + terrain(characterX);
          characterX = Math.min(
            WORLD_LENGTH - 80,
            Math.max(80, characterX + facing * 36),
          );
          markFound(current);
          if (idx > 0) {
            startDrop(current, prev, now);
          } else {
            hopDiscover(current, characterX, screenX, screenY);
          }
        }
      }

      if (
        !dropActive &&
        !lookingNow &&
        !hoppingNow &&
        current &&
        !isThanks(current) &&
        facing === 1 &&
        foundKeys.has(current.key) &&
        !looked.has(current.key) &&
        characterX >= current.end - 120
      ) {
        lookingNow = true;
        lookUntil = now + LOOK_MS;
        looked.add(current.key);
        lastMove = now;
        setLooking(true);
      }

      if (hoppingNow && !dropActive) {
        hopVy += 0.36;
        hopY += hopVy;
        if (hopY >= 0) {
          hopY = 0;
          hoppingNow = false;
          setHopping(false);
          burst(
            motes,
            characterX - cameraX,
            ground + terrain(characterX),
            current?.rgb || INK,
            12,
          );
          if (soundRef.current) playLand();
        }
      }

      flash *= 0.94;

      const targetPaper = paperOf(current || null);
      if (!dropActive) {
        paper = [
          paper[0] + (targetPaper[0] - paper[0]) * 0.06,
          paper[1] + (targetPaper[1] - paper[1]) * 0.06,
          paper[2] + (targetPaper[2] - paper[2]) * 0.06,
        ];
      }

      if (dropActive) {
        setPose(WALK[2]);
      } else if (lookingNow) {
        setPose(SIT_CHILL);
      } else if (hoppingNow) {
        setPose(WALK[2]);
      } else if (moving && now - lastStep > 88) {
        walkFrame = (walkFrame + 1) % WALK.length;
        setPose(WALK[walkFrame]);
        lastStep = now;
        if (!hintCleared) {
          hintCleared = true;
          setHint(false);
        }
        burst(
          motes,
          characterX - cameraX,
          ground + terrain(characterX) + hopY,
          current?.rgb || INK,
          3,
        );
      } else if (!moving && isThanks(current)) {
        setPose(SIT_CHILL);
      } else if (!moving && now - lastMove > 2800) {
        setPose(SIT);
      } else if (!moving) {
        setPose(IDLE);
      }

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const t = now * 0.001;
      const ink =
        current?.key === "ojicra"
          ? "236,236,232"
          : current?.key === "thanks"
            ? "232,222,188"
            : "47,48,45";
      const dropT = dropActive
        ? easeInOutCubic(Math.min(1, (now - dropActive.started) / DROP_MS))
        : 0;
      const fromPaper = paperOf(dropActive?.fromWorld);
      const toPaper = paperOf(dropActive?.toWorld);

      if (dropActive) {
        const slide = dropT * height;
        ctx.fillStyle = `rgb(${fromPaper[0]},${fromPaper[1]},${fromPaper[2]})`;
        ctx.fillRect(0, -slide, width, height);
        ctx.fillStyle = `rgb(${toPaper[0]},${toPaper[1]},${toPaper[2]})`;
        ctx.fillRect(0, height - slide, width, height);

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, width, Math.max(0, height - slide + 2));
        ctx.clip();
        ctx.translate(0, -slide);
        paintWorld(dropActive.fromCam, dropActive.fromWorld, dropActive.fromX, ground, t, false);
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, height - slide - 2, width, slide + 4);
        ctx.clip();
        ctx.translate(0, height - slide);
        paintWorld(dropActive.toCam, dropActive.toWorld, dropActive.toX, ground, t, false);
        ctx.restore();
      } else {
        ctx.fillStyle = `rgb(${paper[0].toFixed(0)},${paper[1].toFixed(0)},${paper[2].toFixed(0)})`;
        ctx.fillRect(0, 0, width, height);
        paintWorld(cameraX, current || null, characterX, ground, t, true);

        if (isThanks(current) && thanksAt) {
          const write = Math.max(0, Math.min(1, (now - thanksAt) / 5600));
          paintBlackboard(ctx, width, height, ground, t, write);
          const scraping =
            !reducedMotion && soundRef.current && write > 0.03 && write < 0.97;
          if (scraping && !chalkAudio) {
            startChalkWrite();
            chalkAudio = true;
          } else if (!scraping && chalkAudio) {
            stopChalkWrite();
            chalkAudio = false;
          }
        } else if (chalkAudio) {
          stopChalkWrite();
          chalkAudio = false;
        }

        const upcoming = walkWorlds.find((world) => world.start > characterX + 40);
        if (upcoming) {
          const dist = upcoming.start - characterX;
          if (dist < 520) {
            const pulse = 0.35 + Math.sin(t * 3) * 0.12;
            ctx.globalAlpha = Math.max(0.15, 1 - dist / 520) * pulse;
            ctx.fillStyle = `rgb(${ink})`;
            ctx.font = "500 12px JetBrains Mono, SF Mono, monospace";
            ctx.fillText(`→  ${upcoming.name}`, width * 0.62, ground - (compact ? 120 : 210));
            ctx.globalAlpha = 1;
          }
        }

        if (lookingNow) {
          ctx.globalAlpha = 0.62;
          ctx.fillStyle = `rgb(${ink})`;
          ctx.font = "500 12px JetBrains Mono, SF Mono, monospace";
          ctx.fillText("sit · look", characterX - cameraX + 36, ground + terrain(characterX) - 78);
          ctx.globalAlpha = 1;
        }
      }

      if (dropActive && dropT > 0.45 && !dropHudSwitched) {
        dropHudSwitched = true;
        applySceneHud(dropActive.toWorld);
      }

      if (current && !dropActive && weather.length < 70) {
        const tone = current.rgb;
        for (let n = 0; n < 2; n += 1) {
          const kind =
            current.key === "taupe" || current.key === "ojicra"
              ? "dash"
              : current.key === "islog" || current.key === "monoomoi" || current.key === "thanks"
                ? "spark"
                : "drop";
          weather.push({
            x: cameraX + Math.random() * width,
            y:
              kind === "spark"
                ? ground + 8
                : ground - 40 - Math.random() * 220,
            vx:
              current.key === "taupe"
                ? 1.4 + Math.random()
                : current.key === "ojicra"
                  ? 0.8
                  : (Math.random() - 0.5) * 0.6,
            vy:
              kind === "spark"
                ? -(0.6 + Math.random() * 1.4)
                : kind === "dash"
                  ? (Math.random() - 0.5) * 0.3
                  : 1.1 + Math.random() * 1.8,
            life: 0,
            max: 700 + Math.random() * 500,
            size: 1 + Math.random() * 1.8,
            rgb: tone,
            kind,
          });
        }
      }
      for (let i = weather.length - 1; i >= 0; i -= 1) {
        const drop = weather[i];
        drop.life += 16;
        drop.x += drop.vx;
        drop.y += drop.vy;
        const fade = 1 - drop.life / drop.max;
        if (fade <= 0) {
          weather.splice(i, 1);
          continue;
        }
        if (dropActive) continue;
        const px = drop.x - cameraX;
        ctx.fillStyle = `rgba(${drop.rgb[0]},${drop.rgb[1]},${drop.rgb[2]},${(0.38 * fade).toFixed(3)})`;
        if (drop.kind === "dash") {
          ctx.fillRect(px, drop.y, 9, 1.1);
        } else {
          ctx.beginPath();
          ctx.arc(px, drop.y, drop.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (flash > 0.02 && current && !dropActive) {
        ctx.fillStyle = `rgba(${current.rgb[0]},${current.rgb[1]},${current.rgb[2]},${(flash * 0.1).toFixed(3)})`;
        ctx.fillRect(0, 0, width, height);
      }

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const ripple = ripples[i];
        ripple.r += 7.5;
        const fade = 1 - ripple.r / ripple.max;
        if (fade <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        if (dropActive) continue;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${ripple.rgb[0]},${ripple.rgb[1]},${ripple.rgb[2]},${(0.42 * fade).toFixed(3)})`;
        ctx.lineWidth = 1.4 + fade * 2.2;
        ctx.arc(
          ripple.x - cameraX,
          ground + terrain(ripple.x) + hopY * 0.15,
          ripple.r,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }

      if (mx > 0 && !dropActive) {
        const moved = Math.hypot(mx - lastMouseX, my - lastMouseY);
        if (moved > 6 && motes.length < 110) {
          const tone = current?.rgb || [88, 132, 104];
          for (let i = 0; i < 4; i += 1) {
            const angle = Math.random() * Math.PI * 2;
            motes.push({
              x: mx,
              y: my,
              vx: Math.cos(angle) * (0.35 + Math.random() * 1.6),
              vy: Math.sin(angle) * (0.35 + Math.random() * 1.6) - 0.4,
              life: 0,
              max: 380 + Math.random() * 260,
              size: 1.05 + Math.random() * 1.7,
              rgb: tone,
            });
          }
        }
        lastMouseX = mx;
        lastMouseY = my;
      }
      for (let i = motes.length - 1; i >= 0; i -= 1) {
        const mote = motes[i];
        mote.life += 16;
        mote.x += mote.vx;
        mote.y += mote.vy;
        mote.vy += 0.01;
        const fade = 1 - mote.life / mote.max;
        if (fade <= 0) {
          motes.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(${mote.rgb[0]},${mote.rgb[1]},${mote.rgb[2]},${(0.5 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.size * fade, 0, Math.PI * 2);
        ctx.fill();
      }

      const squash = hopY < -20 ? 0.9 : hopY < -4 ? 1.04 : 1;
      let charLeft = characterX - cameraX;
      let charTop = ground + terrain(characterX) - 2;
      let charHop = hopY;
      let charSquash = squash;
      if (dropActive) {
        const fromLeft = dropActive.fromX - dropActive.fromCam;
        const toLeft = dropActive.toX - dropActive.toCam;
        const fromTop = ground + terrain(dropActive.fromX) - 2;
        const toTop = ground + terrain(dropActive.toX) - 2;
        const split = 0.48;
        if (dropT < split) {
          const leave = dropT / split;
          const anticipation = leave < 0.2 ? Math.sin((leave / 0.2) * Math.PI) * 28 : 0;
          const fall = leave <= 0.2 ? 0 : ((leave - 0.2) / 0.8) ** 2 * stageH * 1.08;
          charLeft = fromLeft;
          charTop = fromTop - anticipation + fall;
          charHop = 0;
          charSquash = leave < 0.2 ? 0.92 : 1.08;
        } else {
          const local = (dropT - split) / (1 - split);
          const land = 1 - (1 - local) ** 3;
          const layerY = height - dropT * height;
          charLeft = toLeft;
          charTop = layerY - 100 + (toTop + 100) * land;
          charHop = 0;
          charSquash = local > 0.78 ? 0.84 + (local - 0.78) * 0.73 : 1.1;
        }
        img.style.opacity = "1";
      } else {
        img.style.opacity = "1";
      }
      img.classList.toggle("is-hopping", hoppingNow);
      img.classList.toggle("is-looking", lookingNow);
      img.classList.toggle("is-dropping", !!dropActive);
      img.style.transform = `translate(-50%, -86%) scaleX(${facing}) translateY(${charHop}px) scaleY(${charSquash})`;
      img.style.left = `${charLeft}px`;
      img.style.top = `${charTop}px`;

      frame = requestAnimationFrame(draw);
    };

    const down = (event: KeyboardEvent) => {
      if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
        const here = dropActive?.toWorld || worldAt(characterX);
        if (isThanks(here) && !event.repeat && !dropActive) {
          keys.current.left = false;
          startDrop(walkWorlds[walkWorlds.length - 1], THANKS_SCENE, performance.now());
          unlockAtlasSound();
          event.preventDefault();
          return;
        }
        const index = here && !isThanks(here) ? walkWorlds.findIndex((world) => world.key === here.key) : -1;
        if (!event.repeat && !dropActive && index > 0) {
          keys.current.left = false;
          startDrop(walkWorlds[index - 1], here || null, performance.now());
          unlockAtlasSound();
          event.preventDefault();
          return;
        }
        keys.current.left = true;
        unlockAtlasSound();
        event.preventDefault();
      }
      if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
        keys.current.right = true;
        unlockAtlasSound();
        event.preventDefault();
      }
    };
    const up = (event: KeyboardEvent) => {
      if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
        keys.current.left = false;
      }
      if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
        keys.current.right = false;
      }
    };
    const onMove = (event: PointerEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    const boot = window.setTimeout(() => setReady(true), 720);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(boot);
      stopChalkWrite(true);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <main
      id="main"
      tabIndex={-1}
      className={`home-game${ready ? " is-ready" : ""}${dark ? " is-dark" : ""}${thanks ? " is-thanks" : ""}${dropping ? " is-world-drop" : ""}`}
      aria-label="Walk through the world"
      data-world-cursor="active"
    >
      <div className="home-game__boot-logo" aria-hidden="true">
        <i />
        <span>Raza Ali</span>
      </div>
      <WorldCursor rgb={cursorRgb} />
      <canvas ref={canvasRef} className="home-game__canvas" />
      <img
        ref={imgRef}
        className={`home-game__character${hopping ? " is-hopping" : ""}${dropping ? " is-dropping" : ""}`}
        src={IDLE}
        alt=""
      />
      <div className="game-hud">
        <div className="game-brand">
          <span>raza ali</span>
          <ol className={`game-atlas${complete ? " is-complete" : ""}`} aria-label="Career worlds">
            {walkWorlds.map((world) => {
              const seen = found.includes(world.key);
              return (
                <li
                  key={world.key}
                  className={seen ? "is-found" : ""}
                  style={{ ["--chip" as string]: world.rgb.join(" ") }}
                >
                  <button
                    type="button"
                    aria-current={area?.key === world.key ? "true" : undefined}
                    aria-label={`Go to ${world.name}${seen ? ", visited" : ""}`}
                    title={world.name}
                    onClick={() => {
                      unlockAtlasSound();
                      jumpRef.current = world.key;
                    }}
                  />
                </li>
              );
            })}
          </ol>
        </div>
        <div className="game-progress" style={{ ["--game-progress" as string]: `${Math.round(progress * 100)}%` }}>
          <span />
          <i />
        </div>
        <div className="game-keys">
          <kbd>A</kbd>
          <kbd>D</kbd>
          <span>{dropping ? "drop" : looking ? "look" : "walk"}</span>
        </div>
      </div>
      {hint ? (
        <p className={`game-start-hint${ready ? " is-visible" : ""}`}>
          <span className="game-start-hint__row">
            <span className="game-start-hint__word">back</span>
            <span className="game-start-hint__arrow game-start-hint__arrow--left" />
            <span className="game-start-hint__key">A</span>
            <span className="game-start-hint__key">D</span>
            <span className="game-start-hint__arrow game-start-hint__arrow--right" />
            <span className="game-start-hint__word">forward</span>
          </span>
        </p>
      ) : null}
      {area ? (
        <aside key={area.key} className="game-card is-visible is-section-in">
          <p className="game-card__kicker">
            {area.verb} · {dropping ? "drop · new world" : looking ? "sit · look" : hopping ? "career move" : "discovery"}
          </p>
          <p className="game-card__title">{area.name}</p>
          <p className="game-card__role">{area.role}</p>
          <p className="game-card__copy">{area.description}</p>
          <a href={area.href} target={area.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            {area.href.startsWith("http") ? `Visit ${area.name}` : `Explore ${area.name}`}
          </a>
        </aside>
      ) : null}
      {thanks ? (
        <>
          <p className="game-finish-banner" role="status">
            <span>Finish</span>
            <small>Walk complete</small>
          </p>
          <aside className="game-constellation game-thanks-card is-visible">
            <p className="game-card__kicker">end of the atlas</p>
            <p className="game-constellation__title">Thanks for visiting.</p>
            <button
              type="button"
              onClick={() => {
                unlockAtlasSound();
                downloadCareerConstellation();
              }}
            >
              Download atlas
            </button>
            <a href="/contact">Say hello</a>
          </aside>
        </>
      ) : complete ? (
        <aside className="game-constellation is-visible">
          <p className="game-card__kicker">constellation complete</p>
          <p className="game-constellation__title">Six chapters, walked.</p>
          <button
            type="button"
            onClick={() => {
              unlockAtlasSound();
              downloadCareerConstellation();
            }}
          >
            Download atlas
          </button>
        </aside>
      ) : null}
      <div className="home-game__touch">
        <button
          type="button"
          aria-label="Jump to the previous world"
          onPointerDown={() => {
            unlockAtlasSound();
            const index = area ? walkWorlds.findIndex((world) => world.key === area.key) : -1;
            if (thanks) {
              jumpRef.current = walkWorlds[walkWorlds.length - 1].key;
            } else if (index > 0) {
              jumpRef.current = walkWorlds[index - 1].key;
            } else {
              keys.current.left = true;
            }
          }}
          onPointerUp={() => {
            keys.current.left = false;
          }}
          onPointerLeave={() => {
            keys.current.left = false;
          }}
          onPointerCancel={() => {
            keys.current.left = false;
          }}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Walk right"
          onPointerDown={() => {
            unlockAtlasSound();
            keys.current.right = true;
          }}
          onPointerUp={() => {
            keys.current.right = false;
          }}
          onPointerLeave={() => {
            keys.current.right = false;
          }}
          onPointerCancel={() => {
            keys.current.right = false;
          }}
        >
          →
        </button>
      </div>
    </main>
  );
}
