// 07 - FAQ. Six to eight questions that kill the real objections, two columns.
import { MessageCircleQuestion } from "lucide-react";
import type { ProposalData } from "./types";
import { Section, d } from "./ui";

export function Faq({ data }: { data: ProposalData }) {
  return (
    <Section
      icon={<MessageCircleQuestion size={15} />}
      number="07"
      kicker="Questions"
      title="The things you're wondering"
      lead="Straight answers. If yours isn't here, ask on the call."
    >
      <div className="pp-2col">
        {data.faq.map((f) => (
          <details key={f.q} style={{ borderTop: d.hairline, padding: "4px 0" }}>
            <summary style={{ color: d.text, fontWeight: 700, padding: "14px 0", fontSize: 15.5, display: "flex", justifyContent: "space-between", gap: 12 }}>
              {f.q}
              <span aria-hidden style={{ color: d.accent, fontWeight: 400, fontSize: 18, lineHeight: 1.2 }}>+</span>
            </summary>
            <p style={{ color: d.muted, margin: "0 0 18px", fontSize: 14.5, lineHeight: 1.65 }}>{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
