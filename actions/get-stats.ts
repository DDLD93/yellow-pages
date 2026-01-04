'use server';

import { db } from '@/lib/db';
import { unstable_cache } from 'next/cache';

export async function getStats() {
  return unstable_cache(
    async () => {
      const [businessCount, lgaCount, wardCount] = await Promise.all([
        // Count total eligible/disbursed businesses
        db.business.count({
          where: {
            status: {
              in: ['Eligible', 'Disbursed'],
            },
          },
        }),
        
        // Count distinct LGAs
        db.business.findMany({
          where: {
            status: { in: ['Eligible', 'Disbursed'] },
            // businessLGA: { not: null } - Removing this as businessLGA might not be nullable in schema or prisma issue with 'not: null'
          },
          distinct: ['businessLGA'],
          select: { businessLGA: true },
        }).then(res => res.length),

        // Count distinct Wards
        db.business.findMany({
          where: {
            status: { in: ['Eligible', 'Disbursed'] },
            // businessWard: { not: null }
          },
          distinct: ['businessWard'],
          select: { businessWard: true },
        }).then(res => res.length),
      ]);

      return {
        businessCount,
        lgaCount,
        wardCount,
      };
    },
    ['homepage-stats'],
    { revalidate: 3600 } // Cache for 1 hour
  )();
}

