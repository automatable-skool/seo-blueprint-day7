// 04 - Timeline. The plan and the schedule are one section: every row is a
// date and a thing the client can open. Honest about when results show.
import { CalendarRange } from "lucide-react";
import type { ProposalData } from "./types";
import { Section, Alert, d } from "./ui";

export function Timeline({ data }: { data: ProposalData }) {
  return (
    <Section
      number="04"
      kicker="The fix"
      title="Timeline"
      lead="The plan and the schedule are the same thing: every row is something you can open and look at."
      icon={<CalendarRange size={15} />}
      panel
    >
      <div className="pp-card" style={{ padding: "10px 26px" }}>
        {data.timeline.rows.map((r, i) => (
          <div key={r.when} style={{ borderTop: i === 0 ? "none" : d.hairline, padding: "15px 0", display: "grid", gridTemplateColumns: "minmax(100px, 150px) 1fr", gap: 16 }}>
            <span style={{ color: d.accent, fontWeight: 800, fontSize: 14, letterSpacing: "0.02em" }}>{r.when}</span>
            <span style={{ color: d.body, fontSize: 15, lineHeight: 1.6 }}>{r.visible}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <Alert tone="info">{data.timeline.expectation}</Alert>
      </div>
    </Section>
  );
}
