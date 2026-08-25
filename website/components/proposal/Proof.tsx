// 06 - Proof. Real faces, their verbatim words, the number, and the video of
// them saying it. Sourced only from context/proof/ - never an invented result.
import { BadgeCheck, Play } from "lucide-react";
import type { ProposalData } from "./types";
import { Section, d } from "./ui";

export function Proof({ data }: { data: ProposalData }) {
  return (
    <Section
      icon={<BadgeCheck size={15} />}
      panel
      number="06"
      kicker="Proof"
      title="This isn't our first one"
      lead="Real clients, real numbers, on video saying it themselves."
    >
      <div className="pp-proof-grid">
        {data.proof.items.map((p) => (
          <div key={p.name} className="pp-card" style={{ padding: 28, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {p.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.photoUrl} alt={p.name} width={54} height={54} style={{ borderRadius: 999, objectFit: "cover", border: "2px solid #e3e2de" }} />
              ) : null}
              <div>
                <p style={{ color: d.text, fontWeight: 700, margin: 0, fontSize: 15.5 }}>{p.name}</p>
                <p style={{ color: d.muted, fontSize: 13, margin: "3px 0 0" }}>{p.business}</p>
              </div>
            </div>
            <p style={{ fontWeight: 900, fontSize: 27, lineHeight: 1.15, margin: "18px 0 0" }}>
              <span className="pp-gradient">{p.result}</span>
            </p>
            <p style={{ color: d.body, margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.6 }}>{p.detail}</p>
            {p.quote ? (
              <blockquote style={{ margin: "16px 0 0", padding: "0 0 0 14px", borderLeft: `3px solid rgba(211,94,54,.5)`, color: d.muted, fontSize: 14.5, fontStyle: "italic", lineHeight: 1.65 }}>
                &ldquo;{p.quote}&rdquo;
              </blockquote>
            ) : null}
            {p.videoUrl ? (
              <a href={p.videoUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", position: "relative", marginTop: "auto", paddingTop: 18, borderRadius: 12, overflow: "hidden" }}>
                {p.videoThumbUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.videoThumbUrl} alt={`Video: ${p.name}`} style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} />
                ) : null}
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(26,26,25,.25)" }}>
                  <span style={{ width: 52, height: 52, borderRadius: 999, background: "rgba(255,255,255,.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 14px rgba(0,0,0,.4)" }}>
                    <Play size={22} style={{ color: "#ae4826", marginLeft: 3 }} aria-hidden />
                  </span>
                </span>
              </a>
            ) : null}
          </div>
        ))}
      </div>
      <div style={{ margin: "26px 0 0" }}>
        {data.proof.credentials.map((c, i) => (
          <p key={c} style={{ color: d.body, borderTop: i === 0 ? "none" : d.hairline, padding: "11px 0", fontSize: 14.5, margin: 0, lineHeight: 1.6 }}>
            {c}
          </p>
        ))}
      </div>
    </Section>
  );
}
