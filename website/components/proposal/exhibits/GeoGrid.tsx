// The map ranking grid - LocalFalcon-style, same as the real Automatable
// audit exhibit: 25 points across the city, each badge a real Google Maps
// search from that spot. Green = in the 3-pack, amber = ranked 4-10,
// red X = not found. Facts only - the colors are Google's answer, not ours.
import type { GeoGridExhibit } from "../types";
import { Alert, d } from "../ui";

function badge(rank: number | null): { bg: string; label: string } {
  if (typeof rank !== "number") return { bg: "rgba(181,51,51,.88)", label: "×" };
  if (rank <= 3) return { bg: "#2e7d43", label: String(rank) };
  if (rank <= 10) return { bg: "#d4a017", label: String(rank) };
  return { bg: "rgba(181,51,51,.75)", label: String(rank) };
}

export function GeoGrid({ data }: { data: GeoGridExhibit }) {
  if (!data.ranks) {
    return (
      <div style={{ margin: 0 }}>
        <Alert tone="info">{data.note}</Alert>
      </div>
    );
  }
  const inPack = data.ranks.filter((r) => typeof r === "number" && r <= 3).length;
  const missing = data.ranks.filter((r) => r === null).length;

  return (
    <div style={{ margin: 0 }}>
      <div className="pp-card" style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <p style={{ margin: 0, fontFamily: "var(--font-mono, monospace)", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: d.muted }}>
            Where the map shows you
          </p>
          <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase", color: d.muted, whiteSpace: "nowrap" }}>
            <span style={{ color: "#2e7d43", fontWeight: 700 }}>{inPack}</span>/25 in the top 3 &middot;{" "}
            <span style={{ color: "#b53333", fontWeight: 700 }}>{missing}</span> invisible
          </span>
        </div>

        <div
          role="img"
          aria-label={`Map rank grid for ${data.keyword}: ${inPack} of 25 points in the top 3, ${missing} invisible`}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 440,
            margin: "0 auto",
            aspectRatio: "1/1",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #e3e2de",
            background: "#eef2ea",
          }}
        >
          {data.mapImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.mapImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          ) : null}
          {data.attribution ? (
            <span style={{ position: "absolute", right: 4, bottom: 3, fontSize: 9, color: "#5f5d58", background: "rgba(255,255,255,.72)", padding: "1px 5px", borderRadius: 4, zIndex: 2 }}>
              {data.attribution}
            </span>
          ) : null}
          {data.ranks.map((r, i) => {
            const b = badge(r);
            const row = Math.floor(i / 5);
            const col = i % 5;
            return (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: `${10 + col * 20}%`,
                  top: `${10 + row * 20}%`,
                  transform: "translate(-50%, -50%)",
                  width: "11%",
                  aspectRatio: "1/1",
                  borderRadius: 999,
                  background: b.bg,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono, monospace)",
                  fontWeight: 600,
                  fontSize: 14,
                  boxShadow: "0 1px 4px rgba(0,0,0,.35)",
                  outline: "2px solid rgba(255,255,255,.8)",
                }}
              >
                {b.label}
              </span>
            );
          })}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px 16px", marginTop: 14 }}>
          {[
            { c: "#2e7d43", t: "Top 3" },
            { c: "#d4a017", t: "Ranked 4-10" },
            { c: "rgba(181,51,51,.8)", t: "Not shown" },
          ].map((l) => (
            <span key={l.t} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono, monospace)", fontSize: 9, letterSpacing: "1px", textTransform: "uppercase", color: d.muted }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: l.c }} /> {l.t}
            </span>
          ))}
        </div>

        <p style={{ fontSize: 12, color: d.muted, margin: "14px 0 0", lineHeight: 1.55 }}>
          Every badge is a real Google Maps search for &ldquo;{data.keyword}&rdquo; from that exact spot. Green means customers there find {data.businessName}. Red means they find competitors instead.
        </p>
      </div>
      {data.demoLabel ? (
        <div style={{ marginTop: 12 }}>
          <Alert tone="caution">{data.demoLabel}</Alert>
        </div>
      ) : null}
      <p style={{ color: d.faint, fontSize: 13, margin: "12px 0 0" }}>{data.note}</p>
    </div>
  );
}
