"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Photo from "@/components/Photo";
import { propertyPhoto } from "@/lib/mock/images";
import {
  loadConfig,
  MODULE_ORDER,
  type ModuleId,
} from "@/lib/mock/pageBuilder";
import {
  PUBLIC_AGENT,
  PUBLIC_LISTINGS,
  RECENT_SALES,
  SERVICE_AREAS,
  REVIEW_SOURCES,
  CLIENT_REVIEWS,
  COMPANY_EVENTS,
  EDUCATION_ITEMS,
  PREFERRED_VENDORS,
  AGENT_SERVICES,
} from "@/lib/mock/publicPage";

// The public, client-facing page an agent shares (Surface 2). It renders the
// modules the agent enabled for the Public audience in the page builder, in
// the shared render order. All content is fabricated.
export default function PublicPage() {
  const [enabled, setEnabled] = useState<ModuleId[]>(MODULE_ORDER);
  const [sentContact, setSentContact] = useState(false);
  const [sentValuation, setSentValuation] = useState(false);

  // Read the builder config (Public audience) after mount.
  useEffect(() => {
    setEnabled(loadConfig().Public);
  }, []);

  const has = (id: ModuleId) => enabled.includes(id);

  return (
    <main className="min-h-screen bg-surface-light text-body">
      <div className="bg-mr-dark/90 px-4 py-2 text-center text-xs text-white/80">
        Reference preview of the client-facing page.{" "}
        <Link href="/page-builder" className="underline">
          Back to the page builder
        </Link>
      </div>

      {/* Always-on slim header */}
      <header className="absolute left-0 right-0 z-20 mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo theme="dark" variant="logotype" width={170} priority />
        <a
          href="#contact"
          className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
        >
          Contact
        </a>
      </header>

      {MODULE_ORDER.filter(has).map((id) => {
        switch (id) {
          case "hero":
            return <Hero key={id} />;
          case "valuation":
            return (
              <Valuation
                key={id}
                sent={sentValuation}
                onSubmit={() => setSentValuation(true)}
              />
            );
          case "featured":
            return <Featured key={id} />;
          case "about":
            return <About key={id} />;
          case "recentSales":
            return <RecentSales key={id} />;
          case "reviews":
            return <Reviews key={id} />;
          case "services":
            return <Services key={id} />;
          case "vendors":
            return <Vendors key={id} />;
          case "events":
            return <Events key={id} />;
          case "education":
            return <Education key={id} />;
          case "contact":
            return (
              <Contact
                key={id}
                sent={sentContact}
                onSubmit={() => setSentContact(true)}
                onReset={() => setSentContact(false)}
              />
            );
          default:
            return null;
        }
      })}

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

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} stars`} className="text-mr-light">
      {"★★★★★".slice(0, n)}
      <span className="text-mr-pale/40">{"★★★★★".slice(n)}</span>
    </span>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-mr-light">
        {eyebrow}
      </p>
      <h2 className="mt-1 font-heading text-3xl font-bold text-mr-dark">
        {title}
      </h2>
    </div>
  );
}

function Hero() {
  return (
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
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-mr-pale">
            {PUBLIC_AGENT.market}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold leading-tight drop-shadow sm:text-5xl">
            {PUBLIC_AGENT.headline}
          </h1>
          <p className="mt-4 max-w-md italic text-white/90">
            &ldquo;{PUBLIC_AGENT.tagline}&rdquo;
          </p>
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
              className="h-20 w-20 flex-none rounded-full object-cover object-[center_20%] ring-4 ring-white/30"
            />
            <div>
              <p className="font-heading text-xl font-bold">
                {PUBLIC_AGENT.name}
              </p>
              <p className="text-sm text-white/80">{PUBLIC_AGENT.title}</p>
              <p className="text-sm text-mr-pale">{PUBLIC_AGENT.brokerage}</p>
              <p className="mt-1 text-xs text-white/70">{PUBLIC_AGENT.license}</p>
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
    </section>
  );
}

function Valuation({
  sent,
  onSubmit,
}: {
  sent: boolean;
  onSubmit: () => void;
}) {
  return (
    <section className="relative overflow-hidden">
      <Photo
        src={propertyPhoto(9, 1600)}
        alt="Neighborhood"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-heading text-3xl font-bold text-mr-dark">
          What&rsquo;s my home worth?
        </h2>
        <p className="mt-2 text-sm text-body">
          Get a free, no-obligation home assessment based on current market
          data.
        </p>
        {sent ? (
          <p className="mx-auto mt-6 max-w-md rounded-2xl border border-mr-light/40 bg-mr-pale/20 px-5 py-4 text-sm text-mr-dark">
            Thanks. Your assessment request was received. Placeholder
            confirmation; nothing was sent.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              placeholder="Enter your home address"
              className="flex-1 rounded-full border border-mr-base/15 bg-white px-5 py-3 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
            />
            <button
              type="submit"
              className="flex-none rounded-full bg-mr-base px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
            >
              Get a Free Home Assessment
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section id="listings" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHead eyebrow="Featured" title="Current listings" />
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
  );
}

function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Photo
          src={PUBLIC_AGENT.familyPhoto}
          alt={`${PUBLIC_AGENT.name} and family`}
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
            {PUBLIC_AGENT.personalBio}
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
  );
}

function RecentSales() {
  return (
    <section className="bg-mr-dark py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-mr-pale">
            Track record
          </p>
          <h2 className="mt-1 font-heading text-3xl font-bold">Recently sold</h2>
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
  );
}

function Reviews() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHead eyebrow="Reviews" title="What clients say" />

      {/* Aggregate source badges */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {REVIEW_SOURCES.map((s) => (
          <div
            key={s.source}
            className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/70 px-4 py-2 shadow-sm"
          >
            <span className="font-heading text-lg font-bold text-mr-base">
              {s.rating}
            </span>
            <span className="text-left text-xs text-body">
              <span className="block font-semibold text-mr-dark">
                {s.source}
              </span>
              {s.count} reviews
            </span>
          </div>
        ))}
      </div>

      {/* Unified feed */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {CLIENT_REVIEWS.map((r) => (
          <figure
            key={r.id}
            className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <Stars n={r.stars} />
              <span className="rounded-full bg-mr-pale/25 px-2.5 py-0.5 text-xs font-medium text-mr-base">
                {r.source}
              </span>
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-body">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4">
              <p className="text-sm font-semibold text-mr-dark">{r.name}</p>
              <p className="text-xs text-mr-base">{r.transaction}</p>
              <p className="text-xs text-body">{r.date}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-body">
        Reviews aggregated from your connected sources. Sample content only.
      </p>
    </section>
  );
}

function Services() {
  return (
    <section className="bg-gradient-to-b from-transparent to-mr-pale/15 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow="Full service" title="More ways I can help" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {AGENT_SERVICES.map((s) => (
            <div
              key={s.id}
              className="flex flex-col rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur"
            >
              <h3 className="font-heading text-xl font-bold text-mr-dark">
                {s.name}
              </h3>
              <p className="mt-2 flex-1 text-sm text-body">{s.blurb}</p>
              <a
                href="#contact"
                className="mt-4 inline-block w-fit rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
              >
                {s.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vendors() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHead eyebrow="Trusted partners" title="Preferred vendors" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PREFERRED_VENDORS.map((v) => (
          <div
            key={v.id}
            className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur"
          >
            <span className="rounded-full bg-mr-pale/25 px-2.5 py-0.5 text-xs font-semibold text-mr-base">
              {v.type}
            </span>
            <h3 className="mt-3 font-heading text-base font-bold text-mr-dark">
              {v.name}
            </h3>
            <p className="mt-1 text-sm text-body">{v.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Events() {
  return (
    <section className="bg-mr-base py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-mr-pale">
            Learn with us
          </p>
          <h2 className="mt-1 font-heading text-3xl font-bold">
            Upcoming events
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {COMPANY_EVENTS.map((e) => (
            <div
              key={e.id}
              className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold">
                  {e.type}
                </span>
                <span className="text-xs text-white/70">
                  {e.going} others going
                </span>
              </div>
              <h3 className="mt-3 font-heading text-base font-bold">
                {e.title}
              </h3>
              <p className="mt-1 text-sm text-white/85">
                {e.date} · {e.time}
              </p>
              <p className="text-xs text-mr-pale">
                {e.format} · {e.speakers}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHead eyebrow="Education" title="Tips and market insights" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {EDUCATION_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h-40 overflow-hidden">
              <Photo
                src={item.photo}
                alt={item.title}
                className="h-40 w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-mr-base">
                {item.type}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-heading text-base font-bold text-mr-dark">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-body">
                {PUBLIC_AGENT.name} · {item.date} · {item.length}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact({
  sent,
  onSubmit,
  onReset,
}: {
  sent: boolean;
  onSubmit: () => void;
  onReset: () => void;
}) {
  return (
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
              onClick={onReset}
              className="mt-4 text-sm font-semibold text-mr-base hover:text-mr-mid"
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
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
        <p className="mt-3 text-center text-xs text-body">
          Serving {SERVICE_AREAS.slice(0, 6).join(", ")}, and more.
        </p>
      </div>
    </section>
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
