"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Photo from "@/components/Photo";
import Carousel from "@/components/Carousel";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import { downloadVcard } from "@/lib/vcard";
import { propertyPhoto } from "@/lib/mock/images";
import {
  loadConfig,
  MODULE_ORDER,
  type ModuleId,
} from "@/lib/mock/pageBuilder";
import {
  loadContent,
  defaultContent,
  orderedEducation,
  type PageContent,
} from "@/lib/mock/pageContent";
import BuyAbility from "@/components/BuyAbility";
import {
  PUBLIC_AGENT,
  PUBLIC_LISTINGS,
  RECENT_SALES,
  SERVICE_AREAS,
  REVIEW_SOURCES,
  CLIENT_REVIEWS,
  AGENT_SERVICES,
  PREFERRED_VENDORS,
  type EducationItem,
  type PreferredVendor,
  type CompanyEvent,
} from "@/lib/mock/publicPage";

// The public, client-facing page an agent shares (Surface 2). It renders the
// modules the agent enabled for the Public audience in the page builder, in
// the shared render order. All content is fabricated.
export default function PublicPage() {
  const { profile } = useAgentProfile();
  const [enabled, setEnabled] = useState<ModuleId[]>(MODULE_ORDER);
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [sentContact, setSentContact] = useState(false);
  const [sentValuation, setSentValuation] = useState(false);

  // Read the builder config (Public audience) and curated content after mount.
  useEffect(() => {
    setEnabled(loadConfig().Public);
    setContent(loadContent());
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
            return <About key={id} photos={content.photos ?? []} />;
          case "recentSales":
            return <RecentSales key={id} />;
          case "reviews":
            return <Reviews key={id} />;
          case "services":
            return <Services key={id} />;
          case "vendors":
            return <Vendors key={id} vendors={content.vendors} />;
          case "events":
            return <Events key={id} events={content.events} />;
          case "education":
            return <Education key={id} items={content.education} />;
          case "calculators":
            return <PublicCalculators key={id} />;
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
            {profile.brokerage} · Real Estate | Property Management | Private
            Lending
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
  const { profile } = useAgentProfile();
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
            {profile.market}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold leading-tight drop-shadow sm:text-5xl">
            {profile.headline}
          </h1>
          <p className="mt-4 max-w-md italic text-white/90">
            &ldquo;{profile.tagline}&rdquo;
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
              src={profile.photo}
              alt={profile.name}
              className="h-20 w-20 flex-none rounded-full object-cover object-[center_20%] ring-4 ring-white/30"
            />
            <div>
              <p className="font-heading text-xl font-bold">{profile.name}</p>
              <p className="text-sm text-white/80">{profile.title}</p>
              <p className="text-sm text-mr-pale">{profile.brokerage}</p>
              <p className="mt-1 text-xs text-white/70">{profile.license}</p>
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

function About({ photos }: { photos: string[] }) {
  const { profile } = useAgentProfile();
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Photo
          src={profile.aboutPhoto}
          alt={`${profile.name} and family`}
          className="h-80 w-full rounded-3xl object-cover shadow-lg"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-mr-light">
            About
          </p>
          <h2 className="mt-1 font-heading text-3xl font-bold text-mr-dark">
            Get to know {profile.name.split(" ")[0]}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-body">
            {profile.bio}
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-mr-base">
            Specialties
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.specialties.map((s) => (
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

      {/* Lifestyle gallery: swipe on mobile, arrows on web */}
      <div className="mt-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-mr-base">
          A little more about me
        </p>
        <Carousel ariaLabel="Lifestyle gallery">
          {/* Video tile first: swipeable like the photos, opens a player */}
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="relative h-48 w-72 flex-none snap-start overflow-hidden rounded-2xl border border-white/60 shadow-sm"
          >
            <Photo
              src={profile.photo}
              alt={`A note from ${profile.name.split(" ")[0]}`}
              className="h-48 w-72 object-cover object-[center_20%]"
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center bg-mr-dark/45">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-mr-base shadow-lg">
                ▶
              </span>
              <span className="mt-2 text-xs font-semibold text-white">
                A note from {profile.name.split(" ")[0]}
              </span>
            </span>
          </button>
          {/* Agent-managed photos from the page builder, About photo first */}
          {[profile.aboutPhoto, ...photos].map((src, i) => (
            <div
              key={i}
              className="h-48 w-72 flex-none snap-start overflow-hidden rounded-2xl border border-white/60 shadow-sm"
            >
              <Photo
                src={src}
                alt={`Lifestyle photo ${i + 1}`}
                className="h-48 w-72 object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {videoOpen ? (
        <MediaLightbox
          title={`A note from ${profile.name.split(" ")[0]}`}
          kind="Video"
          onClose={() => setVideoOpen(false)}
        />
      ) : null}
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

function Vendors({ vendors }: { vendors: PreferredVendor[] }) {
  if (vendors.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHead eyebrow="Trusted partners" title="Preferred vendors" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vendors.map((v) => (
          <div
            key={v.id}
            className="flex flex-col rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur"
          >
            <span className="self-start rounded-full bg-mr-pale/25 px-2.5 py-0.5 text-xs font-semibold text-mr-base">
              {v.type}
            </span>
            <h3 className="mt-3 font-heading text-base font-bold text-mr-dark">
              {v.name}
            </h3>
            {v.company ? (
              <p className="text-sm font-medium text-mr-base">{v.company}</p>
            ) : null}
            <p className="mt-1 flex-1 text-sm text-body">{v.blurb}</p>
            <div className="mt-3 space-y-0.5 text-xs text-body">
              {v.phone ? (
                <a
                  href={`tel:${v.phone.replace(/[^0-9+]/g, "")}`}
                  className="block hover:text-mr-base"
                >
                  {v.phone}
                </a>
              ) : null}
              {v.email ? (
                <a
                  href={`mailto:${v.email}`}
                  className="block truncate hover:text-mr-base"
                >
                  {v.email}
                </a>
              ) : null}
            </div>
            {v.url ? (
              <a
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 rounded-full border border-mr-base/20 bg-white/70 px-4 py-2 text-center text-xs font-semibold text-mr-base transition-colors hover:bg-white"
              >
                Visit website
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function Events({ events }: { events: CompanyEvent[] }) {
  const [rsvp, setRsvp] = useState<Record<string, boolean>>({});
  if (events.length === 0) return null;
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
          {events.map((e) => (
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
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRsvp((r) => ({ ...r, [e.id]: !r[e.id] }))}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    rsvp[e.id]
                      ? "bg-white text-mr-base"
                      : "border border-white/40 bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {rsvp[e.id] ? "You're going" : "RSVP free"}
                </button>
                {e.url ? (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-mr-pale transition-colors hover:text-white"
                  >
                    Event details →
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education({ items }: { items: EducationItem[] }) {
  const { profile } = useAgentProfile();
  const [openItem, setOpenItem] = useState<EducationItem | null>(null);
  if (items.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHead eyebrow="Education" title="Tips and market insights" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {orderedEducation(items).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenItem(item)}
            className="group overflow-hidden rounded-2xl border border-white/60 bg-white/70 text-left shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
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
              {item.pinned ? (
                <span className="absolute right-3 top-3 rounded-full bg-mr-base px-2.5 py-0.5 text-xs font-semibold text-white">
                  Featured
                </span>
              ) : null}
              {item.type === "Video" ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/85 text-mr-base shadow-lg transition-transform group-hover:scale-110">
                    ▶
                  </span>
                </span>
              ) : null}
            </div>
            <div className="p-4">
              <h3 className="font-heading text-base font-bold text-mr-dark">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-body">
                {profile.name} · {item.date} · {item.length}
              </p>
              {item.url ? (
                <span
                  role="link"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    window.open(item.url, "_blank", "noopener,noreferrer");
                  }}
                  className="mt-2 inline-block text-xs font-semibold text-mr-base hover:text-mr-mid"
                >
                  {item.type === "Video" ? "Watch the full session →" : "Read the full article →"}
                </span>
              ) : null}
            </div>
          </button>
        ))}
      </div>

      {openItem ? (
        <MediaLightbox
          title={openItem.title}
          kind={openItem.type}
          onClose={() => setOpenItem(null)}
        />
      ) : null}
    </section>
  );
}

// Faux media player overlay used for education items and the About video.
function MediaLightbox({
  title,
  kind,
  onClose,
}: {
  title: string;
  kind: string;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-mr-dark/70 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-mr-dark shadow-2xl"
      >
        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-mr-base to-mr-dark">
          <div className="text-center text-white">
            <span className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-white/15 text-2xl">
              ▶
            </span>
            <p className="mt-3 text-sm text-white/80">
              Sample {kind.toLowerCase()} player. The live page would stream the
              real content here.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 bg-white p-4">
          <p className="font-heading text-sm font-bold text-mr-dark">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="flex-none rounded-full bg-mr-base px-4 py-1.5 text-xs font-semibold text-white hover:bg-mr-mid"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Client-facing calculators: the full BuyAbility profile (shared with the
// agent-side calculators) plus a quick seller net estimate.
function PublicCalculators() {
  const { profile } = useAgentProfile();
  const [tab, setTab] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState(1200000);
  const [payoff, setPayoff] = useState(450000);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  // Seller: 5% commission + 1.5% closing.
  const net = price - payoff - price * 0.05 - price * 0.015;

  const input =
    "w-full rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40";

  return (
    <section className="bg-gradient-to-b from-transparent to-mr-pale/15 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHead eyebrow="Quick math" title="Run your numbers" />
        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg backdrop-blur sm:p-8">
          <div className="mb-5 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setTab("buy")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                tab === "buy"
                  ? "bg-mr-base text-white"
                  : "border border-mr-base/15 bg-white/70 text-body"
              }`}
            >
              What can I afford?
            </button>
            <button
              type="button"
              onClick={() => setTab("sell")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                tab === "sell"
                  ? "bg-mr-base text-white"
                  : "border border-mr-base/15 bg-white/70 text-body"
              }`}
            >
              What would I net?
            </button>
          </div>

          {tab === "buy" ? (
            <BuyAbility
              variant="public"
              lender={{
                name: PREFERRED_VENDORS[0].name,
                company: PREFERRED_VENDORS[0].company,
                url: PREFERRED_VENDORS[0].url,
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-mr-dark">
                  Estimated sale price
                </span>
                <input
                  type="number"
                  value={price}
                  step={10000}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className={input}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-mr-dark">
                  Remaining loan balance
                </span>
                <input
                  type="number"
                  value={payoff}
                  step={10000}
                  onChange={(e) => setPayoff(parseFloat(e.target.value) || 0)}
                  className={input}
                />
              </label>
              <div className="sm:col-span-2 rounded-2xl bg-gradient-to-br from-mr-base to-mr-dark p-5 text-center text-white">
                <p className="text-xs uppercase tracking-widest text-mr-pale">
                  Estimated net proceeds
                </p>
                <p className="mt-1 font-heading text-3xl font-bold">{fmt(net)}</p>
              </div>
            </div>
          )}

          <p className="mt-4 text-center text-xs text-body">
            Rough estimates, not a lending offer or guarantee.{" "}
            <a href="#contact" className="font-semibold text-mr-base underline">
              Ask {profile.name.split(" ")[0]} for exact numbers
            </a>
            .
          </p>
        </div>
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
  const { profile } = useAgentProfile();
  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-lg backdrop-blur-xl sm:p-10">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-mr-dark">
            Let&rsquo;s talk
          </h2>
          <p className="mt-2 text-sm text-body">
            Send a note and {profile.name.split(" ")[0]} will reach out. This
            form is a placeholder and does not send.
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
          <a href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`}>
            {profile.phone}
          </a>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span>{profile.license}</span>
          {/* Real .vcf download so a visitor can save the agent to contacts */}
          <button
            type="button"
            onClick={() => downloadVcard(profile)}
            className="rounded-full border border-mr-base/20 bg-white/70 px-4 py-1.5 text-xs font-semibold text-mr-base transition-colors hover:bg-white"
          >
            Save contact
          </button>
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
