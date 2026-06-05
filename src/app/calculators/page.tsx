"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";

type Tool = "net" | "afford" | "commission";

const TOOLS: { id: Tool; label: string; desc: string }[] = [
  { id: "net", label: "Seller net sheet", desc: "Estimate seller proceeds" },
  { id: "afford", label: "Buyer affordability", desc: "Budget to price range" },
  { id: "commission", label: "Commission split", desc: "Your take-home GCI" },
];

// Calculators tool. Three working calculators with live math. These are real
// arithmetic, not stubs, though figures and default rates are illustrative.
export default function CalculatorsPage() {
  const [tool, setTool] = useState<Tool>("net");

  return (
    <PageShell
      active="/calculators"
      eyebrow="Tools"
      title="Calculators"
      description="Quick math for client conversations. The numbers are live; defaults are illustrative, not Marshall Reddick rates."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTool(t.id)}
            className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
              tool === t.id
                ? "border-mr-light/60 bg-mr-base text-white shadow-sm"
                : "border-white/60 bg-white/60 text-mr-dark hover:border-mr-light/50"
            }`}
          >
            <span className="block text-sm font-semibold">{t.label}</span>
            <span
              className={`block text-xs ${
                tool === t.id ? "text-white/80" : "text-body"
              }`}
            >
              {t.desc}
            </span>
          </button>
        ))}
      </div>

      <div className="max-w-2xl">
        {tool === "net" ? <NetSheet /> : null}
        {tool === "afford" ? <Affordability /> : null}
        {tool === "commission" ? <Commission /> : null}
      </div>
    </PageShell>
  );
}

// ---- shared bits ----------------------------------------------------------

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
      {children}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix = "$",
  step = 1000,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-mr-dark">
        {label}
      </span>
      <div className="flex items-center gap-2 rounded-xl border border-mr-base/15 bg-white px-3 focus-within:border-mr-light focus-within:ring-2 focus-within:ring-mr-light/40">
        <span className="text-sm text-body">{prefix}</span>
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full bg-transparent py-2.5 text-sm text-mr-dark outline-none"
        />
      </div>
    </label>
  );
}

function ResultRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-2 ${
        strong ? "border-t border-mr-base/15 mt-1 pt-3" : ""
      }`}
    >
      <span className={strong ? "font-semibold text-mr-dark" : "text-body"}>
        {label}
      </span>
      <span
        className={
          strong
            ? "font-heading text-lg font-bold text-mr-base"
            : "font-medium text-mr-dark"
        }
      >
        {value}
      </span>
    </div>
  );
}

// ---- Seller net sheet -----------------------------------------------------

function NetSheet() {
  const [price, setPrice] = useState(1200000);
  const [payoff, setPayoff] = useState(450000);
  const [commissionPct, setCommissionPct] = useState(5);
  const [closingPct, setClosingPct] = useState(1.5);

  const commission = price * (commissionPct / 100);
  const closing = price * (closingPct / 100);
  const net = price - payoff - commission - closing;

  return (
    <Card>
      <h2 className="mb-4 font-heading text-lg font-bold text-mr-dark">
        Seller net sheet
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Sale price" value={price} onChange={setPrice} />
        <NumberField label="Loan payoff" value={payoff} onChange={setPayoff} />
        <NumberField
          label="Total commission"
          value={commissionPct}
          onChange={setCommissionPct}
          prefix="%"
          step={0.25}
        />
        <NumberField
          label="Closing costs"
          value={closingPct}
          onChange={setClosingPct}
          prefix="%"
          step={0.25}
        />
      </div>

      <div className="mt-5 rounded-xl border border-mr-light/30 bg-mr-pale/10 px-4 py-2">
        <ResultRow label="Sale price" value={money(price)} />
        <ResultRow label="Less loan payoff" value={`- ${money(payoff)}`} />
        <ResultRow label="Less commission" value={`- ${money(commission)}`} />
        <ResultRow label="Less closing costs" value={`- ${money(closing)}`} />
        <ResultRow label="Estimated net proceeds" value={money(net)} strong />
      </div>
      <p className="mt-3 text-xs text-body">
        Illustrative only. Excludes prorations, liens, and concessions.
      </p>
    </Card>
  );
}

// ---- Buyer affordability --------------------------------------------------

function Affordability() {
  const [monthly, setMonthly] = useState(5000);
  const [down, setDown] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [taxesIns, setTaxesIns] = useState(1.25);

  // Split monthly budget between P&I and taxes/insurance, then invert the
  // standard mortgage payment formula to solve for loan amount.
  const r = rate / 100 / 12;
  const n = 360;
  // Approximate monthly tax+insurance as a fraction of price; solve iteratively.
  let price = down; // start with down payment as floor
  for (let i = 0; i < 40; i++) {
    const loan = Math.max(0, price - down);
    const pi = r > 0 ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n;
    const ti = (price * (taxesIns / 100)) / 12;
    const total = pi + ti;
    // adjust price toward matching the monthly budget
    const ratio = total > 0 ? monthly / total : 1.05;
    price = price * (0.5 + 0.5 * ratio);
    if (!Number.isFinite(price) || price > 50000000) break;
  }
  const loan = Math.max(0, price - down);
  const pi = r > 0 ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n;
  const ti = (price * (taxesIns / 100)) / 12;

  return (
    <Card>
      <h2 className="mb-4 font-heading text-lg font-bold text-mr-dark">
        Buyer affordability
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField
          label="Monthly budget"
          value={monthly}
          onChange={setMonthly}
          step={100}
        />
        <NumberField label="Down payment" value={down} onChange={setDown} />
        <NumberField
          label="Interest rate"
          value={rate}
          onChange={setRate}
          prefix="%"
          step={0.125}
        />
        <NumberField
          label="Taxes + insurance"
          value={taxesIns}
          onChange={setTaxesIns}
          prefix="%"
          step={0.25}
        />
      </div>

      <div className="mt-5 rounded-xl border border-mr-light/30 bg-mr-pale/10 px-4 py-2">
        <ResultRow label="Estimated loan amount" value={money(loan)} />
        <ResultRow label="Principal + interest / mo" value={money(pi)} />
        <ResultRow label="Taxes + insurance / mo" value={money(ti)} />
        <ResultRow label="Target purchase price" value={money(price)} strong />
      </div>
      <p className="mt-3 text-xs text-body">
        Rough estimate on a 30-year loan. Not a pre-approval or lending offer.
      </p>
    </Card>
  );
}

// ---- Commission split -----------------------------------------------------

function Commission() {
  const [price, setPrice] = useState(1000000);
  const [sidePct, setSidePct] = useState(2.5);
  const [splitPct, setSplitPct] = useState(80);
  const [fee, setFee] = useState(395);

  const gross = price * (sidePct / 100);
  const afterSplit = gross * (splitPct / 100);
  const takeHome = Math.max(0, afterSplit - fee);

  return (
    <Card>
      <h2 className="mb-4 font-heading text-lg font-bold text-mr-dark">
        Commission split
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Sale price" value={price} onChange={setPrice} />
        <NumberField
          label="Your side commission"
          value={sidePct}
          onChange={setSidePct}
          prefix="%"
          step={0.25}
        />
        <NumberField
          label="Your split"
          value={splitPct}
          onChange={setSplitPct}
          prefix="%"
          step={5}
        />
        <NumberField
          label="Transaction fee"
          value={fee}
          onChange={setFee}
          step={25}
        />
      </div>

      <div className="mt-5 rounded-xl border border-mr-light/30 bg-mr-pale/10 px-4 py-2">
        <ResultRow label="Gross commission" value={money(gross)} />
        <ResultRow label={`After ${splitPct}% split`} value={money(afterSplit)} />
        <ResultRow label="Less transaction fee" value={`- ${money(fee)}`} />
        <ResultRow label="Your take-home" value={money(takeHome)} strong />
      </div>
      <p className="mt-3 text-xs text-body">
        Illustrative split only. Not a statement of Marshall Reddick commission
        plans.
      </p>
    </Card>
  );
}
