import { site, walkWorlds } from "@/lib/content";

export default function CareerTimeline({
  id = "career-timeline",
  title = "Experience at a glance",
}: {
  id?: string;
  title?: string;
}) {
  return (
    <article className="career-static" id={id}>
      <p className="career-overview__eyebrow">Career journey · 2015—present</p>
      <h1 id="career-static-title">{title}</h1>
      <p className="career-overview__intro">
        {site.person} is a full-stack web developer at Centurion PLC. Work history:
        Aursoft, Ferisoft, Fujtown, then Centurion PLC. React, Next.js, Laravel,
        Node.js, and PHP.
      </p>
      <ol className="career-timeline">
        {walkWorlds.map((world) => (
          <li key={world.key} style={{ ["--timeline-color" as string]: world.rgb.join(" ") }}>
            <span className="career-timeline__dot" aria-hidden="true" />
            <div>
              <p className="career-timeline__date">{world.role}</p>
              <h2>{world.name}</h2>
              <p className="career-timeline__label">{world.label}</p>
              {world.location ? <p className="career-timeline__place">{world.location}</p> : null}
              <p>{world.description}</p>
              <p className="career-timeline__achievement">{world.achievement}</p>
              <ul className="career-timeline__proof">
                {world.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="career-timeline__stack">{world.stack.join(" · ")}</p>
              <a href={world.href} target={world.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {world.href.startsWith("http") ? `Visit ${world.name}` : `Read more about ${world.name}`}
              </a>
            </div>
          </li>
        ))}
      </ol>
      <p className="career-static__links">
        <a href={site.resume} target="_blank" rel="noreferrer">Download resume</a>
        <a href={`mailto:${site.email}`}>Email me</a>
        <a href="/work">View projects</a>
        <a href="/experience">Full experience page</a>
      </p>
    </article>
  );
}
