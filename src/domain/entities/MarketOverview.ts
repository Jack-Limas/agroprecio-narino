import type { Market } from '@/domain/entities/Market';
import type { PriceQuote } from '@/domain/entities/PriceQuote';

export interface MarketPrice {
  readonly city: string;
  readonly pricePerUnit: number;
}

export interface ProductOverview {
  readonly productSlug: string;
  readonly productName: string;
  readonly emoji: string;
  readonly unit: string;
  readonly currentAverage: number;
  readonly changePct: number;
  readonly bestMarket: MarketPrice;
  readonly lowestMarket: MarketPrice;
  readonly history: readonly number[];
}

export interface MovementSummary {
  readonly productName: string;
  readonly emoji: string;
  readonly changePct: number;
}

export interface TopMarket {
  readonly city: string;
  readonly wins: number;
}

export interface MarketOverview {
  readonly generatedAt: string;
  readonly dates: readonly string[];
  readonly markets: readonly Market[];
  readonly products: readonly ProductOverview[];
  readonly quotes: readonly PriceQuote[];
  readonly riser: MovementSummary | null;
  readonly faller: MovementSummary | null;
  readonly topMarket: TopMarket | null;
}