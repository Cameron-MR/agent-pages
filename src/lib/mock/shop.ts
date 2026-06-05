// Mock data for the Marketing Shop (/shop).
// A fabricated catalog of branded print and swag products a realtor can order.
// Prices, products, and "ordering" are all mock. Nothing is purchased.

export type ProductKind =
  | "postcard"
  | "flyer"
  | "doorhanger"
  | "card"
  | "apparel"
  | "sign"
  | "promo";

export type ShopCategory =
  | "Direct Mail"
  | "Flyers"
  | "Door Hangers"
  | "Business Cards"
  | "Signage"
  | "Apparel & Swag"
  | "Promo";

export const SHOP_CATEGORIES: ShopCategory[] = [
  "Direct Mail",
  "Flyers",
  "Door Hangers",
  "Business Cards",
  "Signage",
  "Apparel & Swag",
  "Promo",
];

export interface Product {
  id: string;
  name: string;
  category: ShopCategory;
  kind: ProductKind;
  // Package price in whole dollars.
  price: number;
  // Unit label, e.g. "/ 250" or "each".
  unit: string;
  blurb: string;
}

export const PRODUCTS: Product[] = [
  // Direct Mail
  { id: "p1", name: "Just Listed postcards", category: "Direct Mail", kind: "postcard", price: 159, unit: "/ 250", blurb: "Glossy 6x9 just-listed postcards mailed to the neighborhood." },
  { id: "p2", name: "Just Sold postcards", category: "Direct Mail", kind: "postcard", price: 159, unit: "/ 250", blurb: "Announce a closing and farm for the next listing." },
  { id: "p3", name: "Farming mailer", category: "Direct Mail", kind: "postcard", price: 189, unit: "/ 250", blurb: "Monthly market-update mailer for your geographic farm." },
  // Flyers
  { id: "p4", name: "Property flyers", category: "Flyers", kind: "flyer", price: 89, unit: "/ 250", blurb: "Full-color single-listing flyers for showings and boxes." },
  { id: "p5", name: "Open house flyers", category: "Flyers", kind: "flyer", price: 79, unit: "/ 250", blurb: "Open-house handouts with details, map, and your contact." },
  { id: "p6", name: "Feature sheets", category: "Flyers", kind: "flyer", price: 99, unit: "/ 250", blurb: "Premium two-sided feature sheets on heavy stock." },
  // Door Hangers
  { id: "p7", name: "Open house door hangers", category: "Door Hangers", kind: "doorhanger", price: 129, unit: "/ 250", blurb: "Invite the neighbors to this weekend's open house." },
  { id: "p8", name: "Just listed door hangers", category: "Door Hangers", kind: "doorhanger", price: 129, unit: "/ 250", blurb: "Farm a street the day a new listing hits." },
  // Business Cards
  { id: "p9", name: "Standard business cards", category: "Business Cards", kind: "card", price: 39, unit: "/ 500", blurb: "Classic matte cards with your details and DRE number." },
  { id: "p10", name: "Premium soft-touch cards", category: "Business Cards", kind: "card", price: 59, unit: "/ 500", blurb: "Soft-touch laminate with spot-gloss logo." },
  // Signage
  { id: "p11", name: "Yard sign + post", category: "Signage", kind: "sign", price: 48, unit: "each", blurb: "Weatherproof yard sign with a powder-coated post." },
  { id: "p12", name: "Open house A-frame", category: "Signage", kind: "sign", price: 65, unit: "each", blurb: "Double-sided A-frame with directional arrow." },
  { id: "p13", name: "Rider signs", category: "Signage", kind: "sign", price: 12, unit: "each", blurb: "Pending, price-improved, and open-house riders." },
  // Apparel & Swag
  { id: "p14", name: "Branded polo", category: "Apparel & Swag", kind: "apparel", price: 34, unit: "each", blurb: "Embroidered performance polo in MR teal." },
  { id: "p15", name: "Branded cap", category: "Apparel & Swag", kind: "apparel", price: 22, unit: "each", blurb: "Structured cap with embroidered logomark." },
  { id: "p16", name: "Name badge", category: "Apparel & Swag", kind: "promo", price: 14, unit: "each", blurb: "Magnetic name badge with title and DRE number." },
  // Promo
  { id: "p17", name: "Branded pens", category: "Promo", kind: "promo", price: 25, unit: "/ 50", blurb: "Smooth-writing pens with your name and number." },
  { id: "p18", name: "Closing gift tote", category: "Promo", kind: "promo", price: 16, unit: "each", blurb: "Heavyweight canvas tote for closing gifts." },
  { id: "p19", name: "Car magnets", category: "Promo", kind: "promo", price: 29, unit: "/ pair", blurb: "Removable vehicle magnets for farming on the go." },
];

// Compliance items the system auto-applies to every order.
export const COMPLIANCE_ITEMS: string[] = [
  "Marshall Reddick brand colors, fonts, and logo",
  "Your name, title, phone, and email",
  "California DRE license number on all print materials",
  "Equal Housing Opportunity logo",
  "Brokerage name, address, and corporate DRE",
];

export interface SavedCard {
  id: string;
  brand: string;
  last4: string;
  exp: string;
}

// One sample saved card to start. Clearly fake.
export const DEFAULT_CARDS: SavedCard[] = [
  { id: "card1", brand: "Visa", last4: "4242", exp: "08/28" },
];

export interface ShopOrder {
  id: string;
  date: string;
  items: string;
  total: number;
  status: string;
}

export const SAMPLE_ORDERS: ShopOrder[] = [
  { id: "MR-10421", date: "May 22, 2026", items: "Just Listed postcards x250", total: 159, status: "Delivered" },
  { id: "MR-10455", date: "Jun 01, 2026", items: "Business cards, Yard sign", total: 87, status: "Shipped" },
];
