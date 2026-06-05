"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Photo from "@/components/Photo";
import { propertyPhoto } from "@/lib/mock/images";
import {
  PUBLIC_AGENT,
  PUBLIC_LISTINGS,
  PUBLIC_TESTIMONIALS,
  RECENT_SALES,
  SERVICE_AREAS,
} from "@/lib/mock/publicPage";

// The public, client-facing page an agent shares (Surface 2). Photo-driven,
// distinct chrome from the agent cockpit: hero over a property image, stat
// band, featured listings, recent sales, about with specialties, a service
// area map, testimonials, and a working-feeling contact form. All fabricated.
export default function PublicPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-surface-light text-body">
      <div className="bg-mr-dark/90 px-4 py-2 text-center text-xs text-white/80">
        Reference preview of the client-facing page.{" "}
        <Link href="/page-builder" className="underline">
          Back to the page builder
        </Link>
      </div>

      {/* Hero over a property photo */}
      <section className="relative overflow-hidden text-white">
        <Photo
          src={propertyPhoto(0, 1600)}
          alt="Featured Orange County home"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-mr-dark/95 via-mr-dark/85 to-mr-base/70"
        />

        <div className="relative z-10">
          <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
            <Logo theme="dark" variant="logotype" width={170} priority />
            <a
              href="#contact"
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/20"
            >
              Contact
            </a>
          </header>

          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-mr-pale">
                {PUBLIC_AGENT.market}
              </p>
              <h1 className="mt-3 font-heading text-4xl font-bold leading-tight drop-shadow sm:text-5xl">
                {PUBLIC_AGENT.headline}
              </h1>
              <p className="mt-4 max-w-md text-white/85">{PUBLIC_AGENT.bio}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#listings"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-mr-dark transition-transform hover:-translate-y-0.5"
                >
                  View listings
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/20"
                >
                  Work with me
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <Photo
                  src={PUBLIC_AGENT.photo}
                  alt={PUBLIC_AGENT.name}
                  className="h-20 w-20 flex-none rounded-full object-cover ring-4 ring-white/30"
                />
                <div>
                  <p className="font-heading text-xl font-bold">
                    {PUBLIC_AGENT.name}
                  </p>
                  <p className="text-sm text-white/80">{PUBLIC_AGENT.title}</p>
                  <p className="text-sm text-mr-pale">
                    {PUBLIC_AGENT.brokerage}
                  </p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-2">
                {PUBLIC_AGENT.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/15 bg-white/5 p-2 text-center"
                  >
                    <p className="font-heading text-lg font-bold">{s.value}</p>
                    <p className="mt-0.5 text-[0.6rem] leading-tight text-white/70">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section id="listings" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-mr-light">
            Featured
          </p>
          <h2 className="mt-1 font-heading text-3xl font-bold text-mr-dark">
            Current listings
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PUBLIC_LISTINGS.map((listing) => (
            <div
              key={listing.id}
              className="group overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-44 overflow-hidden">
                <Photo
                  src={listing.photo}
                  alt={listing.address}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-mr-dark">
                  {listing.status}
                </span>
              </div>
              <div className="p-4">
                <p className="font-heading text-lg font-bold text-mr-base">
                  {listing.price}
                </p>
                <p className="mt-1 text-sm font-medium text-mr-dark">
                  {listing.address}
                </p>
                <p className="mt-2 text-xs text-body">
                  {listing.beds} bd · {listing.baths} ba · {listing.sqft} sqft
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent sales */}
      <section className="bg-mr-dark py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-mr-pale">
              Track record
            </p>
            <h2 className="mt-1 font-heading text-3xl font-bold">
              Recently sold
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RECENT_SALES.map((sale) => (
              <div
                key={sale.id}
                className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur"
              >
                <div className="relative h-40 overflow-hidden">
                  <Photo
                    src={sale.photo}
                    alt={sale.address}
                    className="h-40 w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-mr-base px-2.5 py-0.5 text-xs font-semibold text-white">
                    Sold
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-heading text-lg font-bold text-white">
                    {sale.price}
                  </p>
                  <p className="mt-1 text-sm text-white/85">{sale.address}</p>
                  <p className="mt-2 text-xs text-mr-pale">{sale.side}</p>
                  <p className="text-xs text-white/60">{sale.soldAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + specialties */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Photo
            src={PUBLIC_AGENT.photo}
            alt={PUBLIC_AGENT.name}
            className="h-80 w-full rounded-3xl object-cover shadow-lg"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-mr-light">
              About
            </p>
            <h2 className="mt-1 font-heading text-3xl font-bold text-mr-dark">
              Get to know {PUBLIC_AGENT.name.split(" ")[0]}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-body">
              {PUBLIC_AGENT.bio}
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-mr-base">
              Specialties
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {PUBLIC_AGENT.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-mr-base/15 bg-white/70 px-3 py-1 text-sm text-mr-dark"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service areas with a faux map */}
      <section className="bg-gradient-to-b from-transparent to-mr-pale/15 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-mr-light">
              Coverage
            </p>
            <h2 className="mt-1 font-heading text-3xl font-bold text-mr-dark">
              Service areas
            </h2>
          </div>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <FauxMap />
            <div className="flex flex-wrap gap-3">
              {SERVICE_AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-mr-base/15 bg-white/70 px-4 py-2 text-sm font-medium text-mr-dark shadow-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-mr-light">
            Reviews
          </p>
          <h2 className="mt-1 font-heading text-3xl font-bold text-mr-dark">
            What clients say
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PUBLIC_TESTIMONIALS.map((t) => (
            <figure
              key={t.id}
              className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur"
            >
              <div aria-hidden className="mb-2 text-mr-light">
                {"★★★★★"}
              </div>
              <blockquote className="text-sm italic leading-relaxed text-body">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4">
                <p className="text-sm font-semibold text-mr-dark">{t.name}</p>
                <p className="text-xs text-mr-base">{t.context}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-lg backdrop-blur-xl sm:p-10">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-mr-dark">
              Let&rsquo;s talk
            </h2>
            <p className="mt-2 text-sm text-body">
              Send a note and {PUBLIC_AGENT.name.split(" ")[0]} will reach out.
              This form is a placeholder and does not send.
            </p>
          </div>

          {sent ? (
            <div className="mt-8 rounded-2xl border border-mr-light/40 bg-mr-pale/20 p-8 text-center">
              <p className="font-heading text-lg font-bold text-mr-dark">
                Thanks, message received.
              </p>
              <p className="mt-1 text-sm text-body">
                Placeholder confirmation. Nothing was actually sent.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-4 text-sm font-semibold text-mr-base hover:text-mr-mid"
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
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Field label="Name" placeholder="Your name" />
              <Field label="Phone" placeholder="(949) 555-0000" />
              <div className="sm:col-span-2">
                <Field label="Email" placeholder="you@example.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-mr-dark">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="What are you looking for?"
                  className="w-full rounded-xl border border-mr-base/15 bg-white px-4 py-2.5 text-sm text-mr-dark outline-none transition focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
                />
              </div>
              <button
                type="submit"
                className="sm:col-span-2 rounded-full bg-mr-base px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
              >
                Send message
              </button>
            </form>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-body">
            <a href={`tel:${PUBLIC_AGENT.phone.replace(/[^0-9+]/g, "")}`}>
              {PUBLIC_AGENT.phone}
            </a>
            <a href={`mailto:${PUBLIC_AGENT.email}`}>{PUBLIC_AGENT.email}</a>
            <span>{PUBLIC_AGENT.license}</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-mr-base/10 bg-mr-dark py-8 text-center text-xs text-white/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Logo theme="dark" variant="logotype" width={150} />
          <p className="mt-3">
            {PUBLIC_AGENT.brokerage} · Real Estate | Property Management |
            Private Lending
          </p>
          <p className="mt-2">
            Fabricated sample page for reference design. Not a live listing
            site.
          </p>
        </div>
      </footer>
    </main>
  );
}

function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-mr-dark">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-xl border border-mr-base/15 bg-white px-4 py-2.5 text-sm text-mr-dark outline-none transition focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
      />
    </div>
  );
}

// A stylized stand-in for an interactive map. Pure SVG so there is no API key
// or external dependency. Pins are decorative.
function FauxMap() {
  const pins = [
    [70, 60],
    [120, 95],
    [180, 70],
    [150, 140],
    [220, 120],
    [90, 150],
    [250, 90],
    [200, 175],
  ];
  return (
    <div className="overflow-hidden rounded-3xl border border-white/60 shadow-lg">
      <svg viewBox="0 0 320 220" className="h-64 w-full">
        <rect width="320" height="220" fill="#8BB8C4" fillOpacity="0.25" />
        {/* faux water */}
        <path d="M0 220 L0 150 Q90 130 160 175 T320 160 L320 220 Z" fill="#50AAC4" fillOpacity="0.35" />
        {/* faux roads */}
        <g stroke="#316878" strokeOpacity="0.25" strokeWidth="3" fill="none">
          <path d="M20 40 L300 60" />
          <path d="M40 10 L120 210" />
          <path d="M260 10 L210 210" />
          <path d="M0 110 L320 130" />
        </g>
        {pins.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="7" fill="#316878" />
            <circle cx={x} cy={y} r="3" fill="#fff" />
          </g>
        ))}
      </svg>
    </div>
  );
}
