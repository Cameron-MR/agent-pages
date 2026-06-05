"use client";

import { AgentProfileProvider } from "@/components/AgentProfileProvider";
import { NavPrefsProvider } from "@/components/NavPrefsProvider";
import CommandPalette from "@/components/CommandPalette";

// Client-side app shell: the agent profile and nav preferences contexts plus
// the global command palette, mounted once so Cmd/Ctrl+K works on every page.
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
      </NavPrefsProvider>
    </AgentProfileProvider>
  );
}
