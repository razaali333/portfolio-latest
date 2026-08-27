import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.person} — Portfolio`,
    short_name: site.person,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fdfdfc",
    theme_color: "#374944",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
