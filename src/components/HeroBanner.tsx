"use client";

import { useState } from "react";
import { heroStats } from "@/lib/mockData";
import { useAgentProfile } from "@/components/AgentProfileProvider";

// Full-width hero. Agent identity on the left, four headline stats on the
// right, all sitting on a frosted glass panel over a teal-to-pale wash.
// Identity reads from the editable agent profile so Settings edits flow here.
// The avatar loads a remote headshot via a plain img tag; if it fails to load
// we fall back to the agent initials so a dead URL degrades gracefully.
export default function HeroBanner() {
  const { profile: agent, initials } = useAgentProfile();
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl shadow-mr-base/5 backdrop-blur-xl backdrop-saturate-150 sm:p-8">
      {/* Teal-to-pale gradient wash behind the glass. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-mr-light/20 via-mr-pale/10 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-mr-light/20 blur-3xl"
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Identity */}
        <div className="flex items-center gap-5">
          <div className="relative h-24 w-24 flex-none">
            <div className="absolute inset-0 rounded-full ring-4 ring-mr-light/40" />
            {photoOk ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={agent.photo}
                alt={agent.name}
                onError={() => setPhotoOk(false)}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-mr-base text-2xl font-bold text-white">
                {initials}
              </div>
            )}
          </div>

          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-mr-dark sm:text-4xl">
              {agent.name}
            </h1>
            <p className="mt-1 text-sm text-body">{agent.title}</p>
            <p className="text-sm font-medium text-mr-base">{agent.market}</p>
            <p className="mt-2 text-xs text-body">
              {agent.phone}
              <span className="mx-2 text-mr-pale">|</span>
              {agent.license}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-2xl">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/50 bg-white/70 p-4 shadow-sm backdrop-blur"
            >
              <p className="font-heading text-2xl font-bold text-mr-base">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium text-mr-dark">
                {stat.label}
              </p>
              <p className="mt-0.5 text-xs text-body">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
