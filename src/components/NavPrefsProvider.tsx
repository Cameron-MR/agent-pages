"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SUBNAV_ITEMS, PRIMARY_NAV_COUNT, type NavItem } from "@/lib/mockData";

// Agent-controlled top bar preferences: the order of nav items and how many
// show inline before the rest collapse into the More menu. Persisted to
// localStorage and shared so the nav and Settings stay in sync.

const STORAGE_KEY = "mr-nav-prefs";
const DEFAULT_ORDER = SUBNAV_ITEMS.map((i) => i.href);

interface NavPrefs {
  order: string[];
  primaryCount: number;
}

interface NavPrefsContextValue {
  // Nav items in the agent's chosen order (always complete and valid).
  items: NavItem[];
  primaryCount: number;
  setOrder: (order: string[]) => void;
  setPrimaryCount: (n: number) => void;
  reset: () => void;
}

const NavPrefsContext = createContext<NavPrefsContextValue>({
  items: SUBNAV_ITEMS,
  primaryCount: PRIMARY_NAV_COUNT,
  setOrder: () => {},
  setPrimaryCount: () => {},
  reset: () => {},
});

// Repair an order array against the current nav registry: keep known hrefs in
// the saved order, then append any new ones, and drop anything unknown.
function repairOrder(order: string[]): string[] {
  const known = new Set(DEFAULT_ORDER);
  const kept = order.filter((h) => known.has(h));
  const missing = DEFAULT_ORDER.filter((h) => !kept.includes(h));
  return [...kept, ...missing];
}

export function NavPrefsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefs, setPrefs] = useState<NavPrefs>({
    order: DEFAULT_ORDER,
    primaryCount: PRIMARY_NAV_COUNT,
  });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<NavPrefs>;
        const order = repairOrder(parsed.order ?? DEFAULT_ORDER);
        const primaryCount = Math.min(
          Math.max(parsed.primaryCount ?? PRIMARY_NAV_COUNT, 3),
          order.length
        );
        setPrefs({ order, primaryCount });
      }
    } catch {
      // Ignore unreadable storage.
    }
  }, []);

  const persist = (next: NavPrefs) => {
    setPrefs(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore write failures.
    }
  };

  const value = useMemo<NavPrefsContextValue>(() => {
    const byHref = new Map(SUBNAV_ITEMS.map((i) => [i.href, i]));
    const items = prefs.order
      .map((h) => byHref.get(h))
      .filter((x): x is NavItem => Boolean(x));
    return {
      items,
      primaryCount: Math.min(prefs.primaryCount, items.length),
      setOrder: (order) =>
        persist({ ...prefs, order: repairOrder(order) }),
      setPrimaryCount: (n) =>
        persist({
          ...prefs,
          primaryCount: Math.min(Math.max(n, 3), prefs.order.length),
        }),
      reset: () =>
        persist({ order: DEFAULT_ORDER, primaryCount: PRIMARY_NAV_COUNT }),
    };
  }, [prefs]);

  return (
    <NavPrefsContext.Provider value={value}>
      {children}
    </NavPrefsContext.Provider>
  );
}

export function useNavPrefs() {
  return useContext(NavPrefsContext);
}
