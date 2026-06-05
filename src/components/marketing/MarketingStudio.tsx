"use client";

import { useMemo, useState } from "react";
import SocialGraphic from "@/components/marketing/SocialGraphic";
import FlyerPrint from "@/components/marketing/FlyerPrint";
import Photo from "@/components/Photo";
import Logo from "@/components/Logo";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import { LISTINGS } from "@/lib/mock/listings";
import {
  CAMPAIGNS,
  EMAIL_TEMPLATES,
  buildCaption,
  type CampaignId,
} from "@/lib/mock/marketing";

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

  const listing = LISTINGS.find((l) => l.id === listingId) ?? LISTINGS[0];
  const caption = useMemo(
    () => buildCaption(campaign, listing, profile),
    [campaign, listing, profile]
  );
  const email = EMAIL_TEMPLATES.find((e) => e.id === emailId) ?? EMAIL_TEMPLATES[0];
  const emailBody = email.body(listing, profile);

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
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mr-base">
              Story (9:16)
            </p>
            <div className="mx-auto max-w-[16rem]">
              <SocialGraphic listing={listing} campaign={campaign} format="story" />
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

      {/* Email signature */}
      <section>
        <h2 className="mb-3 font-heading text-xl font-bold text-mr-dark">
          Email signature
        </h2>
        <div className="rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-mr-dark">
              Drop this into your email client
            </p>
            <button
              type="button"
              onClick={() =>
                copy(
                  "signature",
                  `${profile.name}\n${profile.title}, ${profile.brokerage}\n${profile.phone} | ${profile.email}\n${profile.license}`
                )
              }
              className="rounded-full bg-mr-base px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-mr-mid"
            >
              {copied === "signature" ? "Copied" : "Copy signature"}
            </button>
          </div>

          <div className="mt-4 flex items-center gap-4 rounded-xl border border-mr-base/10 bg-white p-4">
            <Photo
              src={profile.photo}
              alt={profile.name}
              className="h-16 w-16 flex-none rounded-full object-cover ring-2 ring-mr-light/30"
            />
            <div className="border-l-2 border-mr-base/20 pl-4">
              <p className="font-heading text-base font-bold text-mr-dark">
                {profile.name}
              </p>
              <p className="text-sm text-body">
                {profile.title}, {profile.brokerage}
              </p>
              <p className="mt-1 text-sm text-mr-base">
                {profile.phone} &nbsp;|&nbsp; {profile.email}
              </p>
              <p className="text-xs text-body">{profile.license}</p>
              <div className="mt-2">
                <Logo theme="light" variant="logotype" width={150} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FlyerPrint listing={listing} />
    </div>
  );
}
