import { StatsCard } from '@/components/admin/stats-card';
import { getSearchAnalytics } from '@/actions/admin/analytics';
import { SearchBarChart } from '@/components/admin/charts';
import { AdminPageHeader, AdminCard, AdminButton } from '@/components/admin/ui';
import Link from 'next/link';

export default async function SearchAnalyticsPage() {
  const analytics = await getSearchAnalytics();

  // Calculate today, week, month counts (simplified - would need date filtering in action)
  const today = analytics.totalSearches; // Placeholder
  const thisWeek = analytics.totalSearches; // Placeholder
  const thisMonth = analytics.totalSearches; // Placeholder

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Search Analytics"
        description="Search engine insights and trends"
        action={
          <Link href="/admin/analytics/search/advanced">
            <AdminButton>View Advanced Analytics</AdminButton>
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Searches"
          value={analytics.totalSearches}
          icon="Search"
          color="blue"
        />
        <StatsCard
          title="Today"
          value={today}
          icon="Calendar"
          color="green"
        />
        <StatsCard
          title="This Week"
          value={thisWeek}
          icon="TrendingUp"
          color="purple"
        />
        <StatsCard
          title="This Month"
          value={thisMonth}
          icon="BarChart"
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminCard title="Popular Search Terms">
          <SearchBarChart data={analytics.topQueries.slice(0, 10)} color="var(--kaduna-navy)" />
        </AdminCard>

        <AdminCard title="Most Searched LGAs">
          <SearchBarChart data={analytics.topLgas} color="var(--kaduna-emerald)" />
        </AdminCard>

        <AdminCard title="Most Searched Categories" className="lg:col-span-2">
          <SearchBarChart data={analytics.topCategories} color="var(--kaduna-gold)" />
        </AdminCard>
      </div>
    </div>
  );
}

