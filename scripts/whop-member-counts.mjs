#!/usr/bin/env node
/**
 * Diagnostic: query Whop /members for the configured product across all
 * status values to figure out which slice the dashboard's "36" matches.
 *
 * Usage:  node scripts/whop-member-counts.mjs
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
if (!API_KEY || !PRODUCT_ID) {
  console.error("Missing WHOP_API_KEY or WHOP_PRODUCT_ID in .env.local");
  process.exit(1);
}

const BASE = "https://api.whop.com/api/v1";

async function fetchAll(params) {
  let after;
  let total = 0;
  const all = [];
  for (let page = 1; page <= 20; page++) {
    const url = new URL(`${BASE}/members`);
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
    url.searchParams.set("first", "100");
    if (after) url.searchParams.set("after", after);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    if (!res.ok) {
      const body = await res.text();
      return { error: `${res.status} ${res.statusText}: ${body.slice(0, 400)}` };
    }
    const json = await res.json();
    const items = Array.isArray(json.data) ? json.data : [];
    total += items.length;
    all.push(...items);
    after = json.page_info?.end_cursor;
    if (!json.page_info?.has_next_page || !after) break;
  }
  return { total, items: all };
}

const queries = [
  { label: "all statuses (no filter)", params: { product_ids: PRODUCT_ID } },
  { label: "status=joined",            params: { product_ids: PRODUCT_ID, statuses: "joined" } },
  { label: "status=active",            params: { product_ids: PRODUCT_ID, statuses: "active" } },
  { label: "status=trialing",          params: { product_ids: PRODUCT_ID, statuses: "trialing" } },
  { label: "status=past_due",          params: { product_ids: PRODUCT_ID, statuses: "past_due" } },
  { label: "status=canceled",          params: { product_ids: PRODUCT_ID, statuses: "canceled" } },
  { label: "status=expired",           params: { product_ids: PRODUCT_ID, statuses: "expired" } },
  { label: "status=completed",         params: { product_ids: PRODUCT_ID, statuses: "completed" } },
];

console.log(`Product: ${PRODUCT_ID}\n`);

const breakdownFromAll = {};
for (const q of queries) {
  const r = await fetchAll(q.params);
  if (r.error) {
    console.log(`${q.label.padEnd(28)} ERROR  ${r.error}`);
    continue;
  }
  console.log(`${q.label.padEnd(28)} ${String(r.total).padStart(4)}`);
  if (q.label.startsWith("all")) {
    for (const m of r.items) {
      const s = m.status || "(missing)";
      breakdownFromAll[s] = (breakdownFromAll[s] || 0) + 1;
    }
  }
}

console.log("\nStatus breakdown from 'all statuses' result:");
for (const [s, n] of Object.entries(breakdownFromAll).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${s.padEnd(20)} ${n}`);
}
