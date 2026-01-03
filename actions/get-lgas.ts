'use server';

import { db } from '@/lib/db';

/**
 * Gets distinct LGA values for filter dropdown
 */
export async function getLGAs(): Promise<string[]> {
  const businesses = await db.business.findMany({
    where: {
      status: {
        in: ['Eligible', 'Disbursed'],
      },
    },
    select: {
      businessLGA: true,
    },
    distinct: ['businessLGA'],
    orderBy: {
      businessLGA: 'asc',
    },
  });

  return businesses.map((b) => b.businessLGA);
}

