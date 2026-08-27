import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";
import PaperScene from "@/components/PaperScene";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.person}. ${site.email}`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PaperScene />
      <main id="main" className="page" tabIndex={-1}>
        <div className="shell">
          <Breadcrumb current="Contact" />
          <section id="intro" className="page-hero">
            <div className="page-hero__main">
              <p className="eyebrow">[ 04. CONTACT ]</p>
              <p className="lede" style={{ marginBottom: 8 }}>
                What&apos;s Next?
              </p>
              <h1>Get In Touch</h1>
              <p className="lede">
                Although I&apos;m always open for any new opportunities, my
                inbox is open. Whether you have a question or just want to say
                hi, I&apos;ll try my best to get back to you!
              </p>
              <p className="body">
                <a className="link-arrow" href={`mailto:${site.email}`}>
                  Say Hello
                </a>
                {" · "}
                <a href={`mailto:${site.email}`}>{site.email}</a>
                {" · "}
                <a href={`tel:${site.phone}`}>{site.phone}</a>
              </p>
            </div>
            <aside className="page-hero__aside">
              <p className="eyebrow">[ ELSEWHERE ]</p>
              <ul className="plain-index">
                <li>01 GitHub / razaali333</li>
                <li>02 LinkedIn</li>
                <li>03 Instagram / raza.fujtown</li>
                <li>04 {site.location}</li>
              </ul>
            </aside>
          </section>

          <section className="sec">
            <header className="sec-head">
              <p className="eyebrow">[ MESSAGE ]</p>
              <h2>Send a note.</h2>
            </header>
            <ContactForm />
          </section>
        </div>
      </main>
    </>
  );
}
