"use client";

import { useEffect, useMemo, useState } from "react";
import SocialGraphic from "@/components/marketing/SocialGraphic";
import FlyerPrint from "@/components/marketing/FlyerPrint";
import { downloadSocialPng } from "@/lib/socialCanvas";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import { LISTINGS } from "@/lib/mock/listings";
import {
  CAMPAIGNS,
  EMAIL_TEMPLATES,
  buildCaption,
  SIGNATURE_WEBINARS,
  SIGNATURE_SOCIAL,
  MR_WEBSITE,
  WIRE_FRAUD_NOTICE,
  type CampaignId,
} from "@/lib/mock/marketing";

// Scheduled posts persist per device. The live version would hand these to a
// social publishing API; the queue below is the exact payload shape to send.
interface ScheduledPost {
  id: string;
  listingAddress: string;
  campaign: CampaignId;
  channels: string[];
  when: string;
}

const SCHEDULE_KEY = "mr-scheduled-posts";
const CHANNELS = ["Instagram", "Facebook", "LinkedIn"] as const;

function loadScheduled(): ScheduledPost[] {
  try {
    const raw = window.localStorage.getItem(SCHEDULE_KEY);
    const parsed = raw ? (JSON.parse(raw) as ScheduledPost[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistScheduled(posts: ScheduledPost[]) {
  try {
    window.localStorage.setItem(SCHEDULE_KEY, JSON.stringify(posts));
  } catch {
    // ignore
  }
}

// The interactive Marketing Studio. Pick a listing and a campaign, and every
// asset updates live: branded social graphics (feed + story), a ready-to-paste
// caption, a printable flyer, and email templates. Everything is personalized
// to the agent profile. All content is fabricated.
export default function MarketingStudio() {
  const { profile } = useAgentProfile();
  const [listingId, setListingId] = useState(LISTINGS[1].id);
  const [campaign, setCampaign] = useState<CampaignId>("just-listed");
  const [emailId, setEmailId] = useState(EMAIL_TEMPLATES[0].id);
  const [copied, setCopied] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [scheduled, setScheduled] = useState<ScheduledPost[]>([]);
  const [schedWhen, setSchedWhen] = useState("");
  const [schedChannels, setSchedChannels] = useState<string[]>(["Instagram"]);

  useEffect(() => {
    setScheduled(loadScheduled());
  }, []);

  const toggleChannel = (c: string) =>
    setSchedChannels((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const schedulePost = () => {
    if (!schedWhen || schedChannels.length === 0) return;
    const next = [
      {
        id: "sp" + Date.now(),
        listingAddress: listing.address,
        campaign,
        channels: [...schedChannels],
        when: schedWhen,
      },
      ...scheduled,
    ];
    setScheduled(next);
    persistScheduled(next);
    setSchedWhen("");
  };

  const removeScheduled = (id: string) => {
    const next = scheduled.filter((p) => p.id !== id);
    setScheduled(next);
    persistScheduled(next);
  };

  const download = async (format: "square" | "story") => {
    setDownloading(format);
    await downloadSocialPng({ listing, campaign, profile, format });
    setDownloading(null);
  };

  const listing = LISTINGS.find((l) => l.id === listingId) ?? LISTINGS[0];
  const caption = useMemo(
    () => buildCaption(campaign, listing, profile),
    [campaign, listing, profile]
  );
  const email = EMAIL_TEMPLATES.find((e) => e.id === emailId) ?? EMAIL_TEMPLATES[0];
  const emailBody = email.body(listing, profile);

  const signatureText = [
    profile.name,
    profile.title,
    profile.brokerage,
    "Real Estate | Property Management | Private Lending",
    "",
    "Check out our recent webinar:",
    ...SIGNATURE_WEBINARS.map((w) => w.label),
    "",
    `Call/Text: ${profile.phone}`,
    `Office: ${profile.officePhone}`,
    profile.email,
    profile.license,
    "",
    profile.address,
    MR_WEBSITE,
    SIGNATURE_SOCIAL.map((s) => s.label).join(" | "),
    "",
    "Be Aware of Wire Fraud",
    WIRE_FRAUD_NOTICE,
  ].join("\n");

  const copy = (key: string, text: string) => {
    try {
      navigator.clipboard?.writeText(text);
    } catch {
      // Clipboard may be unavailable; ignore.
    }
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1600);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 lg:flex-row lg:items-end lg:justify-between">
        <label className="block w-full lg:max-w-sm">
          <span className="mb-1 block text-sm font-medium text-mr-dark">
            Listing
          </span>
          <select
            value={listingId}
            onChange={(e) => setListingId(e.target.value)}
            className="w-full rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
          >
            {LISTINGS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.address}, {l.city.split(",")[0]} — {l.price}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-1 block text-sm font-medium text-mr-dark">
            Campaign
          </span>
          <div className="flex flex-wrap gap-2">
            {CAMPAIGNS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCampaign(c.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  campaign === c.id
                    ? "bg-mr-base text-white shadow-sm"
                    : "border border-mr-base/15 bg-white/70 text-body hover:text-mr-base"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Social graphics */}
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-heading text-xl font-bold text-mr-dark">
            Social graphics
          </h2>
          <span className="text-xs text-body">Feed and story, auto-branded</span>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mr-base">
              Feed post (1:1)
            </p>
            <SocialGraphic listing={listing} campaign={campaign} format="square" />
            <button
              type="button"
              onClick={() => download("square")}
              disabled={downloading === "square"}
              className="mt-3 w-full rounded-full bg-mr-base px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid disabled:opacity-60"
            >
              {downloading === "square" ? "Rendering PNG..." : "Download PNG (1080x1080)"}
            </button>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mr-base">
              Story (9:16)
            </p>
            <div className="mx-auto max-w-[16rem]">
              <SocialGraphic listing={listing} campaign={campaign} format="story" />
              <button
                type="button"
                onClick={() => download("story")}
                disabled={downloading === "story"}
                className="mt-3 w-full rounded-full bg-mr-base px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid disabled:opacity-60"
              >
                {downloading === "story" ? "Rendering PNG..." : "Download PNG (1080x1920)"}
              </button>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-5 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-mr-dark">Caption</p>
            <button
              type="button"
              onClick={() => copy("caption", caption)}
              className="rounded-full bg-mr-base px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-mr-mid"
            >
              {copied === "caption" ? "Copied" : "Copy caption"}
            </button>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-body">
            {caption}
          </p>
        </div>

        {/* Schedule this post (demo queue; live version posts to a publishing API) */}
        <div className="mt-5 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <p className="text-sm font-semibold text-mr-dark">Schedule this post</p>
          <p className="mt-0.5 text-xs text-body">
            Queues the current graphic and caption. Demo queue saved on this
            device; the live version hands it to the publishing tool.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {CHANNELS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleChannel(c)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  schedChannels.includes(c)
                    ? "bg-mr-base text-white shadow-sm"
                    : "border border-mr-base/15 bg-white/70 text-body hover:text-mr-base"
                }`}
              >
                {c}
              </button>
            ))}
            <input
              type="datetime-local"
              value={schedWhen}
              onChange={(e) => setSchedWhen(e.target.value)}
              className="rounded-xl border border-mr-base/15 bg-white px-3 py-2 text-xs text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
            />
            <button
              type="button"
              onClick={schedulePost}
              disabled={!schedWhen || schedChannels.length === 0}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-colors ${
                !schedWhen || schedChannels.length === 0
                  ? "cursor-default bg-mr-pale/30 text-mr-base/60"
                  : "bg-mr-base text-white hover:bg-mr-mid"
              }`}
            >
              Schedule
            </button>
          </div>

          {scheduled.length ? (
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-mr-base">
                Queued posts
              </p>
              {scheduled.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/60 bg-white/70 px-4 py-2.5"
                >
                  <p className="min-w-0 truncate text-xs text-body">
                    <span className="font-semibold text-mr-dark">
                      {p.listingAddress}
                    </span>{" "}
                    · {p.campaign} · {p.channels.join(", ")} ·{" "}
                    {new Date(p.when).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeScheduled(p.id)}
                    aria-label="Remove scheduled post"
                    className="flex-none rounded-full border border-mr-base/10 px-2.5 py-1 text-xs text-body transition-colors hover:text-mr-dark"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Flyer */}
      <section className="rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold text-mr-dark">
              Property flyer
            </h2>
            <p className="mt-1 text-sm text-body">
              A branded one-sheet for {listing.address}, ready to print or save
              as a PDF with your details.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex flex-none items-center gap-2 rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
          >
            <span aria-hidden>⎙</span> Print / Save flyer PDF
          </button>
        </div>
      </section>

      {/* Email templates */}
      <section>
        <h2 className="mb-3 font-heading text-xl font-bold text-mr-dark">
          Email templates
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-2 lg:col-span-1">
            {EMAIL_TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setEmailId(t.id)}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  emailId === t.id
                    ? "border-mr-light/60 bg-mr-pale/20"
                    : "border-white/60 bg-white/60 hover:border-mr-light/40"
                }`}
              >
                <span className="block text-sm font-semibold text-mr-dark">
                  {t.name}
                </span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-white/60 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-mr-base/10 bg-mr-pale/10 px-4 py-3">
              <div className="min-w-0">
                <p className="text-xs text-body">From: {profile.name}</p>
                <p className="truncate text-sm font-semibold text-mr-dark">
                  {email.subject(listing)}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  copy(
                    "email",
                    `${email.subject(listing)}\n\n${emailBody.join("\n\n")}`
                  )
                }
                className="flex-none rounded-full bg-mr-base px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-mr-mid"
              >
                {copied === "email" ? "Copied" : "Copy email"}
              </button>
            </div>
            <div className="space-y-3 px-5 py-4 text-sm leading-relaxed text-body">
              {emailBody.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Email signature (Marshall Reddick standard format) */}
      <section>
        <h2 className="mb-3 font-heading text-xl font-bold text-mr-dark">
          Email signature
        </h2>
        <div className="rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-mr-dark">
              Standard Marshall Reddick signature, with your details
            </p>
            <button
              type="button"
              onClick={() => copy("signature", signatureText)}
              className="rounded-full bg-mr-base px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-mr-mid"
            >
              {copied === "signature" ? "Copied" : "Copy signature"}
            </button>
          </div>

          <div className="rounded-xl border border-mr-base/10 bg-white p-5 text-sm leading-relaxed text-mr-dark">
            <p className="font-bold">{profile.name}</p>
            <p className="text-body">{profile.title}</p>
            <p className="text-body">{profile.brokerage}</p>
            <p className="text-body">
              Real Estate <span className="font-semibold">|</span> Property
              Management <span className="font-semibold">|</span> Private
              Lending
            </p>

            <p className="mt-4 font-semibold">Check out our recent webinar:</p>
            {SIGNATURE_WEBINARS.map((w) => (
              <a
                key={w.label}
                href={w.href}
                className="block text-mr-base underline hover:text-mr-mid"
              >
                {w.label}
              </a>
            ))}

            <p className="mt-4 text-body">Call/Text: {profile.phone}</p>
            <p className="text-body">Office: {profile.officePhone}</p>
            <a
              href={`mailto:${profile.email}`}
              className="text-mr-base underline hover:text-mr-mid"
            >
              {profile.email}
            </a>
            <p className="text-body">{profile.license}</p>

            <p className="mt-4 text-body">{profile.address}</p>
            <a
              href={`https://${MR_WEBSITE}`}
              className="text-mr-base underline hover:text-mr-mid"
            >
              {MR_WEBSITE}
            </a>
            <p className="mt-1">
              {SIGNATURE_SOCIAL.map((s, i) => (
                <span key={s.label}>
                  {i > 0 ? <span className="text-mr-pale"> | </span> : null}
                  <a href={s.href} className="text-mr-base underline hover:text-mr-mid">
                    {s.label}
                  </a>
                </span>
              ))}
            </p>

            <div className="mt-4 rounded-md border border-mr-base/20 p-3">
              <p className="font-bold">Be Aware of Wire Fraud</p>
              <p className="mt-1 text-xs leading-relaxed text-body">
                {WIRE_FRAUD_NOTICE}
              </p>
            </div>
          </div>
        </div>
      </section>

      <FlyerPrint listing={listing} />
    </div>
  );
}
