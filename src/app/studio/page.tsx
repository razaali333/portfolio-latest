import PaperScene from "@/components/PaperScene";
import StudioLoginForm from "@/components/studio/StudioLoginForm";
import StudioNav from "@/components/studio/StudioNav";
import StudioAnalytics from "@/components/studio/StudioAnalytics";
import { studioAuthorized } from "@/lib/chat/admin";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  const authed = await studioAuthorized();

  if (!authed) {
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

  return (
    <main id="main" className="page studio-page" tabIndex={-1}>
      <div className="shell">
        <StudioNav />
        <StudioAnalytics />
      </div>
    </main>
  );
}
