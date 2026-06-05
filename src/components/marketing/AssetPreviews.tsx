import Logo from "@/components/Logo";
import Photo from "@/components/Photo";
import { agent, sampleProperty } from "@/lib/mockData";

// Faux, clearly-mock previews of each marketing asset. The same component
// renders a small "thumb" on the gallery card and a larger "full" version in
// the modal. The asset bodies show the real sample property photo with a
// "Sample photo" label so they read as branded yet clearly mock. If the remote
// image fails, Photo falls back to a teal gradient block.

type Variant = "thumb" | "full";

// Short address line, e.g. "18 Sea Pine, Newport Beach".
const shortAddress = sampleProperty.address.split(",").slice(0, 2).join(",");

// Agent initials for the avatar.
const initials = agent.name
  .split(" ")
  .map((part) => part[0])
  .join("");

// Branded footer strip shared by every preview: avatar, name, phone, and the
// MR logomark. This is the "your info on everything" cue.
function BrandStrip({ variant }: { variant: Variant }) {
  const full = variant === "full";
  return (
    <div className="flex items-center justify-between gap-2 border-t border-mr-base/10 bg-white/80 px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={`flex flex-none items-center justify-center rounded-full bg-mr-base font-bold text-white ${
            full ? "h-7 w-7 text-xs" : "h-5 w-5 text-[0.5rem]"
          }`}
        >
          {initials}
        </span>
        <div className="min-w-0 leading-tight">
          <p
            className={`truncate font-semibold text-mr-dark ${
              full ? "text-xs" : "text-[0.5rem]"
            }`}
          >
            {agent.name}
          </p>
          <p
            className={`truncate text-body ${
              full ? "text-[0.65rem]" : "text-[0.45rem]"
            }`}
          >
            {agent.phone}
          </p>
        </div>
      </div>
      <Logo theme="light" variant="logomark" width={full ? 26 : 18} />
    </div>
  );
}

// Real property photo with the "Sample photo" label overlaid. The container
// owns sizing and rounding; the image fills it and is clipped. Photo handles
// the teal fallback if the remote URL fails.
function PhotoBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Photo
        src={sampleProperty.photo}
        alt="Sample listing"
        className="h-full w-full object-cover"
      />
      <span className="absolute bottom-1 right-2 rounded bg-black/30 px-1 text-[0.5rem] font-medium uppercase tracking-wide text-white/90">
        Sample photo
      </span>
    </div>
  );
}

function SitePreview({ variant }: { variant: Variant }) {
  const full = variant === "full";
  return (
    <div className="overflow-hidden rounded-xl border border-mr-base/10 bg-white shadow-sm">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-mr-base/10 bg-mr-pale/15 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-mr-pale" />
        <span className="h-2 w-2 rounded-full bg-mr-pale" />
        <span className="h-2 w-2 rounded-full bg-mr-pale" />
        <span className="ml-2 truncate rounded-full bg-white px-2 py-0.5 text-[0.5rem] text-body">
          18seapine.com
        </span>
      </div>
      <PhotoBlock className={full ? "h-40" : "h-20"} />
      <div className="px-3 py-2">
        <p
          className={`font-heading font-bold text-mr-dark ${
            full ? "text-base" : "text-xs"
          }`}
        >
          {sampleProperty.price}
        </p>
        <p className={`text-body ${full ? "text-xs" : "text-[0.55rem]"}`}>
          {shortAddress}
        </p>
        <div className="mt-2 flex gap-1.5">
          <span className="rounded-full bg-mr-base px-2 py-0.5 text-[0.55rem] font-semibold text-white">
            Request a tour
          </span>
          <span className="rounded-full border border-mr-base/20 px-2 py-0.5 text-[0.55rem] text-mr-base">
            Gallery
          </span>
        </div>
      </div>
      <BrandStrip variant={variant} />
    </div>
  );
}

function BrochurePreview({ variant }: { variant: Variant }) {
  const full = variant === "full";
  return (
    <div className="mx-auto w-full max-w-[14rem] overflow-hidden rounded-xl border border-mr-base/10 bg-white shadow-sm">
      <div className="px-3 pt-3">
        <p
          className={`font-heading font-bold uppercase tracking-wide text-mr-base ${
            full ? "text-xs" : "text-[0.55rem]"
          }`}
        >
          {sampleProperty.status}
        </p>
      </div>
      <PhotoBlock className={full ? "mx-3 mt-1 h-32 rounded-lg" : "mx-3 mt-1 h-16 rounded-md"} />
      <div className="px-3 py-2">
        <p
          className={`font-heading font-bold text-mr-dark ${
            full ? "text-sm" : "text-[0.6rem]"
          }`}
        >
          {sampleProperty.price}
        </p>
        <p className={`text-body ${full ? "text-xs" : "text-[0.5rem]"}`}>
          {shortAddress}
        </p>
        <div className="mt-2 space-y-1">
          {sampleProperty.features.slice(0, full ? 4 : 3).map((feature) => (
            <div key={feature} className="flex items-center gap-1.5">
              <span className="h-1 w-1 flex-none rounded-full bg-mr-light" />
              <span
                className={`truncate text-body ${
                  full ? "text-[0.7rem]" : "text-[0.5rem]"
                }`}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
      <BrandStrip variant={variant} />
    </div>
  );
}

function SocialPreview({ variant }: { variant: Variant }) {
  const full = variant === "full";
  return (
    <div
      className={`mx-auto overflow-hidden rounded-xl border border-mr-base/10 bg-white shadow-sm ${
        full ? "max-w-[16rem]" : ""
      }`}
    >
      {/* Contained square. The photo, badge, price, and label all sit absolutely
          inside this box so nothing bleeds past the rounded corners. */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Photo
          src={sampleProperty.photo}
          alt="Sample listing"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-3">
          <span
            className={`w-fit rounded-md bg-white/90 px-2 py-0.5 font-heading font-bold uppercase tracking-wide text-mr-base ${
              full ? "text-sm" : "text-[0.6rem]"
            }`}
          >
            Just Listed
          </span>
          <div>
            <p
              className={`font-heading font-bold text-white drop-shadow ${
                full ? "text-lg" : "text-xs"
              }`}
            >
              {sampleProperty.price}
            </p>
            <p
              className={`text-white/90 drop-shadow ${
                full ? "text-xs" : "text-[0.5rem]"
              }`}
            >
              {shortAddress}
            </p>
          </div>
        </div>
        <span className="absolute bottom-1 right-2 rounded bg-black/30 px-1 text-[0.5rem] font-medium uppercase tracking-wide text-white/90">
          Sample photo
        </span>
      </div>

      {/* Footer strip in normal flow, matching the other previews. */}
      <BrandStrip variant={variant} />
    </div>
  );
}

function EmailPreview({ variant }: { variant: Variant }) {
  const full = variant === "full";
  return (
    <div className="overflow-hidden rounded-xl border border-mr-base/10 bg-white shadow-sm">
      {/* Inbox header */}
      <div className="space-y-0.5 border-b border-mr-base/10 bg-mr-pale/10 px-3 py-2">
        <p className={`text-body ${full ? "text-[0.7rem]" : "text-[0.5rem]"}`}>
          From: {agent.name}
        </p>
        <p
          className={`font-semibold text-mr-dark ${
            full ? "text-xs" : "text-[0.55rem]"
          }`}
        >
          Just Listed in Newport Beach
        </p>
      </div>
      <PhotoBlock className={full ? "h-28" : "h-14"} />
      <div className="px-3 py-2">
        <p className={`text-body ${full ? "text-xs" : "text-[0.55rem]"}`}>
          A coastal contemporary just hit the market at {sampleProperty.price}.
        </p>
        <span className="mt-2 inline-block rounded-full bg-mr-base px-2.5 py-0.5 text-[0.55rem] font-semibold text-white">
          View the listing
        </span>
      </div>
      <BrandStrip variant={variant} />
    </div>
  );
}

// Pick the right preview by output id. Defaults to the site preview.
export default function AssetPreview({
  id,
  variant,
}: {
  id: string;
  variant: Variant;
}) {
  switch (id) {
    case "brochure":
      return <BrochurePreview variant={variant} />;
    case "social":
      return <SocialPreview variant={variant} />;
    case "email":
      return <EmailPreview variant={variant} />;
    case "site":
    default:
      return <SitePreview variant={variant} />;
  }
}
