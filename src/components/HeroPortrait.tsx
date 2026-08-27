import Image from "next/image";
import { assets, site } from "@/lib/content";

export default function HeroPortrait({
  priority = false,
}: {
  priority?: boolean;
}) {
  return (
    <figure className="hero-portrait">
      <span className="hero-portrait__offset" aria-hidden="true" />
      <span className="hero-portrait__dots" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <div className="hero-portrait__image">
        <Image
          src={assets.portrait}
          alt={`Pencil portrait of ${site.person}`}
          width={720}
          height={720}
          priority={priority}
        />
      </div>
      <figcaption>
        Portrait · {site.person}
      </figcaption>
    </figure>
  );
}
