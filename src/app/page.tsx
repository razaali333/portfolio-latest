import LivingAtlas from "@/components/LivingAtlas";
import MouseField from "@/components/MouseField";
import PaperScene from "@/components/PaperScene";
import { site } from "@/lib/content";

export const metadata = {
  title: `${site.person} | ${site.role}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <MouseField dense />
      <PaperScene showReturn={false} />
      <LivingAtlas />
    </>
  );
}
