"use client";

import { AgentProfileProvider } from "@/components/AgentProfileProvider";
import { NavPrefsProvider } from "@/components/NavPrefsProvider";
import CommandPalette from "@/components/CommandPalette";
import MobileTabBar from "@/components/MobileTabBar";

// Client-side app shell: the agent profile and nav preferences contexts plus
// the global command palette, mounted once so Cmd/Ctrl+K works on every page.
// MobileTabBar gives phones an app-style bottom nav on agent-side routes.
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AgentProfileProvider>
      <NavPrefsProvider>
        {children}
        <CommandPalette />
        <MobileTabBar />
      </NavPrefsProvider>
    </AgentProfileProvider>
  );
}
