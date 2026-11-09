/**
 * Says where a visual's numbers come from, so real project output is never confused with
 * illustration or public context data.
 */
const kinds = {
  data: { label: "Project data", dot: "bg-forest" },
  result: { label: "Project result", dot: "bg-forest" },
  context: { label: "Public context data", dot: "bg-[#8A918B]" },
} as const;

export type ProvenanceKind = keyof typeof kinds;

export function Provenance({ kind }: { kind: ProvenanceKind }) {
  const k = kinds[kind];
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-0.5 text-[0.75rem] font-medium whitespace-nowrap text-ink-soft">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${k.dot}`} />
      {k.label}
    </span>
  );
}
