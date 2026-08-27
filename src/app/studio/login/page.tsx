import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PaperScene from "@/components/PaperScene";
import StudioLoginForm from "@/components/studio/StudioLoginForm";
import { studioAuthorized } from "@/lib/chat/admin";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function StudioLoginPage() {
  if (await studioAuthorized()) {
    redirect("/studio");
  }

  return (
    <>
      <PaperScene />
      <main id="main" className="page" tabIndex={-1}>
        <div className="shell">
          <section className="page-hero">
            <div className="page-hero__main">
              <p className="eyebrow">[ STUDIO ]</p>
              <h1>Training desk.</h1>
              <p className="lede">Private Q&amp;A and lead inbox for the site assistant.</p>
              <StudioLoginForm />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
