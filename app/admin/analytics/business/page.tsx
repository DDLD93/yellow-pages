import { StatsCard } from '@/components/admin/stats-card';
import { getBusinessAnalytics } from '@/actions/admin/analytics';
import { BusinessStatusChart, CategoryChart, LGAChart } from '@/components/admin/charts';
import { AdminPageHeader, AdminCard, AdminBadge, AdminButton } from '@/components/admin/ui';
import Link from 'next/link';

export default async function BusinessAnalyticsPage() {
  const analytics = await getBusinessAnalytics();

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    if (status === 'Approved') return 'success';
    if (status === 'Rejected') return 'error';
    return 'warning';
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Business Analytics"
        description="Overview of business data and statistics"
        action={
          <Link href="/admin/analytics/business/advanced">
            <AdminButton>View Advanced Analytics</AdminButton>
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Businesses"
          value={analytics.totalBusinesses}
          icon="Store"
          color="blue"
        />
        <StatsCard
          title="By Status"
          value={analytics.byStatus.length}
          icon="CheckCircle"
          color="green"
        />
        <StatsCard
          title="LGAs Covered"
          value={analytics.byLga.length}
          icon="MapPin"
          color="purple"
        />
        <StatsCard
          title="Categories"
          value={analytics.byCategory.length}
          icon="Tag"
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminCard title="Businesses by Status">
          <BusinessStatusChart data={analytics.byStatus} />
        </AdminCard>

        <AdminCard title="Top Categories">
          <CategoryChart data={analytics.byCategory} />
        </AdminCard>

        <AdminCard title="Businesses by LGA" className="lg:col-span-2">
          <LGAChart data={analytics.byLga} />
        </AdminCard>
      </div>

      {/* Recent Registrations */}
      <AdminCard title="Recent Registrations">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-admin-surface-hover">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-admin-text-secondary">Business Name</th>
                <th className="px-4 py-2 text-left font-medium text-admin-text-secondary">Category</th>
                <th className="px-4 py-2 text-left font-medium text-admin-text-secondary">LGA</th>
                <th className="px-4 py-2 text-left font-medium text-admin-text-secondary">Status</th>
                <th className="px-4 py-2 text-left font-medium text-admin-text-secondary">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border">
              {analytics.recentRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-admin-surface-hover transition-colors admin-transition">
                  <td className="px-4 py-2 text-admin-text-primary">{reg.businessName}</td>
                  <td className="px-4 py-2 text-admin-text-primary">{reg.businessRegCatType}</td>
                  <td className="px-4 py-2 text-admin-text-primary">{reg.businessLGA}</td>
                  <td className="px-4 py-2">
                    <AdminBadge variant={getStatusVariant(reg.status)}>{reg.status}</AdminBadge>
                  </td>
                  <td className="px-4 py-2 text-admin-text-primary">{new Date(reg.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}

