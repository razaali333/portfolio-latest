import { site, walkWorlds } from "@/lib/content";

export function downloadCareerConstellation() {
  const canvas = document.createElement("canvas");
  const width = 1400;
  const height = 900;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#fdfdfc";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 420; i += 1) {
    const x = (i * 97) % width;
    const y = (i * 53) % height;
    ctx.fillStyle = `rgba(52, 58, 56, ${0.04 + (i % 5) * 0.01})`;
    ctx.beginPath();
    ctx.arc(x, y, 1.1, 0, Math.PI * 2);
    ctx.fill();
  }

  const last = Math.max(1, walkWorlds.length - 1);
  const points = walkWorlds.map((world, i) => {
    const t = i / last;
    return {
      x: 220 + t * 960,
      y: 430 + Math.sin(t * Math.PI) * -168 + (i % 2) * 36,
      world,
    };
  });

  ctx.lineWidth = 1.2;
  ctx.setLineDash([3, 7]);
  ctx.strokeStyle = "rgba(52, 58, 56, 0.28)";
  ctx.beginPath();
  points.forEach((point, i) => {
    if (i === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.textAlign = "center";
  points.forEach((point) => {
    const [r, g, b] = point.world.rgb;
    ctx.beginPath();
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.16)`;
    ctx.arc(point.x, point.y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.arc(point.x, point.y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#343a38";
    ctx.font = "500 11px JetBrains Mono, SF Mono, monospace";
    ctx.fillText(point.world.verb.toUpperCase(), point.x, point.y + 42);
    ctx.font = "600 16px Inter, Avenir Next, sans-serif";
    ctx.fillText(point.world.name, point.x, point.y + 64);
  });

  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(52, 58, 56, 0.55)";
  ctx.font = "500 12px JetBrains Mono, SF Mono, monospace";
  ctx.fillText("CAREER ATLAS", 80, 88);
  ctx.fillStyle = "#343a38";
  ctx.font = "620 42px Inter, Avenir Next, sans-serif";
  ctx.fillText(site.person, 80, 140);
  ctx.fillStyle = "rgba(52, 58, 56, 0.62)";
  ctx.font = "400 16px Inter, Avenir Next, sans-serif";
  ctx.fillText("Six chapters, walked in order.", 80, 176);

  ctx.font = "500 12px JetBrains Mono, SF Mono, monospace";
  ctx.fillText("2015 — present  ·  Fujairah, UAE", 80, height - 72);

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "raza-ali-career-constellation.png";
  link.click();
}
