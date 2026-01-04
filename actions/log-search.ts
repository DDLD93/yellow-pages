'use server';

import { db } from '@/lib/db';
import { headers } from 'next/headers';

export async function logSearch(params: {
  query?: string;
  lga?: string;
  category?: string;
  verified?: boolean;
  resultsCount: number;
}) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'unknown';
    // Getting IP in Next.js can be tricky depending on deployment (Vercel uses x-forwarded-for)
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    await db.searchLog.create({
      data: {
        query: params.query || null,
        lga: params.lga || null,
        category: params.category || null,
        verified: params.verified || null,
        resultsCount: params.resultsCount,
        userAgent,
        ipAddress: Array.isArray(ip) ? ip[0] : ip.split(',')[0],
      },
    });
  } catch (error) {
    console.error('Failed to log search:', error);
    // Silent failure so we don't block the UI
  }
}

