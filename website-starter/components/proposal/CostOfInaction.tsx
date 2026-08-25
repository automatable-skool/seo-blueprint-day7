// 02 - What this is costing you. The big number, then the arithmetic as a
// small icon list - one factor per row - and one sources footnote.
import { CircleDollarSign, MousePointerClick, Filter, Handshake, BadgeDollarSign, Equal } from "lucide-react";
import type { ProposalData } from "./types";
import { Section, d } from "./ui";

const factorIcons = [MousePointerClick, Filter, Handshake, BadgeDollarSign];

export function CostOfInaction({ data }: { data: ProposalData }) {
  const m = data.money;
  return (
    <Section
      number="02"
      kicker="Where you stand"
      title="What this is costing you"
      lead="Not a scare number - every input is measured, sources in the footnote."
      icon={<CircleDollarSign size={15} />}
      panel
    >
      <div className="pp-card pp-glow" style={{ padding: "clamp(26px, 4.5vw, 42px)" }}>
        <div style={{ display: "flex", gap: "28px 56px", flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <p style={{ margin: 0, fontWeight: 900, fontSize: "clamp(46px, 7.5vw, 72px)", lineHeight: 1, letterSpacing: "-0.03em", color: d.accent, fontVariantNumeric: "tabular-nums" }}>
              {m.monthlyLoss}
              <span style={{ fontSize: "0.3em", fontWeight: 700, color: d.muted }}> /month</span>
            </p>
            <p style={{ margin: "12px 0 0", color: d.body, fontSize: 15 }}>
              {m.yearlyLoss} a year &middot; ~{m.missedLeadsPerMonth} missed leads a month
            </p>
          </div>

          {/* The arithmetic, one factor per row */}
          <div style={{ flex: "1 1 300px", maxWidth: 430 }}>
            {m.factors.map((fct, i) => {
              const Icon = factorIcons[i % factorIcons.length];
              return (
                <div key={fct.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "1px solid #efedea" }}>
                  <Icon size={15} style={{ color: d.accent, flexShrink: 0 }} aria-hidden />
                  <span style={{ color: d.text, fontWeight: 800, fontSize: 14, minWidth: 62, fontVariantNumeric: "tabular-nums" }}>{fct.value}</span>
                  <span style={{ color: d.muted, fontSize: 13 }}>{fct.label}</span>
                  {i < m.factors.length - 1 ? (
                    <span aria-hidden style={{ marginLeft: "auto", color: d.faint, fontSize: 13 }}>&times;</span>
                  ) : null}
                </div>
              );
            })}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0 0" }}>
              <Equal size={15} style={{ color: d.accent, flexShrink: 0 }} aria-hidden />
              <span style={{ color: d.accent, fontWeight: 900, fontSize: 15, fontVariantNumeric: "tabular-nums" }}>{m.monthlyLoss} a month</span>
            </div>
          </div>
        </div>

        <p style={{ margin: "18px 0 0", color: d.body, fontSize: 14.5, borderTop: d.hairline, paddingTop: 14 }}>
          <strong style={{ color: d.text }}>Months to parity at the current pace:</strong> {m.monthsToParity}.
        </p>
      </div>
      <p style={{ color: d.faint, margin: "12px 0 0", fontSize: 13 }}>{m.sourcesLine}</p>
    </Section>
  );
}
