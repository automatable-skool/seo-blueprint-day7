// 01 - The scorecard. One overall ring plus four pillar meters in a single
// row, 1-100. The overall score is the biggest element on screen.
import { Gauge } from "lucide-react";
import type { ProposalData } from "./types";
import { Section, ScoreRing, d } from "./ui";

export function Scorecard({ data }: { data: ProposalData }) {
  return (
    <Section
      number="01"
      kicker="Where you stand"
      title="The scorecard"
      lead={`Scored from live data pulled ${data.dateLabel}.`}
      icon={<Gauge size={15} />}
    >
      <div className="pp-card" style={{ padding: "clamp(22px, 4vw, 34px)", display: "flex", alignItems: "center", gap: 30, flexWrap: "wrap", marginBottom: 14 }}>
        <ScoreRing score={data.scorecard.overall} size={140} label="Overall" />
        <div style={{ flex: "1 1 280px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: d.faint, margin: 0 }}>Overall</p>
          <p style={{ color: d.body, margin: "10px 0 0", fontSize: 16.5, lineHeight: 1.6, maxWidth: "44ch" }}>{data.scorecard.overallReason}</p>
        </div>
      </div>
      <div className="pp-4col">
        {data.scorecard.pillars.map((p) => (
          <div key={p.name} className="pp-card" style={{ padding: "20px 18px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ScoreRing score={p.score} size={66} label={p.name} />
            </div>
            <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: d.muted, margin: "12px 0 0", fontWeight: 700 }}>
              {p.name}
            </p>
            <p style={{ color: d.muted, margin: "8px 0 0", fontSize: 13, lineHeight: 1.5, textAlign: "left" }}>{p.reason}</p>
          </div>
        ))}
      </div>
      {data.scorecard.note ? (
        <p style={{ color: d.faint, margin: "16px 0 0", fontSize: 13 }}>{data.scorecard.note}</p>
      ) : null}
    </Section>
  );
}
