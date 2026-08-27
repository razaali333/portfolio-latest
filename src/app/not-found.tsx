import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="page" tabIndex={-1}>
      <div className="shell">
        <section className="page-hero">
          <div className="page-hero__main">
            <p className="eyebrow">[ 404 ]</p>
            <h1>That page isn’t on this atlas.</h1>
            <p className="lede">The address may have moved, or the route may never have existed.</p>
            <Link className="link-arrow" href="/">Return home</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
