"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  [122, 167, 142],
  [111, 184, 198],
  [216, 185, 76],
  [105, 107, 116],
  [197, 111, 94],
  [139, 119, 170],
];

export default function MouseField({ dense = false }: { dense?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = dense ? 140 : 72;
    const mouse = { x: -1000, y: -1000, tx: -1000, ty: -1000 };
    const dots = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: 0,
      vy: 0,
      color: COLORS[i % COLORS.length],
      size: 1.1 + (i % 5) * 0.35,
    }));
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(1.25, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot, i) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.hypot(dx, dy) || 1;
        const attract = dense ? 0.035 : 0.018;
        if (dist < 280) {
          dot.vx += (dx / dist) * attract * (280 - dist);
          dot.vy += (dy / dist) * attract * (280 - dist);
        } else {
          dot.vx += (Math.sin(i + performance.now() * 0.0004) * 0.04);
          dot.vy += (Math.cos(i + performance.now() * 0.0003) * 0.03);
        }
        if (dist < 48) {
          dot.vx -= (dx / dist) * 1.6;
          dot.vy -= (dy / dist) * 1.6;
        }
        dot.vx *= 0.86;
        dot.vy *= 0.86;
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;
        ctx.fillStyle = `rgba(${dot.color[0]},${dot.color[1]},${dot.color[2]},0.42)`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      mouse.tx = event.clientX;
      mouse.ty = event.clientY;
    };

    resize();
    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [dense]);

  return <canvas className="mouse-field" aria-hidden="true" ref={canvasRef} />;
}
