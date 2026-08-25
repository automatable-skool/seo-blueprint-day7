// The shape of one client proposal - the 7-section spec plus the visual
// evidence layer. One file per client in website/content/proposals/<slug>.ts.
// Hard rule everywhere: an exhibit whose data failed to pull is null, and the
// section says which number is missing. Never a decorative fake.

export interface ScorePillar {
  name: string;
  /** 1-100. null = honestly not applicable (shown unscored, with the reason). */
  score: number | null;
  reason: string;
}

export interface MoneyMath {
  /** The arithmetic, one factor per row - value plus a short label. */
  factors: { value: string; label: string }[];
  monthlyLoss: string;
  yearlyLoss: string;
  missedLeadsPerMonth: string;
  monthsToParity: string;
  /** One footnote line naming where every input came from. */
  sourcesLine: string;
}

export interface CompetitorRow {
  domain: string;
  isClient?: boolean;
  /** The row winning the comparison - green ground and a crown. */
  isWinner?: boolean;
  reviews: string;
  monthlyTraffic: string;
  keywords: string;
  referringDomains: string;
}

export interface Finding {
  /** One line: a number and what it costs them. Consequence, not diagnostic. */
  text: string;
  status: "positive" | "caution" | "critical";
}

/** The search they're losing - a styled render of the LIVE SERP. Real titles,
 * real domains, real positions. Never invented, never reordered. */
export interface SerpRow {
  position: number;
  title: string;
  domain: string;
  /** Grey URL/breadcrumb line exactly as Google shows it. */
  breadcrumb?: string;
  /** The real snippet from the pull, truncated by Google itself. */
  snippet?: string;
  isClient?: boolean;
}
export interface SerpExhibit {
  keyword: string;
  /** When the live SERP opens with an AI-generated answer, name it. */
  aiOverview?: string;
  rows: SerpRow[];
  /** Shown as a band when the client is absent, e.g. "You are not in the top 20." */
  clientAbsent?: string;
  note?: string;
}

/** The visibility chart - trend lines from the traffic-history pull. */
export interface HistorySeries {
  name: string;
  isClient?: boolean;
  /** One value per monthLabel; null = no data that month (line starts later). */
  values: (number | null)[];
}
export interface VisibilityExhibit {
  monthLabels: string[];
  series: HistorySeries[];
  readout: string;
}

/** The map ranking grid - 25 real Google Maps searches, one per point.
 * ranks is row-major 5x5; null = not found at that point. A null grid means
 * no scan ran, and the note says why. */
export interface GeoGridExhibit {
  keyword: string;
  businessName: string;
  ranks: (number | null)[] | null;
  /** Real map of the scanned city behind the badges (generated from OSM tiles
   * at pull time; the frame spans the grid extent plus 25% margin). */
  mapImage?: string;
  attribution?: string;
  /** Set when the grid is a labelled demo from another market, not the client's. */
  demoLabel?: string;
  note: string;
}

/** The Business Profile gap - the competitor's real knowledge panel rendered
 * faithfully, next to the client's missing one. */
export interface GbpPanelData {
  name: string;
  subtitle: string;
  ratingValue: number;
  reviewsCount: number;
  description?: string;
  /** Real map strip of their location, shown at the top like a live panel. */
  mapImage?: string;
  attribution?: string;
}
export interface GbpAuditRow {
  label: string;
  value: string;
  status: "good" | "warn" | "bad";
}
export interface GbpExhibit {
  panel: GbpPanelData | null;
  /** The account audit: what's good and bad on the profile, field by field. */
  auditRows: GbpAuditRow[];
  auditNote?: string;
  clientName: string;
  clientGhost: string;
  note: string;
}

export interface TimelineRow {
  when: string;
  visible: string;
}

export interface InvestmentOption {
  name: string;
  price: string;
  term: string;
  included: string[];
  recommended?: boolean;
}

export interface ProofItem {
  name: string;
  business: string;
  result: string;
  detail: string;
  /** Verbatim words from the review file - never paraphrased. */
  quote?: string;
  photoUrl?: string;
  videoUrl?: string;
  videoThumbUrl?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ProposalData {
  slug: string;
  clientName: string;
  clientDomain: string;
  clientFaviconUrl: string;
  preparedBy: string;
  preparedByCompany: string;
  dateLabel: string;
  expiryLabel: string;
  heroLead: string;

  scorecard: { overall: number; overallReason: string; pillars: ScorePillar[]; note?: string };
  money: MoneyMath;
  findings: {
    rows: CompetitorRow[];
    /** One warning per metric where the client trails the competitors -
     * rendered as design-kit warning boxes directly under the table. */
    tableWarnings?: string[];
    tableNote?: string;
    items: Finding[];
    serp: SerpExhibit | null;
    visibility: VisibilityExhibit | null;
    /** Local companies only - null for remote/international businesses. */
    geoGrid: GeoGridExhibit | null;
    gbp: GbpExhibit | null;
    /** Named when an exhibit is null: which number is missing, what would get it. */
    missing?: string[];
  };
  timeline: { rows: TimelineRow[]; expectation: string };
  investment: { options: InvestmentOption[]; terms: string };
  proof: { items: ProofItem[]; credentials: string[] };
  faq: FaqItem[];
  close: { costReminder: string; ctaLabel: string; ctaUrl: string };
}
