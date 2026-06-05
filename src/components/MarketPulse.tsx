import { marketPulse } from "@/lib/mockData";

// Compact glass strip of Orange County market stats. Positive trends (those
// that start with a plus) get a green tint; everything else stays teal.
export default function MarketPulse() {
  return (
    <section>
      <h2 className="mb-4 font-heading text-2xl font-bold text-mr-dark">
        {marketPulse.region} market
      </h2>

      <div className="grid grid-cols-2 gap-3 rounded-3xl border border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:grid-cols-4">
        {marketPulse.stats.map((stat) => {
          const positive = stat.trend.startsWith("+");
          return (
            <div key={stat.label} className="px-2 py-1">
              <p className="text-xs font-medium text-body">{stat.label}</p>
              <p className="mt-1 font-heading text-2xl font-bold text-mr-base">
                {stat.value}
              </p>
              <p
                className={`mt-0.5 text-xs font-medium ${
                  positive ? "text-emerald-600" : "text-mr-mid"
                }`}
              >
                {stat.trend}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
