import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { fetchSupplierA, fetchSupplierB } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});

export interface HotelResult {
  name: string;
  price: number;
  supplier: string;
  commissionPct: number;
}

export async function compareHotelPrices(city: string): Promise<HotelResult[]> {
  const [resultsA, resultsB] = await Promise.all([
    fetchSupplierA(city),
    fetchSupplierB(city),
  ]);

  const hotelMap = new Map<string, HotelResult>();

  // Process Supplier A results
  resultsA.forEach((hotel) => {
    hotelMap.set(hotel.name, {
      name: hotel.name,
      price: hotel.price,
      supplier: 'Supplier A',
      commissionPct: hotel.commissionPct,
    });
  });

  // Process Supplier B results (keep cheapest price)
  resultsB.forEach((hotel) => {
    const existing = hotelMap.get(hotel.name);
    if (!existing || hotel.price < existing.price) {
      hotelMap.set(hotel.name, {
        name: hotel.name,
        price: hotel.price,
        supplier: 'Supplier B',
        commissionPct: hotel.commissionPct,
      });
    }
  });

  return Array.from(hotelMap.values());
}