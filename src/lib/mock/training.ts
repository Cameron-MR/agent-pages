// Mock data for the Training page (/training).
// Fabricated course catalog with placeholder progress. Not real curriculum
// except the guided interactive courses (see courses.ts), which are built
// from real Marshall Reddick training material.

export type Track =
  | "New Agent"
  | "Sales"
  | "Listing"
  | "Leasing"
  | "Marketing"
  | "CRM"
  | "How To";

export interface Course {
  id: string;
  title: string;
  track: Track;
  lessons: number;
  completedLessons: number;
  minutes: number;
  summary: string;
}

export const TRACKS: Track[] = [
  "New Agent",
  "Sales",
  "Listing",
  "Leasing",
  "Marketing",
  "CRM",
  "How To",
];

export const COURSES: Course[] = [
  {
    id: "t1",
    title: "Your first 30 days",
    track: "New Agent",
    lessons: 8,
    completedLessons: 8,
    minutes: 95,
    summary: "Welcome modules, systems setup, and a starter checklist.",
  },
  {
    id: "t2",
    title: "Brand and compliance basics",
    track: "New Agent",
    lessons: 5,
    completedLessons: 3,
    minutes: 40,
    summary: "Stay on brand and on the right side of the rules.",
  },
  {
    id: "t3",
    title: "Lead conversion",
    track: "Sales",
    lessons: 10,
    completedLessons: 6,
    minutes: 120,
    summary: "Speed-to-lead, nurture cadences, and setting appointments.",
  },
  {
    id: "t4",
    title: "Listing mastery",
    track: "Listing",
    lessons: 12,
    completedLessons: 2,
    minutes: 150,
    summary: "Win listing appointments and build a plan that sells.",
  },
  {
    id: "t5",
    title: "Objection handling",
    track: "Sales",
    lessons: 7,
    completedLessons: 0,
    minutes: 70,
    summary: "Frameworks for the conversations agents avoid.",
  },
  {
    id: "t6",
    title: "Social media for agents",
    track: "Marketing",
    lessons: 9,
    completedLessons: 4,
    minutes: 85,
    summary: "Build a consistent presence without burning out.",
  },
  {
    id: "t7",
    title: "Email and sphere marketing",
    track: "Marketing",
    lessons: 6,
    completedLessons: 1,
    minutes: 55,
    summary: "Stay top of mind with the people who already know you.",
  },
  {
    id: "t8",
    title: "CRM fundamentals",
    track: "CRM",
    lessons: 8,
    completedLessons: 5,
    minutes: 60,
    summary: "Get fluent in Follow Up Boss and your daily workflow.",
  },
  {
    id: "t9",
    title: "MLS and comps",
    track: "How To",
    lessons: 6,
    completedLessons: 0,
    minutes: 50,
    summary: "Search, comps, and clean listing entry.",
  },
  {
    id: "t10",
    title: "Leasing and property management basics",
    track: "Leasing",
    lessons: 7,
    completedLessons: 0,
    minutes: 65,
    summary: "Lease terms, tenant screening, and working with PM teams.",
  },
  {
    id: "t11",
    title: "Working investor clients",
    track: "Sales",
    lessons: 8,
    completedLessons: 0,
    minutes: 90,
    summary: "Cash flow, cap rates, and advising buy-and-hold investors.",
  },
];
