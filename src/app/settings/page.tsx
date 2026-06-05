"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import Photo from "@/components/Photo";
import {
  useAgentProfile,
  type AgentProfile,
} from "@/components/AgentProfileProvider";
import { useNavPrefs } from "@/components/NavPrefsProvider";

// Settings: edit your agent profile. Saved to localStorage and reflected in
// the nav chip and the branded calculator printouts. Fabricated defaults.
export default function SettingsPage() {
  const { profile, setProfile, resetProfile } = useAgentProfile();
  const [draft, setDraft] = useState<AgentProfile>(profile);
  const [saved, setSaved] = useState(false);

  // Keep the form in sync if the stored profile loads in after mount.
  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  const field = (key: keyof AgentProfile) => (value: string) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  };

  const onSave = () => {
    setProfile(draft);
    setSaved(true);
  };

  return (
    <PageShell
      active="/settings"
      eyebrow="Your account"
      title="Settings"
      description="Edit your profile. This information personalizes your dashboard, the nav, and your branded calculator printouts."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2 rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <h2 className="mb-4 font-heading text-lg font-bold text-mr-dark">
            Profile
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Full name" value={draft.name} onChange={field("name")} />
            <TextField label="Title" value={draft.title} onChange={field("title")} />
            <TextField label="Brokerage" value={draft.brokerage} onChange={field("brokerage")} />
            <TextField label="Market" value={draft.market} onChange={field("market")} />
            <TextField label="Call / text phone" value={draft.phone} onChange={field("phone")} />
            <TextField label="Office phone" value={draft.officePhone} onChange={field("officePhone")} />
            <TextField label="Email" value={draft.email} onChange={field("email")} />
            <TextField label="License" value={draft.license} onChange={field("license")} />
            <TextField label="Office address" value={draft.address} onChange={field("address")} />
            <TextField label="Photo URL" value={draft.photo} onChange={field("photo")} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onSave}
              className="rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
            >
              Save profile
            </button>
            <button
              type="button"
              onClick={() => {
                resetProfile();
                setSaved(false);
              }}
              className="rounded-full border border-mr-base/20 bg-white/70 px-5 py-2.5 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
            >
              Reset to sample
            </button>
            {saved ? (
              <span className="rounded-full bg-mr-light/20 px-3 py-1 text-xs font-semibold text-mr-base">
                Saved
              </span>
            ) : null}
          </div>
        </div>

        {/* Live card preview */}
        <div className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <h2 className="mb-4 font-heading text-lg font-bold text-mr-dark">
            Preview
          </h2>
          <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-mr-base to-mr-dark p-5 text-white shadow-inner">
            <Photo
              src={draft.photo}
              alt={draft.name}
              className="h-16 w-16 rounded-full object-cover ring-4 ring-white/25"
            />
            <p className="mt-3 font-heading text-lg font-bold">{draft.name}</p>
            <p className="text-sm text-white/80">{draft.title}</p>
            <p className="text-sm text-mr-pale">{draft.brokerage}</p>
            <div className="mt-3 space-y-0.5 text-xs text-white/80">
              <p>{draft.phone}</p>
              <p>{draft.email}</p>
              <p>{draft.license}</p>
              <p>{draft.market}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-body">
            This card mirrors how your details appear on branded printouts.
          </p>
        </div>
      </div>

      <TopBarCustomizer />
    </PageShell>
  );
}

// Reorder the nav and choose how many items show in the top bar before the
// rest collapse into the More menu. Reads and writes the shared nav prefs.
function TopBarCustomizer() {
  const { items, primaryCount, setOrder, setPrimaryCount, reset } =
    useNavPrefs();

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const order = items.map((i) => i.href);
    [order[index], order[target]] = [order[target], order[index]];
    setOrder(order);
  };

  return (
    <section className="mt-6 rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-mr-dark">
            Top bar
          </h2>
          <p className="mt-1 text-sm text-body">
            Reorder your navigation and choose how many items show up front. The
            rest move into the More menu.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-body">Show first</span>
          <div className="flex items-center gap-2 rounded-full border border-mr-base/15 bg-white/70 px-2 py-1">
            <button
              type="button"
              onClick={() => setPrimaryCount(primaryCount - 1)}
              disabled={primaryCount <= 3}
              aria-label="Show fewer"
              className="flex h-6 w-6 items-center justify-center rounded-full text-mr-base disabled:opacity-30 hover:bg-mr-pale/20"
            >
              –
            </button>
            <span className="w-5 text-center text-sm font-bold text-mr-dark">
              {primaryCount}
            </span>
            <button
              type="button"
              onClick={() => setPrimaryCount(primaryCount + 1)}
              disabled={primaryCount >= items.length}
              aria-label="Show more"
              className="flex h-6 w-6 items-center justify-center rounded-full text-mr-base disabled:opacity-30 hover:bg-mr-pale/20"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {items.map((item, i) => {
          const inBar = i < primaryCount;
          return (
            <div
              key={item.href}
              className={`flex items-center gap-3 rounded-xl border p-3 ${
                inBar
                  ? "border-mr-light/40 bg-mr-pale/15"
                  : "border-white/60 bg-white/50"
              }`}
            >
              <span className="flex flex-col">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Move up"
                  className="text-mr-base disabled:opacity-25"
                >
                  ▴
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  aria-label="Move down"
                  className="text-mr-base disabled:opacity-25"
                >
                  ▾
                </button>
              </span>
              <span className="flex-1 text-sm font-medium text-mr-dark">
                {item.label}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  inBar
                    ? "bg-mr-base text-white"
                    : "border border-mr-base/15 text-body"
                }`}
              >
                {inBar ? "Top bar" : "More menu"}
              </span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={reset}
        className="mt-4 text-sm font-medium text-mr-base hover:text-mr-mid"
      >
        Reset to default
      </button>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-mr-dark">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none transition focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
      />
    </label>
  );
}
