import Image from "next/image";

type LogoVariant = "logotype" | "logomark";
type LogoTheme = "light" | "dark";

interface LogoProps {
  // "light" means a light background, so use the teal logo.
  // "dark" means a dark background, so use the white logo.
  theme?: LogoTheme;
  // "logotype" is the full wordmark. "logomark" is the MR house symbol.
  variant?: LogoVariant;
  // Rendered width in pixels. Height scales from the SVG aspect ratio.
  width?: number;
  className?: string;
  priority?: boolean;
}

// Source of truth for which file to use.
// Teal (colored) on light backgrounds, white on dark. Per MR brand sheet.
const LOGO_SOURCES: Record<LogoTheme, Record<LogoVariant, string>> = {
  light: {
    logotype: "/logos/colored-logo.svg",
    logomark: "/logos/colored-logo-mark.svg",
  },
  dark: {
    logotype: "/logos/white-logo.svg",
    logomark: "/logos/white-logo-mark.svg",
  },
};

// Intrinsic aspect ratios from the SVG viewBoxes.
// Logotype is wide (~7:1). Logomark is near square (951 x 703).
const ASPECT: Record<LogoVariant, number> = {
  logotype: 1998 / 289,
  logomark: 951 / 703,
};

export default function Logo({
  theme = "light",
  variant = "logotype",
  width = 200,
  className,
  priority = false,
}: LogoProps) {
  const src = LOGO_SOURCES[theme][variant];
  const height = Math.round(width / ASPECT[variant]);

  return (
    <Image
      src={src}
      alt="Marshall Reddick Real Estate"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}