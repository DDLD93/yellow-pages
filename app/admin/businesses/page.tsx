'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllBusinesses, deleteBusiness } from '@/actions/admin/businesses';
import { Search, Plus, Trash2, Eye, Package } from 'lucide-react';
import { AdminPageHeader, AdminInput, AdminTable, AdminBadge, AdminButton, AdminEmptyState } from '@/components/admin/ui';

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const loadBusinesses = async () => {
    setLoading(true);
    const result = await getAllBusinesses(page, 10, search);
    setBusinesses(result.businesses);
    setTotalPages(result.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    loadBusinesses();
  }, [page, search]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this business?')) {
      await deleteBusiness(id);
      loadBusinesses();
    }
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    if (status === 'Eligible' || status === 'Disbursed') return 'success';
    if (status === 'Rejected') return 'error';
    return 'warning';
  };

  const tableData = businesses.map((business) => ({
    name: business.businessName,
    category: business.businessRegCatType,
    lga: business.businessLGA,
    status: <AdminBadge variant={getStatusVariant(business.status)}>{business.status}</AdminBadge>,
    created: new Date(business.createdAt).toLocaleDateString(),
    actions: (
      <div className="flex items-center justify-end gap-2">
        <Link
          href={`/admin/businesses/${business.id}`}
          className="p-1.5 text-admin-text-secondary hover:text-kaduna-navy hover:bg-admin-surface-hover rounded-admin transition-all admin-transition"
          title="View/Edit"
        >
          <Eye size={16} />
        </Link>
        <button
          onClick={() => handleDelete(business.id)}
          className="p-1.5 text-admin-error hover:text-admin-error-dark hover:bg-admin-error-light rounded-admin transition-all admin-transition"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  }));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Business Management"
        description="View and manage all businesses"
        action={
          <Link href="/admin/businesses/new">
            <AdminButton icon={Plus} iconPosition="left">
              Create Business
            </AdminButton>
          </Link>
        }
      />

      {/* Search */}
      <AdminInput
        icon={Search}
        placeholder="Search businesses..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* Table */}
      {!loading && businesses.length === 0 ? (
        <AdminEmptyState
          icon={Package}
          title="No businesses found"
          description={search ? `No businesses match "${search}"` : 'Get started by creating your first business'}
          action={
            <Link href="/admin/businesses/new">
              <AdminButton icon={Plus} iconPosition="left">
                Create Business
              </AdminButton>
            </Link>
          }
        />
      ) : (
        <>
          <AdminTable
            headers={[
              { key: 'name', label: 'Business Name' },
              { key: 'category', label: 'Category' },
              { key: 'lga', label: 'LGA' },
              { key: 'status', label: 'Status' },
              { key: 'created', label: 'Created' },
              { key: 'actions', label: 'Actions', className: 'text-right' },
            ]}
            data={tableData}
            loading={loading}
            emptyMessage="No businesses found"
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-admin-surface rounded-admin-md border border-admin-border">
              <p className="text-sm text-admin-text-secondary">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <AdminButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </AdminButton>
                <AdminButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </AdminButton>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

