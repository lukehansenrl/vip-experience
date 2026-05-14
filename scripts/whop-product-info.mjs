#!/usr/bin/env node
/**
 * Diagnostic: fetch product + plan info for the configured product so we
 * can confirm which Whop product the env var points to and see the
 * pricing model.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "..", ".env.local");
for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const API_KEY = process.env.WHOP_API_KEY;
const PRODUCT_ID = process.env.WHOP_PRODUCT_ID;
const BASE = "https://api.whop.com/api/v1";
const H = { Authorization: `Bearer ${API_KEY}` };

const prod = await fetch(`${BASE}/products/${PRODUCT_ID}`, { headers: H });
console.log("Product:", prod.status, prod.statusText);
if (prod.ok) {
  const p = await prod.json();
  console.log(JSON.stringify({
    id: p.id, name: p.name, visibility: p.visibility,
    plan_ids: p.plan_ids, created_at: p.created_at,
  }, null, 2));
}

const plans = await fetch(`${BASE}/plans?product_ids=${PRODUCT_ID}&first=20`, { headers: H });
console.log("\nPlans:", plans.status, plans.statusText);
if (plans.ok) {
  const j = await plans.json();
  for (const pl of j.data || []) {
    console.log({
      id: pl.id, plan_type: pl.plan_type, billing_period: pl.billing_period,
      initial_price: pl.initial_price, renewal_price: pl.renewal_price,
      release_method: pl.release_method, visibility: pl.visibility,
    });
  }
}

// Show a few sample "joined" members so we can see their plan + dates
const mem = await fetch(`${BASE}/members?product_ids=${PRODUCT_ID}&statuses=joined&first=5`, { headers: H });
console.log("\nSample joined members:");
if (mem.ok) {
  const j = await mem.json();
  for (const m of j.data || []) {
    console.log({
      id: m.id, status: m.status, plan_id: m.plan_id,
      created_at: m.created_at, expires_at: m.expires_at, cancel_at_period_end: m.cancel_at_period_end,
    });
  }
}
