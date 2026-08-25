// The proposal renderer, in the idiom of the real Automatable proposals:
// dark page, thin confidential bar, centered glow hero with stat pills,
// then the seven sections. noindex is mandatory: metadata robots here,
// exclusion from app/sitemap.ts, and Disallow /proposal/ in app/robots.ts.
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { proposals } from "@/content/proposals";
import { ProposalStyles, d } from "@/components/proposal/ui";
import {
  Scorecard, CostOfInaction, Findings, Timeline,
  Investment, Proof, Faq, Close,
} from "@/components/proposal";

export function generateStaticParams() {
  return Object.keys(proposals).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = proposals[slug];
  if (!data) return { robots: { index: false, follow: false } };
  return {
    title: `Proposal for ${data.clientName}`,
    robots: { index: false, follow: false },
  };
}

export default async function ProposalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = proposals[slug];
  if (!data) notFound();

  const stats: { label: string; value: string }[] = [
    { label: "Score", value: `${data.scorecard.overall}/100` },
    { label: "Losing", value: `${data.money.monthlyLoss}/mo` },
    { label: "Build", value: "8 weeks" },
    { label: "Valid until", value: data.expiryLabel.replace(/^\w+day /, "") },
  ];

  return (
    <div className="pp">
      <ProposalStyles />

      {/* Thin confidential bar */}
      <header style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, padding: "26px 0 0" }}>
        <div className="pp-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: d.muted }}>
            {data.preparedByCompany.toLowerCase()}
          </span>
          <span style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: d.faint }}>
            Proposal &middot; Confidential
          </span>
        </div>
      </header>

      {/* Glow hero, centered */}
      <section style={{ position: "relative", overflow: "hidden", background: "#f9f8f6", borderBottom: "1px solid #eceae6", padding: "clamp(110px, 14vw, 150px) 0 clamp(56px, 8vw, 84px)" }}>
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, opacity: 0.05,
            backgroundImage: "linear-gradient(rgba(26,26,25,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,25,.55) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 0%, transparent 70%)",
          }}
        />
        <div className="pp-inner" style={{ position: "relative", textAlign: "center", maxWidth: 880 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: d.accent, margin: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.clientFaviconUrl} alt="" width={20} height={20} style={{ borderRadius: 5, background: "#fff", padding: 2 }} />
            Prepared for {data.clientDomain}
          </p>
          <h1 style={{ fontSize: "clamp(40px, 6.5vw, 68px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "26px 0 22px", color: d.text }}>
            A growth plan for <span className="pp-gradient">{data.clientName}</span>
          </h1>
          <p style={{ color: d.muted, fontSize: 17, lineHeight: 1.65, maxWidth: "56ch", margin: "0 auto" }}>{data.heroLead}</p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, margin: "34px 0 0" }}>
            {stats.map((s) => (
              <span key={s.label} className="pp-pill">
                <span style={{ color: d.faint, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>{s.label}</span>
                <span style={{ color: d.text, fontWeight: 700 }}>{s.value}</span>
              </span>
            ))}
          </div>
          <p style={{ color: d.faint, fontSize: 13, margin: "26px 0 0" }}>
            Prepared by {data.preparedBy} &middot; {data.dateLabel}
          </p>
        </div>
      </section>

      <Scorecard data={data} />
      <CostOfInaction data={data} />
      <Findings data={data} />
      <Timeline data={data} />
      <Investment data={data} />
      <Proof data={data} />
      <Faq data={data} />
      <Close data={data} />

      <footer style={{ padding: "28px 0 40px", borderTop: d.hairline }}>
        <div className="pp-inner">
          <p style={{ color: d.faint, fontSize: 13, margin: 0 }}>
            Prepared by {data.preparedByCompany} for {data.clientName}. Private and not indexed - please don&rsquo;t share the link outside your team.
          </p>
        </div>
      </footer>
    </div>
  );
}
