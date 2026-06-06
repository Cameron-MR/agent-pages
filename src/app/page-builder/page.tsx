"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Photo from "@/components/Photo";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import { LISTINGS } from "@/lib/mock/listings";
import {
  AUDIENCES,
  AUDIENCE_HEADLINES,
  BUILDER_MODULES,
  MODULE_ORDER,
  defaultConfig,
  loadConfig,
  saveConfig,
  type Audience,
  type ModuleId,
  type PageConfig,
} from "@/lib/mock/pageBuilder";
import {
  loadContent,
  saveContent,
  defaultContent,
  PHOTO_LIBRARY,
  type PageContent,
} from "@/lib/mock/pageContent";
import {
  propertyPhoto,
} from "@/lib/mock/images";
import type {
  EducationItem,
  PreferredVendor,
  CompanyEvent,
} from "@/lib/mock/publicPage";

// Client Page Builder. The agent picks an audience, toggles modules on or off,
// and watches a live phone-style preview update. Publishing is a placeholder.
// One agent, many configurations: each audience keeps its own module set.
export default function PageBuilderPage() {
  const [audience, setAudience] = useState<Audience>("Public");
  const [config, setConfig] = useState<PageConfig>(defaultConfig);
  const [published, setPublished] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load the saved config after mount so the builder matches the live page.
  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  const activeIds = config[audience];
  const has = (id: ModuleId) => activeIds.includes(id);

  const toggle = (id: ModuleId) => {
    setConfig((prev) => {
      const on = prev[audience].includes(id);
      const nextIds = on
        ? prev[audience].filter((m) => m !== id)
        : MODULE_ORDER.filter((m) => m === id || prev[audience].includes(m));
      const next = { ...prev, [audience]: nextIds };
      saveConfig(next);
      return next;
    });
    setPublished(false);
  };

  const enabledModules = useMemo(
    () => BUILDER_MODULES.filter((m) => activeIds.includes(m.id)),
    [activeIds]
  );

  return (
    <PageShell
      active="/page-builder"
      eyebrow="Client-Facing Page"
      title="Page Builder"
      description="Customize the public page you share with clients. Switch audience, toggle modules, and preview live. One page, many configurations."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Left: controls */}
        <div className="lg:col-span-3">
          {/* Audience switcher */}
          <div className="rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150">
            <h2 className="font-heading text-base font-bold text-mr-dark">
              Audience
            </h2>
            <p className="mb-3 text-xs text-body">
              Each audience keeps its own set of modules.
            </p>
            <div className="flex flex-wrap gap-2">
              {AUDIENCES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAudience(a)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    audience === a
                      ? "bg-mr-base text-white shadow-sm"
                      : "border border-mr-base/15 bg-white/70 text-body hover:text-mr-base"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Module toggles */}
          <div className="mt-4 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-heading text-base font-bold text-mr-dark">
                Modules
              </h2>
              <span className="text-xs text-body">
                {enabledModules.length} of {BUILDER_MODULES.length} on
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {BUILDER_MODULES.map((m) => {
                const on = has(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggle(m.id)}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/60 bg-white/60 p-3 text-left transition-colors hover:border-mr-light/50"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-mr-dark">
                        {m.name}
                      </span>
                      <span className="block text-xs text-body">
                        {m.description}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`relative h-6 w-11 flex-none rounded-full transition-colors ${
                        on ? "bg-mr-base" : "bg-mr-pale/40"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                          on ? "left-[1.375rem]" : "left-0.5"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Publish bar */}
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-mr-dark">
                Share link
              </p>
              <p className="text-xs text-body">
                marshallreddick.example/jordan-sample/
                {audience.toLowerCase()}
              </p>
            </div>
            <div className="flex gap-2">
              {/* Real clipboard copy of the live page URL */}
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard?.writeText(
                      `${window.location.origin}/p/jordan-sample`
                    );
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1800);
                  } catch {
                    // ignore
                  }
                }}
                className="rounded-full border border-mr-base/20 bg-white/70 px-5 py-2.5 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
              >
                {copied ? "Copied" : "Copy link"}
              </button>
              <Link
                href="/p/jordan-sample"
                className="rounded-full border border-mr-base/20 bg-white/70 px-5 py-2.5 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
              >
                Open live page
              </Link>
              <button
                type="button"
                onClick={() => setPublished(true)}
                className="rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
              >
                {published ? "Published" : "Publish"}
              </button>
            </div>
          </div>
          {published ? (
            <p className="mt-2 text-xs font-medium text-mr-base">
              Changes published. Placeholder action, nothing is persisted.
            </p>
          ) : null}
        </div>

        {/* Right: live preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-mr-light">
              Live preview
            </p>
            <PhonePreview audience={audience} enabledIds={activeIds} />
          </div>
        </div>
      </div>

      <ContentEditor />
    </PageShell>
  );
}

function PhonePreview({
  audience,
  enabledIds,
}: {
  audience: Audience;
  enabledIds: ModuleId[];
}) {
  const has = (id: ModuleId) => enabledIds.includes(id);
  const { profile, initials } = useAgentProfile();
  const featured = LISTINGS.filter((l) => l.status !== "Sold").slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-[20rem] overflow-hidden rounded-[2.5rem] border-[6px] border-mr-dark bg-mr-dark shadow-2xl">
      <div className="flex h-6 items-center justify-center bg-mr-dark">
        <span className="h-1.5 w-16 rounded-full bg-white/25" />
      </div>
      <div className="max-h-[34rem] overflow-y-auto bg-surface-light">
        {/* Hero over a property photo, like the live public page */}
        {has("hero") ? (
          <div className="relative text-white">
            <Photo
              src={featured[0]?.photo ?? ""}
              alt="Featured home"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-mr-dark/95 via-mr-dark/80 to-mr-base/70"
            />
            <div className="relative p-5">
              <div className="flex items-center gap-3">
                <Photo
                  src={profile.photo}
                  alt={profile.name}
                  className="h-11 w-11 flex-none rounded-full object-cover object-[center_20%] ring-2 ring-white/40"
                />
                <div className="min-w-0">
                  <p className="truncate font-heading text-sm font-bold">
                    {profile.name}
                  </p>
                  <p className="truncate text-xs text-white/80">
                    {profile.brokerage}
                  </p>
                </div>
                <span className="sr-only">{initials}</span>
              </div>
              <p className="mt-3 font-heading text-base font-bold leading-snug drop-shadow">
                {AUDIENCE_HEADLINES[audience]}
              </p>
              <span className="mt-3 inline-block rounded-full bg-white px-3 py-1 text-[0.65rem] font-semibold text-mr-dark">
                Work with me
              </span>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 p-4">
          {has("valuation") ? (
            <PreviewBlock title="What's my home worth?" tint>
              <div className="flex items-center justify-between rounded-lg border border-mr-base/15 bg-white p-2 text-xs text-body">
                Enter your address
                <span className="rounded bg-mr-base px-2 py-0.5 text-[0.6rem] font-semibold text-white">
                  Get value
                </span>
              </div>
            </PreviewBlock>
          ) : null}

          {has("featured") ? (
            <div>
              <p className="mb-1.5 font-heading text-xs font-bold text-mr-dark">
                Featured listings
              </p>
              <div className="flex gap-2">
                {featured.map((l) => (
                  <div
                    key={l.id}
                    className="flex-1 overflow-hidden rounded-lg border border-white/60 bg-white shadow-sm"
                  >
                    <Photo
                      src={l.photo}
                      alt={l.address}
                      className="h-16 w-full object-cover"
                    />
                    <div className="p-1.5">
                      <p className="font-heading text-[0.7rem] font-bold text-mr-base">
                        {l.price}
                      </p>
                      <p className="truncate text-[0.6rem] text-body">
                        {l.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {has("about") ? (
            <div className="flex gap-2 rounded-xl border border-white/60 bg-white/70 p-3">
              <Photo
                src={profile.photo}
                alt={profile.name}
                className="h-12 w-12 flex-none rounded-lg object-cover object-[center_20%]"
              />
              <div>
                <p className="font-heading text-xs font-bold text-mr-dark">
                  About {profile.name.split(" ")[0]}
                </p>
                <p className="text-[0.65rem] leading-snug text-body">
                  Orange County agent focused on a smooth, well-marketed sale.
                </p>
              </div>
            </div>
          ) : null}

          {has("recentSales") ? (
            <PreviewBlock title="Recently sold">
              <div className="flex gap-2">
                {LISTINGS.filter((l) => l.status === "Sold")
                  .concat(featured)
                  .slice(0, 2)
                  .map((l) => (
                    <div
                      key={l.id}
                      className="flex-1 overflow-hidden rounded-lg border border-white/60 bg-white"
                    >
                      <Photo
                        src={l.photo}
                        alt={l.address}
                        className="h-12 w-full object-cover"
                      />
                      <p className="px-1.5 py-1 text-[0.6rem] font-semibold text-mr-base">
                        {l.price}
                      </p>
                    </div>
                  ))}
              </div>
            </PreviewBlock>
          ) : null}

          {has("reviews") ? (
            <PreviewBlock title="Reviews" tint>
              <p className="text-[0.6rem] text-mr-light">★★★★★ Zillow · Google · Yelp</p>
              <p className="text-xs italic text-body">
                &ldquo;Made the whole thing easy.&rdquo;
              </p>
            </PreviewBlock>
          ) : null}

          {has("services") ? (
            <PreviewBlock title="More ways I can help">
              <p className="text-xs text-body">
                Property management and private lending.
              </p>
            </PreviewBlock>
          ) : null}

          {has("vendors") ? (
            <PreviewBlock title="Preferred vendors" tint>
              <p className="text-xs text-body">
                Lender, title, escrow, and insurance.
              </p>
            </PreviewBlock>
          ) : null}

          {has("events") ? (
            <PreviewBlock title="Upcoming events">
              <p className="text-xs text-body">
                Company webinars and investor events.
              </p>
            </PreviewBlock>
          ) : null}

          {has("education") ? (
            <PreviewBlock title="Education" tint>
              <p className="text-xs text-body">
                Videos and articles from {profile.name.split(" ")[0]}.
              </p>
            </PreviewBlock>
          ) : null}

          {has("calculators") ? (
            <PreviewBlock title="Run your numbers" tint>
              <div className="flex items-center justify-between rounded-lg border border-mr-base/15 bg-white p-2 text-xs text-body">
                What can I afford?
                <span className="rounded bg-mr-base px-2 py-0.5 text-[0.6rem] font-semibold text-white">
                  $765,000
                </span>
              </div>
            </PreviewBlock>
          ) : null}

          {has("contact") ? (
            <PreviewBlock title="Get in touch">
              <div className="rounded-lg bg-mr-base py-1.5 text-center text-xs font-semibold text-white">
                Contact {profile.name.split(" ")[0]}
              </div>
            </PreviewBlock>
          ) : null}

          {enabledIds.length === 0 ? (
            <p className="py-12 text-center text-xs text-body">
              No modules on. Toggle some to build the page.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PreviewBlock({
  title,
  tint,
  children,
}: {
  title: string;
  tint?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        tint
          ? "border-mr-light/30 bg-mr-pale/15"
          : "border-white/60 bg-white/70"
      }`}
    >
      <p className="mb-1.5 font-heading text-xs font-bold text-mr-dark">
        {title}
      </p>
      {children}
    </div>
  );
}

// Curate the content for the Education and Preferred Vendors modules. Edits
// save immediately and the public page renders them.
function ContentEditor() {
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    setContent(loadContent());
  }, []);

  const persist = (next: PageContent) => {
    setContent(next);
    saveContent(next);
  };

  const updateEd = (id: string, patch: Partial<EducationItem>) =>
    persist({
      ...content,
      education: content.education.map((e) =>
        e.id === id ? { ...e, ...patch } : e
      ),
    });
  const removeEd = (id: string) =>
    persist({ ...content, education: content.education.filter((e) => e.id !== id) });
  const addEd = () =>
    persist({
      ...content,
      education: [
        ...content.education,
        {
          id: "ed" + Date.now(),
          title: "New educational item",
          type: "Article",
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          length: "3 min read",
          photo: propertyPhoto(content.education.length + 6, 600),
          url: "",
          source: "Mine",
        },
      ],
    });

  const updateVn = (id: string, patch: Partial<PreferredVendor>) =>
    persist({
      ...content,
      vendors: content.vendors.map((v) =>
        v.id === id ? { ...v, ...patch } : v
      ),
    });
  const removeVn = (id: string) =>
    persist({ ...content, vendors: content.vendors.filter((v) => v.id !== id) });
  const addVn = () =>
    persist({
      ...content,
      vendors: [
        ...content.vendors,
        {
          id: "vn" + Date.now(),
          type: "Lending",
          name: "New contact",
          company: "",
          blurb: "",
          url: "",
          email: "",
          phone: "",
        },
      ],
    });

  // Photos shown in the public-page lifestyle carousel.
  const addPhoto = (src: string) => {
    const url = src.trim();
    if (!url || content.photos.includes(url)) return;
    persist({ ...content, photos: [...content.photos, url] });
  };
  const removePhoto = (src: string) =>
    persist({ ...content, photos: content.photos.filter((p) => p !== src) });

  const updateEv = (id: string, patch: Partial<CompanyEvent>) =>
    persist({
      ...content,
      events: content.events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    });
  const removeEv = (id: string) =>
    persist({ ...content, events: content.events.filter((e) => e.id !== id) });
  const addEv = () =>
    persist({
      ...content,
      events: [
        ...content.events,
        {
          id: "e" + Date.now(),
          title: "New event",
          type: "Online Event",
          date: "TBD",
          time: "5:00 PM PDT",
          format: "Online Presentation",
          speakers: "",
          going: 0,
          url: "",
          source: "Mine",
        },
      ],
    });

  const inputCls =
    "w-full rounded-lg border border-mr-base/15 bg-white px-3 py-2 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40";

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Photos: the lifestyle carousel on the public page */}
      <section className="rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 lg:col-span-2">
        <h2 className="font-heading text-base font-bold text-mr-dark">
          Your page photos
        </h2>
        <p className="text-xs text-body">
          These show in the lifestyle carousel in your About section. Add from
          the approved library or paste any image link.
        </p>

        {/* Current photos */}
        <div className="mt-3 flex flex-wrap gap-3">
          {content.photos.map((src) => (
            <div key={src} className="group relative">
              <Photo
                src={src}
                alt="Page photo"
                className="h-24 w-36 rounded-xl object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(src)}
                aria-label="Remove photo"
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-mr-dark text-xs text-white shadow transition-transform hover:scale-110"
              >
                &times;
              </button>
            </div>
          ))}
          {content.photos.length === 0 ? (
            <p className="rounded-xl border border-dashed border-mr-base/20 px-6 py-8 text-xs text-body">
              No photos yet. Add some below.
            </p>
          ) : null}
        </div>

        {/* Library picker */}
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-mr-base">
          Add from the library
        </p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {PHOTO_LIBRARY.filter((src) => !content.photos.includes(src)).map(
            (src) => (
              <button
                key={src}
                type="button"
                onClick={() => addPhoto(src)}
                className="group relative flex-none focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
              >
                <Photo
                  src={src}
                  alt="Library photo"
                  className="h-16 w-24 rounded-lg object-cover opacity-80 transition group-hover:opacity-100"
                />
                <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-mr-dark/0 text-lg font-bold text-white opacity-0 transition group-hover:bg-mr-dark/30 group-hover:opacity-100">
                  +
                </span>
              </button>
            )
          )}
        </div>

        {/* Add by URL */}
        <div className="mt-3 flex gap-2">
          <input
            value={photoUrl}
            onChange={(ev) => setPhotoUrl(ev.target.value)}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                addPhoto(photoUrl);
                setPhotoUrl("");
              }
            }}
            className={inputCls}
            placeholder="Paste an image link (https://...)"
          />
          <button
            type="button"
            onClick={() => {
              addPhoto(photoUrl);
              setPhotoUrl("");
            }}
            className="flex-none rounded-full bg-mr-base px-5 py-2 text-xs font-semibold text-white hover:bg-mr-mid"
          >
            Add photo
          </button>
        </div>
      </section>

      {/* Education */}
      <section className="rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-base font-bold text-mr-dark">
              Education content
            </h2>
            <p className="text-xs text-body">
              Curate the videos and articles on your page.
            </p>
          </div>
          <button
            type="button"
            onClick={addEd}
            className="rounded-full border border-mr-base/20 bg-white/70 px-3 py-1.5 text-xs font-semibold text-mr-base hover:bg-white"
          >
            Add item
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {content.education.map((e) => (
            <div key={e.id} className="rounded-xl border border-white/60 bg-white/60 p-3">
              {e.source === "Library" ? (
                <span className="mb-2 inline-block rounded-full bg-mr-pale/25 px-2.5 py-0.5 text-[0.65rem] font-semibold text-mr-base">
                  Auto-synced from your education library
                </span>
              ) : null}
              <input
                value={e.title}
                onChange={(ev) => updateEd(e.id, { title: ev.target.value })}
                className={inputCls}
                placeholder="Title"
              />
              <div className="mt-2 grid grid-cols-3 gap-2">
                <select
                  value={e.type}
                  onChange={(ev) =>
                    updateEd(e.id, {
                      type: ev.target.value as EducationItem["type"],
                    })
                  }
                  className={inputCls}
                >
                  <option value="Video">Video</option>
                  <option value="Article">Article</option>
                </select>
                <input
                  value={e.date}
                  onChange={(ev) => updateEd(e.id, { date: ev.target.value })}
                  className={inputCls}
                  placeholder="Date"
                />
                <input
                  value={e.length}
                  onChange={(ev) => updateEd(e.id, { length: ev.target.value })}
                  className={inputCls}
                  placeholder="Length"
                />
              </div>
              <input
                value={e.url ?? ""}
                onChange={(ev) => updateEd(e.id, { url: ev.target.value })}
                className={`${inputCls} mt-2`}
                placeholder="Link to the video or article"
              />
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateEd(e.id, { pinned: !e.pinned })}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    e.pinned
                      ? "bg-mr-base text-white"
                      : "border border-mr-base/15 text-mr-base hover:bg-mr-pale/20"
                  }`}
                >
                  {e.pinned ? "Pinned (shows first)" : "Pin"}
                </button>
                <button
                  type="button"
                  onClick={() => removeEd(e.id)}
                  className="text-xs font-medium text-mr-base hover:text-mr-mid"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vendors */}
      <section className="rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-base font-bold text-mr-dark">
              Preferred vendors
            </h2>
            <p className="text-xs text-body">
              Your recommended lender, title, escrow, and insurance.
            </p>
          </div>
          <button
            type="button"
            onClick={addVn}
            className="rounded-full border border-mr-base/20 bg-white/70 px-3 py-1.5 text-xs font-semibold text-mr-base hover:bg-white"
          >
            Add vendor
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {content.vendors.map((v) => (
            <div key={v.id} className="rounded-xl border border-white/60 bg-white/60 p-3">
              <div className="grid grid-cols-3 gap-2">
                <input
                  value={v.type}
                  onChange={(ev) => updateVn(v.id, { type: ev.target.value })}
                  className={inputCls}
                  placeholder="Type"
                />
                <input
                  value={v.name}
                  onChange={(ev) => updateVn(v.id, { name: ev.target.value })}
                  className={`${inputCls} col-span-2`}
                  placeholder="Contact name"
                />
              </div>
              <input
                value={v.company}
                onChange={(ev) => updateVn(v.id, { company: ev.target.value })}
                className={`${inputCls} mt-2`}
                placeholder="Company"
              />
              <input
                value={v.blurb}
                onChange={(ev) => updateVn(v.id, { blurb: ev.target.value })}
                className={`${inputCls} mt-2`}
                placeholder="Short description"
              />
              <div className="mt-2 grid grid-cols-2 gap-2">
                <input
                  value={v.phone}
                  onChange={(ev) => updateVn(v.id, { phone: ev.target.value })}
                  className={inputCls}
                  placeholder="Phone"
                />
                <input
                  value={v.email}
                  onChange={(ev) => updateVn(v.id, { email: ev.target.value })}
                  className={inputCls}
                  placeholder="Email"
                />
              </div>
              <input
                value={v.url}
                onChange={(ev) => updateVn(v.id, { url: ev.target.value })}
                className={`${inputCls} mt-2`}
                placeholder="Website link"
              />
              <button
                type="button"
                onClick={() => removeVn(v.id)}
                className="mt-2 text-xs font-medium text-mr-base hover:text-mr-mid"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 lg:col-span-2">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-base font-bold text-mr-dark">
              Upcoming events
            </h2>
            <p className="text-xs text-body">
              Company events auto-sync from the CRM feed; add your own below.
            </p>
          </div>
          <button
            type="button"
            onClick={addEv}
            className="rounded-full border border-mr-base/20 bg-white/70 px-3 py-1.5 text-xs font-semibold text-mr-base hover:bg-white"
          >
            Add event
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {content.events.map((e) => (
            <div key={e.id} className="rounded-xl border border-white/60 bg-white/60 p-3">
              {e.source === "CRM" ? (
                <span className="mb-2 inline-block rounded-full bg-mr-pale/25 px-2.5 py-0.5 text-[0.65rem] font-semibold text-mr-base">
                  Auto-synced from the CRM events feed
                </span>
              ) : null}
              <input
                value={e.title}
                onChange={(ev) => updateEv(e.id, { title: ev.target.value })}
                className={inputCls}
                placeholder="Event title"
              />
              <div className="mt-2 grid grid-cols-3 gap-2">
                <select
                  value={e.type}
                  onChange={(ev) =>
                    updateEv(e.id, {
                      type: ev.target.value as CompanyEvent["type"],
                    })
                  }
                  className={inputCls}
                >
                  <option value="Online Event">Online Event</option>
                  <option value="Vendor Event">Vendor Event</option>
                </select>
                <input
                  value={e.date}
                  onChange={(ev) => updateEv(e.id, { date: ev.target.value })}
                  className={inputCls}
                  placeholder="Date"
                />
                <input
                  value={e.time}
                  onChange={(ev) => updateEv(e.id, { time: ev.target.value })}
                  className={inputCls}
                  placeholder="Time"
                />
              </div>
              <input
                value={e.speakers}
                onChange={(ev) => updateEv(e.id, { speakers: ev.target.value })}
                className={`${inputCls} mt-2`}
                placeholder="Speakers"
              />
              <input
                value={e.url ?? ""}
                onChange={(ev) => updateEv(e.id, { url: ev.target.value })}
                className={`${inputCls} mt-2`}
                placeholder="Registration / details link"
              />
              <button
                type="button"
                onClick={() => removeEv(e.id)}
                className="mt-2 text-xs font-medium text-mr-base hover:text-mr-mid"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
