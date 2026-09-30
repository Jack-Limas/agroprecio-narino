import type { DailyPrice } from '@/domain/entities/DailyPrice';
import type { Market } from '@/domain/entities/Market';
import type { PriceRecord } from '@/domain/entities/PriceRecord';
import type { Product } from '@/domain/entities/Product';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findBySlug(slug: string): Promise<Product | null>;
}

export interface MarketRepository {
  findAll(): Promise<Market[]>;
}

export interface PriceRepository {
  findAll(): Promise<PriceRecord[]>;
}

export interface PriceHistoryRepository {
  findDailyAverages(days: number): Promise<DailyPrice[]>;
}