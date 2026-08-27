"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/studio", label: "Analytics" },
  { href: "/studio/questions", label: "Training" },
  { href: "/studio/leads", label: "Leads" },
];

export default function StudioNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="studio-nav">
      <p className="eyebrow">[ STUDIO ]</p>
      <nav aria-label="Studio">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={async () => {
          await fetch("/api/studio/logout", { method: "POST" });
          router.replace("/studio/login");
        }}
      >
        Sign out
      </button>
    </header>
  );
}
