"use client";

import { useState } from "react";

// "Can I buy a home?" calculator, modeled on Zillow's BuyAbility flow:
// location, credit score, income, down payment, and monthly debt produce a
// target price (comfortable budget), a max price (lender ceiling), and the
// loan details behind the math. All rates and figures are illustrative
// estimates, not a lending offer. Shared by /calculators and the public
// agent page, so a buyer and their agent see the same tool.

const CREDIT_TIERS = [
  { label: "760 & above", rate: 5.99 },
  { label: "720 - 759", rate: 6.13 },
  { label: "680 - 719", rate: 6.45 },
  { label: "640 - 679", rate: 6.9 },
  { label: "Below 640", rate: 7.4 },
] as const;

// Combined property tax + insurance, as a % of price per year (illustrative).
const LOCATIONS = [
  { label: "California", ti: 1.35 },
  { label: "Texas", ti: 2.25 },
  { label: "Florida", ti: 1.9 },
  { label: "Tennessee", ti: 1.15 },
  { label: "Nevada", ti: 1.05 },
  { label: "Arizona", ti: 1.0 },
] as const;

const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

// Price affordable for a given monthly payment: payment covers P&I on the
// loan (price - down) plus taxes+insurance on the price. Linear solve.
function priceForPayment(payment: number, down: number, rate: number, ti: number) {
  const r = rate / 100 / 12;
  const n = 360;
  const k = r > 0 ? r / (1 - Math.pow(1 + r, -n)) : 1 / n;
  const t = ti / 100 / 12;
  const price = (payment + down * k) / (k + t);
  return Math.max(down, price);
}

export interface BuyAbilityResult {
  targetPrice: number;
  targetPayment: number;
  maxPrice: number;
  maxPayment: number;
  rate: number;
  apr: number;
}

export function computeBuyAbility(
  income: number,
  down: number,
  debt: number,
  rate: number,
  ti: number
): BuyAbilityResult {
  const monthlyIncome = income / 12;
  // Comfortable budget: 36% DTI. Lender ceiling: 50% DTI (illustrative).
  const targetPayment = Math.max(0, monthlyIncome * 0.36 - debt);
  const maxPayment = Math.max(0, monthlyIncome * 0.5 - debt);
  return {
    targetPrice: priceForPayment(targetPayment, down, rate, ti),
    targetPayment,
    maxPrice: priceForPayment(maxPayment, down, rate, ti),
    maxPayment,
    rate,
    apr: rate + 0.16,
  };
}

export default function BuyAbility({
  variant = "agent",
  lender,
}: {
  // "agent" renders for the command center; "public" for the client page
  // (slightly tighter, with a lender CTA).
  variant?: "agent" | "public";
  // Optional lender CTA for the public page (the agent's preferred lender).
  lender?: { name: string; company: string; url: string };
}) {
  const [location, setLocation] = useState<string>(LOCATIONS[0].label);
  const [credit, setCredit] = useState<string>(CREDIT_TIERS[1].label);
  const [income, setIncome] = useState(150000);
  const [down, setDown] = useState(100000);
  const [debt, setDebt] = useState(500);

  const ti = LOCATIONS.find((l) => l.label === location)?.ti ?? 1.35;
  const rate = CREDIT_TIERS.find((c) => c.label === credit)?.rate ?? 6.13;
  const r = computeBuyAbility(income, down, debt, rate, ti);
  const gaugePct =
    r.maxPrice > 0 ? Math.min(100, Math.round((r.targetPrice / r.maxPrice) * 100)) : 0;

  const fieldCls =
    "w-full rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40";
  const labelCls = "mb-1 block text-sm font-medium text-mr-dark";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Inputs */}
      <div>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className={labelCls}>Location</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={fieldCls}
            >
              {LOCATIONS.map((l) => (
                <option key={l.label}>{l.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Credit score</span>
            <select
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
              className={fieldCls}
            >
              {CREDIT_TIERS.map((c) => (
                <option key={c.label}>{c.label}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-3 block">
          <span className={labelCls}>Annual income (pre-tax)</span>
          <div className="flex items-center gap-2 rounded-xl border border-mr-base/15 bg-white px-3 focus-within:border-mr-light focus-within:ring-2 focus-within:ring-mr-light/40">
            <span className="text-sm text-body">$</span>
            <input
              type="number"
              value={income}
              step={5000}
              onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
              className="w-full bg-transparent py-2.5 text-sm text-mr-dark outline-none"
            />
            <span className="text-xs text-body">/year</span>
          </div>
        </label>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="block">
            <span className={labelCls}>Down payment</span>
            <div className="flex items-center gap-2 rounded-xl border border-mr-base/15 bg-white px-3 focus-within:border-mr-light focus-within:ring-2 focus-within:ring-mr-light/40">
              <span className="text-sm text-body">$</span>
              <input
                type="number"
                value={down}
                step={5000}
                onChange={(e) => setDown(parseFloat(e.target.value) || 0)}
                className="w-full bg-transparent py-2.5 text-sm text-mr-dark outline-none"
              />
            </div>
          </label>
          <label className="block">
            <span className={labelCls}>Monthly debt</span>
            <div className="flex items-center gap-2 rounded-xl border border-mr-base/15 bg-white px-3 focus-within:border-mr-light focus-within:ring-2 focus-within:ring-mr-light/40">
              <span className="text-sm text-body">$</span>
              <input
                type="number"
                value={debt}
                step={100}
                onChange={(e) => setDebt(parseFloat(e.target.value) || 0)}
                className="w-full bg-transparent py-2.5 text-sm text-mr-dark outline-none"
              />
              <span className="text-xs text-body">/mo</span>
            </div>
          </label>
        </div>
        <p className="mt-2 text-xs text-body">
          Loans, credit cards, alimony. Estimates only, not a pre-approval or
          lending offer.
        </p>
      </div>

      {/* Results */}
      <div>
        <div className="rounded-2xl border border-mr-light/30 bg-mr-pale/10 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-mr-base">
            Today&rsquo;s target price
          </p>
          <p className="mt-1 font-heading text-4xl font-bold text-mr-dark">
            {money(r.targetPrice)}
          </p>

          {/* Gauge: target within the lender ceiling */}
          <div className="relative mt-4 h-3 overflow-hidden rounded-full bg-mr-pale/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-mr-base to-mr-light transition-all duration-500"
              style={{ width: `${gaugePct}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-body">
            <span>$0</span>
            <span>Max {money(r.maxPrice)}</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-left">
            <div className="rounded-xl border border-white/70 bg-white/80 p-3">
              <p className="text-xs text-body">Target payment</p>
              <p className="font-heading text-lg font-bold text-mr-dark">
                {money(r.targetPayment)}/mo
              </p>
            </div>
            <div className="rounded-xl border border-white/70 bg-white/80 p-3">
              <p className="text-xs text-body">Down payment</p>
              <p className="font-heading text-lg font-bold text-mr-dark">
                {money(down)}
              </p>
            </div>
          </div>
        </div>

        {/* Lender view */}
        <div className="mt-3 rounded-2xl border border-white/60 bg-white/70 p-5">
          <p className="text-sm font-semibold text-mr-dark">
            What a lender could offer
          </p>
          <div className="mt-2 space-y-1.5 text-sm">
            <Row k="Max home price" v={money(r.maxPrice)} strong />
            <Row k="Max payment" v={`${money(r.maxPayment)}/mo`} />
            <Row k="Loan option" v="30 Year Fixed" />
            <Row k="Est. interest rate" v={`${r.rate.toFixed(2)}%`} />
            <Row k="APR" v={`${r.apr.toFixed(2)}%`} />
          </div>
          {variant === "public" && lender ? (
            <a
              href={lender.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-full bg-mr-base px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
            >
              Get pre-qualified with {lender.name}, {lender.company}
            </a>
          ) : null}
          <p className="mt-3 text-xs text-body">
            All calculations are illustrative estimates for this reference
            design. Actual amounts vary by lender and profile.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-body">{k}</span>
      <span
        className={
          strong
            ? "font-heading text-base font-bold text-mr-base"
            : "font-medium text-mr-dark"
        }
      >
        {v}
      </span>
    </div>
  );
}
