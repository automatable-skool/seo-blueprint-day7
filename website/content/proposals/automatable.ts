// Proposal data for automatable.co - a self-demo run (the agency proposing to
// itself, so the whole machine can be checked before a paying prospect sees one).
// Refreshed Wednesday 20 August 2026 on the DataForSEO source set. Sources:
// DataForSEO (SERPs, domain metrics, 13-month traffic history, backlinks - all
// pulled 20 Aug 2026), GA4 property 469463401 (last 90 days), local Lighthouse
// run (20 Aug 2026), context/business.md + proof-inventory.md (19 Aug 2026).
import type { ProposalData } from "@/components/proposal/types";

const MONTHS = [
  "Aug 2025", "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026",
  "Feb 2026", "Mar 2026", "Apr 2026", "May 2026", "Jun 2026", "Jul 2026", "Aug 2026",
];

export const automatable: ProposalData = {
  slug: "automatable",
  clientName: "Automatable",
  clientDomain: "automatable.co",
  clientFaviconUrl: "https://www.google.com/s2/favicons?domain=automatable.co&sz=64",
  preparedBy: "Jono Catliff",
  preparedByCompany: "Automatable",
  dateLabel: "Wednesday 20 August 2026",
  expiryLabel: "Wednesday 3 September 2026",
  heroLead:
    "Buyers search for what you sell 2,900 times a month, and they can't find you. This is what the gap costs, who's collecting it instead, and what gets built in eight weeks.",

  scorecard: {
    overall: 24,
    overallReason:
      "The site is fast and the link gap is small. Almost nothing else is working: buyers can't find you unless they already know your name.",
    pillars: [
      {
        name: "Visibility",
        score: 12,
        reason: "445 visitors from Google a month, against the leader's 1,143. For the search that matters most, you're not even in the top 20.",
      },
      {
        name: "Content",
        score: 8,
        reason: "You show up for 38 searches, and nearly all of them are your own name. Searches from people ready to buy: zero.",
      },
      {
        name: "Technical",
        score: 68,
        reason: "The site is genuinely fast (93 out of 100). But the map it gives Google is broken, and the labels that tell Google what each page is about are missing.",
      },
      {
        name: "AI visibility",
        score: 8,
        reason: "The AI answer at the top of Google mentions your competitor, not you. And tools like ChatGPT sent you 2 visitors in 3 months.",
      },
    ],
    note: "Scored from live search data, a speed test, your own visitor stats and the site itself. Overall is the average of the four. No local score: you sell remotely, so the map results aren't your battlefield.",
  },

  money: {
    factors: [
      { value: "698", label: "visitors a month going to the leader instead" },
      { value: "2.5%", label: "of your visitors ask for a quote" },
      { value: "20%", label: "of those calls become clients" },
      { value: "$9,500", label: "what one client is worth" },
    ],
    monthlyLoss: "$33,155",
    yearlyLoss: "$397,860",
    missedLeadsPerMonth: "17",
    monthsToParity: "about 28 months, and that's if the leader stops growing",
    sourcesLine:
      "Where the numbers come from: the visitor gap is live search data (20 August 2026) \u00b7 the 2.5% is your own stats (95 quote requests from 3,856 visits in 90 days) \u00b7 the 20% is your number \u00b7 the $9,500 is your price list.",
  },

  findings: {
    rows: [
      { domain: "theaiautomationagency.ai", reviews: "none found", monthlyTraffic: "1,143", keywords: "35", referringDomains: "77" },
      { domain: "automaly.io", isWinner: true, reviews: "none found", monthlyTraffic: "19,104", keywords: "122", referringDomains: "284" },
      { domain: "automationagency.com", reviews: "131 (5.0)", monthlyTraffic: "845", keywords: "474", referringDomains: "523" },
      { domain: "automatable.co", isClient: true, reviews: "no profile", monthlyTraffic: "445", keywords: "38", referringDomains: "54" },
    ],
    tableWarnings: [
      "Visitors: 445 a month against the leader's 19,104. They get 43 visitors for every 1 of yours, and visitors are what become customers.",
      "Searches: you show up for 38, automationagency.com shows up for 474. Google has 12x more doors to send buyers through - and they all lead to them.",
      "Links: 54 other websites link to you - the fewest of the four. But it's beatable: the leader has just 77.",
      "Reviews: one competitor shows 131 five-star reviews right next to their name on Google. You show nothing.",
    ],
    tableNote:
      "The three are the businesses actually on page one of Google for 'ai automation agency' and 'business automation agency' - same service, same buyers, each checked against a year of real data. Pulled Wednesday 20 August 2026.",
    items: [
      {
        text: "Your site hands Google a broken map of its pages. So anything new you publish gets found late or never - which holds back everything else on this page until it's fixed.",
        status: "critical",
      },
      {
        text: "2,900 people a month search 'ai automation agency'. The first thing they see is an AI answer, and you're not in the top 20 results under it. That one search is where most of the $33,155 walks.",
        status: "critical",
      },
      {
        text: "95 people asked for a quote in 90 days - and your stats tool counted zero of them. So every report says nothing is working, and nothing gets improved.",
        status: "caution",
      },
      {
        text: "That AI answer at the top names eight websites it learned from - including theaiautomationagency.ai. Not you. Your pages are missing the labels AI tools read, so you never get picked.",
        status: "caution",
      },
      {
        text: "The good news, and it's real: the leader sits in the top 5 with only 77 sites linking to them, against your 54. A gap of 23, not 500. They win because they have 18 pages in Google's top 10 and you have 2. More pages is the cheapest gap in SEO to close.",
        status: "positive",
      },
    ],
    serp: {
      keyword: "ai automation agency",
      aiOverview:
        "An AI automation agency (AAA) is a specialized business that designs, builds, and deploys artificial intelligence systems to handle repetitive operations and workflows for other companies. Instead of traditional marketing, these agencies focus on practical business outcomes like automated lead gener",
      rows: [
        {
          position: 2,
          title: "Has anyone running an AI automation agency?",
          domain: "www.reddit.com",
          breadcrumb: "310+ comments  \u00b7  2 years ago",
          snippet: "Guys, I wanted to know whether it's a profitable business and has potential or it's just an AI gimmick. I'm a tech person working in data bu",
        },
        {
          position: 3,
          title: "What I learned building an AI Automation Agency (and why ...",
          domain: "www.linkedin.com",
          breadcrumb: "280+ reactions  \u00b7  1 year ago",
          snippet: "Unlike marketing or ads, AI automation touches every business function - operations, customer service, sales, finance, HR",
        },
        {
          position: 5,
          title: "The Ai Automation Agency",
          domain: "theaiautomationagency.ai",
          breadcrumb: "https://theaiautomationagency.ai",
          snippet: "We create hands-off AI systems for you. We build automation that plugs straight into your existing systems for fast, disruption-free deploy",
        },
        {
          position: 7,
          title: "Top AI Automation Agency",
          domain: "www.axeautomation.co",
          breadcrumb: "https://www.axeautomation.co \u203a ai-automation-agency",
          snippet: "We analyze your business for opportunities to install AI and automations that slash your costs, scale processes and revenue. 100% done-for-y",
        },
        {
          position: 8,
          title: "Top AI Automation Companies in 2026",
          domain: "www.designrush.com",
          breadcrumb: "https://www.designrush.com \u203a AI Companies",
          snippet: "Markovate, HatchWorks AI, Oxagile, DataRoot Labs, InData Labs - these are among the top AI automation agencies businesses choose to streamli",
        },
        {
          position: 9,
          title: "AI Automation Agencies: 2026 Guide",
          domain: "www.jadasquad.com",
          breadcrumb: "https://www.jadasquad.com \u203a Blog",
          snippet: "An AI automation agency is a specialist firm that designs, builds, deploys, and manages AI-powered automation systems for businesses.",
        },
      ],
      clientAbsent: "automatable.co is not in the top 20 for this search.",
      note: "The real United States Google result, pulled Wednesday 20 August 2026. Every title and position is exactly what Google showed; spots 4 and 6 are a video and a forum thread.",
    },
    visibility: {
      monthLabels: MONTHS,
      series: [
        { name: "automaly.io", values: [7143, 7188, 7181, 7239, 8807, 8760, 8710, 8686, 18926, 18743, 18880, 18950, 19104] },
        { name: "automationagency.com", values: [1278, 1454, 1480, 1106, 1254, 1449, 1363, 1630, 2131, 1921, 2072, 1592, 845] },
        { name: "theaiautomationagency.ai", values: [null, null, null, null, null, 444, 446, 451, 1568, 1607, 1310, 1388, 1143] },
        { name: "automatable.co", isClient: true, values: [118, 144, 144, 268, 268, 145, 269, 269, 271, 271, 327, 329, 445] },
      ],
      readout:
        "The bottom line is you. automaly.io nearly tripled its visitors in thirteen months (7,143 to 19,104). theaiautomationagency.ai didn't even exist in this race a year ago and already passed you. You went from 118 to 445. The gap isn't closing on its own.",
    },
    // Local companies only - shown here as labelled DEMOS at the owner's request
    // (Automatable sells remotely). For a real remote client set both to null.
    geoGrid: {
      keyword: "plumber austin",
      businessName: "Radiant Plumbing",
      ranks: [1, 1, 1, 1, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      mapImage: "/images/proposal/geogrid-austin.png",
      attribution: "\u00a9 OpenStreetMap contributors",
      demoLabel:
        "Demo exhibit: a live 25-point scan for 'plumber austin' (Radiant Plumbing, 20 August 2026), shown so you can see the grid. Automatable sells remotely, so there is no grid to scan for you.",
      note: "Worth noticing: even Austin's biggest plumber (18,000 reviews) owns only the north of the city. For a local client, this grid is the single most persuasive exhibit in the proposal.",
    },
    gbp: {
      panel: {
        name: "Automation Agency",
        subtitle: "Marketing agency in Chandler, Arizona",
        ratingValue: 5.0,
        reviewsCount: 131,
        description:
          "From Automation Agency: \"Award-winning AI Agency that helps businesses to create more growth, profit, and freedom by implementing AI & Automation.\"",
        mapImage: "/images/proposal/gbp-map-chandler.png",
        attribution: "\u00a9 OpenStreetMap contributors",
      },
      auditRows: [
        { label: "Claimed", value: "Verified and claimed", status: "good" },
        { label: "Address", value: "5881 W Orchid Ln, Chandler, AZ 85226", status: "good" },
        { label: "Phone", value: "+1 480-282-3141", status: "good" },
        { label: "Website", value: "automation.agency", status: "good" },
        { label: "Hours", value: "Mon-Fri 8am-5pm, closed weekends", status: "good" },
        { label: "Photos", value: "175 photos on the profile", status: "good" },
        { label: "Reviews", value: "131 at 5.0 - a single 4-star, ever", status: "good" },
        { label: "Description", value: "119 characters used of the 750 available", status: "warn" },
        { label: "Categories", value: "'Marketing agency' only - zero additional categories", status: "bad" },
        { label: "Attributes", value: "2 accessibility attributes, nothing else set", status: "bad" },
        { label: "Q&A", value: "No questions answered", status: "bad" },
      ],
      auditNote:
        "Posts couldn't be checked - the data source has no posts feed. Every other row is the live account, pulled Wednesday 20 August 2026.",
      clientName: "Automatable",
      clientGhost: "No Business Profile",
      note: "Demo exhibit: a real profile (their account data, pulled live) so you can see the audit. When someone googles their name, this shows up. For Automatable, nothing does.",
    },
    missing: [
      "Google's public speed tool hit its daily limit, so the speed numbers come from our own test, run Wednesday 20 August 2026.",
      "Google's own error report for your site needs access to your Google account - that's part of the kickoff.",
    ],
  },

  timeline: {
    rows: [
      { when: "Week 1", visible: "Your visitor tracking checked and fixed. Google's map of your site rebuilt and handed back to Google." },
      { when: "Week 2", visible: "Page labels added so Google and AI tools can read your site. Your stats finally counting leads as leads. Follow-up systems connected in your accounts." },
      { when: "Week 3", visible: "First money page live - the first page on the domain built for a commercial search." },
      { when: "Week 4", visible: "Second money page live. Midpoint review: the second 50% payment lands here, once you're happy." },
      { when: "Weeks 5-6", visible: "First content cluster live and internally linked." },
      { when: "Weeks 7-8", visible: "Second group of pages live and connected. Handover walkthrough - you keep everything." },
      { when: "Month 3", visible: "First rankings for searches that aren't your name start showing in Google's reports." },
      { when: "Months 3-6", visible: "Organic leads from commercial terms typically start landing here." },
    ],
    expectation:
      "Honesty over hype: SEO is slow, and anyone promising page one in 30 days is selling something. The immediate wins land in weeks 1-2. Rankings for real commercial terms typically show in months 3 to 6. The sprint builds the machine; months 3 to 6 are when it starts paying.",
  },

  investment: {
    options: [
      {
        name: "SEO Sprint",
        price: "$9,500",
        term: "Paid in full within 7 days of the call, or $11,500 in 3 installments",
        included: [
          "Everything in the timeline above",
          "The foundation: CRM, speed-to-lead, sales automations, website fixes, tracking",
          "Live in 8 weeks or we keep working free",
          "You keep everything we build",
        ],
        recommended: true,
      },
      {
        name: "Full Sprint",
        price: "$12,500",
        term: "Both engines - SEO and Google Ads. Or $15,000 in 3 installments",
        included: [
          "Everything in the SEO Sprint",
          "Google Ads built and launched in the same eight weeks",
          "One tracking layer across both engines",
        ],
      },
      {
        name: "Growth Retainer",
        price: "$3,000/mo",
        term: "After the sprint. Month to month, no lock-in",
        included: [
          "Ads and SEO managed and optimized",
          "Platform hosted",
          "Cancel any month",
        ],
      },
    ],
    terms:
      "Payment is 50% to kick off and 50% at the midpoint, once the core systems are live in your account and you're happy with them. All fees in USD. The guarantee: live in 8 weeks or we keep working free.",
  },

  proof: {
    items: [
      {
        name: "Jordan Kilpatrick-Smith",
        business: "Psychotherapy clinic, Toronto",
        result: "$50K+ a year saved",
        detail:
          "Replaced the admin role with automated follow-up: 12+ leads a week handled without a human touching them, a 100% show rate and a 95%+ close rate on booked calls.",
        quote:
          "Thanks to the systems I've learned and implemented here, my therapy clinic has just signed up its 100th client! Not only changed MY life, but I have 2 full time employees now, with the intention to add 3 more this year.",
        photoUrl: "/images/proof/jordan-kilpatrick-smith.jpg",
        videoUrl: "https://youtu.be/pwL-DXOxuOM",
        videoThumbUrl: "https://img.youtube.com/vi/pwL-DXOxuOM/hqdefault.jpg",
      },
      {
        name: "Nate Bekmezian",
        business: "Straightline Design - exteriors, roofing and siding",
        result: "Six figures a year saved",
        detail:
          "Receptionist role eliminated ($45K+ a year), every lead answered, and a $26K-a-year CRM bill cut to a fraction.",
        quote:
          "If you're on the fence about working with Jono, stop hesitating and do it. The amount of time and stress you'll save is insane.",
        photoUrl: "/images/proof/nathan-bekmezian.jpeg",
        videoUrl: "https://youtu.be/KdSCFG56SNo",
        videoThumbUrl: "https://img.youtube.com/vi/KdSCFG56SNo/hqdefault.jpg",
      },
    ],
    credentials: [
      "We grew our own local service business to seven figures and 1,500 leads a month across search, ads and referrals - then sold it in 2025.",
      "Founder Jono Catliff teaches this publicly to 153,000 YouTube subscribers (measured 19 August 2026).",
      "1532461 B.C. Ltd., doing business as Automatable - registered in British Columbia, verifiable at orgbook.gov.bc.ca.",
    ],
  },

  faq: [
    {
      q: "How long until results?",
      a: "Tracking and technical wins land in weeks 1-2. Rankings for commercial terms typically show in months 3 to 6. Anyone promising page one in 30 days is lying to you, and you should let them - to someone else.",
    },
    {
      q: "What happens if I cancel?",
      a: "The sprint is a fixed project, so there's nothing to cancel - it ends, and you keep everything. The retainer is month to month: stop any month, everything keeps running in your accounts.",
    },
    {
      q: "Do I own the work?",
      a: "All of it. Every system ships in your accounts, not ours. Our whole pitch is that we build you a lead machine and then teach you to fire us.",
    },
    {
      q: "Why not just run ads?",
      a: "Ads work, and they stop working the day you stop paying. A page that ranks keeps working. The honest answer is both, which is what the Full Sprint is for - but the SEO gap is the one currently costing you $33,155 a month.",
    },
    {
      q: "What if I've tried SEO before?",
      a: "Then you've probably paid for content nobody could measure. The most common failure we see is pages shipped with no tracking behind them, so nobody could tell what worked. It's why tracking lands in week 1 here, before a single page is written.",
    },
    {
      q: "What do you need from me?",
      a: "Four logins, about twenty minutes: Search Console, Analytics, your hosting or CMS, and your CRM. We walk you through every one on the kickoff call.",
    },
    {
      q: "What's not included?",
      a: "Ad spend (paid to Google directly), Google Ads management (that's the other sprint, or the Full Sprint), a full visual rebrand, and anything outside the agreed scope - quoted separately at $3,000 per project.",
    },
    {
      q: "Who actually does the work?",
      a: "The three people on our about page. Jono architects and runs your walkthroughs, Luka runs SEO, Alex runs ads. No outsourced content mill, no mystery interns.",
    },
  ],

  close: {
    costReminder:
      "One sentence worth rereading: at the measured rates above, every month this waits sends roughly $33,155 to the agencies in section 03.",
    ctaLabel: "Book the fit call",
    ctaUrl: "/quote",
  },
};
