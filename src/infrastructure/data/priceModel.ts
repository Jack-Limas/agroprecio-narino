import { BASE_PRICES, MARKET_FACTORS, MARKETS } from '@/infrastructure/data/seed';

const BOGOTA_OFFSET_MS = 5 * 60 * 60 * 1000;
const DAY_MS = 86_400_000;

export const AVERAGE_MARKET_FACTOR =
  MARKETS.reduce((sum, market) => sum + MARKET_FACTORS[market.id], 0) / MARKETS.length;

export function hash01(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 1000) / 1000;
}

export function dayIndexOf(timestamp: number): number {
  return Math.floor((timestamp - BOGOTA_OFFSET_MS) / DAY_MS);
}

export function dateKeyOf(dayIndex: number): string {
  return new Date(dayIndex * DAY_MS).toISOString().slice(0, 10);
}

/** Deterministic daily base price: slow wave plus small noise, so history is reproducible. */
export function dayBasePrice(productId: string, dayIndex: number): number {
  const base = BASE_PRICES[productId] ?? 0;
  const phase = hash01(`phase:${productId}`) * Math.PI * 2;
  const wave = Math.sin(dayIndex / 4 + phase) * 0.07;
  const noise = (hash01(`${productId}:${dayIndex}`) - 0.5) * 0.05;
  return base * (1 + wave + noise);
}