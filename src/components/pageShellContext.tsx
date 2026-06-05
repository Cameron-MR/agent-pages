"use client";

import { createContext, useContext } from "react";
import type { StubContent } from "@/lib/mockData";

// Lets any descendant of PageShell open the shared stub modal without prop
// drilling. Defaults to a no-op so components used outside a shell stay safe.
export const PageShellContext = createContext<(content: StubContent) => void>(
  () => {}
);

export function useStub() {
  return useContext(PageShellContext);
}
