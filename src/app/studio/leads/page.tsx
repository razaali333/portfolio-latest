import { redirect } from "next/navigation";
import { studioAuthorized } from "@/lib/chat/admin";
import StudioNav from "@/components/studio/StudioNav";
import LeadInbox from "@/components/studio/LeadInbox";

export const dynamic = "force-dynamic";

export default async function StudioLeadsPage() {
  if (!(await studioAuthorized())) {
    redirect("/studio");
  }

  return (
    <main id="main" className="page studio-page" tabIndex={-1}>
      <div className="shell">
        <StudioNav />
        <LeadInbox />
      </div>
    </main>
  );
}
