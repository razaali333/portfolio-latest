import { site } from "@/lib/content";

export const metadata = {
  title: "Visit my career",
  description: `Walk through ${site.person}’s career — About, Aursoft, Ferisoft, Fujtown, Centurion PLC, and how to get in touch.`,
  alternates: { canonical: "/career" },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
