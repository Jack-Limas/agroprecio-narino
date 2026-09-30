import type { DailyPrice } from '@/domain/entities/DailyPrice';
import type { PriceHistoryRepository } from '@/domain/repositories';
import {
  AVERAGE_MARKET_FACTOR,
  dateKeyOf,
  dayBasePrice,
  dayIndexOf,
} from '@/infrastructure/data/priceModel';
import { PRODUCTS } from '@/infrastructure/data/seed';

export class InMemoryPriceHistoryRepository implements PriceHistoryRepository {
  constructor(private readonly now: () => number = Date.now) {}

  async findDailyAverages(days: number): Promise<DailyPrice[]> {
    const today = dayIndexOf(this.now());

    return PRODUCTS.flatMap((product) =>
      Array.from({ length: days }, (_, offset) => {
        const dayIndex = today - (days - 1 - offset);
        return {
          productId: product.id,
          date: dateKeyOf(dayIndex),
          average: Math.round((dayBasePrice(product.id, dayIndex) * AVERAGE_MARKET_FACTOR) / 10) * 10,
        };
      }),
    );
  }
}