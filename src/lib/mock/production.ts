// Mock data for the Production page (/production).
// Fabricated commission, goal, and leaderboard numbers. Not real Marshall
// Reddick figures or people.

export interface MonthVolume {
  month: string;
  volume: number; // in dollars
  units: number;
}

export const MONTHLY_VOLUME: MonthVolume[] = [
  { month: "Jan", volume: 1850000, units: 2 },
  { month: "Feb", volume: 920000, units: 1 },
  { month: "Mar", volume: 2410000, units: 3 },
  { month: "Apr", volume: 1320000, units: 2 },
  { month: "May", volume: 3050000, units: 3 },
  { month: "Jun", volume: 2410000, units: 3 },
];

export interface GoalRing {
  label: string;
  current: number;
  target: number;
  display: string;
  targetDisplay: string;
}

export const GOALS: GoalRing[] = [
  {
    label: "GCI year to date",
    current: 214800,
    target: 350000,
    display: "$214,800",
    targetDisplay: "$350,000",
  },
  {
    label: "Closed volume",
    current: 11960000,
    target: 18000000,
    display: "$11.96M",
    targetDisplay: "$18M",
  },
  {
    label: "Units closed",
    current: 14,
    target: 24,
    display: "14",
    targetDisplay: "24",
  },
];

export interface CommissionEntry {
  id: string;
  property: string;
  side: "Buyer" | "Seller";
  closeDate: string;
  salePrice: string;
  gci: string;
  status: "Paid" | "Pending";
}

export const COMMISSION_LEDGER: CommissionEntry[] = [
  {
    id: "x1",
    property: "12 Harbor Cove, Huntington Beach",
    side: "Seller",
    closeDate: "May 28, 2026",
    salePrice: "$1,295,000",
    gci: "$32,375",
    status: "Paid",
  },
  {
    id: "x2",
    property: "44 Ridgeline, Mission Viejo",
    side: "Buyer",
    closeDate: "May 14, 2026",
    salePrice: "$865,000",
    gci: "$21,625",
    status: "Paid",
  },
  {
    id: "x3",
    property: "7 Canyon Vista, Laguna Niguel",
    side: "Seller",
    closeDate: "Jun 02, 2026",
    salePrice: "$1,540,000",
    gci: "$38,500",
    status: "Pending",
  },
  {
    id: "x4",
    property: "221 Bayview Ter, Costa Mesa",
    side: "Buyer",
    closeDate: "Jun 09, 2026",
    salePrice: "$720,000",
    gci: "$18,000",
    status: "Pending",
  },
  {
    id: "x5",
    property: "18 Sea Pine, Newport Beach",
    side: "Seller",
    closeDate: "Apr 22, 2026",
    salePrice: "$3,495,000",
    gci: "$87,375",
    status: "Paid",
  },
];

export interface LeaderboardRow {
  rank: number;
  name: string;
  office: string;
  volume: string;
  units: number;
  isYou?: boolean;
}

export const LEADERBOARD: LeaderboardRow[] = [
  { rank: 1, name: "Bryan Talley", office: "Newport Beach", volume: "$18.4M", units: 19 },
  { rank: 2, name: "Sample Agent A", office: "Irvine", volume: "$15.1M", units: 17 },
  { rank: 3, name: "Sample Agent B", office: "Tustin", volume: "$13.7M", units: 15 },
  { rank: 4, name: "Jordan Sample", office: "Irvine", volume: "$11.96M", units: 14, isYou: true },
  { rank: 5, name: "Sample Agent C", office: "Costa Mesa", volume: "$10.2M", units: 12 },
  { rank: 6, name: "Sample Agent D", office: "Orange", volume: "$9.4M", units: 11 },
];
