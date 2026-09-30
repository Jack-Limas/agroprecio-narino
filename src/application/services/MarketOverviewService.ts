import type {
  MarketOverview,
  MovementSummary,
  ProductOverview,
} from '@/domain/entities/MarketOverview';
import type { PriceHistoryRepository } from '@/domain/repositories';
import type { PriceService } from '@/application/services/PriceService';

export class MarketOverviewService {
  constructor(
    private readonly prices: PriceService,
    private readonly history: PriceHistoryRepository,
    private readonly clock: () => number = Date.now,
  ) {}

  async getOverview(days = 14): Promise<MarketOverview> {
    const [catalog, quotes, markets, daily] = await Promise.all([
      this.prices.getCatalog(),
      this.prices.getQuotes(),
      this.prices.getMarkets(),
      this.history.findDailyAverages(days),
    ]);

    const products = catalog.flatMap((product): ProductOverview[] => {
      const list = quotes.filter((quote) => quote.productSlug === product.slug);
      if (list.length === 0) return [];

      const series = daily
        .filter((point) => point.productId === product.id)
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((point) => point.average);

      const currentAverage = Math.round(
        list.reduce((sum, quote) => sum + quote.pricePerUnit, 0) / list.length,
      );
      const reference = series.length >= 2 ? series[series.length - 2] : currentAverage;
      const changePct = reference > 0 ? ((currentAverage - reference) / reference) * 100 : 0;
      const sorted = [...list].sort((a, b) => b.pricePerUnit - a.pricePerUnit);
      const best = sorted[0];
      const lowest = sorted[sorted.length - 1];

      return [
        {
          productSlug: product.slug,
          productName: product.name,
          emoji: product.emoji,
          unit: product.unit,
          currentAverage,
          changePct,
          bestMarket: { city: best.city, pricePerUnit: best.pricePerUnit },
          lowestMarket: { city: lowest.city, pricePerUnit: lowest.pricePerUnit },
          history: [...series.slice(0, -1), currentAverage],
        },
      ];
    });

    const byChange = [...products].sort((a, b) => b.changePct - a.changePct);
    const toSummary = (item: ProductOverview | undefined): MovementSummary | null =>
      item ? { productName: item.productName, emoji: item.emoji, changePct: item.changePct } : null;

    const wins = new Map<string, number>();
    products.forEach((item) => {
      wins.set(item.bestMarket.city, (wins.get(item.bestMarket.city) ?? 0) + 1);
    });
    const top = Array.from(wins.entries()).sort((a, b) => b[1] - a[1])[0];

    return {
      generatedAt: new Date(this.clock()).toISOString(),
      dates: Array.from(new Set(daily.map((point) => point.date))).sort(),
      markets: [...markets].sort((a, b) => a.distanceKm - b.distanceKm),
      products,
      quotes,
      riser: toSummary(byChange[0]),
      faller: toSummary(byChange[byChange.length - 1]),
      topMarket: top ? { city: top[0], wins: top[1] } : null,
    };
  }
}