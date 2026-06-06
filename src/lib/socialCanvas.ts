// Renders a branded social graphic to a real PNG download using canvas.
// Mirrors the on-screen SocialGraphic: property photo, teal gradient scrim,
// campaign badge, price/specs, and the agent strip. Unsplash serves CORS
// headers, so the canvas stays clean; if any image fails we fall back to a
// brand gradient so the download always works.

import type { AgentProfile } from "@/components/AgentProfileProvider";
import type { Listing } from "@/lib/mock/listings";
import { campaignById, type CampaignId } from "@/lib/mock/marketing";

const BASE = "#316878";
const DARK = "#1C3C45";

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// Draw an image to fill the rect (object-fit: cover).
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number
) {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export async function downloadSocialPng(opts: {
  listing: Listing;
  campaign: CampaignId;
  profile: AgentProfile;
  format: "square" | "story";
}): Promise<boolean> {
  const { listing, campaign, profile, format } = opts;
  const W = 1080;
  const H = format === "story" ? 1920 : 1080;
  const c = campaignById(campaign);

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  // Background photo (or brand gradient fallback).
  const photo = await loadImage(listing.photo);
  if (photo) {
    drawCover(ctx, photo, W, H);
  } else {
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, BASE);
    g.addColorStop(1, DARK);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  // Teal scrim for legibility.
  const scrim = ctx.createLinearGradient(0, H, 0, 0);
  scrim.addColorStop(0, "rgba(28,60,69,0.92)");
  scrim.addColorStop(0.55, "rgba(28,60,69,0.55)");
  scrim.addColorStop(1, "rgba(49,104,120,0.45)");
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, W, H);

  const pad = 64;

  // Campaign badge (top-left).
  ctx.font = "700 34px Raleway, Arial, sans-serif";
  const badge = c.badge;
  const bw = ctx.measureText(badge).width + 48;
  roundRect(ctx, pad, pad, bw, 64, 14);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.fillStyle = BASE;
  ctx.textBaseline = "middle";
  ctx.fillText(badge, pad + 24, pad + 34);

  // Logomark (top-right).
  const mark = await loadImage("/logos/white-logo-mark.svg");
  if (mark) {
    const mw = 110;
    const mh = (mark.height / mark.width) * mw || 80;
    ctx.drawImage(mark, W - pad - mw, pad - 6, mw, mh);
  }

  // Bottom block.
  let y = H - pad - 230;
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 92px Raleway, Arial, sans-serif";
  ctx.fillText(listing.price, pad, y);
  y += 70;
  ctx.font = "600 44px 'Open Sans', Arial, sans-serif";
  ctx.fillText(listing.address, pad, y);
  y += 48;
  ctx.font = "400 34px 'Open Sans', Arial, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.fillText(listing.city, pad, y);
  y += 46;
  ctx.fillText(
    `${listing.beds} bd  ·  ${listing.baths} ba  ·  ${listing.sqft} sqft`,
    pad,
    y
  );

  // Divider + agent strip.
  y += 44;
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, y);
  ctx.lineTo(W - pad, y);
  ctx.stroke();
  y += 28;

  const avatar = await loadImage(profile.photo);
  const av = 76;
  if (avatar) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(pad + av / 2, y + av / 2, av / 2, 0, Math.PI * 2);
    ctx.clip();
    drawCoverAvatar(ctx, avatar, pad, y, av);
    ctx.restore();
  }
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 34px 'Open Sans', Arial, sans-serif";
  ctx.fillText(profile.name, pad + av + 24, y + 26);
  ctx.font = "400 28px 'Open Sans', Arial, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText(profile.phone, pad + av + 24, y + 62);
  ctx.textAlign = "right";
  ctx.fillText(profile.license, W - pad, y + 44);
  ctx.textAlign = "left";

  // Download.
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(false);
        return;
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      const slug = listing.address.replace(/\s+/g, "-").toLowerCase();
      a.download = `${campaign}-${slug}-${format}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      resolve(true);
    }, "image/png");
  });
}

// Cover-fit an avatar into a square crop region.
function drawCoverAvatar(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  size: number
) {
  const scale = Math.max(size / img.width, size / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, x + (size - dw) / 2, y + (size - dh) / 2 - dh * 0.12, dw, dh);
}
