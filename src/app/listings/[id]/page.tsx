"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Logo from "@/components/Logo";
import Photo from "@/components/Photo";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import { LISTINGS, DEFAULT_FEATURES } from "@/lib/mock/listings";

// Per-property website: the single-listing site an agent can publish and share.
// Photo gallery, details, features, faux map, and an inquiry form wired to the
// agent's profile. All content is fabricated.
export default function PropertyPage() {
  const params = useParams();
  const id = String(params.id);
  const listing = LISTINGS.find((l) => l.id === id);
  const { profile } = useAgentProfile();

  const [activePhoto, setActivePhoto] = useState(0);
  const [sent, setSent] = useState(false);

  if (!listing) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-light text-center">
        <p className="font-heading text-2xl font-bold text-mr-dark">
          Listing not found
        </p>
        <Link
          href="/listings"
          className="rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white"
        >
          Back to listings
        </Link>
      </main>
    );
  }

  const features = listing.features ?? DEFAULT_FEATURES;
  const photos = [listing.photo, ...listing.gallery];

  return (
    <main className="min-h-screen bg-surface-light text-body">
      <div className="bg-mr-dark/90 px-4 py-2 text-center text-xs text-white/80">
        Per-property website preview.{" "}
        <Link href="/listings" className="underline">
          Back to listings
        </Link>
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo theme="light" variant="logotype" width={170} priority />
        <a
          href="#inquire"
          className="rounded-full bg-mr-base px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
        >
          Request a showing
        </a>
      </header>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-white/60 shadow-lg">
          <Photo
            src={photos[activePhoto]}
            alt={listing.address}
            className="h-[26rem] w-full object-cover"
          />
        </div>
        <div className="mt-3 grid grid-cols-5 gap-3">
          {photos.slice(0, 5).map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActivePhoto(i)}
              className={`overflow-hidden rounded-xl border-2 transition ${
                i === activePhoto ? "border-mr-base" : "border-transparent"
              }`}
            >
              <Photo
                src={src}
                alt={`${listing.address} photo ${i + 1}`}
                className="h-20 w-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="rounded-full bg-mr-pale/25 px-3 py-1 text-xs font-semibold text-mr-base">
                  {listing.status}
                </span>
                <h1 className="mt-3 font-heading text-3xl font-bold text-mr-dark">
                  {listing.address}
                </h1>
                <p className="text-body">{listing.city}</p>
              </div>
              <p className="font-heading text-3xl font-bold text-mr-base">
                {listing.price}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {[
                ["Beds", String(listing.beds)],
                ["Baths", String(listing.baths)],
                ["Sqft", listing.sqft],
                ["Days listed", String(listing.daysOnMarket)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/60 bg-white/70 p-4 text-center shadow-sm"
                >
                  <p className="font-heading text-xl font-bold text-mr-dark">
                    {value}
                  </p>
                  <p className="text-xs text-body">{label}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-8 font-heading text-xl font-bold text-mr-dark">
              About this home
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-body">
              {listing.blurb}
            </p>

            <h2 className="mt-8 font-heading text-xl font-bold text-mr-dark">
              Features
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/60 px-3 py-2 text-sm text-mr-dark"
                >
                  <span aria-hidden className="text-mr-light">
                    ✓
                  </span>
                  {f}
                </div>
              ))}
            </div>

            <h2 className="mt-8 font-heading text-xl font-bold text-mr-dark">
              Location
            </h2>
            <div className="mt-3 overflow-hidden rounded-2xl border border-white/60 shadow">
              <svg viewBox="0 0 600 240" className="h-56 w-full">
                <rect width="600" height="240" fill="#8BB8C4" fillOpacity="0.25" />
                <path
                  d="M0 240 L0 160 Q150 140 300 185 T600 170 L600 240 Z"
                  fill="#50AAC4"
                  fillOpacity="0.35"
                />
                <g stroke="#316878" strokeOpacity="0.25" strokeWidth="3" fill="none">
                  <path d="M40 40 L560 70" />
                  <path d="M80 10 L240 230" />
                  <path d="M460 10 L420 230" />
                  <path d="M0 130 L600 150" />
                </g>
                <g>
                  <circle cx="300" cy="120" r="12" fill="#316878" />
                  <circle cx="300" cy="120" r="5" fill="#fff" />
                </g>
              </svg>
            </div>
          </div>

          {/* Agent contact + inquiry */}
          <div id="inquire" className="lg:col-span-1">
            <div className="sticky top-6 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <Photo
                  src={profile.photo}
                  alt={profile.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-mr-light/40"
                />
                <div>
                  <p className="font-heading text-base font-bold text-mr-dark">
                    {profile.name}
                  </p>
                  <p className="text-xs text-body">{profile.brokerage}</p>
                  <p className="text-xs text-mr-base">{profile.phone}</p>
                </div>
              </div>

              {sent ? (
                <div className="mt-5 rounded-2xl border border-mr-light/40 bg-mr-pale/20 p-5 text-center">
                  <p className="font-heading text-base font-bold text-mr-dark">
                    Request sent
                  </p>
                  <p className="mt-1 text-xs text-body">
                    Placeholder confirmation. Nothing was actually sent.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-3 text-sm font-semibold text-mr-base hover:text-mr-mid"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="mt-5 flex flex-col gap-3"
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    className="rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
                  />
                  <input
                    type="text"
                    placeholder="Phone or email"
                    className="rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
                  />
                  <textarea
                    rows={3}
                    placeholder={`I'd like to see ${listing.address}.`}
                    className="rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
                  >
                    Request a showing
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-mr-base/10 bg-mr-dark py-8 text-center text-xs text-white/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Logo theme="dark" variant="logotype" width={150} />
          <p className="mt-3">
            {profile.brokerage} · Fabricated sample listing for reference design.
          </p>
        </div>
      </footer>
    </main>
  );
}
