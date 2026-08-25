// The visibility chart: trend lines of estimated monthly organic traffic,
// client vs competitors, inline SVG from the real history pull. Dark-tuned.
import type { VisibilityExhibit } from "../types";
import { Scroller, chart, d } from "../ui";

const W = 760;
const H = 300;
const PAD = { top: 16, right: 190, bottom: 28, left: 54 };

export function VisibilityChart({ data }: { data: VisibilityExhibit }) {
  const n = data.monthLabels.length;
  const max = Math.max(...data.series.flatMap((s) => s.values.filter((v): v is number => v !== null)));
  const x = (i: number) => PAD.left + (i / (n - 1)) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - v / max) * (H - PAD.top - PAD.bottom);

  let compIdx = -1;
  return (
    <figure style={{ margin: 0 }}>
      <Scroller>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ minWidth: 620, width: "100%", display: "block" }} role="img" aria-label="Monthly organic traffic, client vs competitors">
          {[0, 0.5, 1].map((f) => (
            <g key={f}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(f * max)} y2={y(f * max)} stroke={chart.grid} strokeWidth={1} />
              <text x={PAD.left - 8} y={y(f * max) + 4} textAnchor="end" fontSize={11} fill={chart.label}>
                {Math.round(f * max).toLocaleString("en-US")}
              </text>
            </g>
          ))}
          <text x={PAD.left} y={H - 6} fontSize={11} fill={chart.label}>{data.monthLabels[0]}</text>
          <text x={W - PAD.right} y={H - 6} textAnchor="end" fontSize={11} fill={chart.label}>{data.monthLabels[n - 1]}</text>
          {data.series.map((s) => {
            const color = s.isClient ? chart.client : chart.competitors[(compIdx += 1) % chart.competitors.length];
            const pts = s.values
              .map((v, i) => (v === null ? null : `${x(i)},${y(v)}`))
              .filter(Boolean)
              .join(" ");
            const lastIdx = s.values.reduce<number>((acc, v, i) => (v === null ? acc : i), 0);
            const lastVal = s.values[lastIdx];
            return (
              <g key={s.name}>
                <polyline points={pts} fill="none" stroke={color} strokeWidth={s.isClient ? 3 : 2} strokeLinejoin="round" />
                {lastVal !== null ? (
                  <text x={x(lastIdx) + 8} y={y(lastVal) + 4} fontSize={12} fontWeight={s.isClient ? 800 : 500} fill={s.isClient ? chart.client : chart.label}>
                    {s.name} · {lastVal.toLocaleString("en-US")}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </Scroller>
      <figcaption style={{ color: d.muted, fontSize: 14, margin: "12px 0 0", paddingTop: 12, borderTop: d.hairline, maxWidth: "68ch", lineHeight: 1.6 }}>
        {data.readout}
      </figcaption>
    </figure>
  );
}
