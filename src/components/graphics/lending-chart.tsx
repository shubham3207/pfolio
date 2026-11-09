import { Provenance } from "../ui/provenance";

/* Default rates reported in the project's SQL profiling of 396,030 LendingClub loans. */
const ROWS = [
  { label: "Grade A loans", value: 6.3 },
  { label: "All loans", value: 19.6, reference: true },
  { label: "Small-business loans", value: 29.5 },
  { label: "Grade G loans", value: 47.8 },
];

const MAX = 50;

export function LendingChart() {
  return (
    <figure className="flex h-full flex-col border border-line bg-paper p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="eyebrow">Share of 396,030 loans that defaulted</span>
        <Provenance kind="result" />
      </div>

      <dl className="flex flex-1 flex-col justify-center gap-5 py-8">
        {ROWS.map((row) => (
          <div key={row.label}>
            <dt className="flex items-baseline justify-between gap-4 text-[0.875rem] text-ink-soft">
              {row.label}
              <span className="font-sans tabular-nums text-[0.8125rem] text-ink">{row.value}%</span>
            </dt>
            <dd className="mt-2 h-2.5 w-full bg-wash">
              <span
                aria-hidden="true"
                className="block h-full rounded-r-[4px]"
                style={{
                  width: `${(row.value / MAX) * 100}%`,
                  background: row.reference ? "var(--color-line-strong)" : "var(--color-chart-blue)",
                }}
              />
            </dd>
          </div>
        ))}
      </dl>

      <figcaption className="border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-muted">
        Risk climbs steeply with grade, yet clustering still found borrowers graded low-risk who defaulted.
      </figcaption>
    </figure>
  );
}
