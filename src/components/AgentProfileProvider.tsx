"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { headshot } from "@/lib/mock/images";

// The agent's own profile. Editable in Settings, persisted to localStorage,
// and read anywhere that should feel personalized: the nav chip and the
// branded calculator printouts. Defaults to the fabricated sample agent.
export interface AgentProfile {
  name: string;
  title: string;
  brokerage: string;
  market: string;
  phone: string;
  email: string;
  license: string;
  photo: string;
}

export const DEFAULT_PROFILE: AgentProfile = {
  name: "Jordan Sample",
  title: "Real Estate Agent",
  brokerage: "Marshall Reddick Real Estate",
  market: "Orange County, CA",
  phone: "(949) 555-0142",
  email: "jordan.sample@example.com",
  license: "DRE# 02000000",
  photo: headshot(0, 400),
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
