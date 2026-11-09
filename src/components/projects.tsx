import type { CSSProperties, JSX } from "react";
import { projects, type Project, type ProjectGraphic } from "@/content/projects";
import { site } from "@/content/site";
import { Container } from "./ui/container";
import { SectionHeading } from "./ui/section-heading";
import { ArrowUpRightIcon } from "./ui/icons";
import { WildfireMap } from "./graphics/wildfire-map";
import { InflationChart } from "./graphics/inflation-chart";
import { LendingChart } from "./graphics/lending-chart";

const graphics: Record<ProjectGraphic, () => JSX.Element> = {
  wildfire: WildfireMap,
  inflation: InflationChart,
  lending: LendingChart,
};

/** The full technical story, one click away rather than on the page by default. */
function CaseStudy({ project }: { project: Project }) {
  return (
    <details className="case-study group/case mt-6 border-t border-line">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:text-forest [&::-webkit-details-marker]:hidden">
        <span>
          Case study<span className="sr-only">: {project.title}</span>
        </span>
        <span
          aria-hidden="true"
          className="relative h-3.5 w-3.5 text-forest transition-transform duration-300 ease-out-soft group-open/case:rotate-45"
        >
          <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
          <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current" />
        </span>
      </summary>

      <div className="case-study-body pb-2">
        <p className="text-[0.75rem] font-medium text-muted">{project.title}</p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{project.summary}</p>

        <dl className="mt-5 grid gap-4 sm:grid-cols-3">
          {project.findings.map((f) => (
            <div key={f.figure}>
              <dt className="text-[1.5rem] font-semibold leading-none tracking-[-0.03em] text-forest tabular-nums">{f.figure}</dt>
              <dd className="mt-1.5 text-[0.8125rem] leading-snug text-muted">{f.text}</dd>
            </div>
          ))}
        </dl>

        <h4 className="mt-6 text-[0.8125rem] font-semibold text-ink">How I built it</h4>
        <ul className="mt-2 space-y-2 text-[0.875rem] leading-relaxed text-ink-soft">
          {project.approach.map((step) => (
            <li key={step.slice(0, 40)} className="grid grid-cols-[0.875rem_1fr] gap-2">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-2 bg-forest" />
              <span>{step}</span>
            </li>
          ))}
        </ul>

        {project.note ? (
          <p className="mt-5 border-l-2 border-forest/40 pl-3 text-[0.8125rem] leading-relaxed text-muted">{project.note}</p>
        ) : null}

        <p className="mt-5 text-[0.8125rem] leading-relaxed text-muted">
          <span className="font-semibold text-ink">Full stack · </span>
          {project.stack.join(", ")}
        </p>
      </div>
    </details>
  );
}

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const Graphic = graphics[project.graphic];
  const flipped = index % 2 === 1;
  const titleId = `${project.slug}-title`;
  // Until a project's own URL is set in content/projects.ts, point to the real GitHub profile
  // rather than the placeholder, so visitors never land on a dead page.
  const link = project.link.isPlaceholder
    ? { href: site.social.github.href, label: "Code on GitHub" }
    : project.link;

  return (
    <article aria-labelledby={titleId} className="group/project grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className={`reveal overflow-hidden lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}>
        <div className="transition-transform duration-700 ease-out-soft group-hover/project:scale-[1.025]">
          <Graphic />
        </div>
      </div>

      <div
        className={`reveal lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}
        style={{ "--reveal-delay": "120ms" } as CSSProperties}
      >
        <p className="eyebrow flex items-center gap-2.5">
          <span className="text-forest tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <span
            aria-hidden="true"
            className="h-px w-6 bg-line-strong transition-[width,background-color] duration-300 ease-out-soft group-hover/project:w-10 group-hover/project:bg-forest"
          />
          {project.context} · {project.period}
        </p>

        <h3 id={titleId} className="mt-4 font-serif text-project font-normal text-ink">
          {project.name}
        </h3>
        <p className="mt-4 max-w-[42ch] text-[1.0625rem] leading-[1.6] text-ink-soft">{project.problem}</p>

        <ul aria-label="Key technologies" className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line-strong px-3 py-1 text-[0.8125rem] font-medium text-ink-soft transition-colors duration-200 hover:border-forest hover:text-forest"
            >
              {t}
            </li>
          ))}
        </ul>

        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-7 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-forest"
        >
          <span className="link-draw pb-1">{link.label}</span>
          <span className="sr-only">: {project.title} (opens in a new tab)</span>
          <ArrowUpRightIcon className="transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5" />
        </a>

        <CaseStudy project={project} />
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          index="02"
          label="Selected work"
          id="work-title"
          title="Projects built around real questions"
          aside={<p className="eyebrow">{projects.length} projects</p>}
        />

        <div className="mt-12 space-y-20 sm:mt-16 sm:space-y-28">
          {projects.map((project, i) => (
            <ProjectShowcase key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
