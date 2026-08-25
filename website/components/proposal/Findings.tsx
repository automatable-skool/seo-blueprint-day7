// 03 - The findings. Two-column: everything analytical on the left (gap table,
// visibility chart, findings, notes), the Google-look exhibits (live SERP
// render, Business Profile panel, map pack) stacked on the right where they
// read as screenshots. Real pulled data or a named gap - never a fake.
import { Search, Crown } from "lucide-react";
import type { CSSProperties } from "react";
import type { ProposalData, Finding } from "./types";
import { Section, Alert, d } from "./ui";
import { VisibilityChart } from "./exhibits/VisibilityChart";
import { SerpRender } from "./exhibits/SerpRender";
import { GeoGrid } from "./exhibits/GeoGrid";
import { GbpPanel } from "./exhibits/GbpPanel";

const cell: CSSProperties = { padding: "9px 10px", textAlign: "right", fontSize: 14, whiteSpace: "nowrap", color: d.body };
const headCell: CSSProperties = { ...cell, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: d.faint, whiteSpace: "normal" };

const dot: Record<Finding["status"], string> = {
  positive: "#0d9668",
  caution: "#c26f09",
  critical: "#d93a2f",
};

function SubHead({ children }: { children: string }) {
  return <h3 style={{ fontSize: 17, fontWeight: 800, color: d.text, margin: "40px 0 16px" }}>{children}</h3>;
}

export function Findings({ data }: { data: ProposalData }) {
  const f = data.findings;
  return (
    <Section
      number="03"
      kicker="Where you stand"
      title="The findings"
      lead="The businesses holding your page-one spots, and the handful of things costing you the most."
      icon={<Search size={15} />}
    >
      <div className="pp-findings-grid">
        {/* LEFT - the analysis */}
        <div>
          <div className="pp-card" style={{ padding: "6px 14px 10px" }}>
            <table style={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed" }}>
              <thead>
                <tr style={{ borderBottom: d.hairline }}>
                  <th style={{ ...headCell, textAlign: "left", width: "34%" }}>Domain</th>
                  <th style={headCell}>Reviews</th>
                  <th style={headCell}>Visitors / mo</th>
                  <th style={headCell}>Searches ranked</th>
                  <th style={headCell}>Links from other sites</th>
                </tr>
              </thead>
              <tbody>
                {f.rows.map((r, i) => (
                  <tr key={r.domain} style={{ borderBottom: i === f.rows.length - 1 ? "none" : d.hairline, background: r.isClient ? "#fef6f3" : r.isWinner ? "#e6f6f0" : "transparent" }}>
                    <td style={{ ...cell, textAlign: "left", whiteSpace: "normal", overflowWrap: "break-word", fontWeight: r.isClient ? 700 : 400, color: r.isClient ? d.accent : d.text }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                        {r.isWinner ? <Crown size={13} style={{ color: "#0d9668", flexShrink: 0 }} aria-label="Leader" /> : null}
                        {r.domain}
                        {r.isClient ? " (you)" : ""}
                      </span>
                    </td>
                    <td style={{ ...cell, whiteSpace: "normal" }}>{r.reviews}</td>
                    <td style={cell}>{r.monthlyTraffic}</td>
                    <td style={cell}>{r.keywords}</td>
                    <td style={cell}>{r.referringDomains}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {f.tableWarnings?.length ? (
            <div style={{ display: "grid", gap: 10, margin: "14px 0 0" }}>
              {f.tableWarnings.map((w) => (
                <Alert key={w} tone="caution">{w}</Alert>
              ))}
            </div>
          ) : null}
          {f.tableNote ? <p style={{ color: d.faint, margin: "12px 0 0", fontSize: 13 }}>{f.tableNote}</p> : null}

          {f.visibility ? (
            <>
              <SubHead>Twelve months of visibility</SubHead>
              <VisibilityChart data={f.visibility} />
            </>
          ) : null}

          {f.geoGrid ? (
            <>
              <SubHead>The map ranking grid</SubHead>
              <GeoGrid data={f.geoGrid} />
            </>
          ) : null}


          <SubHead>What it adds up to</SubHead>
          <div>
            {f.items.map((it, i) => (
              <div key={it.text} style={{ borderTop: i === 0 ? "none" : d.hairline, padding: "13px 0", display: "flex", gap: 12 }}>
                <span aria-hidden style={{ width: 8, height: 8, borderRadius: 999, background: dot[it.status], flexShrink: 0, marginTop: 8 }} />
                <span style={{ color: d.body, fontSize: 15, lineHeight: 1.6 }}>{it.text}</span>
              </div>
            ))}
          </div>

          {f.missing?.length ? (
            <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
              {f.missing.map((m) => (
                <Alert key={m} tone="caution">{m}</Alert>
              ))}
            </div>
          ) : null}
        </div>

        {/* RIGHT - the Google exhibits, rendered as the real thing */}
        <div className="pp-findings-right">
          {f.serp ? (
            <>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: d.text, margin: "0 0 16px" }}>The search you&rsquo;re losing</h3>
              <SerpRender data={f.serp} />
            </>
          ) : null}

          {f.gbp ? (
            <>
              <SubHead>The Business Profile gap</SubHead>
              <GbpPanel data={f.gbp} />
            </>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
