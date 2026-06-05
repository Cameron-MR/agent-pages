import Logo from "@/components/Logo";
import { agent } from "@/lib/mockData";

// Slim glass bar showing the brand that gets applied to every generated asset.
// Communicates "your photo and info auto-filled on everything".
export default function BrandBar() {
  const initials = agent.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/40 bg-white/60 px-5 py-3 shadow-sm backdrop-blur-xl backdrop-saturate-150">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-mr-base text-sm font-bold text-white">
          {initials}
        </span>
        <div className="leading-tight">
          <p className="font-heading text-sm font-bold text-mr-dark">
            {agent.name}
          </p>
          <p className="text-xs text-body">{agent.phone}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-xs font-medium text-mr-base sm:block">
          Applied to everything you generate
        </span>
        <div className="flex items-center gap-2 border-l border-mr-base/10 pl-3">
          <Logo theme="light" variant="logomark" width={28} />
          <span className="text-xs font-semibold text-mr-dark">
            Marshall Reddick Real Estate
          </span>
        </div>
      </div>
    </div>
  );
}
