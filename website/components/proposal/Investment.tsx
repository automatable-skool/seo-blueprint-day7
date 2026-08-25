// 05 - Investment. Three tier cards; the recommended one carries the glow
// border and the gradient price, exactly like the real proposals do it.
import { Wallet, Check } from "lucide-react";
import type { ProposalData } from "./types";
import { Section, d } from "./ui";

export function Investment({ data }: { data: ProposalData }) {
  return (
    <Section
      icon={<Wallet size={15} />}
      number="05"
      kicker="The fix"
      title="Investment"
      lead="Fixed prices, in USD. No onboarding fees, no surprise line items."
    >
      <div className="pp-3col">
        {data.investment.options.map((o) => {
          const rec = Boolean(o.recommended);
          return (
            <div key={o.name} className={`pp-card${rec ? " pp-glow" : ""}`} style={{ padding: "32px 30px", display: "flex", flexDirection: "column", borderRadius: 20 }}>
              {rec ? (
                <span style={{ alignSelf: "flex-start", background: "#fbeae5", border: "1px solid #edbeae", color: d.accent, borderRadius: 999, padding: "5px 12px", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  Recommended
                </span>
              ) : (
                <span style={{ height: 26 }} aria-hidden />
              )}
              <h3 style={{ fontSize: 17, fontWeight: 800, color: d.text, margin: "16px 0 0" }}>{o.name}</h3>
              <p style={{ fontWeight: 900, fontSize: 46, lineHeight: 1, margin: "14px 0 0", letterSpacing: "-0.025em", fontVariantNumeric: "tabular-nums" }}>
                {rec ? <span className="pp-gradient">{o.price}</span> : <span style={{ color: d.text }}>{o.price}</span>}
              </p>
              <p style={{ color: d.muted, fontSize: 13.5, margin: "10px 0 0", lineHeight: 1.55 }}>{o.term}</p>
              <div style={{ borderTop: d.hairline, margin: "18px 0 0", paddingTop: 6 }}>
                {o.included.map((i) => (
                  <p key={i} style={{ color: d.body, fontSize: 14, margin: "12px 0 0", display: "flex", gap: 10, lineHeight: 1.5, alignItems: "flex-start" }}>
                    <span style={{ width: 20, height: 20, borderRadius: 999, background: rec ? "#fbeae5" : "#e6f6f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <Check size={12} style={{ color: rec ? d.accent : "#0d9668" }} aria-hidden />
                    </span>
                    {i}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p style={{ color: d.muted, margin: "22px 0 0", maxWidth: "70ch", fontSize: 14.5, lineHeight: 1.65 }}>{data.investment.terms}</p>
    </Section>
  );
}
