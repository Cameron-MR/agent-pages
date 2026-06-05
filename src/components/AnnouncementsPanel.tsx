import { announcements } from "@/lib/mockData";

// "Company": glass rows for company announcements. Tag chip, bold title, and a
// short detail line. Calm by design, this sits low in the cockpit hierarchy.
export default function AnnouncementsPanel() {
  return (
    <section>
      <h2 className="mb-4 font-heading text-2xl font-bold text-mr-dark">
        Company
      </h2>

      <div className="flex flex-col gap-3">
        {announcements.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3 rounded-2xl border border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur-xl backdrop-saturate-150"
          >
            <span className="mt-0.5 flex-none rounded-full bg-mr-pale/25 px-2.5 py-0.5 text-xs font-semibold text-mr-base">
              {item.tag}
            </span>
            <div className="min-w-0">
              <p className="font-heading text-sm font-bold text-mr-dark">
                {item.title}
              </p>
              <p className="text-sm text-body">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
