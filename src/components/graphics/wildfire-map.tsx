"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { CA_BANDS, CA_CELLS, CA_HEIGHT, CA_PATH, CA_WIDTH } from "./california-fire-map";
import { Provenance } from "../ui/provenance";

/* Sequential ember ramp, light to dark: one hue for one magnitude. */
const RAMP = ["#dadedb", "var(--color-ember-soft)", "var(--color-ember-mid)", "var(--color-ember-deep)"];
const RADIUS = [2.1, 2.6, 3.1, 3.6];

/* Cells grouped by band, so isolating a band changes four layers rather than 1,060 dots. */
const BY_BAND = CA_BANDS.map((_, band) => CA_CELLS.filter((c) => c[2] === band));

/*
  Test-period PR-AUC (Jan 2025 – Oct 2026, never used for tuning) from final.ipynb.
  Higher is better; a random ranking scores the base rate, about 0.014.
*/
const RESULTS = [
  { label: "Weather only", value: 0.024 },
  { label: "Weather + location", value: 0.065 },
  { label: "Persistence baseline", note: "fire today → fire tomorrow", value: 0.1 },
  { label: "Final model", note: "+ fire history", value: 0.252, best: true },
];
const RANDOM = 0.014;
const MAX = 0.3;

const VIEWS = [
  { id: "map", label: "Fire map" },
  { id: "results", label: "Results" },
] as const;
type View = (typeof VIEWS)[number]["id"];

function FireMap() {
  // The band being explored from the legend; null shows all of them.
  const [active, setActive] = useState<number | null>(null);
  const pad = 8;
  return (
    <>
      <div className="flex flex-1 items-center justify-center py-6">
        <svg
          viewBox={`${-pad} ${-pad} ${CA_WIDTH + pad * 2} ${CA_HEIGHT + pad * 2}`}
          className="h-auto w-full max-w-[24rem]"
          role="img"
          aria-labelledby="wildfire-map-title wildfire-map-desc"
        >
          <title id="wildfire-map-title">California fire detection rate by 20 km grid cell</title>
          <desc id="wildfire-map-desc">
            A map of California made of 1,060 dots, one per model grid cell. The darkest cells, where a satellite
            detects fire the next day on 5% of days or more, run down the Central Valley, densest in the
            Sacramento Valley, with smaller clusters in Southern California; most of the desert southeast is pale.
          </desc>
          <path d={CA_PATH} fill="var(--color-paper)" stroke="var(--color-ink)" strokeOpacity="0.28" strokeWidth="0.9" />
          {BY_BAND.map((cells, band) => (
            <g
              key={band}
              fill={RAMP[band]}
              style={{ opacity: active === null || active === band ? 1 : 0.12, transition: "opacity 250ms ease" }}
            >
              {cells.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={RADIUS[band]} />
              ))}
            </g>
          ))}
        </svg>
      </div>

      <div className="border-t border-line pt-4">
        <ul className="flex flex-wrap gap-x-1 gap-y-1" aria-label="Share of days followed by a detection. Select a band to isolate it on the map.">
          {CA_BANDS.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                aria-pressed={active === i}
                // Hover previews only for a real mouse: touch taps also emit pointer-enter events.
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(i)}
                className={`flex min-h-9 items-center gap-2 rounded-full px-2.5 text-[0.8125rem] transition-colors duration-200 ${
                  active === i ? "bg-wash text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: RAMP[i] }} />
                {label}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
          Share of days each of 1,060 cells was followed by a satellite fire detection, 2019–2026. Select a band
          to isolate it.
        </p>
      </div>
    </>
  );
}

function Results() {
  return (
    <>
      <div className="flex flex-1 flex-col justify-center py-6">
        <p className="text-[0.9375rem] leading-snug text-ink">
          Adding fire history lifts PR-AUC to <span className="font-semibold">2.5×</span> the simple baseline.
        </p>
        <dl className="mt-6 space-y-4">
          {RESULTS.map((r) => (
            <div key={r.label}>
              <dt className="flex items-baseline justify-between gap-3 text-[0.875rem] text-ink-soft">
                <span>
                  <span className={r.best ? "font-semibold text-ink" : ""}>{r.label}</span>
                  {r.note ? <span className="text-muted"> · {r.note}</span> : null}
                </span>
                <span className={`tabular-nums ${r.best ? "font-semibold text-ink" : "text-ink"}`}>{r.value.toFixed(3)}</span>
              </dt>
              <dd className="relative mt-1.5 h-2.5 bg-wash">
                <span
                  aria-hidden="true"
                  className="block h-full rounded-r-[4px]"
                  style={{
                    width: `${(r.value / MAX) * 100}%`,
                    background: r.best ? "var(--color-ember)" : "var(--color-line-strong)",
                  }}
                />
              </dd>
            </div>
          ))}
        </dl>
        {/* Where a random ranking would land, for scale. */}
        <div className="relative mt-3 h-4 text-[0.75rem] text-muted" aria-hidden="true">
          <span className="absolute top-0 h-2 border-l border-ink/40" style={{ left: `${(RANDOM / MAX) * 100}%` }} />
          <span className="absolute top-1.5 whitespace-nowrap" style={{ left: `${(RANDOM / MAX) * 100}%` }}>
            &nbsp;random ≈ {RANDOM}
          </span>
        </div>
      </div>
      <p className="border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-muted">
        PR-AUC on the held-out test period (Jan 2025 – Oct 2026), never used for tuning. Higher is better; a
        random ranking scores about {RANDOM}.
      </p>
    </>
  );
}

/** The wildfire project's preview: the data on one tab, the model's real result on the other. */
export function WildfireMap() {
  const [view, setView] = useState<View>("map");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between tabs, following the WAI-ARIA tabs pattern.
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const i = VIEWS.findIndex((v) => v.id === view);
    const next = (i + (e.key === "ArrowRight" ? 1 : VIEWS.length - 1)) % VIEWS.length;
    setView(VIEWS[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <figure className="flex h-full flex-col border border-line bg-paper p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Wildfire project preview" className="flex gap-1 rounded-full bg-wash p-1" onKeyDown={onKey}>
          {VIEWS.map((v, i) => (
            <button
              key={v.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`wildfire-tab-${v.id}`}
              aria-selected={view === v.id}
              aria-controls={`wildfire-panel-${v.id}`}
              tabIndex={view === v.id ? 0 : -1}
              onClick={() => setView(v.id)}
              className={`min-h-9 rounded-full px-3.5 text-[0.8125rem] font-medium whitespace-nowrap transition-colors duration-200 ${
                view === v.id ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <Provenance kind={view === "map" ? "data" : "result"} />
      </div>

      {VIEWS.map((v) => (
        <div
          key={v.id}
          role="tabpanel"
          id={`wildfire-panel-${v.id}`}
          aria-labelledby={`wildfire-tab-${v.id}`}
          hidden={view !== v.id}
          className="flex flex-1 flex-col"
        >
          {v.id === "map" ? <FireMap /> : <Results />}
        </div>
      ))}
    </figure>
  );
}
