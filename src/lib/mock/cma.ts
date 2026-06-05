// Mock data for the CMA builder (/cma).
// Fabricated subject property and comparable sales. Not real comps.

export interface Comp {
  id: string;
  address: string;
  soldPrice: number;
  sqft: number;
  beds: number;
  baths: number;
  soldAgo: string;
  distanceMi: number;
}

export const CMA_SUBJECT = {
  address: "350 Coastline Dr",
  city: "Newport Beach, CA",
  beds: 4,
  baths: 3,
  sqft: 2600,
};

export const CMA_COMPS: Comp[] = [
  {
    id: "c1",
    address: "318 Coastline Dr",
    soldPrice: 1735000,
    sqft: 2540,
    beds: 4,
    baths: 3,
    soldAgo: "3 weeks ago",
    distanceMi: 0.2,
  },
  {
    id: "c2",
    address: "12 Harbor Cove",
    soldPrice: 1620000,
    sqft: 2480,
    beds: 4,
    baths: 3,
    soldAgo: "1 month ago",
    distanceMi: 0.5,
  },
  {
    id: "c3",
    address: "27 Seaview Ln",
    soldPrice: 1890000,
    sqft: 2820,
    beds: 5,
    baths: 4,
    soldAgo: "6 weeks ago",
    distanceMi: 0.7,
  },
  {
    id: "c4",
    address: "44 Bayport Way",
    soldPrice: 1555000,
    sqft: 2360,
    beds: 4,
    baths: 2,
    soldAgo: "2 months ago",
    distanceMi: 0.9,
  },
  {
    id: "c5",
    address: "9 Tide Pool Ct",
    soldPrice: 1980000,
    sqft: 2900,
    beds: 5,
    baths: 4,
    soldAgo: "5 weeks ago",
    distanceMi: 1.1,
  },
];
