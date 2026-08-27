"use client";

import { useEffect, useRef } from "react";

export default function WorldCursor({
  rgb = [88, 132, 104],
}: {
  rgb?: readonly number[];
}) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;
    let visible = false;

    const tick = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      node.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(x - cx) > 0.15 || Math.abs(y - cy) > 0.15) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      const interactive = Boolean(
        (event.target as Element | null)?.closest?.(
          "a, button, input, textarea, select, label",
        ),
      );
      node.dataset.interactive = interactive ? "true" : "false";
      if (!visible) {
        visible = true;
        cx = x;
        cy = y;
        node.dataset.visible = "true";
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      visible = false;
      delete node.dataset.visible;
      delete node.dataset.pressed;
    };

    const onDown = () => {
      node.dataset.pressed = "true";
    };

    const onUp = () => {
      delete node.dataset.pressed;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onLeave, { passive: true });
    document.documentElement.dataset.worldCursor = "active";

    return () => {
      if (frame) cancelAnimationFrame(frame);
      delete document.documentElement.dataset.worldCursor;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  return (
    <div
      ref={nodeRef}
      className="world-cursor"
      aria-hidden="true"
      style={{ ["--world-cursor-rgb" as string]: rgb.join(" ") }}
    >
      <b className="world-cursor__core" />
      <b className="world-cursor__cross" />
      <span />
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}
