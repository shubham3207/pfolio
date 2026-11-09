"use client";

import { useState, type KeyboardEvent, type PointerEvent } from "react";
import { ANOMALY_YEAR, INFLATION, MOVING_AVG } from "./inflation-series";
import { Provenance } from "../ui/provenance";

const W = 560;
const H = 330;
const M = { top: 20, right: 24, bottom: 32, left: 34 };
const X0 = 2014;
const X1 = 2024;
const Y0 = 0;
const Y1 = 9;
const TICKS_Y = [0, 2, 4, 6, 8];
const TICKS_X = [2014, 2016, 2018, 2020, 2022, 2024];

const x = (year: number) => M.left + ((year - X0) / (X1 - X0)) * (W - M.left - M.right);
const y = (v: number) => M.top + ((Y1 - v) / (Y1 - Y0)) * (H - M.top - M.bottom);
const line = (s: ReadonlyArray<readonly [number, number]>) =>
  s.map(([yr, v], i) => `${i ? "L" : "M"}${x(yr).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

// Same encoding as the dashboard: a solid line for the rate, a dashed one for its moving average.
const SERIES = [
  { key: "rate", label: "United States", short: "US", data: INFLATION, color: "var(--color-chart-blue)", dash: undefined },
  { key: "avg", label: "3-year moving average", short: "3-yr avg", data: MOVING_AVG, color: "var(--color-ember)", dash: "5 4" },
] as const;

const valueAt = (data: ReadonlyArray<readonly [number, number]>, year: number) =>
  data.find(([yr]) => yr === year)?.[1];

const PEAK = valueAt(INFLATION, ANOMALY_YEAR) ?? 0;

/** The inflation project's preview: the trend chart from its live dashboard, redrawn from the same values. */
export function InflationChart() {
  const [year, setYear] = useState<number | null>(null);

  function onPointer(e: PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const yr = Math.round(X0 + ((px - M.left) / (W - M.left - M.right)) * (X1 - X0));
    setYear(Math.min(X1, Math.max(X0, yr)));
  }

  function onKey(e: KeyboardEvent<SVGSVGElement>) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const step = e.key === "ArrowLeft" ? -1 : 1;
    setYear((cur) => Math.min(X1, Math.max(X0, (cur ?? X1) + step)));
  }

  const tipX = year !== null ? x(year) : 0;
  const tipLeft = tipX > W / 2;

  return (
    <figure className="relative flex h-full flex-col border border-line bg-paper p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="eyebrow">Inflation trend, United States, 2014–2024</span>
        <Provenance kind="result" />
      </div>

      <div className="flex flex-1 items-center py-6">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full touch-pan-y outline-none focus-visible:outline-2 focus-visible:outline-forest"
          role="img"
          aria-label="Line chart from the project dashboard: United States annual inflation, 2014 to 2024, with its 3-year moving average. Inflation stayed between about 0 and 2.5 percent until 2020, then rose to 8.0 percent in 2022, the year the dashboard flags as an anomaly, and eased to 2.9 percent by 2024. Use left and right arrow keys to read values by year."
          tabIndex={0}
          onPointerMove={onPointer}
          onPointerDown={onPointer}
          onPointerLeave={() => setYear(null)}
          onKeyDown={onKey}
          onBlur={() => setYear(null)}
        >
          {TICKS_Y.map((t) => (
            <g key={t}>
              <line
                x1={M.left}
                x2={W - M.right}
                y1={y(t)}
                y2={y(t)}
                stroke="var(--color-ink)"
                strokeOpacity={t === 0 ? 0.45 : 0.1}
                strokeWidth={1}
              />
              <text x={M.left - 8} y={y(t) + 4} textAnchor="end" className="fill-muted font-sans tabular-nums text-[13px]">
                {t}
              </text>
            </g>
          ))}
          {TICKS_X.map((t) => (
            <text key={t} x={x(t)} y={H - 8} textAnchor="middle" className="fill-muted font-sans tabular-nums text-[13px]">
              {t}
            </text>
          ))}

          {SERIES.map((s) => (
            <path
              key={s.key}
              d={line(s.data)}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeDasharray={s.dash}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
          {INFLATION.map(([yr, v]) => (
            <circle key={yr} cx={x(yr)} cy={y(v)} r={2.5} fill="var(--color-chart-blue)" />
          ))}

          {/* The point the dashboard's z-score detector flags. */}
          <g aria-hidden="true">
            <circle cx={x(ANOMALY_YEAR)} cy={y(PEAK)} r={8} fill="none" stroke="var(--color-ink)" strokeOpacity={0.55} strokeWidth={1.25} />
            {/* Hidden while the tooltip is up, which would otherwise sit on top of it. */}
            {year === null ? (
              <text x={x(ANOMALY_YEAR) - 14} y={y(PEAK) + 4} textAnchor="end" className="fill-ink-soft text-[13px]">
                Flagged anomaly
              </text>
            ) : null}
          </g>

          {year !== null ? (
            <g aria-hidden="true">
              <line
                x1={tipX}
                x2={tipX}
                y1={M.top}
                y2={H - M.bottom}
                stroke="var(--color-ink)"
                strokeOpacity={0.35}
                strokeDasharray="3 3"
              />
              {SERIES.map((s) => {
                const v = valueAt(s.data, year);
                return v === undefined ? null : (
                  <circle key={s.key} cx={tipX} cy={y(v)} r={4.5} fill={s.color} stroke="var(--color-paper)" strokeWidth={2} />
                );
              })}
              <g transform={`translate(${tipLeft ? tipX - 142 : tipX + 10}, ${M.top})`}>
                <rect width={132} height={66} rx={3} fill="var(--color-paper)" stroke="var(--color-line)" />
                <text x={10} y={18} className="fill-ink font-sans tabular-nums text-[13px]">
                  {year}
                </text>
                {SERIES.map((s, i) => (
                  <text key={s.key} x={10} y={38 + i * 17} className="fill-ink-soft text-[13px]">
                    {s.short}: {valueAt(s.data, year)?.toFixed(1)}%
                  </text>
                ))}
              </g>
            </g>
          ) : null}
        </svg>
      </div>

      <div className="sr-only">
        <table>
          <caption>United States inflation (annual %) and 3-year moving average, from the project dashboard</caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Inflation</th>
              <th scope="col">3-year moving average</th>
            </tr>
          </thead>
          <tbody>
            {INFLATION.map(([yr, v]) => (
              <tr key={yr}>
                <th scope="row">{yr}</th>
                <td>{v}</td>
                <td>{valueAt(MOVING_AVG, yr)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figcaption className="border-t border-line pt-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legend">
          {SERIES.map((s) => (
            <li key={s.key} className="flex items-center gap-2 text-[0.8125rem] text-ink-soft">
              <svg aria-hidden="true" width="16" height="2" className="overflow-visible">
                <line x1="0" x2="16" y1="1" y2="1" stroke={s.color} strokeWidth="2" strokeDasharray={s.dash ? "4 3" : undefined} />
              </svg>
              {s.label}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
          The trend chart from the project’s live dashboard (World Bank data), redrawn from the same values. The
          2022 peak is the point its z-score detector flags.
        </p>
      </figcaption>
    </figure>
  );
}
