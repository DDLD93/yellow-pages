import { StatsCard } from '@/components/admin/stats-card';
import { getBusinessAnalytics, getAdvancedAnalytics } from '@/actions/admin/analytics';
import { TrendLineChart } from '@/components/admin/charts';

export default async function AdvancedBusinessAnalyticsPage() {
  const [basic, advanced] = await Promise.all([
    getBusinessAnalytics(),
    getAdvancedAnalytics(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Advanced Business Analytics</h2>
          <p className="text-slate-500 text-sm mt-1">Detailed insights and trends</p>
        </div>
        <a
          href="/admin/analytics/business"
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium"
        >
          Back to Basic
        </a>
      </div>

      {/* Growth Trends */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Registration Growth Trends (Last 30 Days)</h3>
        <TrendLineChart data={advanced.registrationsOverTime} color="#0D7B5D" name="Registrations" />
      </div>

      {/* Category Distribution by LGA */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Category Distribution by LGA</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-slate-700">LGA</th>
                {basic.byCategory.slice(0, 5).map((cat) => (
                  <th key={cat.name} className="px-4 py-2 text-center font-medium text-slate-700">
                    {cat.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {basic.byLga.slice(0, 10).map((lga) => (
                <tr key={lga.name} className="hover:bg-slate-50">
                  <td className="px-4 py-2 font-medium">{lga.name}</td>
                  {basic.byCategory.slice(0, 5).map((cat) => (
                    <td key={cat.name} className="px-4 py-2 text-center">
                      {/* This would need a more complex query to get actual counts per LGA+Category */}
                      -
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Eligible Businesses"
          value={basic.byStatus.find(s => s.name === 'Eligible')?.value || 0}
          icon="CheckCircle"
          color="green"
        />
        <StatsCard
          title="Disbursed"
          value={basic.byStatus.find(s => s.name === 'Disbursed')?.value || 0}
          icon="DollarSign"
          color="blue"
        />
        <StatsCard
          title="Verification Rate"
          value={`${Math.round(((basic.byStatus.find(s => s.name === 'Eligible')?.value || 0) + (basic.byStatus.find(s => s.name === 'Disbursed')?.value || 0)) / basic.totalBusinesses * 100)}%`}
          icon="TrendingUp"
          color="purple"
        />
      </div>
    </div>
  );
}

