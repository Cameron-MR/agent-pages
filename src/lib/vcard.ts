// Build and download a vCard (.vcf) for the agent so a client can save them
// to contacts in one tap. Works on iOS/Android/desktop with no backend.

import type { AgentProfile } from "@/components/AgentProfileProvider";

export function buildVcard(profile: AgentProfile): string {
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${last};${first};;;`,
    `FN:${profile.name}`,
    `ORG:${profile.brokerage}`,
    `TITLE:${profile.title}`,
    `TEL;TYPE=CELL:${profile.phone}`,
    `TEL;TYPE=WORK:${profile.officePhone}`,
    `EMAIL;TYPE=WORK:${profile.email}`,
    `ADR;TYPE=WORK:;;${profile.address.replace(/,/g, "\\,")};;;;`,
    `NOTE:${profile.license}`,
    "END:VCARD",
  ].join("\r\n");
}

export function downloadVcard(profile: AgentProfile) {
  const blob = new Blob([buildVcard(profile)], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${profile.name.replace(/\s+/g, "-")}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
