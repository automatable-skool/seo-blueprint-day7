// THE ONE FILE TO EDIT FIRST.
// Every page reads from here - fill it in (or let /proof-file fill it for you).

export const site = {
  name: "Automatable",
  tagline: "We build you a lead machine. Then we teach you to fire us.",
  // GHL inbound webhook - /build-website step 6 collects this and writes it here.
  leadWebhook: null as string | null,
  // GHL calendar booking link - collected on the first /service-page run.
  // Set it and /thank-you renders the booking widget after a form submit (the
  // money pages stay form-only, one primary CTA each). Leave it null and that
  // section simply doesn't render.
  // GHL > Calendars > the calendar > copy the booking link.
  bookingUrl: null as string | null,
  phone: "+1 213-306-4091",
  email: "info@automatable.co",
  address: "Unit 604, 55 E Cordova St Buzz #634, Vancouver, BC V6A 0A5",
  city: "Vancouver",
  url: "https://automatable.co", // your live domain - used by sitemap + metadata

  // Your services - each becomes a card on the homepage.
  // The SEO Blueprint's /build-website turns these into full service pages.
  services: [
    { name: "Local SEO Services", slug: "local-seo-services", blurb: "Get found by the people already searching for what you do." },
    { name: "Google Ads Management", slug: "google-ads-management", blurb: "Paid search managed end to end, tracked to the lead." },
    { name: "Google Business Profile Optimization", slug: "google-business-profile-optimization", blurb: "Turn the map listing into a source of calls." },
  ],

  // Google Ads sitelinks. Written here at build time, while the value of each
  // page is fresh - /write-ads reads them rather than inventing them months later.
  // Titles max 25 characters, each description line max 35.
  sitelinks: [
    { title: "Get a Quote",  url: "/quote",    lines: ["Free graded audit", "Reply within a day"] },
    { title: "Our Services", url: "/services", lines: ["SEO, ads and automation", "Fixed sprint pricing"] },
    { title: "Reviews",      url: "/reviews",  lines: ["Real client stories", "Word for word"] },
    { title: "Pricing",      url: "/pricing",  lines: ["Sprints from $9,500", "No surprise fees"] },
    { title: "About Us",     url: "/about",    lines: ["The three of us", "Fully remote"] },
    { title: "Contact",      url: "/contact",  lines: ["Email or book a call", "A person replies"] },
  ],
};
