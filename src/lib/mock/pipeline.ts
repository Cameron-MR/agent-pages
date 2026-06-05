// Mock data for the Pipeline page (/pipeline).
// Fabricated clients moving through the Marshall Reddick PMA flow. Names,
// properties, and numbers are invented for this reference build only.

export type StageId =
  | "request"
  | "sent"
  | "completed"
  | "questionnaire"
  | "follow-up";

export interface PipelineDeal {
  id: string;
  name: string;
  property: string;
  side: "Buyer" | "Seller";
  value: string;
  source: string;
  lastTouch: string;
  nextStep: string;
  stage: StageId;
  initials: string;
}

export interface StageMeta {
  id: StageId;
  label: string;
  hint: string;
}

export const PIPELINE_STAGE_META: StageMeta[] = [
  { id: "request", label: "Request", hint: "PMA requested by the client" },
  { id: "sent", label: "Sent", hint: "Analysis delivered, awaiting reply" },
  { id: "completed", label: "Completed", hint: "PMA reviewed together" },
  {
    id: "questionnaire",
    label: "Questionnaire",
    hint: "Needs survey in progress",
  },
  { id: "follow-up", label: "Follow-up", hint: "Scheduled check-in" },
];

export const PIPELINE_DEALS: PipelineDeal[] = [
  {
    id: "d1",
    name: "Avery Placeholder",
    property: "Maple Grove condo, Irvine",
    side: "Seller",
    value: "$815,000",
    source: "Sphere",
    lastTouch: "2 days ago",
    nextStep: "Send PMA draft",
    stage: "request",
    initials: "AP",
  },
  {
    id: "d2",
    name: "Devon Example",
    property: "Lakeside townhome, Tustin",
    side: "Buyer",
    value: "$640,000",
    source: "Zillow",
    lastTouch: "Today",
    nextStep: "Confirm budget",
    stage: "request",
    initials: "DE",
  },
  {
    id: "d3",
    name: "Riley Sample",
    property: "Oak Street ranch, Costa Mesa",
    side: "Seller",
    value: "$1,240,000",
    source: "Referral",
    lastTouch: "1 day ago",
    nextStep: "Follow up on PMA",
    stage: "sent",
    initials: "RS",
  },
  {
    id: "d4",
    name: "Casey Fictional",
    property: "Downtown loft, Santa Ana",
    side: "Buyer",
    value: "$525,000",
    source: "Open house",
    lastTouch: "3 days ago",
    nextStep: "Schedule showings",
    stage: "sent",
    initials: "CF",
  },
  {
    id: "d5",
    name: "Morgan Placeholder",
    property: "Hillcrest colonial, Orange",
    side: "Seller",
    value: "$1,090,000",
    source: "Past client",
    lastTouch: "4 days ago",
    nextStep: "Review pricing",
    stage: "sent",
    initials: "MP",
  },
  {
    id: "d6",
    name: "Jamie Notreal",
    property: "Cedar Court split-level, Brea",
    side: "Seller",
    value: "$970,000",
    source: "Referral",
    lastTouch: "Yesterday",
    nextStep: "Send listing agreement",
    stage: "completed",
    initials: "JN",
  },
  {
    id: "d7",
    name: "Quinn Example",
    property: "Riverbend bungalow, Anaheim",
    side: "Buyer",
    value: "$705,000",
    source: "Sphere",
    lastTouch: "Today",
    nextStep: "Collect needs survey",
    stage: "questionnaire",
    initials: "QE",
  },
  {
    id: "d8",
    name: "Skyler Sample",
    property: "Parkview duplex, Fullerton",
    side: "Buyer",
    value: "$880,000",
    source: "Lender referral",
    lastTouch: "2 days ago",
    nextStep: "Pre-approval check",
    stage: "questionnaire",
    initials: "SS",
  },
  {
    id: "d9",
    name: "Reese Placeholder",
    property: "Sunset Ave cottage, Newport Beach",
    side: "Seller",
    value: "$2,150,000",
    source: "Past client",
    lastTouch: "5 days ago",
    nextStep: "Quarterly check-in",
    stage: "follow-up",
    initials: "RP",
  },
  {
    id: "d10",
    name: "Harper Fictional",
    property: "Birchwood estate, Villa Park",
    side: "Seller",
    value: "$3,400,000",
    source: "Sphere",
    lastTouch: "1 week ago",
    nextStep: "Send market update",
    stage: "follow-up",
    initials: "HF",
  },
];
