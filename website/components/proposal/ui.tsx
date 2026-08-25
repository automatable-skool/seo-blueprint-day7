// Shared building blocks for the proposal - ported from the idiom of the
// real Automatable proposals (dark page, radial glow hero, translucent
// glow-border cards, gradient display numbers) re-skinned to this site's
// terracotta ramp. The Google exhibits stay white on purpose: they read as
// screenshots of Google and pop against the dark ground.
import type { ReactNode, CSSProperties } from "react";

/** Light palette for the proposal page - the site's own warm ramp. */
export const d = {
  page: "#ffffff",
  panel: "#f9f8f6",
  text: "#1a1a19",
  body: "#3f3f3c",
  muted: "#73726e",
  faint: "#9a9995",
  accent: "#ae4826",
  accentStrong: "#d35e36",
  hairline: "1px solid #e3e2de",
};

// Kept exports (light tokens) for the white Google-look exhibits.
export const text = {
  strong: "#1a1a19",
  body: "#3f3f3c",
  muted: "#73726e",
  brand: "#ae4826",
  link: "#ae4826",
};
export const surface = { sunken: "#f0efec", tint: "#fef6f3", card: "#ffffff", accent: "#1c201e" };
export const line = { hairline: "1px solid #e3e2de" };

export const chart = {
  client: "#d35e36",
  competitors: ["#6d6862", "#8f8a83", "#b5b2ab"],
  grid: "#e9e8e4",
  label: "#73726e",
};

export const heroBg = "linear-gradient(135deg, #81361d 0%, #ae4826 55%, #d35e36 100%)";

/** One global stylesheet for the proposal page - the classes every section uses. */
export function ProposalStyles() {
  return (
    <style>{`
.pp{background:${d.page};color:${d.text};font-family:var(--font-core,"Archivo",sans-serif);min-height:100vh}
.pp ::selection{background:#f9d7cc;color:#1a1a19}
.pp-inner{max-width:1152px;margin:0 auto;padding-left:24px;padding-right:24px}
.pp-kicker{font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:${d.accent};display:flex;align-items:center;gap:8px;margin:0}
.pp-h2{font-size:clamp(26px,3.4vw,38px);font-weight:900;letter-spacing:-.02em;line-height:1.1;color:${d.text};margin:14px 0 10px}
.pp-lead{color:${d.muted};font-size:16px;line-height:1.6;max-width:62ch;margin:0 0 34px}
.pp-section{padding:clamp(56px,7vw,96px) 0}
.pp-section--panel{background:${d.panel}}
.pp-card{background:#fff;border:1px solid #e3e2de;border-radius:18px;box-shadow:0 1px 3px rgba(16,24,40,.05)}
.pp-glow{border:1.5px solid #dc7f60;box-shadow:0 4px 20px rgba(16,24,40,.08)}
.pp-gradient{color:#ae4826}
.pp-pill{display:inline-flex;align-items:baseline;gap:8px;padding:9px 18px;border-radius:999px;background:#fff;border:1px solid #e3e2de;box-shadow:0 1px 3px rgba(16,24,40,.06);font-size:14px}
.pp-hairline{border-top:${d.hairline}}
.pp-findings-grid{display:grid;gap:44px}
@media(min-width:1020px){.pp-findings-grid{grid-template-columns:minmax(0,1fr) 400px;align-items:start}.pp-findings-right{position:sticky;top:32px}}
.pp-2col{display:grid;gap:0 40px}
@media(min-width:760px){.pp-2col{grid-template-columns:1fr 1fr}}
.pp-4col{display:grid;gap:12px;grid-template-columns:repeat(2,1fr)}
@media(min-width:860px){.pp-4col{grid-template-columns:repeat(4,1fr)}}
.pp-3col{display:grid;gap:16px}
@media(min-width:900px){.pp-3col{grid-template-columns:repeat(3,1fr);align-items:stretch}}
.pp-proof-grid{display:grid;gap:16px}
@media(min-width:860px){.pp-proof-grid{grid-template-columns:1fr 1fr}}
.pp details summary{list-style:none;cursor:pointer}
.pp details summary::-webkit-details-marker{display:none}
`}</style>
  );
}

/** Score band colors, tuned for the dark ground. */
export function scoreColor(score: number | null): { fg: string } {
  if (score === null) return { fg: d.faint };
  if (score < 40) return { fg: "#d93a2f" };
  if (score < 70) return { fg: "#c26f09" };
  return { fg: "#0d9668" };
}

/** A filled ring meter against 100, coloured by band. */
export function ScoreRing({ score, size, label }: { score: number | null; size: number; label?: string }) {
  const c = scoreColor(score);
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const filled = score === null ? 0 : (score / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} role="img" aria-label={label ? `${label}: ${score ?? "not scored"} of 100` : undefined}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eceae6" strokeWidth={9} />
        {score !== null ? (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={c.fg}
            strokeWidth={9}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circ - filled}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        ) : null}
      </svg>
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: Math.round(size * 0.3),
          color: c.fg,
        }}
      >
        {score === null ? "–" : score}
      </span>
    </div>
  );
}

interface SectionProps {
  number?: string;
  kicker: string;
  title: string;
  lead: string;
  icon?: ReactNode;
  children: ReactNode;
  panel?: boolean;
}

export function Section({ number, kicker, title, lead, icon, children, panel }: SectionProps) {
  return (
    <section className={`pp-section${panel ? " pp-section--panel" : ""}`}>
      <div className="pp-inner">
        <p className="pp-kicker">
          {icon ? <span aria-hidden style={{ display: "inline-flex" }}>{icon}</span> : null}
          {number ? `${number} · ` : ""}{kicker}
        </p>
        <h2 className="pp-h2">{title}</h2>
        <p className="pp-lead">{lead}</p>
        {children}
      </div>
    </section>
  );
}

/** Design-kit alert, dark-tuned: tinted ground, coloured edge, icon. */
export function Alert({ tone, children }: { tone: "info" | "caution" | "critical"; children: ReactNode }) {
  const fg = tone === "info" ? "#0b62c9" : tone === "caution" ? "#a35a06" : "#b52d24";
  const bg = tone === "info" ? "#e8f2ff" : tone === "caution" ? "#fdf3e6" : "#fdedec";
  return (
    <div style={{ background: bg, borderLeft: `3px solid ${fg}`, borderRadius: "0 12px 12px 0", padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start", color: d.body, fontSize: 14 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ flexShrink: 0, marginTop: 2 }}>
        {tone === "info" ? (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </>
        ) : (
          <>
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
            <path d="M12 9v4M12 17h.01" />
          </>
        )}
      </svg>
      <span>{children}</span>
    </div>
  );
}

/** Wide content scrolls inside this instead of the page. */
export function Scroller({ children }: { children: ReactNode }) {
  return <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>{children}</div>;
}

export type { CSSProperties };
