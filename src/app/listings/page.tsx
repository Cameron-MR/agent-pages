"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Photo from "@/components/Photo";
import {
  LISTINGS,
  type Listing,
  type ListingStatus,
} from "@/lib/mock/listings";

type StatusFilter = "All" | ListingStatus;

const STATUS_STYLES: Record<ListingStatus, string> = {
  Active: "bg-mr-light/20 text-mr-base",
  "Coming Soon": "bg-amber-100 text-amber-700",
  Pending: "bg-purple-100 text-purple-700",
  Sold: "bg-mr-base text-white",
};

// Listings management page. Photo-driven cards, status filter, headline
// performance stats, and a detail drawer with a gallery. All fabricated.
export default function ListingsPage() {
  const [status, setStatus] = useState<StatusFilter>("All");
  const [open, setOpen] = useState<Listing | null>(null);

  const filters: StatusFilter[] = [
    "All",
    "Active",
    "Coming Soon",
    "Pending",
    "Sold",
  ];

  const filtered = useMemo(
    () => (status === "All" ? LISTINGS : LISTINGS.filter((l) => l.status === status)),
    [status]
  );

  const activeCount = LISTINGS.filter((l) => l.status === "Active").length;
  const totalViews = LISTINGS.reduce((s, l) => s + l.views, 0);
  const totalShowings = LISTINGS.reduce((s, l) => s + l.showings, 0);

  return (
    <PageShell
      active="/listings"
      eyebrow="Inventory"
      title="Listings"
      description="Your active listings and their performance at a glance. Photos and metrics are fabricated sample data."
    >
      {/* Stat strip */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          ["Active listings", String(activeCount)],
          ["Total listings", String(LISTINGS.length)],
          ["Online views", totalViews.toLocaleString()],
          ["Showings booked", String(totalShowings)],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/50 bg-white/60 p-4 shadow-sm backdrop-blur-xl backdrop-saturate-150"
          >
            <p className="font-heading text-2xl font-bold text-mr-base">
              {value}
            </p>
            <p className="mt-1 text-xs text-body">{label}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setStatus(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                status === f
                  ? "bg-mr-base text-white shadow-sm"
                  : "border border-mr-base/15 bg-white/60 text-body hover:text-mr-base"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen(LISTINGS[0])}
          className="rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-mr-mid"
        >
          New listing
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((listing) => (
          <button
            key={listing.id}
            type="button"
            onClick={() => setOpen(listing)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/70 text-left shadow-sm backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
          >
            <div className="relative h-48 overflow-hidden">
              <Photo
                src={listing.photo}
                alt={listing.address}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[listing.status]}`}
              >
                {listing.status}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <p className="font-heading text-lg font-bold text-mr-base">
                {listing.price}
              </p>
              <p className="mt-1 text-sm font-medium text-mr-dark">
                {listing.address}
              </p>
              <p className="text-xs text-body">{listing.city}</p>
              <p className="mt-2 text-xs text-body">
                {listing.beds} bd · {listing.baths} ba · {listing.sqft} sqft
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-mr-base/10 pt-3 text-xs text-body">
                <span>{listing.views.toLocaleString()} views</span>
                <span>{listing.saves} saves</span>
                <span>{listing.showings} showings</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <ListingDrawer listing={open} onClose={() => setOpen(null)} />
    </PageShell>
  );
}

function ListingDrawer({
  listing,
  onClose,
}: {
  listing: Listing | null;
  onClose: () => void;
}) {
  if (!listing) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-mr-dark/30 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-lg overflow-y-auto border-l border-white/70 bg-white/90 shadow-[0_0_80px_-20px_rgba(28,60,69,0.5)] backdrop-blur-2xl"
      >
        <div className="relative h-56">
          <Photo
            src={listing.photo}
            alt={listing.address}
            className="h-56 w-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-mr-dark hover:bg-white"
          >
            &times;
          </button>
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[listing.status]}`}
          >
            {listing.status}
          </span>
        </div>

        <div className="p-7">
          <p className="font-heading text-2xl font-bold text-mr-base">
            {listing.price}
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold text-mr-dark">
            {listing.address}
          </h2>
          <p className="text-sm text-body">{listing.city}</p>
          <p className="mt-1 text-sm text-body">
            {listing.beds} bd · {listing.baths} ba · {listing.sqft} sqft ·{" "}
            {listing.daysOnMarket} days on market
          </p>

          <p className="mt-4 text-sm leading-relaxed text-body">
            {listing.blurb}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              ["Views", listing.views.toLocaleString()],
              ["Saves", String(listing.saves)],
              ["Showings", String(listing.showings)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-white/60 bg-white/70 p-3 text-center"
              >
                <p className="font-heading text-lg font-bold text-mr-dark">
                  {value}
                </p>
                <p className="text-xs text-body">{label}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-mr-base">
            Gallery
          </p>
          <div className="grid grid-cols-2 gap-2">
            {listing.gallery.map((src, i) => (
              <Photo
                key={i}
                src={src}
                alt={`${listing.address} photo ${i + 1}`}
                className="h-28 w-full rounded-xl object-cover"
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Link
              href={`/listings/${listing.id}`}
              className="rounded-full bg-mr-base px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
            >
              Open listing page
            </Link>
            <Link
              href="/marketing"
              className="rounded-full border border-mr-base/20 bg-white/70 px-5 py-2.5 text-center text-sm font-semibold text-mr-base transition-colors hover:bg-white"
            >
              Open marketing kit
            </Link>
          </div>
          <p className="mt-4 text-xs text-body">
            Placeholder listing record. The live view would pull MLS details,
            photos, and live engagement metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
