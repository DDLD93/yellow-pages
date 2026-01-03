'use server';

import { db } from '@/lib/db';

/**
 * Gets distinct category values for filter checkboxes
 */
export async function getCategories(): Promise<string[]> {
  const businesses = await db.business.findMany({
    where: {
      status: {
        in: ['Eligible', 'Disbursed'],
      },
    },
    select: {
      businessRegCatType: true,
    },
    distinct: ['businessRegCatType'],
    orderBy: {
      businessRegCatType: 'asc',
    },
  });

  return businesses.map((b) => b.businessRegCatType);
}

