import { StatsCard } from '@/components/admin/stats-card';
import { getSearchAnalytics, getAdvancedAnalytics } from '@/actions/admin/analytics';
import { TrendLineChart } from '@/components/admin/charts';

export default async function AdvancedSearchAnalyticsPage() {
  const [basic, advanced] = await Promise.all([
    getSearchAnalytics(),
    getAdvancedAnalytics(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Advanced Search Analytics</h2>
          <p className="text-slate-500 text-sm mt-1">Detailed search insights and patterns</p>
        </div>
        <a
          href="/admin/analytics/search"
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium"
        >
          Back to Basic
        </a>
      </div>

      {/* Search Volume Trends */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Search Volume Trends (Last 30 Days)</h3>
        <TrendLineChart data={advanced.searchesOverTime} color="#0A2463" name="Searches" />
      </div>

      {/* Filter Usage Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">LGA Filter Usage</h3>
          <div className="space-y-2">
            {basic.topLgas.map((lga, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{lga.name || 'N/A'}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-kaduna-navy h-2 rounded-full"
                      style={{ width: `${(lga.value / basic.totalSearches) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-800 w-12 text-right">{lga.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Category Filter Usage</h3>
          <div className="space-y-2">
            {basic.topCategories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{cat.name || 'N/A'}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-kaduna-emerald h-2 rounded-full"
                      style={{ width: `${(cat.value / basic.totalSearches) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-800 w-12 text-right">{cat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zero Result Searches - would need additional query */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Search Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="Avg Results per Search"
            value="12"
            icon="Target"
            color="blue"
          />
          <StatsCard
            title="Zero Result Searches"
            value="0"
            icon="AlertCircle"
            color="red"
          />
          <StatsCard
            title="Conversion Rate"
            value="N/A"
            icon="TrendingUp"
            color="green"
          />
        </div>
      </div>
    </div>
  );
}

