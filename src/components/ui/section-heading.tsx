import type { ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  id: string;
  intro?: string;
  /** Extra content aligned to the end of the heading row, e.g. a count. */
  aside?: ReactNode;
};

/** Shared section opener: a small numbered label and a sans headline. Serif is kept for personal statements. */
export function SectionHeading({ index, label, title, id, intro, aside }: SectionHeadingProps) {
  return (
    <header className="reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
      <div className="max-w-[44rem]">
        <p className="eyebrow flex items-center gap-2.5">
          <span className="text-forest tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
          {label}
        </p>
        <h2 id={id} className="mt-4 text-headline font-semibold text-ink">
          {title}
        </h2>
        {intro ? <p className="mt-3 max-w-[52ch] text-[0.9375rem] text-muted">{intro}</p> : null}
      </div>
      {aside}
    </header>
  );
}
