"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

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

const PALETTES: Record<string, number[][]> = {
  media: [
    [91, 139, 112],
    [212, 81, 153],
    [98, 170, 190],
    [178, 180, 100],
    [213, 128, 155],
    [105, 107, 116],
  ],
  projects: [
    [214, 174, 62],
    [212, 81, 153],
    [98, 170, 190],
  ],
  services: [
    [88, 158, 178],
    [91, 139, 112],
    [212, 81, 153],
    [214, 174, 62],
  ],
  about: [
    [104, 145, 123],
    [98, 170, 190],
    [213, 128, 155],
  ],
  contact: [
    [213, 128, 155],
    [88, 158, 178],
    [214, 174, 62],
  ],
  privacy: [
    [105, 107, 116],
    [104, 145, 123],
  ],
  origin: [
    [104, 145, 123],
    [98, 170, 190],
  ],
  v2: [
    [122, 167, 142],
    [111, 184, 198],
    [216, 185, 76],
    [105, 107, 116],
    [197, 111, 94],
    [139, 119, 170],
  ],
  experience: [
    [104, 145, 123],
    [98, 170, 190],
    [213, 128, 155],
  ],
  work: [
    [214, 174, 62],
    [212, 81, 153],
    [98, 170, 190],
  ],
};

const ABOUT_ROUTE_X = [0.57, 0.66, 0.76, 0.84, 0.93];
const ABOUT_ROUTE_Y = [0.72, 0.28, 0.58, 0.2, 0.44];
const PARTICLE_COUNT = 72;

function pageKeyFromPath(pathname: string) {
  if (pathname === "/") return "v2";
  if (pathname === "/career") return "origin";
  const slug = pathname.replace(/^\//, "").split("/")[0];
  return PALETTES[slug] ? slug : "origin";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smooth(value: number) {
  const x = clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
}

export default function PaperScene({
  returnLabel = "Return home",
  showReturn = true,
  pageKey,
}: {
  returnLabel?: string;
  showReturn?: boolean;
  pageKey?: string;
}) {
  const pathname = usePathname();
  const key = pageKey || pageKeyFromPath(pathname || "/");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const guide = guideRef.current;
    const guideImg = imgRef.current;
    if (!canvas || !guide || !guideImg) return;

    const motionReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const desktop = window.matchMedia("(min-width: 900px)");
    if (motionReduced || !desktop.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = PALETTES[key] || PALETTES.origin;
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
      y: ((index * 73) % 101) / 101,
      phase: (((index * 47) % 89) / 89) * Math.PI * 2,
      drift: 0.55 + ((index * 19) % 31) / 31,
      size: 0.7 + (((index * 11) % 17) / 17) * 1.5,
      color: index % colors.length,
    }));

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let lastNow = 0;
    let lastScrollY = window.scrollY;
    let lastScrollAt = performance.now();
    let guideY = 120;
    let walkFrame = 0;
    let currentSource = "";
    let activeMilestone = 0;
    const mouse = { x: -1000, y: -1000 };

    const milestoneSelector =
      ".page-hero, .home-hero, .home-milestone, main .sec, main .project-entry, main .service-case, main .chapter, main .privacy-block";
    const milestones = Array.from(document.querySelectorAll(milestoneSelector));
    const milestoneY = new Float64Array(milestones.length);
    const visited = new Uint8Array(milestones.length);
    const bloomAt = new Float64Array(milestones.length);

    const setGuideSource = (source: string) => {
      if (source && currentSource !== source) {
        currentSource = source;
        guideImg.src = source;
      }
    };

    const lineX = () => Math.max(42, (window.innerWidth - 1160) / 2 - 34);

    const resize = () => {
      dpr = Math.min(1, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;
      const nextWidth = Math.max(1, Math.round(width * dpr));
      const nextHeight = Math.max(1, Math.round(height * dpr));
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pageProgress = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      return clamp(window.scrollY / max, 0, 1);
    };

    const drawGlyph = (
      type: "circle" | "diamond" | "ring" | "dash",
      x: number,
      y: number,
      size: number,
      rgb: number[],
      alpha: number,
      rotation = 0,
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha.toFixed(3)})`;
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = Math.max(0.7, size * 0.24);
      ctx.beginPath();
      if (type === "diamond") {
        ctx.moveTo(0, -size);
        ctx.lineTo(size, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size, 0);
        ctx.closePath();
        ctx.stroke();
      } else if (type === "ring") {
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.stroke();
      } else if (type === "dash") {
        ctx.moveTo(-size * 1.5, 0);
        ctx.lineTo(size * 1.5, 0);
        ctx.stroke();
      } else {
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const syncMilestone = () => {
      const probe = window.scrollY + window.innerHeight * 0.46;
      let next = 0;
      for (let i = 0; i < milestoneY.length; i += 1) {
        if (milestoneY[i] <= probe) next = i;
      }
      for (let i = 0; i <= next; i += 1) {
        if (!visited[i]) {
          visited[i] = 1;
          bloomAt[i] = i === next ? performance.now() : -1000;
        }
      }
      activeMilestone = next;
    };

    const measureMilestones = () => {
      milestones.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        milestoneY[index] =
          rect.top + window.scrollY + Math.min(160, rect.height * 0.16);
      });
      syncMilestone();
    };

    const glyphForPage = (): "circle" | "diamond" | "ring" | "dash" => {
      if (key === "about") return "diamond";
      if (key === "contact") return "ring";
      if (key === "services" || key === "privacy") return "dash";
      if (key === "projects") return "circle";
      return "circle";
    };

    const drawMilestones = (x: number, now: number) => {
      if (!milestones.length) return;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight);
      let previousY = 0;
      let previousVisited = false;
      milestones.forEach((_element, index) => {
        const y = 32 + clamp(milestoneY[index] / maxScroll, 0, 1) * (height - 64);
        const rgb = colors[index % colors.length];
        const activeNode = index === activeMilestone;
        const isVisited = visited[index] === 1;
        if (isVisited && previousVisited) {
          ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.3)`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(x, previousY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        drawGlyph(
          activeNode ? glyphForPage() : "circle",
          x,
          y,
          activeNode ? 3.6 : isVisited ? 2.4 : 1.7,
          rgb,
          activeNode ? 0.76 : isVisited ? 0.46 : 0.16,
          index * 0.34,
        );
        if (activeNode) {
          ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.16)`;
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI * 2);
          ctx.stroke();
        }
        const bloomAge = now - bloomAt[index];
        if (isVisited && bloomAge >= 0 && bloomAge < 820) {
          const bloom = smooth(bloomAge / 820);
          ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${(
            (1 - bloom) * 0.32
          ).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 7 + bloom * 24, 0, Math.PI * 2);
          ctx.stroke();
        }
        previousY = y;
        previousVisited = isVisited;
      });
    };

    const drawSketches = (now: number) => {
      const rgb = colors[activeMilestone % colors.length];
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.115)`;

      if (key === "services") {
        const knotX = width * 0.84;
        const knotY = height * (0.43 + Math.sin(now * 0.00016) * 0.025);
        for (let thread = 0; thread < 4; thread += 1) {
          const sourceX = width * 0.58;
          const sourceY = height * (0.2 + thread * 0.18);
          ctx.beginPath();
          ctx.moveTo(sourceX, sourceY);
          ctx.bezierCurveTo(width * 0.68, sourceY, width * 0.76, knotY, knotX, knotY);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(knotX, knotY, 8 + Math.sin(now * 0.002) * 1.5, 0, Math.PI * 2);
        ctx.stroke();
        return;
      }

      if (key === "projects") {
        for (let track = 0; track < 6; track += 1) {
          const x0 = width * 0.6;
          const x1 = width * 0.92;
          const y0 = height * (0.18 + track * 0.115);
          const elbowX = x0 + (x1 - x0) * (0.28 + (track % 3) * 0.16);
          const elbowY = y0 + (track % 2 ? 1 : -1) * height * 0.052;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(elbowX, y0);
          ctx.lineTo(elbowX, elbowY);
          ctx.lineTo(x1, elbowY);
          ctx.stroke();
          ctx.strokeRect(elbowX - 3, elbowY - 3, 6, 6);
        }
        return;
      }

      if (key === "media") {
        ctx.setLineDash([1, 6]);
        for (let orbit = 0; orbit < 6; orbit += 1) {
          const centerX = width * (0.72 + (orbit % 2) * 0.105);
          const centerY = height * (0.2 + Math.floor(orbit / 2) * 0.25);
          ctx.beginPath();
          ctx.ellipse(
            centerX,
            centerY,
            34 + orbit * 3,
            22 + (orbit % 3) * 4,
            0,
            0,
            Math.PI * 2,
          );
          ctx.stroke();
        }
        ctx.setLineDash([]);
        return;
      }

      if (key === "about") {
        ctx.beginPath();
        ABOUT_ROUTE_X.forEach((x, index) => {
          const px = width * x;
          const py = height * ABOUT_ROUTE_Y[index];
          if (index === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ABOUT_ROUTE_X.forEach((x, index) => {
          const px = width * x;
          const py = height * ABOUT_ROUTE_Y[index];
          drawGlyph(
            "diamond",
            px,
            py,
            index === activeMilestone ? 4 : 2.5,
            colors[index % colors.length],
            index <= activeMilestone ? 0.32 : 0.12,
            index * 0.4,
          );
        });
        return;
      }

      if (key === "contact") {
        const centerX = width * 0.82;
        const centerY = height * 0.46;
        const radius = Math.min(width, height) * 0.19;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius, radius * 0.72, 0, 0, Math.PI * 2);
        ctx.stroke();
        return;
      }

      ctx.beginPath();
      ctx.moveTo(width * 0.58, height * 0.37);
      ctx.bezierCurveTo(
        width * 0.7,
        height * 0.31,
        width * 0.82,
        height * 0.43,
        width * 0.94,
        height * 0.37,
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width * 0.58, height * 0.61);
      ctx.bezierCurveTo(
        width * 0.7,
        height * 0.55,
        width * 0.82,
        height * 0.67,
        width * 0.94,
        height * 0.61,
      );
      ctx.stroke();
    };

    const draw = (now: number, progress: number) => {
      ctx.clearRect(0, 0, width, height);
      const x = lineX();

      ctx.strokeStyle = "rgba(69, 91, 83, 0.16)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, -20);
      ctx.bezierCurveTo(x - 5, height * 0.28, x + 6, height * 0.7, x, height + 20);
      ctx.stroke();

      colors.forEach((rgb, index) => {
        const trackX = x + (index - (colors.length - 1) / 2) * 3.2;
        ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.075)`;
        ctx.beginPath();
        ctx.moveTo(trackX, 0);
        ctx.bezierCurveTo(
          trackX + Math.sin(now * 0.0003 + index) * 9,
          height * 0.4,
          trackX - 8,
          height * 0.72,
          trackX,
          height,
        );
        ctx.stroke();
      });

      drawSketches(now);

      particles.forEach((particle, index) => {
        const rgb = colors[particle.color];
        let px: number;
        let py: number;
        let alpha = 0.14;
        if (key === "about" && index < 36) {
          const t = index / 36;
          const route = t * 4;
          const segment = Math.min(3, Math.floor(route));
          const u = route - segment;
          px =
            width *
            (ABOUT_ROUTE_X[segment] +
              (ABOUT_ROUTE_X[segment + 1] - ABOUT_ROUTE_X[segment]) * u);
          py =
            height *
              (ABOUT_ROUTE_Y[segment] +
                (ABOUT_ROUTE_Y[segment + 1] - ABOUT_ROUTE_Y[segment]) * u) +
            Math.sin(now * 0.0001 + index) * 2;
          alpha = 0.1 + (index % 18 === 0 ? 0.25 : 0.06) + progress * 0.04;
        } else if (key === "services" && index < 36) {
          const thread = index % 4;
          const u = Math.floor(index / 4) / 9;
          const sourceX = width * 0.58;
          const sourceY = height * (0.2 + thread * 0.18);
          const knotX = width * 0.84;
          const knotY = height * (0.43 + Math.sin(now * 0.00016) * 0.025);
          const eased = u * u * (3 - 2 * u);
          px =
            sourceX +
            (knotX - sourceX) * eased +
            Math.sin(u * Math.PI * 2 + now * 0.00022 + thread) * 8;
          py = sourceY + (knotY - sourceY) * eased;
          alpha = 0.08 + u * 0.15;
        } else if (key === "projects" && index < 36) {
          const track = index % 6;
          const signal = (Math.floor(index / 6) / 6 + now * 0.000035) % 1;
          const x0 = width * 0.6;
          const x1 = width * 0.92;
          const y0 = height * (0.18 + track * 0.115);
          const elbow = 0.28 + (track % 3) * 0.16;
          px = x0 + (x1 - x0) * signal;
          py = y0 + (signal > elbow ? (track % 2 ? 1 : -1) * height * 0.052 : 0);
          alpha = 0.09 + 0.12;
        } else {
          const y =
            ((particle.y * (height + 100) +
              progress * 290 +
              now * 0.008 * particle.drift) %
              (height + 100)) -
            50;
          const wave =
            Math.sin(particle.phase + now * 0.0007 + y * 0.009) *
            (13 + particle.drift * 17);
          px = x + wave;
          py = y;
          alpha = 0.12 + particle.drift * 0.035;
        }
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (1 - dist / 120) * 36;
          px += (dx / (dist || 1)) * force;
          py += (dy / (dist || 1)) * force * 0.7;
          alpha += force * 0.004;
        }
        drawGlyph(
          glyphForPage(),
          px,
          py,
          particle.size,
          rgb,
          alpha,
          particle.phase + now * 0.0002,
        );
      });

      drawMilestones(x, now);
    };

    const updateGuide = (now: number, progress: number, moving: boolean) => {
      const targetY = 96 + progress * Math.max(70, height - 260);
      guideY += (targetY - guideY) * 0.08;
      guide.style.transform = `translate3d(0, ${Math.round(guideY * 4) / 4}px, 0)`;

      const idleMs = now - lastScrollAt;
      if (moving && now - lastNow > 92) {
        walkFrame = (walkFrame + 1) % WALK.length;
        setGuideSource(WALK[walkFrame]);
        guide.dataset.pose = "walk";
        lastNow = now;
      } else if (!moving && idleMs >= 9000) {
        setGuideSource(SIT_CHILL);
        guide.dataset.pose = "chill";
      } else if (!moving && idleMs >= 3000) {
        setGuideSource(SIT);
        guide.dataset.pose = "sit";
      } else if (!moving) {
        setGuideSource(IDLE);
        guide.dataset.pose = "idle";
      }
    };

    const tick = (now: number) => {
      if (document.hidden || !desktop.matches) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const scrollY = window.scrollY;
      const changed = Math.abs(scrollY - lastScrollY) > 0.25;
      if (changed) {
        lastScrollAt = now;
        lastScrollY = scrollY;
      }
      const moving = changed || now - lastScrollAt < 180;
      const progress = pageProgress();
      syncMilestone();
      updateGuide(now, progress, moving);
      draw(now, progress);
      frame = requestAnimationFrame(tick);
    };

    const onResize = () => {
      resize();
      measureMilestones();
    };

    const onPointer = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    resize();
    measureMilestones();
    setGuideSource(IDLE);
    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", measureMilestones, { once: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [key]);

  return (
    <div className="paper-atlas" data-page-key={key} data-ready="true">
      <canvas ref={canvasRef} aria-hidden="true" />
      {showReturn ? (
        <Link className="atlas-return" href="/">
          {returnLabel}
        </Link>
      ) : null}
      <div className="paper-atlas__guide" ref={guideRef} aria-hidden="true">
        <i />
        <img ref={imgRef} src={IDLE} alt="" />
      </div>
    </div>
  );
}
