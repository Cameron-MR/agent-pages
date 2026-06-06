"use client";

import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import {
  RESOURCE_CATEGORIES,
  RESOURCES,
  type ResourceCategory,
  type ResourceItem,
} from "@/lib/mock/resources";

type CategoryFilter = "All" | "Favorites" | ResourceCategory;

const FAVS_KEY = "mr-resource-favs";

// Resources & Scripts library. Category tabs (including Favorites) and a live
// search box filter the grid; cards open a reader drawer with working copy and
// persisted favorites.
export default function ResourcesPage() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<ResourceItem | null>(null);
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FAVS_KEY);
      if (raw) setFavs(JSON.parse(raw) as string[]);
    } catch {
      // ignore
    }
  }, []);

  const toggleFav = (id: string) => {
    setFavs((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      try {
        window.localStorage.setItem(FAVS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    return RESOURCES.filter((r) => {
      const matchCat =
        category === "All" ||
        (category === "Favorites" ? favs.includes(r.id) : r.category === category);
      const q = query.trim().toLowerCase();
      const matchQuery =
        q === "" ||
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [category, query, favs]);

  return (
    <PageShell
      active="/resources"
      eyebrow="Knowledge"
      title="Resources & Scripts"
      description="Talk tracks, checklists, guides, and templates for every conversation. Placeholder content."
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["All", "Favorites", ...RESOURCE_CATEGORIES] as CategoryFilter[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-mr-base text-white shadow-sm"
                  : "border border-mr-base/15 bg-white/60 text-body hover:text-mr-base"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources"
          className="w-full rounded-full border border-mr-base/15 bg-white/70 px-4 py-2 text-sm text-mr-dark outline-none transition focus:border-mr-light focus:ring-2 focus:ring-mr-light/40 sm:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-mr-base/20 p-12 text-center text-sm text-body">
          No resources match that search.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setOpen(r)}
              className="group flex h-full flex-col rounded-2xl border border-white/60 bg-white/60 p-5 text-left shadow-sm backdrop-blur-xl backdrop-saturate-150 transition duration-200 hover:-translate-y-0.5 hover:border-mr-light/50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
            >
              <span className="inline-block w-fit rounded-full bg-mr-pale/25 px-2.5 py-0.5 text-xs font-semibold text-mr-base">
                {r.category}
              </span>
              <h3 className="mt-3 font-heading text-base font-bold text-mr-dark">
                {r.title}
              </h3>
              <p className="mt-1 flex-1 text-sm text-body">{r.summary}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex flex-wrap gap-1">
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-mr-base/10 px-2 py-0.5 text-[0.65rem] text-body"
                    >
                      {t}
                    </span>
                  ))}
                </span>
                <span className="flex-none text-xs text-mr-base">
                  {favs.includes(r.id) ? (
                    <span aria-label="Favorited" className="mr-1 text-mr-light">
                      ★
                    </span>
                  ) : null}
                  {r.readMinutes} min
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      <ReaderDrawer
        item={open}
        isFav={open ? favs.includes(open.id) : false}
        onToggleFav={toggleFav}
        onClose={() => setOpen(null)}
      />
    </PageShell>
  );
}

function ReaderDrawer({
  item,
  isFav,
  onToggleFav,
  onClose,
}: {
  item: ResourceItem | null;
  isFav: boolean;
  onToggleFav: (id: string) => void;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setCopied(false);
  }, [item]);
  if (!item) return null;

  const copyAll = () => {
    const text = `${item.title}\n\n${item.body
      .map((p, i) => `${i + 1}. ${p}`)
      .join("\n")}`;
    try {
      navigator.clipboard?.writeText(text);
    } catch {
      // ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-mr-dark/30 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-lg overflow-y-auto border-l border-white/70 bg-white/85 p-8 shadow-[0_0_80px_-20px_rgba(28,60,69,0.5)] backdrop-blur-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="rounded-full bg-mr-pale/25 px-2.5 py-0.5 text-xs font-semibold text-mr-base">
              {item.category}
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-mr-dark">
              {item.title}
            </h2>
            <p className="mt-1 text-sm text-body">
              {item.readMinutes} min read
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-mr-base/15 bg-white/70 text-mr-base hover:bg-white"
          >
            &times;
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {item.body.map((para, i) => (
            <div key={i} className="flex gap-3">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-mr-base text-xs font-bold text-white">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-body">{para}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={copyAll}
            className="rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
          >
            {copied ? "Copied" : "Copy to clipboard"}
          </button>
          <button
            type="button"
            onClick={() => onToggleFav(item.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              isFav
                ? "bg-mr-light/25 text-mr-base"
                : "border border-mr-base/20 bg-white/70 text-mr-base hover:bg-white"
            }`}
          >
            {isFav ? "★ Saved to favorites" : "Save to favorites"}
          </button>
        </div>

        <p className="mt-6 text-xs text-body">
          Placeholder content. The live resource would render the full document
          with formatting, attachments, and version history.
        </p>
      </div>
    </div>
  );
}
