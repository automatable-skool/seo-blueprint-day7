// The Business Profile gap: a faithful render of the competitor's actual
// Google Business Profile knowledge panel, followed by the account audit -
// field by field, what's good and what's bad, from the live business-data
// pull. GbpGhost (the client's missing panel) renders separately, on the left.
import type { GbpExhibit, GbpAuditRow } from "../types";
import { d } from "../ui";

const G_FONT = "arial, sans-serif";

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} stars`} style={{ display: "inline-flex", gap: 1, verticalAlign: "-2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? "#fbbc04" : "#dadce0"} aria-hidden>
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" />
        </svg>
      ))}
    </span>
  );
}

function PanelButton({ label, path }: { label: string; path: string }) {
  return (
    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, fontSize: 12, color: "#1a73e8" }}>
      <span style={{ width: 38, height: 38, borderRadius: 999, border: "1px solid #dadce0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d={path} />
        </svg>
      </span>
      {label}
    </span>
  );
}

const auditColors: Record<GbpAuditRow["status"], { fg: string; mark: string }> = {
  good: { fg: "#0d9668", mark: "✓" },
  warn: { fg: "#a35a06", mark: "!" },
  bad: { fg: "#b52d24", mark: "✕" },
};

/** The client's missing panel - same frame as a knowledge panel, nothing in it. */
export function GbpGhost({ data }: { data: GbpExhibit }) {
  return (
    <div style={{ border: "2px dashed #cfccc5", background: "#fbfaf8", borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 26, textAlign: "center", minHeight: 170 }}>
      <p style={{ margin: 0, fontSize: 21, color: d.muted, fontFamily: G_FONT }}>{data.clientName}</p>
      <p style={{ margin: "8px 0 0", fontSize: 14 }}>
        <Stars rating={0} />
      </p>
      <p style={{ margin: "10px 0 0", color: "#b52d24", fontWeight: 700, fontSize: 15 }}>{data.clientGhost}</p>
    </div>
  );
}

export function GbpPanel({ data }: { data: GbpExhibit }) {
  const p = data.panel;
  if (!p) return null;
  return (
    <div style={{ margin: 0 }}>
      <div style={{ borderRadius: 16, overflow: "hidden", background: "#fff", fontFamily: G_FONT, border: "1px solid #e3e2de", boxShadow: "0 8px 30px rgba(16,24,40,.10)" }}>
        {/* Map strip with their pin, like the live panel shows */}
        {p.mapImage ? (
          <div aria-hidden style={{ position: "relative", height: 96, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.mapImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <svg width="30" height="30" viewBox="0 0 24 24" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -85%)", filter: "drop-shadow(0 1px 2px rgba(0,0,0,.4))" }}>
              <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" fill="#ea4335" />
              <circle cx="12" cy="9" r="2.6" fill="#fff" />
            </svg>
            {p.attribution ? (
              <span style={{ position: "absolute", right: 3, bottom: 2, fontSize: 8.5, color: "#5f5d58", background: "rgba(255,255,255,.72)", padding: "1px 4px", borderRadius: 3 }}>{p.attribution}</span>
            ) : null}
          </div>
        ) : (
          <div aria-hidden style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 2, height: 84 }}>
            <div style={{ background: "#e8eaed" }} />
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 2 }}>
              <div style={{ background: "#dde1e5" }} />
              <div style={{ background: "#e8eaed" }} />
            </div>
          </div>
        )}
        <div style={{ padding: "14px 18px 18px" }}>
          <p style={{ margin: 0, fontSize: 22, color: "#202124", lineHeight: 1.2 }}>{p.name}</p>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: "#70757a" }}>
            <span style={{ color: "#202124" }}>{p.ratingValue.toFixed(1)}</span> <Stars rating={p.ratingValue} />{" "}
            <a style={{ color: "#1a73e8", textDecoration: "none" }}>{p.reviewsCount} Google reviews</a>
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 14, color: "#70757a" }}>{p.subtitle}</p>
          <div style={{ display: "flex", gap: 22, margin: "14px 0 0" }}>
            <PanelButton label="Website" path="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20" />
            <PanelButton label="Directions" path="m21.7 11.3-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4zM14 14.5V12h-4v3H8v-4a1 1 0 0 1 1-1h5V7.5l3.5 3.5z" />
            <PanelButton label="Call" path="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.8.7a2 2 0 0 1 1.7 2z" />
          </div>
          {p.description ? (
            <p style={{ margin: "14px 0 0", fontSize: 13.5, color: "#4d5156", lineHeight: 1.55, borderTop: "1px solid #ebebeb", paddingTop: 12 }}>
              {p.description}
            </p>
          ) : null}
        </div>

        {/* The account audit - field by field, good and bad */}
        <div style={{ borderTop: "1px solid #ebebeb", padding: "12px 18px 16px", fontFamily: "var(--font-core, sans-serif)" }}>
          <p style={{ margin: "0 0 4px", fontFamily: "var(--font-mono, monospace)", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: d.muted }}>
            Profile audit
          </p>
          {data.auditRows.map((r) => {
            const c = auditColors[r.status];
            return (
              <div key={r.label} style={{ display: "flex", gap: 10, alignItems: "baseline", padding: "7px 0", borderBottom: "1px solid #f2f1ee" }}>
                <span aria-label={r.status} style={{ color: c.fg, fontWeight: 800, fontSize: 12.5, width: 14, flexShrink: 0, textAlign: "center" }}>{c.mark}</span>
                <span style={{ color: d.text, fontSize: 13, fontWeight: 700, width: 92, flexShrink: 0 }}>{r.label}</span>
                <span style={{ color: d.body, fontSize: 13, lineHeight: 1.5 }}>{r.value}</span>
              </div>
            );
          })}
          {data.auditNote ? (
            <p style={{ margin: "10px 0 0", fontSize: 12, color: d.faint, lineHeight: 1.5 }}>{data.auditNote}</p>
          ) : null}
        </div>
      </div>
      <p style={{ color: d.faint, fontSize: 13, margin: "12px 0 0" }}>{data.note}</p>
    </div>
  );
}
