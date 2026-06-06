"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { headshot, familyPhoto } from "@/lib/mock/images";

// The agent's own profile. Editable in Settings, persisted to localStorage,
// and read anywhere that should feel personalized: the nav chip, the branded
// calculator printouts, and the public client page. Defaults to the
// fabricated sample agent.
export interface AgentProfile {
  name: string;
  title: string;
  brokerage: string;
  market: string;
  phone: string;
  // Office line, shown alongside the personal Call/Text number on signatures.
  officePhone: string;
  email: string;
  license: string;
  // Mailing address line for the email signature.
  address: string;
  photo: string;
  // Editable public-page content.
  headline: string;
  tagline: string;
  bio: string;
  specialties: string[];
  aboutPhoto: string;
}

export const DEFAULT_PROFILE: AgentProfile = {
  name: "Jordan Sample",
  title: "Realtor / Advisor",
  brokerage: "Marshall Reddick Real Estate",
  market: "Orange County, CA",
  phone: "(949) 555-0142",
  officePhone: "(949) 885-8180",
  email: "jordan.sample@example.com",
  license: "DRE# 02000000",
  address: "4299 MacArthur Blvd, Suite 105, Newport Beach, CA 92660",
  photo: headshot(0, 400),
  headline: "Your trusted guide to Orange County real estate.",
  tagline:
    "Intentional, reliable, and rooted in experience. I help clients navigate real estate with clarity, commitment, and care.",
  bio: "I was born and raised in Orange County, and I still can't imagine living anywhere else. When I'm not helping clients find their next home, you'll find me at the beach with my wife and two kids, coaching weekend soccer, or hunting down the best taco spot in town. Real estate is personal for me. I treat every client like a neighbor, because most of them become one. This is fabricated sample content for a reference design.",
  specialties: [
    "Buyer's Agent",
    "Listing Agent",
    "Luxury",
    "Investment Properties",
    "Relocation",
  ],
  aboutPhoto: familyPhoto(0, 900),
};

const STORAGE_KEY = "mr-agent-profile";

interface ProfileContextValue {
  profile: AgentProfile;
  setProfile: (next: AgentProfile) => void;
  resetProfile: () => void;
  initials: string;
}

const ProfileContext = createContext<ProfileContextValue>({
  profile: DEFAULT_PROFILE,
  setProfile: () => {},
  resetProfile: () => {},
  initials: "JS",
});

function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "MR";
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function AgentProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfileState] = useState<AgentProfile>(DEFAULT_PROFILE);

  // Load any saved profile on mount. Guarded so it never runs during SSR.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AgentProfile>;
        setProfileState({ ...DEFAULT_PROFILE, ...parsed });
      }
    } catch {
      // Ignore unreadable storage; fall back to defaults.
    }
  }, []);

  const setProfile = (next: AgentProfile) => {
    setProfileState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore write failures; state still updates for this session.
    }
  };

  const resetProfile = () => {
    setProfileState(DEFAULT_PROFILE);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }
  };

  const value = useMemo<ProfileContextValue>(
    () => ({
      profile,
      setProfile,
      resetProfile,
      initials: deriveInitials(profile.name),
    }),
    [profile]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useAgentProfile() {
  return useContext(ProfileContext);
}
