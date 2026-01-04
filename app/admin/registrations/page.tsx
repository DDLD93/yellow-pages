'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllRegistrations, updateRegistrationStatus } from '@/actions/admin/registrations';
import { Eye, Clock, FileText } from 'lucide-react';
import { AdminPageHeader, AdminSelect, AdminTable, AdminBadge, AdminButton, AdminEmptyState } from '@/components/admin/ui';

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('Pending');

  const loadRegistrations = async () => {
    setLoading(true);
    const result = await getAllRegistrations(page, 10, statusFilter);
    setRegistrations(result.registrations);
    setTotalPages(result.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    loadRegistrations();
  }, [page, statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateRegistrationStatus(id, newStatus);
    loadRegistrations();
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    if (status === 'Approved') return 'success';
    if (status === 'Rejected') return 'error';
    if (status === 'Reviewed') return 'info';
    return 'warning';
  };

  const tableData = registrations.map((reg) => ({
    name: reg.businessName,
    category: reg.businessRegCatType,
    lga: reg.businessLGA,
    phone: reg.phone,
    status: <AdminBadge variant={getStatusVariant(reg.status)}>{reg.status}</AdminBadge>,
    created: new Date(reg.createdAt).toLocaleDateString(),
    actions: (
      <div className="flex items-center justify-end gap-2">
        <Link
          href={`/admin/registrations/${reg.id}`}
          className="p-1.5 text-admin-text-secondary hover:text-kaduna-navy hover:bg-admin-surface-hover rounded-admin transition-all admin-transition"
          title="View Details"
        >
          <Eye size={16} />
        </Link>
        {reg.status === 'Pending' && (
          <button
            onClick={() => handleStatusChange(reg.id, 'Reviewed')}
            className="p-1.5 text-admin-info hover:text-admin-info-dark hover:bg-admin-info-light rounded-admin transition-all admin-transition"
            title="Mark as Reviewed"
          >
            <Clock size={16} />
          </button>
        )}
      </div>
    ),
  }));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Registration Management"
        description="Review and manage business registrations"
      />

      {/* Filters */}
      <div className="flex items-center gap-4">
        <AdminSelect
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          options={[
            { value: 'All', label: 'All' },
            { value: 'Pending', label: 'Pending' },
            { value: 'Reviewed', label: 'Reviewed' },
            { value: 'Approved', label: 'Approved' },
            { value: 'Rejected', label: 'Rejected' },
          ]}
          fullWidth={false}
          className="w-48"
        />
      </div>

      {/* Table */}
      {!loading && registrations.length === 0 ? (
        <AdminEmptyState
          icon={FileText}
          title="No registrations found"
          description={statusFilter !== 'All' ? `No registrations with status "${statusFilter}"` : 'No registrations available'}
        />
      ) : (
        <>
          <AdminTable
            headers={[
              { key: 'name', label: 'Business Name' },
              { key: 'category', label: 'Category' },
              { key: 'lga', label: 'LGA' },
              { key: 'phone', label: 'Phone' },
              { key: 'status', label: 'Status' },
              { key: 'created', label: 'Created' },
              { key: 'actions', label: 'Actions', className: 'text-right' },
            ]}
            data={tableData}
            loading={loading}
            emptyMessage="No registrations found"
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

