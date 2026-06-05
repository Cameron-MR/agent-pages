"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  PUBLIC_AGENT,
  PUBLIC_LISTINGS,
  PUBLIC_TESTIMONIALS,
} from "@/lib/mock/publicPage";

// The public, client-facing page an agent shares (Surface 2). Distinct chrome
// from the agent cockpit: a dark glassy hero, featured listings, about,
// testimonials, and a working-feeling contact form. All content is fabricated.
export default function PublicPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-surface-light text-body">
      {/* Reference banner so the team knows this is the shared page. */}
      <div className="bg-mr-dark/90 px-4 py-2 text-center text-xs text-white/80">
        Reference preview of the client-facing page.{" "}
        <Link href="/page-builder" className="underline">
          Back to the page builder
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-mr-base via-mr-dark to-mr-dark text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-mr-light/30 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-mr-mid/40 blur-[130px]"
        />

        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <Logo theme="dark" variant="logotype" width={170} priority />
          <a
            href="#contact"
            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/20"
          >
            Contact
          </a>
        </header>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-mr-pale">
              {PUBLIC_AGENT.market}
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl">
              {PUBLIC_AGENT.headline}
            </h1>
            <p className="mt-4 max-w-md text-white/80">{PUBLIC_AGENT.bio}</p>
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

          {/* Agent card */}
          <div className="rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-mr-light to-mr-pale text-2xl font-bold text-mr-dark">
                JS
              </span>
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
            <div className="mt-6 grid grid-cols-3 gap-3">
              {PUBLIC_AGENT.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/15 bg-white/5 p-3 text-center"
                >
                  <p className="font-heading text-xl font-bold">{s.value}</p>
                  <p className="mt-0.5 text-[0.65rem] text-white/70">
                    {s.label}
                  </p>
                </div>
              ))}
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
              <div
                className={`relative h-40 bg-gradient-to-br ${listing.swatch}`}
              >
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

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-transparent to-mr-pale/15 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
                <blockquote className="text-sm italic leading-relaxed text-body">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4">
                  <p className="text-sm font-semibold text-mr-dark">
                    {t.name}
                  </p>
                  <p className="text-xs text-mr-base">{t.context}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
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
