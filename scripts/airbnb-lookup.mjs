#!/usr/bin/env node

/**
 * Airbnb Pricing Lookup — Angel / Islington, London
 *
 * Constructs direct Airbnb search URLs with pre-filled filters and
 * provides a summary of researched pricing data for 2-bedroom places
 * within walking distance of 3rd Space Islington (15 Esther Anne Place, N1 1UL).
 *
 * Usage:  node scripts/airbnb-lookup.mjs [--checkin YYYY-MM-DD] [--checkout YYYY-MM-DD] [--guests N]
 */

const args = process.argv.slice(2);

function getArg(name, fallback) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
}

const checkin = getArg("checkin", "2026-04-28");
const checkout = getArg("checkout", "2026-05-01");
const guests = getArg("guests", "2");

// ── Location context ──────────────────────────────────────────────
const location = {
  name: "Angel, Islington, London",
  landmark: "3rd Space Islington",
  address: "15 Esther Anne Place, London N1 1UL",
  nearestTube: "Angel (Northern line) — ~4 min walk",
  lat: 51.5345,
  lng: -0.1058,
};

// ── Build Airbnb search URLs ──────────────────────────────────────
function buildAirbnbUrl({ bedrooms = 2, priceMax = null, entireHome = true } = {}) {
  const base = "https://www.airbnb.co.uk/s/Angel--Islington--London--United-Kingdom/homes";
  const params = new URLSearchParams({
    refinement_paths: "/homes",
    checkin,
    checkout,
    adults: guests,
    min_bedrooms: String(bedrooms),
  });

  if (entireHome) {
    // Airbnb property type ID 1 = Entire home/apt
    params.append("l2_property_type_ids[]", "1");
  }
  if (priceMax) {
    params.set("price_max", String(priceMax));
  }

  return `${base}?${params.toString()}`;
}

const urls = {
  allTwoBed: buildAirbnbUrl(),
  budgetTwoBed: buildAirbnbUrl({ priceMax: 200 }),
  midrangeTwoBed: buildAirbnbUrl({ priceMax: 300 }),
};

// ── Researched pricing data (April 2026) ──────────────────────────
const pricingResearch = {
  dateRange: `${checkin} → ${checkout}`,
  nights: Math.round(
    (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)
  ),
  currency: "USD (Airbnb default) / GBP equivalent shown",
  listings: [
    {
      name: "Modern 2-Bed Apartment with Canal Views — Angel/Old Street",
      url: "https://www.airbnb.com/rooms/40346117",
      bedrooms: 2,
      baths: 2,
      rating: 5.0,
      pricePerNight: "$222–$250",
      pricePerNightGBP: "~£175–£198",
      walkToThirdSpace: "~8 min",
      notes: "10 min walk to Angel tube & Old Street. Canal-side location.",
    },
    {
      name: "Angel Islington — Beautiful Design Apartment",
      url: "https://www.airbnb.com/rooms/962271798085408126",
      bedrooms: 2,
      baths: null,
      rating: null,
      pricePerNight: "$250",
      pricePerNightGBP: "~£198",
      walkToThirdSpace: "~5–10 min",
      notes: "Vibrant, leafy neighbourhood. Centrally located in Angel.",
    },
    {
      name: "Stylish 2-Bed Maisonette — Upper Street",
      url: null,
      bedrooms: 2,
      baths: 1,
      rating: 4.9,
      pricePerNight: "$246",
      pricePerNightGBP: "~£194",
      walkToThirdSpace: "~5 min",
      notes:
        "Peaceful cul-de-sac. 5 min walk to tube & Upper Street restaurants. Super king master bed.",
    },
    {
      name: "2-Bed/2-Bath Terraced House — Heart of Islington",
      url: null,
      bedrooms: 2,
      baths: 2,
      rating: null,
      pricePerNight: "$250–$259",
      pricePerNightGBP: "~£198–£205",
      walkToThirdSpace: "~5–8 min",
      notes:
        "Award-winning design. 3 floors, 3 private terraces. Modern & quirky.",
    },
    {
      name: "Lovely 2-Bed Flat — Highbury & Islington",
      url: "https://www.airbnb.co.uk/rooms/595719320414747083",
      bedrooms: 2,
      baths: null,
      rating: null,
      pricePerNight: "$240–$260",
      pricePerNightGBP: "~£190–£206",
      walkToThirdSpace: "~12 min",
      notes:
        "Modern aesthetic, high-end finishes. Slightly further out in Highbury.",
    },
  ],
  marketAverage: {
    londonMedianEntireHome: "~£130/night (all sizes)",
    londonTypical2Bed: "£150–£250/night",
    angelIslington2Bed: "£175–£210/night (most common range)",
    note: "About 80% of entire-home listings in London fall within £80–£250/night. Angel/Islington sits at the upper-middle of that range for 2-beds.",
  },
};

// ── Cost estimate ─────────────────────────────────────────────────
const nights = pricingResearch.nights;
const estimates = {
  budget: { perNight: 175, total: 175 * nights, label: "Budget (basic 2-bed)" },
  midrange: { perNight: 198, total: 198 * nights, label: "Mid-range (typical)" },
  premium: { perNight: 250, total: 250 * nights, label: "Premium (design / terraced house)" },
};

// ── Output ────────────────────────────────────────────────────────
console.log("═══════════════════════════════════════════════════════════");
console.log("  AIRBNB PRICING LOOKUP — Angel, Islington, London");
console.log("  Near: 3rd Space Islington (15 Esther Anne Place, N1 1UL)");
console.log("═══════════════════════════════════════════════════════════\n");

console.log(`📅  Dates: ${checkin} → ${checkout} (${nights} nights)`);
console.log(`👥  Guests: ${guests}`);
console.log(`🛏️  Bedrooms: 2\n`);

console.log("─── COST ESTIMATES (GBP) ──────────────────────────────────\n");
for (const tier of Object.values(estimates)) {
  console.log(`  ${tier.label}`);
  console.log(`    Per night:  £${tier.perNight}`);
  console.log(`    ${nights} nights:   £${tier.total}\n`);
}

console.log("─── SAMPLE LISTINGS ───────────────────────────────────────\n");
for (const l of pricingResearch.listings) {
  console.log(`  ★ ${l.name}`);
  console.log(`    ${l.pricePerNight}  (${l.pricePerNightGBP})`);
  console.log(`    ${l.bedrooms} bed / ${l.baths || "?"} bath  |  Walk to 3rd Space: ${l.walkToThirdSpace}`);
  if (l.url) console.log(`    ${l.url}`);
  console.log(`    ${l.notes}\n`);
}

console.log("─── MARKET CONTEXT ────────────────────────────────────────\n");
for (const [k, v] of Object.entries(pricingResearch.marketAverage)) {
  if (k === "note") {
    console.log(`\n  ℹ️  ${v}`);
  } else {
    console.log(`  ${k}: ${v}`);
  }
}

console.log("\n─── SEARCH LINKS (open in browser) ────────────────────────\n");
console.log("  All 2-bed entire homes:");
console.log(`  ${urls.allTwoBed}\n`);
console.log("  Budget (≤ £200/night):");
console.log(`  ${urls.budgetTwoBed}\n`);
console.log("  Mid-range (≤ £300/night):");
console.log(`  ${urls.midrangeTwoBed}\n`);

console.log("═══════════════════════════════════════════════════════════");
console.log("  TIP: Prices above are based on web research as of April 2026.");
console.log("  Open the search links above for live, real-time pricing.");
console.log("  Airbnb adds cleaning fees + service fee (typically 10–15%)");
console.log("  on top of the nightly rate shown.");
console.log("═══════════════════════════════════════════════════════════\n");
