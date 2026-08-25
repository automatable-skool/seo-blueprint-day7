// The search they're losing: a faithful render of the LIVE Google result.
// Real titles, real breadcrumbs, real snippets, real positions - it reads like
// Google because the data IS Google's. Nothing invented, nothing reordered.
import type { SerpExhibit } from "../types";
import { line } from "../ui";  // light tokens: this card renders as Google, white on purpose

const G_FONT = "arial, sans-serif";

export function SerpRender({ data }: { data: SerpExhibit }) {
  return (
    <div style={{ margin: 0, borderRadius: 16, overflow: "hidden", background: "#fff", fontFamily: G_FONT, border: "1px solid #e3e2de", boxShadow: "0 8px 30px rgba(16,24,40,.10)" }}>
      {/* Search bar */}
      <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #ebebeb" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid #dfe1e5", borderRadius: 24, padding: "11px 18px", maxWidth: 560, boxShadow: "0 1px 6px rgba(32,33,36,.12)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.8-3.8" />
          </svg>
          <span style={{ color: "#202124", fontSize: 16 }}>{data.keyword}</span>
        </div>
      </div>

      <div style={{ padding: "16px 20px 4px", maxWidth: 620 }}>
        {data.aiOverview ? (
          <div style={{ border: "1px solid #e8eaed", borderRadius: 12, padding: "12px 16px", marginBottom: 18, background: "linear-gradient(90deg, #f8fbff, #fdf7ff)" }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#1f1f1f", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#4285f4" aria-hidden>
                <path d="M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
              </svg>
              AI Overview
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "#4d5156", lineHeight: 1.5 }}>{data.aiOverview}</p>
          </div>
        ) : null}

        {data.rows.map((r) => (
          <div key={r.position} style={{ margin: "0 0 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://www.google.com/s2/favicons?domain=${r.domain.replace(/^www\./, "")}&sz=32`}
                alt=""
                width={26}
                height={26}
                style={{ borderRadius: 999, border: "1px solid #ebebeb", background: "#f1f3f4", padding: 3 }}
              />
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", color: "#202124", fontSize: 13.5, lineHeight: 1.25 }}>
                  {r.domain.replace(/^www\./, "")}
                </span>
                <span style={{ display: "block", color: "#4d5156", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 420 }}>
                  {r.breadcrumb ?? r.domain}
                </span>
              </span>
            </div>
            <a style={{ display: "block", color: "#1a0dab", fontSize: 19, lineHeight: 1.3, margin: "6px 0 3px", textDecoration: "none", fontWeight: 400 }}>
              {r.title}
            </a>
            {r.snippet ? (
              <p style={{ margin: 0, color: "#4d5156", fontSize: 14, lineHeight: 1.57 }}>{r.snippet}&hellip;</p>
            ) : null}
          </div>
        ))}
      </div>

      {data.clientAbsent ? (
        <p style={{ margin: 0, padding: "14px 20px", background: "var(--critical-50, #fdedec)", color: "var(--critical-600, #b52d24)", fontWeight: 700, fontSize: 15, fontFamily: "var(--font-core, sans-serif)" }}>
          {data.clientAbsent}
        </p>
      ) : null}
      {data.note ? (
        <p style={{ margin: 0, padding: "10px 20px", color: "var(--text-muted, #73726e)", fontSize: 13.5, borderTop: line.hairline, fontFamily: "var(--font-core, sans-serif)" }}>
          {data.note}
        </p>
      ) : null}
    </div>
  );
}
