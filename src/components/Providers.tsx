"use client";

import { AgentProfileProvider } from "@/components/AgentProfileProvider";
import CommandPalette from "@/components/CommandPalette";

// Client-side app shell: the agent profile context plus the global command
// palette, mounted once so Cmd/Ctrl+K works on every page.
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AgentProfileProvider>
      {children}
      <CommandPalette />
    </AgentProfileProvider>
  );
}
