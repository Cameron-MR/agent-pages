"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import {
  CONTACTS,
  CONTACT_GROUPS,
  type Contact,
  type ContactGroup,
} from "@/lib/mock/directory";

type GroupFilter = "All" | ContactGroup;

// Directory of internal contacts and approved vendors. Group filter plus a
// search box; each card has working tel: and mailto: actions. All contacts are
// fabricated.
export default function DirectoryPage() {
  const [group, setGroup] = useState<GroupFilter>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return CONTACTS.filter((c) => {
      const matchGroup = group === "All" || c.group === group;
      const q = query.trim().toLowerCase();
      const matchQuery =
        q === "" ||
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q);
      return matchGroup && matchQuery;
    });
  }, [group, query]);

  return (
    <PageShell
      active="/directory"
      eyebrow="People"
      title="Directory"
      description="Who to call: coordinators, leadership, lending, and approved vendors. Sample contacts only."
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["All", ...CONTACT_GROUPS] as GroupFilter[]).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                group === g
                  ? "bg-mr-base text-white shadow-sm"
                  : "border border-mr-base/15 bg-white/60 text-body hover:text-mr-base"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search people"
          className="w-full rounded-full border border-mr-base/15 bg-white/70 px-4 py-2 text-sm text-mr-dark outline-none transition focus:border-mr-light focus:ring-2 focus:ring-mr-light/40 sm:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-mr-base/20 p-12 text-center text-sm text-body">
          No contacts match that search.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <ContactCard key={c.id} contact={c} />
          ))}
        </div>
      )}
    </PageShell>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/60 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition duration-200 hover:-translate-y-0.5 hover:border-mr-light/50 hover:shadow-md">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gradient-to-br from-mr-light to-mr-base text-sm font-bold text-white">
          {contact.initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-heading text-base font-bold text-mr-dark">
            {contact.name}
          </h3>
          <p className="truncate text-sm text-mr-base">{contact.role}</p>
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm text-body">{contact.blurb}</p>

      <div className="mt-4 flex gap-2">
        <a
          href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
          className="flex-1 rounded-full bg-mr-base px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
        >
          Call
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="flex-1 rounded-full border border-mr-base/20 bg-white/70 px-4 py-2 text-center text-sm font-semibold text-mr-base transition-colors hover:bg-white"
        >
          Email
        </a>
      </div>
      <p className="mt-3 text-center text-xs text-body">{contact.phone}</p>
    </div>
  );
}
