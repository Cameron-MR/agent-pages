import Link from "next/link";
import { hubEntries } from "@/lib/mockData";

// "Everywhere else": the larger entry points into subpages. Each is a real
// Next.js Link to its route. Routes may 404 for now, that is expected.
export default function HubGrid() {
  return (
    <section>
      <h2 className="mb-4 font-heading text-2xl font-bold text-mr-dark">
        Everywhere else
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hubEntries.map((entry) => (
          <Link
            key={entry.name}
            href={entry.href}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-white/40 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition duration-200 hover:-translate-y-0.5 hover:border-mr-light/50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
          >
            <span className="min-w-0">
              <span className="block font-heading text-lg font-bold text-mr-dark">
                {entry.name}
              </span>
              <span className="block text-sm text-body">{entry.desc}</span>
            </span>
            <span
              aria-hidden
              className="flex-none text-mr-pale transition-all duration-200 group-hover:translate-x-1 group-hover:text-mr-base"
            >
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
