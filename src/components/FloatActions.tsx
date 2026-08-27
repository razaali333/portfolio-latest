"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/content";

export default function FloatActions() {
  const pathname = usePathname();
  if (pathname === "/career") return null;

  return (
    <div className="float-actions" aria-label="Quick contact">
      <a
        className="float-actions__btn float-actions__btn--cv"
        href={site.resume}
        target="_blank"
        rel="noreferrer"
        download="Raza-Ali-CV.pdf"
        aria-label="Download CV"
        title="Download CV"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 3a1 1 0 0 1 1 1v8.17l2.59-2.58a1 1 0 1 1 1.41 1.42l-4.3 4.29a1 1 0 0 1-1.4 0l-4.3-4.3a1 1 0 1 1 1.41-1.41L11 12.17V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z"
          />
        </svg>
      </a>
      <a
        className="float-actions__btn float-actions__btn--wa"
        href={site.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12.04 2C6.5 2 2.02 6.48 2.02 12.02c0 1.77.46 3.5 1.34 5.02L2 22l5.1-1.33A10 10 0 0 0 12.04 22C17.58 22 22.06 17.52 22.06 12S17.58 2 12.04 2Zm5.83 14.24c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.12.1-1.81-.11-.42-.13-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.92-4.35-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.4.24-.28.64-.4.86-.4h.62c.2 0 .46-.08.72.55.24.64.83 2.22.9 2.38.07.16.12.35.02.56-.1.22-.15.35-.3.54-.14.18-.3.4-.43.54-.14.14-.29.3-.12.58.16.28.73 1.2 1.56 1.95 1.07.96 1.97 1.26 2.25 1.4.28.14.44.12.6-.07.16-.18.7-.82.89-1.1.18-.28.37-.23.62-.14.25.1 1.58.75 1.85.88.27.14.45.2.52.31.07.11.07.64-.17 1.32Z"
          />
        </svg>
      </a>
    </div>
  );
}
