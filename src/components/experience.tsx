import { timeline, type Milestone } from "@/content/experience";
import { Container } from "./ui/container";
import { SectionHeading } from "./ui/section-heading";
import { TimelineRail } from "./timeline-rail";

const kindLabel = { work: "Experience", education: "Education" } as const;

function Entry({ item }: { item: Milestone }) {
  return (
    <li className="reveal relative pb-14 pl-9 last:pb-0 sm:pb-16 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:pb-20 lg:pl-0">
      <span
        aria-hidden="true"
        className="timeline-node"
        data-kind={item.kind}
        data-current={item.current ? "" : undefined}
      />

      {/* Dates sit against the rail on desktop and above the title on smaller screens. */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:col-span-3 lg:flex-col lg:items-end lg:gap-1.5 lg:pr-4 lg:text-right">
        <p className="text-[0.8125rem] font-semibold text-forest tabular-nums">
          <time>{item.start}</time> – <time>{item.end}</time>
        </p>
        <p className="eyebrow">{item.current ? "Now · " : ""}{kindLabel[item.kind]}</p>
      </div>

      <div className="mt-3 lg:col-span-9 lg:mt-0 lg:pl-10">
        <h3 className="text-title font-semibold text-ink">{item.title}</h3>
        <p className="mt-1 text-[0.9375rem] text-ink-soft">
          {item.organization}
          <span className="text-muted"> · {item.location}</span>
          {item.detail ? <span className="text-muted"> · {item.detail}</span> : null}
        </p>
        <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-[1.7] text-ink-soft">{item.summary}</p>

        {item.highlights ? (
          <dl className="mt-6 max-w-[44rem] border-t border-line">
            {item.highlights.map((h) => (
              <div key={h.area} className="group/hl grid gap-x-6 gap-y-1 border-b border-line py-3.5 sm:grid-cols-[7.5rem_1fr]">
                <dt className="eyebrow sm:pt-px">{h.area}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-ink-soft">
                  <span className="font-semibold text-forest">{h.metric}</span> {h.text}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {item.tools ? (
          <p className="mt-4 text-[0.8125rem] text-muted">
            <span className="sr-only">Tools: </span>
            {item.tools.join(" / ")}
          </p>
        ) : null}
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-y border-line py-20 sm:py-24">
      <Container>
        <SectionHeading index="03" label="Experience" id="experience-title" title="Where I’ve done the work" />

        <div className="mt-12 sm:mt-16">
          <TimelineRail labelledBy="experience-title">
            {timeline.map((item) => (
              <Entry key={`${item.organization}-${item.start}`} item={item} />
            ))}
          </TimelineRail>
        </div>
      </Container>
    </section>
  );
}
