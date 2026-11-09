import type React from "react";
import { about } from "@/content/about";
import { Container } from "./ui/container";

const stagger = (i: number) => ({ "--reveal-delay": `${i * 90}ms` }) as React.CSSProperties;

/*
  The one section led by a personal statement rather than a section title:
  serif statement and short story on the left, a compact approach column on the right.
*/
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-24">
      <Container className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-7">
          <p className="reveal eyebrow flex items-center gap-2.5">
            <span className="text-forest tabular-nums">01</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            About
          </p>
          <h2 id="about-title" className="reveal mt-5 max-w-[16ch] font-serif text-statement font-normal text-ink" style={stagger(1)}>
            {about.statement}
          </h2>
          <div className="reveal mt-8 max-w-[54ch] space-y-4 text-[1.0625rem] leading-[1.7] text-ink-soft" style={stagger(2)}>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>

        <aside aria-labelledby="approach-title" className="lg:col-span-4 lg:col-start-9 lg:self-start lg:pt-12">
          <h3 id="approach-title" className="reveal text-[0.9375rem] font-semibold text-ink">
            How I work
          </h3>
          <ol className="mt-4 border-t border-line">
            {about.principles.map((item, i) => (
              <li key={item.title} className="reveal group/principle border-b border-line py-4" style={stagger(i + 1)}>
                <p className="flex items-baseline gap-3 text-[0.9375rem] font-semibold text-ink">
                  <span aria-hidden="true" className="w-5 text-[0.8125rem] font-medium text-forest tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="transition-colors duration-200 group-hover/principle:text-forest">{item.title}</span>
                </p>
                <p className="mt-1 pl-8 text-[0.875rem] leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
        </aside>
      </Container>
    </section>
  );
}
