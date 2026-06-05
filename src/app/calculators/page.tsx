"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import BrandedPrintSheet, {
  type PrintRow,
} from "@/components/BrandedPrintSheet";

type Tool = "net" | "funds" | "afford" | "commission";

const TOOLS: { id: Tool; label: string; desc: string }[] = [
  { id: "net", label: "Seller net sheet", desc: "Estimate seller proceeds" },
  { id: "funds", label: "Funds to close", desc: "How much to buy" },
  { id: "afford", label: "Buyer affordability", desc: "Budget to price range" },
  { id: "commission", label: "Commission split", desc: "Your take-home GCI" },
];

// Calculators tool. Four calculators with live math, each printable to a
// Marshall Reddick branded, agent-personalized PDF via the browser print
// dialog. Figures and default rates are illustrative.
export default function CalculatorsPage() {
  const [tool, setTool] = useState<Tool>("net");

  return (
    <PageShell
      active="/calculators"
      eyebrow="Tools"
      title="Calculators"
      description="Quick math for client conversations, printable to a branded PDF with your details. Numbers are live; defaults are illustrative, not Marshall Reddick rates."
    >
      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
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
        {tool === "funds" ? <FundsToClose /> : null}
        {tool === "afford" ? <Affordability /> : null}
        {tool === "commission" ? <Commission /> : null}
      </div>
    </PageShell>
  );
}

// ---- shared bits ----------------------------------------------------------

const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-bold text-mr-dark">{title}</h2>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-full border border-mr-base/20 bg-white/70 px-4 py-2 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
        >
          <span aria-hidden>⎙</span> Print / Save PDF
        </button>
      </div>
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

  const inputs: PrintRow[] = [
    { label: "Sale price", value: money(price) },
    { label: "Loan payoff", value: money(payoff) },
    { label: "Total commission", value: `${commissionPct}%` },
    { label: "Closing costs", value: `${closingPct}%` },
  ];
  const rows: PrintRow[] = [
    { label: "Sale price", value: money(price) },
    { label: "Less loan payoff", value: `- ${money(payoff)}` },
    { label: "Less commission", value: `- ${money(commission)}` },
    { label: "Less closing costs", value: `- ${money(closing)}` },
    { label: "Estimated net proceeds", value: money(net), strong: true },
  ];

  return (
    <>
      <Card title="Seller net sheet">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField label="Sale price" value={price} onChange={setPrice} />
          <NumberField label="Loan payoff" value={payoff} onChange={setPayoff} />
          <NumberField label="Total commission" value={commissionPct} onChange={setCommissionPct} prefix="%" step={0.25} />
          <NumberField label="Closing costs" value={closingPct} onChange={setClosingPct} prefix="%" step={0.25} />
        </div>
        <div className="mt-5 rounded-xl border border-mr-light/30 bg-mr-pale/10 px-4 py-2">
          {rows.map((r) => (
            <ResultRow key={r.label} label={r.label} value={r.value} strong={r.strong} />
          ))}
        </div>
        <p className="mt-3 text-xs text-body">
          Illustrative only. Excludes prorations, liens, and concessions.
        </p>
      </Card>
      <BrandedPrintSheet
        title="Seller Net Sheet"
        subtitle="Estimated proceeds from your home sale"
        inputs={inputs}
        rows={rows}
      />
    </>
  );
}

// ---- Funds to close (how much to buy) -------------------------------------

function FundsToClose() {
  const [price, setPrice] = useState(900000);
  const [downPct, setDownPct] = useState(20);
  const [closingPct, setClosingPct] = useState(3);

  const down = price * (downPct / 100);
  const closing = price * (closingPct / 100);
  const loan = price - down;
  const cash = down + closing;

  const inputs: PrintRow[] = [
    { label: "Purchase price", value: money(price) },
    { label: "Down payment", value: `${downPct}%` },
    { label: "Closing costs", value: `${closingPct}%` },
  ];
  const rows: PrintRow[] = [
    { label: "Purchase price", value: money(price) },
    { label: "Down payment", value: money(down) },
    { label: "Estimated closing costs", value: money(closing) },
    { label: "Loan amount", value: money(loan) },
    { label: "Cash needed to close", value: money(cash), strong: true },
  ];

  return (
    <>
      <Card title="Funds to close">
        <p className="-mt-2 mb-4 text-sm text-body">
          How much cash a buyer needs up front to purchase at this price.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField label="Purchase price" value={price} onChange={setPrice} />
          <NumberField label="Down payment" value={downPct} onChange={setDownPct} prefix="%" step={1} />
          <NumberField label="Closing costs" value={closingPct} onChange={setClosingPct} prefix="%" step={0.25} />
        </div>
        <div className="mt-5 rounded-xl border border-mr-light/30 bg-mr-pale/10 px-4 py-2">
          {rows.map((r) => (
            <ResultRow key={r.label} label={r.label} value={r.value} strong={r.strong} />
          ))}
        </div>
        <p className="mt-3 text-xs text-body">
          Excludes prepaids, reserves, and lender credits. Estimate only.
        </p>
      </Card>
      <BrandedPrintSheet
        title="Funds to Close"
        subtitle="Estimated cash needed to purchase"
        inputs={inputs}
        rows={rows}
      />
    </>
  );
}

// ---- Buyer affordability --------------------------------------------------

function Affordability() {
  const [monthly, setMonthly] = useState(5000);
  const [down, setDown] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [taxesIns, setTaxesIns] = useState(1.25);

  const r = rate / 100 / 12;
  const n = 360;
  let price = down;
  for (let i = 0; i < 40; i++) {
    const loan = Math.max(0, price - down);
    const pi = r > 0 ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n;
    const ti = (price * (taxesIns / 100)) / 12;
    const total = pi + ti;
    const ratio = total > 0 ? monthly / total : 1.05;
    price = price * (0.5 + 0.5 * ratio);
    if (!Number.isFinite(price) || price > 50000000) break;
  }
  const loan = Math.max(0, price - down);
  const pi = r > 0 ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n;
  const ti = (price * (taxesIns / 100)) / 12;

  const inputs: PrintRow[] = [
    { label: "Monthly budget", value: money(monthly) },
    { label: "Down payment", value: money(down) },
    { label: "Interest rate", value: `${rate}%` },
    { label: "Taxes + insurance", value: `${taxesIns}%` },
  ];
  const rows: PrintRow[] = [
    { label: "Estimated loan amount", value: money(loan) },
    { label: "Principal + interest / mo", value: money(pi) },
    { label: "Taxes + insurance / mo", value: money(ti) },
    { label: "Target purchase price", value: money(price), strong: true },
  ];

  return (
    <>
      <Card title="Buyer affordability">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField label="Monthly budget" value={monthly} onChange={setMonthly} step={100} />
          <NumberField label="Down payment" value={down} onChange={setDown} />
          <NumberField label="Interest rate" value={rate} onChange={setRate} prefix="%" step={0.125} />
          <NumberField label="Taxes + insurance" value={taxesIns} onChange={setTaxesIns} prefix="%" step={0.25} />
        </div>
        <div className="mt-5 rounded-xl border border-mr-light/30 bg-mr-pale/10 px-4 py-2">
          {rows.map((r2) => (
            <ResultRow key={r2.label} label={r2.label} value={r2.value} strong={r2.strong} />
          ))}
        </div>
        <p className="mt-3 text-xs text-body">
          Rough estimate on a 30-year loan. Not a pre-approval or lending offer.
        </p>
      </Card>
      <BrandedPrintSheet
        title="Buyer Affordability"
        subtitle="What your monthly budget can buy"
        inputs={inputs}
        rows={rows}
      />
    </>
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

  const inputs: PrintRow[] = [
    { label: "Sale price", value: money(price) },
    { label: "Side commission", value: `${sidePct}%` },
    { label: "Agent split", value: `${splitPct}%` },
    { label: "Transaction fee", value: money(fee) },
  ];
  const rows: PrintRow[] = [
    { label: "Gross commission", value: money(gross) },
    { label: `After ${splitPct}% split`, value: money(afterSplit) },
    { label: "Less transaction fee", value: `- ${money(fee)}` },
    { label: "Your take-home", value: money(takeHome), strong: true },
  ];

  return (
    <>
      <Card title="Commission split">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField label="Sale price" value={price} onChange={setPrice} />
          <NumberField label="Your side commission" value={sidePct} onChange={setSidePct} prefix="%" step={0.25} />
          <NumberField label="Your split" value={splitPct} onChange={setSplitPct} prefix="%" step={5} />
          <NumberField label="Transaction fee" value={fee} onChange={setFee} step={25} />
        </div>
        <div className="mt-5 rounded-xl border border-mr-light/30 bg-mr-pale/10 px-4 py-2">
          {rows.map((r) => (
            <ResultRow key={r.label} label={r.label} value={r.value} strong={r.strong} />
          ))}
        </div>
        <p className="mt-3 text-xs text-body">
          Illustrative split only. Not a statement of Marshall Reddick
          commission plans.
        </p>
      </Card>
      <BrandedPrintSheet
        title="Commission Estimate"
        subtitle="Estimated take-home from this transaction"
        inputs={inputs}
        rows={rows}
        disclaimer="Illustrative split only. Not a statement of commission plans or compensation."
      />
    </>
  );
}
