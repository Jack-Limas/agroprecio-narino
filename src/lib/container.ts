import { MarketOverviewService } from '@/application/services/MarketOverviewService';
import { PriceService } from '@/application/services/PriceService';
import { InMemoryMarketRepository } from '@/infrastructure/repositories/InMemoryMarketRepository';
import { InMemoryPriceHistoryRepository } from '@/infrastructure/repositories/InMemoryPriceHistoryRepository';
import { InMemoryPriceRepository } from '@/infrastructure/repositories/InMemoryPriceRepository';
import { InMemoryProductRepository } from '@/infrastructure/repositories/InMemoryProductRepository';

export const priceService = new PriceService(
  new InMemoryProductRepository(),
  new InMemoryMarketRepository(),
  new InMemoryPriceRepository(),
);

export const overviewService = new MarketOverviewService(
  priceService,
  new InMemoryPriceHistoryRepository(),
);