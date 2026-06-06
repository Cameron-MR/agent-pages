"use client";

import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import Photo from "@/components/Photo";
import Logo from "@/components/Logo";
import OpenHouseSign from "@/components/marketing/OpenHouseSign";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import { LISTINGS, type Listing } from "@/lib/mock/listings";
import {
  LEAD_SOURCES,
  SAMPLE_LEADS,
  loadLeads,
  saveLead,
  deleteLead,
  downloadLeadsCsv,
  type OpenHouseLead,
} from "@/lib/mock/openHouse";

// Open House toolkit. The agent picks a listing and launches a full-screen
// kiosk sign-in for visitors (hand them the iPad). Each sign-in is captured
// as a lead, listed in the agent view, and exportable as a real CSV.
// Leads persist to localStorage; the live version posts to the lead hub.
export default function OpenHousePage() {
  const { profile } = useAgentProfile();
  const [listingId, setListingId] = useState(LISTINGS[0].id);
  const [kiosk, setKiosk] = useState(false);
  const [leads, setLeads] = useState<OpenHouseLead[]>(SAMPLE_LEADS);

  useEffect(() => {
    const stored = loadLeads();
    if (stored.length) setLeads(stored);
  }, []);

  const listing = useMemo(
    () => LISTINGS.find((l) => l.id === listingId) ?? LISTINGS[0],
    [listingId]
  );

  const todaysLeads = leads.filter((l) => l.listingId === listing.id);

  const onSignIn = (lead: OpenHouseLead) => {
    setLeads(saveLead(lead));
  };

  const onDelete = (id: string) => {
    setLeads(deleteLead(id));
  };

  return (
    <PageShell
      active="/marketing"
      eyebrow="Marketing"
      title="Open House"
      description="Run the sign-in sheet from your iPad and capture every visitor as a lead. Leads are demo data saved on this device."
    >
      {/* Setup row */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-mr-dark">
              Property
            </span>
            <select
              value={listingId}
              onChange={(e) => setListingId(e.target.value)}
              className="w-full rounded-xl border border-mr-base/15 bg-white px-4 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40 sm:w-72"
            >
              {LISTINGS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.address}, {l.city}
                </option>
              ))}
            </select>
          </label>
          <div className="hidden items-center gap-3 sm:flex">
            <Photo
              src={listing.photo}
              alt={listing.address}
              className="h-12 w-16 rounded-lg object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-mr-dark">
                {listing.price}
              </p>
              <p className="text-xs text-body">
                {listing.beds} bd · {listing.baths} ba · {listing.sqft} sqft
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-none gap-2">
          {/* Prints the branded QR welcome sign (#print-area below) */}
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full border border-mr-base/20 bg-white/70 px-5 py-3 text-sm font-semibold text-mr-base shadow-sm transition-colors hover:bg-white"
          >
            Print QR sign
          </button>
          <button
            type="button"
            onClick={() => setKiosk(true)}
            className="rounded-full bg-mr-base px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-mr-mid"
          >
            Launch sign-in kiosk
          </button>
        </div>
      </div>

      {/* Leads */}
      <div className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-bold text-mr-dark">
              Visitor leads · {listing.address}
            </h2>
            <p className="text-xs text-body">
              {todaysLeads.length} signed in. Demo leads stored on this device;
              the live version posts to your lead hub.
            </p>
          </div>
          <button
            type="button"
            onClick={() => downloadLeadsCsv(todaysLeads)}
            disabled={todaysLeads.length === 0}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              todaysLeads.length === 0
                ? "cursor-default border border-mr-base/10 bg-white/50 text-mr-pale"
                : "border border-mr-base/20 bg-white/70 text-mr-base hover:bg-white"
            }`}
          >
            Export CSV
          </button>
        </div>

        {todaysLeads.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-mr-base/20 p-10 text-center text-sm text-body">
            No sign-ins yet for this property. Launch the kiosk and hand the
            device to your first visitor.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {todaysLeads.map((l) => (
              <div
                key={l.id}
                className="flex flex-col gap-2 rounded-xl border border-white/60 bg-white/70 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-mr-dark">
                    {l.name}
                    {l.hasAgent === "Yes" ? (
                      <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Has an agent
                      </span>
                    ) : (
                      <span className="ml-2 rounded-full bg-mr-pale/25 px-2 py-0.5 text-xs font-medium text-mr-base">
                        Unrepresented
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-body">
                    {l.phone} · {l.email} · via {l.source} · {l.signedInAt}
                  </p>
                  {l.note ? (
                    <p className="mt-1 text-xs italic text-body">“{l.note}”</p>
                  ) : null}
                </div>
                <div className="flex flex-none gap-2">
                  <a
                    href={`sms:${l.phone.replace(/[^0-9+]/g, "")}?&body=${encodeURIComponent(`Hi ${l.name.split(" ")[0]}, great meeting you at the open house at ${listing.address} today. Happy to answer any questions. ${profile.name.split(" ")[0]}, ${profile.brokerage}`)}`}
                    className="rounded-full bg-mr-base px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-mr-mid"
                  >
                    Text follow-up
                  </a>
                  <a
                    href={`mailto:${l.email}`}
                    className="rounded-full border border-mr-base/20 bg-white/70 px-4 py-2 text-xs font-semibold text-mr-base transition-colors hover:bg-white"
                  >
                    Email
                  </a>
                  <button
                    type="button"
                    onClick={() => onDelete(l.id)}
                    aria-label="Delete lead"
                    className="rounded-full border border-mr-base/10 bg-white/50 px-3 py-2 text-xs text-body transition-colors hover:text-mr-dark"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <OpenHouseSign listing={listing} />

      {kiosk ? (
        <Kiosk
          listing={listing}
          agentName={profile.name}
          brokerage={profile.brokerage}
          onSignIn={onSignIn}
          onExit={() => setKiosk(false)}
        />
      ) : null}
    </PageShell>
  );
}

// Full-screen, client-facing sign-in. Loops back to a fresh form after each
// visitor so the device can sit by the door all afternoon.
function Kiosk({
  listing,
  agentName,
  brokerage,
  onSignIn,
  onExit,
}: {
  listing: Listing;
  agentName: string;
  brokerage: string;
  onSignIn: (lead: OpenHouseLead) => void;
  onExit: () => void;
}) {
  const empty = {
    name: "",
    phone: "",
    email: "",
    source: "",
    hasAgent: "" as OpenHouseLead["hasAgent"],
    note: "",
  };
  const [form, setForm] = useState(empty);
  const [thanks, setThanks] = useState(false);

  const canSubmit = form.name.trim() && (form.phone.trim() || form.email.trim());

  const submit = () => {
    if (!canSubmit) return;
    onSignIn({
      id: "ohl" + Date.now(),
      listingId: listing.id,
      listingAddress: `${listing.address}, ${listing.city}`,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      source: form.source,
      hasAgent: form.hasAgent,
      note: form.note.trim(),
      signedInAt: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    });
    setThanks(true);
    setForm(empty);
    setTimeout(() => setThanks(false), 2500);
  };

  const field =
    "w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-base text-white placeholder-white/40 outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-mr-dark to-mr-base">
      {/* Exit is intentionally subtle so visitors don't tap it */}
      <button
        type="button"
        onClick={onExit}
        className="absolute right-4 top-4 rounded-full border border-white/20 px-4 py-1.5 text-xs text-white/50 transition-colors hover:text-white"
      >
        Exit kiosk
      </button>

      <div className="mx-auto flex min-h-full max-w-xl flex-col justify-center px-6 py-12">
        {thanks ? (
          <div className="text-center text-white">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mr-light text-3xl text-mr-dark">
              ✓
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold">
              Thanks for stopping by
            </h2>
            <p className="mt-2 text-mr-pale">
              {agentName} will follow up shortly. Enjoy the home!
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <Logo theme="dark" variant="logotype" width={200} />
              <h1 className="mt-6 font-heading text-3xl font-bold text-white">
                Welcome to {listing.address}
              </h1>
              <p className="mt-1 text-sm text-mr-pale">
                {listing.city} · Hosted by {agentName}, {brokerage}
              </p>
              <p className="mt-4 text-sm text-white/70">
                Please sign in. Your info goes only to your host, never sold.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name *"
                className={field}
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone"
                  className={field}
                />
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  className={field}
                />
              </div>

              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-mr-pale">
                How did you hear about this open house?
              </p>
              <div className="flex flex-wrap gap-2">
                {LEAD_SOURCES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm({ ...form, source: s })}
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${
                      form.source === s
                        ? "bg-mr-light font-semibold text-mr-dark"
                        : "border border-white/25 text-white/85 hover:bg-white/10"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-mr-pale">
                Are you working with an agent?
              </p>
              <div className="flex gap-2">
                {(["No", "Yes"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setForm({ ...form, hasAgent: v })}
                    className={`flex-1 rounded-full px-4 py-2.5 text-sm transition-colors ${
                      form.hasAgent === v
                        ? "bg-mr-light font-semibold text-mr-dark"
                        : "border border-white/25 text-white/85 hover:bg-white/10"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <input
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Anything you'd like to ask? (optional)"
                className={`${field} mt-2`}
              />

              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit}
                className={`mt-3 rounded-full py-4 text-base font-semibold transition-colors ${
                  canSubmit
                    ? "bg-white text-mr-dark hover:bg-mr-pale/90"
                    : "cursor-default bg-white/20 text-white/50"
                }`}
              >
                Sign in
              </button>
              <p className="text-center text-xs text-white/50">
                Demo kiosk. Entries are sample leads stored on this device.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
