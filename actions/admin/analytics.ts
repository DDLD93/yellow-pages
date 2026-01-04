'use server';

import { db } from '@/lib/db';

export async function getBusinessAnalytics() {
  const [
    totalBusinesses,
    byStatus,
    byLga,
    byCategory,
    recentRegistrations
  ] = await Promise.all([
    db.business.count(),
    db.business.groupBy({
      by: ['status'],
      _count: true,
    }),
    db.business.groupBy({
      by: ['businessLGA'],
      _count: true,
    }),
    db.business.groupBy({
      by: ['businessRegCatType'],
      _count: true,
    }),
    db.businessRegistration.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    })
  ]);

  return {
    totalBusinesses,
    byStatus: byStatus.map(s => ({ name: s.status, value: s._count })),
    byLga: byLga.map(l => ({ name: l.businessLGA, value: l._count })),
    byCategory: byCategory.map(c => ({ name: c.businessRegCatType, value: c._count })),
    recentRegistrations,
  };
}

export async function getSearchAnalytics() {
  const [
    totalSearches,
    topQueries,
    topLgas,
    topCategories
  ] = await Promise.all([
    db.searchLog.count(),
    db.searchLog.groupBy({
      by: ['query'],
      _count: true,
      where: { query: { not: null } }
    }),
    db.searchLog.groupBy({
      by: ['lga'],
      _count: true,
      where: { lga: { not: null } }
    }),
    db.searchLog.groupBy({
      by: ['category'],
      _count: true,
      where: { category: { not: null } }
    }),
  ]);

  // Sort and take top 10
  const sortedQueries = topQueries
    .map(q => ({ name: q.query || 'N/A', value: q._count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
  
  const sortedLgas = topLgas
    .map(l => ({ name: l.lga || 'N/A', value: l._count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
  
  const sortedCategories = topCategories
    .map(c => ({ name: c.category || 'N/A', value: c._count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  return {
    totalSearches,
    topQueries: sortedQueries,
    topLgas: sortedLgas,
    topCategories: sortedCategories,
  };
}

export async function getAdvancedAnalytics() {
    // Helper to get dates for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Get all records and group by day in JavaScript
    const [searches, registrations] = await Promise.all([
        db.searchLog.findMany({
            where: { createdAt: { gte: thirtyDaysAgo } },
            select: { createdAt: true },
        }),
        db.businessRegistration.findMany({
            where: { createdAt: { gte: thirtyDaysAgo } },
            select: { createdAt: true },
        })
    ]);

    // Process by day
    const processByDay = (data: { createdAt: Date }[]) => {
        const daily: Record<string, number> = {};
        data.forEach(item => {
            const day = new Date(item.createdAt).toISOString().split('T')[0];
            daily[day] = (daily[day] || 0) + 1;
        });
        return Object.entries(daily).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date));
    };

    return {
        searchesOverTime: processByDay(searches),
        registrationsOverTime: processByDay(registrations)
    };
}

