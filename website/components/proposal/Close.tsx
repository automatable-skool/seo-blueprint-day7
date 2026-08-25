// The close. One action, one restated cost of doing nothing. Never a menu.
import { ArrowRight } from "lucide-react";
import type { ProposalData } from "./types";
import { Section, d } from "./ui";

export function Close({ data }: { data: ProposalData }) {
  return (
    <Section icon={<ArrowRight size={15} />} kicker="Next step" title="One click, then we talk" lead={data.close.costReminder} panel>
      <div className="pp-card pp-glow" style={{ padding: "clamp(32px, 5vw, 52px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative" }}>
          <a
            href={data.close.ctaUrl}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#d35e36",
              color: "#fff",
              fontWeight: 800,
              fontSize: 17,
              textDecoration: "none",
              borderRadius: 999,
              padding: "18px 38px",
              boxShadow: "0 4px 16px rgba(211,94,54,.3)",
            }}
          >
            {data.close.ctaLabel}
            <ArrowRight size={18} aria-hidden />
          </a>
          <p style={{ color: d.muted, margin: "18px 0 0", fontSize: 14 }}>
            This proposal expires {data.expiryLabel}. The prices in section 05 are held until then.
          </p>
        </div>
      </div>
    </Section>
  );
}
